/**
 * /api/pricing-unlock — Pricing unlock form handler
 *
 * Called when a prospect fills out the pricing unlock form on a proposal page.
 * Finds or creates the Lead in Zoho CRM, then sets Email_Verification_Status = "Pending"
 * which triggers the "Email Verified - Unlock Pricing" CRM workflow to send the
 * verification email.
 *
 * Expected body:
 *   {
 *     type:        "pricing_unlock",
 *     proposal_id?: string,
 *     lead_id?:     string,   // CRM Lead ID (if pre-populated from URL param)
 *     first_name:   string,
 *     last_name:    string,
 *     email:        string,
 *     phone?:       string,
 *     company?:     string,
 *     industry?:    string,
 *     country?:     string,
 *     current_url?: string,   // their current website URL
 *     need?:        string,   // what they need (one-page / multi-page / not sure)
 *   }
 *
 * CRM logic:
 *   1. If lead_id provided → update that Lead
 *   2. Else search by email → update found Lead
 *   3. Else → create new Lead
 *   4. Set Email_Verification_Status = "Pending" (triggers verification email workflow)
 *   5. Set Pricing_Status = "Pending Verification"
 */

const { CRM_BASE, getAccessToken, crmHeaders, sendJson } = require("./_zoho");

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || "";

  if (req.method === "OPTIONS") {
    return sendJson(res, 204, {}, origin);
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed" }, origin);
  }

  const body = req.body;
  if (!body || typeof body !== "object") {
    return sendJson(res, 400, { error: "Invalid or missing JSON body" }, origin);
  }

  const {
    lead_id, proposal_id,
    first_name, last_name, email,
    phone, company, industry, country, current_url, need,
  } = body;

  if (!first_name || !last_name || !email) {
    return sendJson(res, 400, { error: "first_name, last_name, and email are required" }, origin);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendJson(res, 400, { error: "Invalid email address" }, origin);
  }

  try {
    const token = await getAccessToken();

    let existingLeadId = lead_id || null;

    // Step 1: Search for existing Lead by email (if no lead_id provided)
    if (!existingLeadId) {
      const searchRes = await fetch(
        `${CRM_BASE}/Leads/search?criteria=(Email:equals:${encodeURIComponent(email)})&fields=id`,
        { headers: crmHeaders(token) }
      );
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        const leads = searchData.data || [];
        if (leads.length > 0) existingLeadId = leads[0].id;
      }
    }

    // Step 2: Build Lead payload
    // Setting Email_Verification_Status = "Pending" triggers the CRM verification email workflow
    const leadPayload = {
      First_Name:  first_name,
      Last_Name:   last_name,
      Email:       email,
      Mobile:      phone   || "",
      Company:     company || "",
      Lead_Source: existingLeadId ? undefined : "Outbound Proposal",

      // Custom fields — confirmed in org 5811789
      Email_Verification_Status: "Pending",
      Pricing_Status:            "Pending Verification",

      // Custom fields — likely present (from spec)
      // Outbound_Inbound: "Outbound",
      // Lead_Source_Detail: current_url || "",
    };

    // Remove undefined keys (e.g. Lead_Source when updating)
    Object.keys(leadPayload).forEach(k => leadPayload[k] === undefined && delete leadPayload[k]);

    // Proposal_ID: add if provided and field exists
    if (proposal_id) leadPayload.Proposal_ID = proposal_id;

    let crmRes, action;

    if (existingLeadId) {
      // Update existing Lead
      crmRes = await fetch(`${CRM_BASE}/Leads/${existingLeadId}`, {
        method:  "PUT",
        headers: crmHeaders(token),
        body:    JSON.stringify({ data: [leadPayload] }),
      });
      action = "updated";
    } else {
      // Create new Lead
      leadPayload.Lead_Status = "No Contactado";
      crmRes = await fetch(`${CRM_BASE}/Leads`, {
        method:  "POST",
        headers: crmHeaders(token),
        body:    JSON.stringify({ data: [leadPayload] }),
      });
      action = "created";
    }

    const crmData = await crmRes.json();
    const record  = crmData.data?.[0];

    if (!crmRes.ok || record?.status === "error") {
      console.error("[pricing-unlock] CRM error:", JSON.stringify(crmData));
      return sendJson(res, 500, { error: "CRM operation failed", detail: record?.message || crmData }, origin);
    }

    const resolvedLeadId = existingLeadId || record?.details?.id;
    console.log("[pricing-unlock] Lead", action, ":", resolvedLeadId, "email:", email);

    return sendJson(res, 200, {
      success: true,
      action,
      lead_id: resolvedLeadId,
    }, origin);

  } catch (err) {
    console.error("[pricing-unlock] Error:", err.message);
    return sendJson(res, 500, { error: "Internal server error", detail: err.message }, origin);
  }
};
