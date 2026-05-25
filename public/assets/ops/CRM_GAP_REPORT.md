# Zoho CRM Gap Report
**Audited:** 2026-05-24  
**Audited by:** Live inspection via Zoho CRM MCP (workflow rules API)

---

## Org identification

| MCP tool | Org prefix | Status |
|---|---|---|
| `mcp__2cbf259c` (workflow rules) | `5811789` | ✅ Correct Arumaldo production org |
| `mcp__4a1d44cb` (records / COQL) | `2931041` | ❌ Different org — not Arumaldo production |

The COQL query tool is connected to a different Zoho organization. All field verification below is based on evidence from the workflow rules tool, which IS in the correct org. Direct field queries cannot be run via COQL against this org.

---

## What is confirmed live in org `5811789`

### Custom fields — Leads module

| Field | API name | ID | Confirmed via |
|---|---|---|---|
| Email Verification Status | `Email_Verification_Status` | `5811789000004842055` | Workflow rule criteria |
| Payment Status | `Payment_Status` | `5811789000004839027` | Workflow rule criteria |
| Demo Expires At | `Demo_Expires_At` | `5811789000004825017` | Workflow rule date trigger |
| Pricing Status | `Pricing_Status` | (referenced in field_updates) | Workflow rule action |

### Custom fields — Deals module

| Field | API name | ID | Confirmed via |
|---|---|---|---|
| Intake Status | `Intake_Status` | `5811789000004845031` | Workflow rule criteria |

### Workflow rules — Leads (8 active Arumaldo rules)

| Rule name | Trigger | Action | Status |
|---|---|---|---|
| Build Checkout URL on Lead Create | Lead created | Calls `Build Checkout URL` Deluge function | ✅ Active |
| Email Verified - Unlock Pricing | `Email_Verification_Status` = "Verified" | Sets Lead_Status = Email Verified; Pricing_Status = Unlocked | ✅ Active |
| Payment Paid - Lead Status Update | `Payment_Status` = "Paid" | Sets Lead_Status to "Paid Ready to Convert" | ✅ Active |
| Payment Failed - Lead Status Update | `Payment_Status` field update | Sets Lead_Status to failed status | ✅ Active |
| Demo Expired - Lead Status Update | `Demo_Expires_At` date reached | Updates Lead_Status | ✅ Active |
| Payment Completed - Notify Internal Team | `Payment_Status` = "Paid" | Sends "Payment Received - Internal Notification" email | ✅ Active |
| Payment Completed - Send Customer Intake Form | `Payment_Status` = "Paid" | Sends "Payment Received - Customer Intake Form" email | ✅ Active |
| Lead Pago Confirmado - Convertir | Lead_Status = "Contactado" | Converts Lead → Contact + Account | ⚠️ Misconfigured (see gaps) |

### Workflow rules — Deals (1 active Arumaldo rule)

| Rule name | Trigger | Action | Status |
|---|---|---|---|
| Intake Complete → Set Stage | `Intake_Status` field update | Updates Deal Stage | ✅ Active |

### Email notifications confirmed

| Template name | ID |
|---|---|
| Payment Received - Internal Notification | `5811789000004857001` |
| Payment Received - Customer Intake Form | `5811789000004836010` |

### Functions confirmed

| Function name | ID |
|---|---|
| Build Checkout URL | `5811789000004819001` |

---

## Gaps — Fix required before outbound pilot

### 🔴 Critical — Must fix before any lead processes

**1. "Lead Pago Confirmado - Convertir" rule is misconfigured**  
- Current trigger: `Lead_Status = "Contactado"`
- Required trigger: `Lead_Status = "Pago Confirmado"` (or `Payment_Status = "Paid"`)
- Impact: Any time a lead is marked "Contactado" it auto-converts — this fires prematurely in the sales flow, before payment.
- Fix: Update the rule criteria to trigger on `Payment_Status = "Paid"` (consistent with the Payment Paid rule) OR add "Pago Confirmado" as a lead status value and update the trigger accordingly.
- The rule's own description says: *"will update to Pago Confirmado once picklist value is added"*

---

### 🟡 Important — Needed for full automation (pilot can proceed manually without these)

**2. Missing workflow: Email verification send**  
- When a lead submits the pricing unlock form, the CRM should automatically send a verification email.
- No rule exists for this trigger. Must be built or handled manually in pilot.

