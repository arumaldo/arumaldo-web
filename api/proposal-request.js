/**
 * /api/proposal-request — Inbound website proposal form handler
 *
 * Receives JSON from the website's "Request a Proposal" form (EN + ES).
 * Creates a new Lead in Zoho CRM org 5811789.
 *
 * Expected body:
 *   {
 *     type:         "proposal_request",
 *     source:       "website_en" | "website_es",
 *     first_name:   string,
 *     last_name:    string,
 *     email:        string,
 *     phone?:       string,
 *     company?:     string,
 *     package?:     "one-page" | "multi-page" | "",
 *     message?:     string,
 *     submitted_at: ISO timestamp string
 *   }
 */

const { CRM_BASE, getAccessToken, crmHeaders, sendJson } = require("./_zoho");

// Maps the form's "package" picklist value to the CRM Lead_Status value
const PACKAGE_STATUS_MAP = {
  "one-page":   "No Contactado",
  "multi-page": "No Contactado",
  "":           "No Contactado",
};

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || "";

  // Handle CORS pre-flight
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

  const { first_name, last_name, email, phone, company, package: pkg, message, source } = body;

  // Required field validation
  if (!first_name || !last_name || !email) {
    return sendJson(res, 400, { error: "first_name, last_name, and email are required" }, origin);
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return sendJson(res, 400, { error: "Invalid email address" }, origin);
  }

  try {
    const token = await getAccessToken();

    // Build Zoho CRM Lead record
    // Fields confirmed live: Email_Verification_Status, Payment_Status, Demo_Expires_At, Pricing_Status
    // Fields assumed from spec (verify in CRM UI if missing): Channel, Language, Outbound_Inbound
    const leadData = {
      First_Name:   first_name,
      Last_Name:    last_name,
      Email:        email,
      Mobile:       phone  || "",
      Company:      company || "",
      Description:  message || "",
      Lead_Source:  "Website",
      Lead_Status:  PACKAGE_STATUS_MAP[pkg] || "No Contactado",

      // Custom fields — confirmed in org 5811789
      Email_Verification_Status: "Not Verified",
      Pricing_Status:            "Locked",

      // Custom fields — likely present (from spec); will silently fail if missing in CRM
      // Channel:         "Email",         // picklist: WhatsApp, Email, LinkedIn, Referral, Cold
      // Outbound_Inbound: "Inbound",       // picklist: Outbound, Inbound
      // Language:        source === "website_es" ? "ES" : "EN",  // picklist: EN, ES
    };

    const crmRes = await fetch(`${CRM_BASE}/Leads`, {
      method:  "POST",
      headers: crmHeaders(token),
      body:    JSON.stringify({ data: [leadData] }),
    });

    const crmData = await crmRes.json();
    const record  = crmData.data?.[0];

    if (!crmRes.ok || record?.status === "error") {
      console.error("[proposal-request] CRM error:", JSON.stringify(crmData));
      return sendJson(res, 500, { error: "CRM create failed", detail: record?.message || crmData }, origin);
    }

    const leadId = record?.details?.id;
    console.log("[proposal-request] Lead created:", leadId, "source:", source, "email:", email);

    return sendJson(res, 200, {
      success: true,
      action:  "lead_created",
      lead_id: leadId,
    }, origin);

  } catch (err) {
    console.error("[proposal-request] Error:", err.message);
    return sendJson(res, 500, { error: "Internal server error", detail: err.message }, origin);
  }
};
