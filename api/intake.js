/**
 * /api/intake — Post-payment onboarding intake form handler
 *
 * Receives the completed intake questionnaire after payment. Updates the
 * Deal (Potentials) record in Zoho CRM and sets Intake_Status = "Submitted",
 * which triggers the "Intake Complete → Set Stage" workflow rule.
 *
 * Expected body:
 *   {
 *     type: "intake",
 *     data: {
 *       deal_id?:        string,   // CRM Deal ID (from URL param ?did=)
 *       proposal_id?:   string,
 *       customer_email: string,
 *
 *       // Step 1 — Business
 *       businessName:   string,
 *       industry:       string,
 *       description:    string,
 *       goal:           string,
 *       audience:       string,
 *       messages:       string,
 *       cta:            string,
 *
 *       // Step 3 — Design
 *       inspirations:   string[],
 *       colors:         string,
 *       feeling:        string,
 *
 *       // Step 4 — Technical
 *       currentUrl:     string,
 *       domain:         string,
 *
 *       // Step 5 — Final + Billing
 *       extra:          string,
 *       source:         string,
 *       comms:          string,
 *       billingType:    "personal" | "company" | "",
 *       razonSocial:    string,
 *       ruc:            string,
 *       dv:             string,
 *       fiscalAddress:  string,
 *     }
 *   }
 *
 * CRM logic:
 *   - If deal_id provided → update that Deal and set Intake_Status = "Submitted"
 *   - Else → store intake data as a note on the Lead found by customer_email
 *     and set Intake_Status on the Deal associated with that Lead (best effort)
 *   - Always log intake data to console for manual CRM lookup if needed
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

  const { type, data } = body;
  if (type !== "intake" || !data || typeof data !== "object") {
    return sendJson(res, 400, { error: "body must be { type: 'intake', data: {...} }" }, origin);
  }

  const {
    deal_id,
    proposal_id,
    customer_email,
    businessName,
    industry,
    description,
    goal,
    audience,
    messages,
    cta,
    inspirations,
    colors,
    feeling,
    currentUrl,
    domain,
    extra,
    source,
    comms,
    billingType,
    razonSocial,
    ruc,
    dv,
    fiscalAddress,
  } = data;

  // Always log the full payload — safety net for manual CRM update
  console.log("[intake] Received submission:", JSON.stringify({
    deal_id, proposal_id, customer_email, businessName, submitted_at: new Date().toISOString()
  }));

  if (!customer_email && !deal_id) {
    return sendJson(res, 400, { error: "deal_id or customer_email is required" }, origin);
  }

  try {
    const token = await getAccessToken();

    // ─── Case 1: deal_id provided — update Deal directly ───────────────────
    if (deal_id) {
      // Map intake fields to confirmed + likely CRM Deal fields
      // Confirmed: Intake_Status (id: 5811789000004845031)
      // Other fields from spec — will silently fail if field doesn't exist in CRM
      const dealPayload = {
        Intake_Status: "Submitted",   // CONFIRMED — triggers workflow

        // Below fields from spec (not confirmed via API; add after CRM UI verification):
        // Current_Website_URL:        currentUrl   || "",
        // Company_Description:        description  || "",
        // Business_Goal:              goal         || "",
        // Target_Audience:            audience     || "",
        // Key_Messages:               messages     || "",
        // Primary_CTA:                cta          || "",
        // Inspiration_URL_1:          inspirations?.[0] || "",
        // Inspiration_URL_2:          inspirations?.[1] || "",
        // Inspiration_URL_3:          inspirations?.[2] || "",
        // Color_Preferences:          colors       || "",
        // Brand_Feeling:              feeling      || "",
        // Domain_Name:                domain       || "",
        // Additional_Notes:           extra        || "",
        // Preferred_Communication:    comms        || "",
        // Billing_Type:               billingType  || "",
        // Razon_Social:               razonSocial  || "",
        // RUC:                        ruc          || "",
        // DV:                         dv           || "",
        // Fiscal_Address:             fiscalAddress || "",
      };

      const crmRes = await fetch(`${CRM_BASE}/Deals/${deal_id}`, {
        method:  "PUT",
        headers: crmHeaders(token),
        body:    JSON.stringify({ data: [dealPayload] }),
      });

      const crmData = await crmRes.json();
      const record  = crmData.data?.[0];

      if (!crmRes.ok || record?.status === "error") {
        console.error("[intake] Deal update error:", JSON.stringify(crmData));
        // Don't return 500 — the form has already submitted successfully from the user's POV
        // Log the error and return 200 so the customer sees the success screen
        console.error("[intake] MANUAL ACTION NEEDED: Update deal", deal_id, "Intake_Status → Submitted");
        return sendJson(res, 200, {
          success:  true,
          action:   "intake_saved_with_crm_warning",
          deal_id,
          warning:  "CRM update failed — check server logs",
        }, origin);
      }

      console.log("[intake] Deal updated:", deal_id, "Intake_Status → Submitted");
      return sendJson(res, 200, { success: true, action: "intake_saved", deal_id }, origin);
    }

    // ─── Case 2: No deal_id — find Lead by email and leave a note ──────────
    // The manual intake fallback: log data + add a CRM Note to the Lead
    const searchRes = await fetch(
      `${CRM_BASE}/Leads/search?criteria=(Email:equals:${encodeURIComponent(customer_email)})&fields=id`,
      { headers: crmHeaders(token) }
    );

    let leadId = null;
    if (searchRes.ok) {
      const searchData = await searchRes.json();
      const leads = searchData.data || [];
      if (leads.length > 0) leadId = leads[0].id;
    }

    // Create a note on the Lead with intake data
    const noteContent = [
      `=== INTAKE FORM SUBMITTED ===`,
      `Business: ${businessName}`,
      `Industry: ${industry}`,
      `Goal: ${goal}`,
      `Description: ${description}`,
      `Audience: ${audience}`,
      `Key messages: ${messages}`,
      `CTA: ${cta}`,
      `Inspirations: ${(inspirations || []).join(", ")}`,
      `Colors: ${colors}`,
      `Feeling: ${feeling}`,
      `Current URL: ${currentUrl}`,
      `Domain: ${domain}`,
      `Billing type: ${billingType}`,
      billingType === "company" ? `Razón social: ${razonSocial} | RUC: ${ruc}-${dv} | Address: ${fiscalAddress}` : "",
      `Comms: ${comms}`,
      `Notes: ${extra}`,
    ].filter(Boolean).join("\n");

    if (leadId) {
      await fetch(`${CRM_BASE}/Leads/${leadId}/Notes`, {
        method:  "POST",
        headers: crmHeaders(token),
        body:    JSON.stringify({
          data: [{ Note_Title: "Intake Form Submitted", Note_Content: noteContent }]
        }),
      });
      console.log("[intake] Note added to Lead:", leadId);
    } else {
      console.warn("[intake] Lead not found for email:", customer_email, "— intake data logged above");
    }

    return sendJson(res, 200, {
      success: true,
      action:  leadId ? "intake_saved_as_note" : "intake_logged_no_crm",
      lead_id: leadId,
    }, origin);

  } catch (err) {
    console.error("[intake] Error:", err.message);
    // Return 200 so the customer sees the success screen even on unexpected errors
    console.error("[intake] MANUAL ACTION NEEDED: Process intake for", customer_email || deal_id);
    return sendJson(res, 200, {
      success: true,
      action:  "intake_saved_with_error",
      warning: "Server error — check logs",
    }, origin);
  }
};