**3. Missing workflow: Inbound lead auto-response**  
- When a lead submits the website proposal form, no auto-acknowledgment rule exists.
- Pilot can handle manually (send Template 05 manually after receiving form submission).

**4. Missing workflow: 48-hour intake form reminder**  
- Per Phase 8 spec: if Intake_Status ≠ Submitted 48h after payment, send reminder email.
- No scheduled rule found.

**5. Missing workflow: Abandoned payment follow-up**  
- Per Phase 8 spec: follow-up on leads who clicked payment but did not complete.
- No rule found.

---

### 🟠 Unverified — Cannot confirm via available tools (COQL points to wrong org)

These fields and configurations are listed in the Phase 2 spec and task history as completed, but cannot be verified directly because the COQL query tool connects to a different Zoho org. **Assume these MAY be missing until confirmed by manual inspection in Zoho CRM UI or a correctly-connected query tool.**

**Lead fields not confirmed:**
- `Channel` (picklist: WhatsApp, Email, LinkedIn, Referral, Cold)
- `Language` (picklist: EN, ES)
- `Outbound_Inbound` (picklist: Outbound, Inbound)
- `Proposal_ID` (text or autonumber)
- `Proposal_URL` (URL)
- `Demo_URL` (URL)
- `Lead_Source_Detail` (text)
- `Verified_Email` (checkbox, distinct from Email_Verification_Status)

**Deal fields not confirmed:**
- `Package` (picklist: One-Page Professional, Multi-Page Corporate)
- `Hosting_Plan` (picklist: Monthly, Yearly)
- `DNS_Implementation` (checkbox or picklist)
- `WCR_Subscription` (checkbox or picklist)
- `Proposal_ID` (text)
- `Proposal_Generation_Prompt` (large text)
- `Proposal_URL` (URL)
- `Demo_URL` (URL)

**Lead statuses not confirmed:**  
Referenced in rules: "No Contactado", "Contactado", "Email Verified", "Pago Confirmado" (pending), "Paid Ready to Convert". Full 13-value set per spec not confirmed.

**Deal stages not confirmed:**  
13 Arumaldo-specific deal stages from Phase 2 spec not confirmed.

**Other configurations not confirmed:**
- CRM webform mappings (proposal request form → Leads, intake form → Deals)
- Field visibility and required-field-by-stage configuration
- Company vs personal purchase fields on Deals/Contacts
- Account/Contact custom fields

---

## Recommended action sequence

1. **Immediately**: Fix the "Lead Pago Confirmado - Convertir" rule — change trigger from `Lead_Status = "Contactado"` to `Payment_Status = "Paid"`.
2. **Before automation**: Log into Zoho CRM UI → Setup → Leads → Fields — verify all custom fields exist. Cross-reference against the unverified list above.
3. **Before automation**: Log into Zoho CRM UI → Setup → Deals → Fields — verify all custom fields exist.
4. **Before automation**: Confirm Lead Status picklist values (Setup → Leads → Fields → Lead Status) match the 13-value spec.
5. **Before automation**: Confirm Deal Stage values (Setup → Deals → Fields → Stage) match the 13 Arumaldo stages.
6. **Before full automation**: Build missing workflows (email verification send, inbound auto-response, 48h intake reminder, abandoned payment).

---

## Pilot readiness assessment

With the "Lead Pago Confirmado - Convertir" fix, the CRM is functional enough to support a **manual outbound pilot**:

| Capability | Status | Notes |
|---|---|---|
| Lead gets created when form submitted | 🟡 Partial | Webform mapping not confirmed; create manually |
| Payment link sends | ✅ Ready | Zoho Billing links built in Phase 3 |
| Payment triggers intake email | ✅ Ready | "Payment Completed - Send Customer Intake Form" rule live |
| Internal payment notification | ✅ Ready | "Payment Completed - Notify Internal Team" rule live |
| Intake completion moves deal stage | ✅ Ready | "Intake Complete → Set Stage" rule live |
| Demo expiry auto-updates status | ✅ Ready | "Demo Expired - Lead Status Update" rule live |
| Lead auto-converts after payment | ⚠️ Fix first | Misconfigured trigger — see Gap #1 |
| Email verification flow | ❌ Manual only | Missing verification send rule |
| Inbound form auto-response | ❌ Manual only | No auto-reply rule |
