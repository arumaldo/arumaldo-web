# Arumaldo — Manual Fulfillment Workflow

This document defines the end-to-end operational process for every website project, from payment confirmation through post-launch. Follow each step in sequence. All client communication uses the corresponding email templates in `assets/emails/08_EMAIL_TEMPLATES.md`.

---

## Overview: Project Lifecycle

```
Payment Confirmed
       ↓
[1] Intake Review
       ↓
[2] Internal Build Brief
       ↓
[3] Website Build
       ↓
[4] Preview Delivery
       ↓
[5] Change Round 1 (if requested)
       ↓
[6] Change Round 2 (if requested)
       ↓
[7] Final Approval
       ↓
[8] DNS Setup
       ↓
[9] Launch
       ↓
[10] Post-Launch (Change Requests, upsells)
```

---

## 1. Intake Review Checklist

**Trigger**: Customer submits the post-payment intake form (`assets/forms/onboarding-questionnaire.html`).

**When to start**: Immediately upon receiving intake form submission notification from CRM. Do not start the build until this checklist is fully green.

### 1.1 Business Information — Verify All Present

- [ ] Business name
- [ ] Industry / type of business
- [ ] Target audience description
- [ ] Unique value proposition or key differentiators
- [ ] Services or products offered (with descriptions)
- [ ] Physical address (if brick-and-mortar)
- [ ] Phone number
- [ ] Email address
- [ ] Social media handles (if any)

### 1.2 Content — Verify All Present

- [ ] Primary headline / tagline (or confirmed that Arumaldo will write one)
- [ ] About / company story text
- [ ] Services/offerings text with descriptions and prices (if applicable)
- [ ] Call-to-action copy (or confirmed default)
- [ ] Contact section preference (form, phone, WhatsApp, email)
- [ ] Footer content (tagline, copyright name)

### 1.3 Brand Assets — Verify Uploads or Alternatives

- [ ] Logo file uploaded (SVG or PNG preferred; JPG accepted)
  - If no logo: note in build brief — use text logo or request design add-on
- [ ] Brand colors provided (hex codes or reference site)
  - If none: note "derive from logo" or use Arumaldo defaults
- [ ] Brand fonts provided (or confirmed none — Arumaldo selects)
- [ ] Reference websites listed (1–3 sites customer likes)
- [ ] Additional images uploaded (hero, team, products, etc.)
  - If none: note — use royalty-free stock from Unsplash/Pexels; disclose per agreement Section 6.4

### 1.4 Domain & Hosting

- [ ] Domain name confirmed (existing domain or new purchase?)
  - If new: advise customer to register before launch
- [ ] Domain registrar identified (GoDaddy, Namecheap, Cloudflare, Google Domains, etc.)
- [ ] DNS implementation preference: Self-configure (free) or Arumaldo does it ($100)
  - If Arumaldo: flag for DNS Implementation step; issue $100 add-on invoice

### 1.5 Package & Scope Confirmation

- [ ] Package confirmed: One-Page Professional or Multi-Page Corporate
- [ ] If Multi-Page: list of pages confirmed (max 6 pages)
- [ ] Commerce add-on: yes / no
  - If yes: commerce scope confirmed in proposal; payment processor identified
- [ ] WCR subscription: already purchased or to be offered post-launch
- [ ] Any out-of-scope requests noted: ________________________

### 1.6 Flag and Resolve Before Building

If any required item is missing:
1. Reply to customer within 1 business day identifying missing items.
2. Use the following script (adapt as needed):

> Hi [Name], thanks for submitting your intake form — we're ready to get started! Before we begin the build, we need a few more items: [list]. Please send these over when you can and we'll kick off right away.

3. **Do not start the build until all content essentials are received.**
4. Update CRM deal field "Intake Status" → `Incomplete` until resolved, then → `Complete`.

---

## 2. Internal Build Brief

**Trigger**: Intake review checklist fully complete. Create this brief before opening any editor.

**File naming**: `[ProjectID]_build-brief.md` — store in project folder in WorkDrive (or local equivalent).

### Build Brief Template

```
PROJECT: [Customer Business Name]
DEAL ID: [Zoho CRM Deal ID]
PROPOSAL ID: [pid from proposal URL]
DATE STARTED: [YYYY-MM-DD]
PACKAGE: [ ] One-Page Professional  [ ] Multi-Page Corporate
COMMERCE: [ ] Yes  [ ] No
DNS: [ ] Self-configure  [ ] Arumaldo ($100 invoiced: Y/N)

--- PAGES ---
1. [Page name / section]
2. [Page name / section]
3. (add as needed)

--- DESIGN DIRECTION ---
Style: [Derived from reference sites and brand assets]
Primary color: [hex]
Accent color: [hex]
Font preference: [Customer provided / Arumaldo selects]
Logo: [Uploaded / Text logo / TBD]
Imagery: [Customer provided / Stock — sources: ]

--- COPY NOTES ---
Headline: [Customer text / Arumaldo writes]
Services: [List with short descriptions]
CTA: [Text and destination]
Special requirements: [Any specific language, tone, or content requests]

--- REFERENCE SITES ---
1. [URL] — [What customer likes about it]
2. [URL]
3. [URL]

--- SCOPE NOTES ---
Out-of-scope items flagged: [Any requests outside package]
Commerce scope (if applicable): [Booking flow / service listings / subscriptions]

--- TIMELINE ---
Intake received: [date]
Build target: [date — 7–14 business days from intake]
Round 1 review deadline: [date]
```

### Design Selection Rules

| Situation | Action |
|-----------|--------|
| Customer provided hex colors + logo | Match palette to brand |
| Customer provided reference sites only | Extract dominant palette from references |
| No brand assets at all | Use Arumaldo default palette (cave/green/sun/paper) |
| Customer fonts provided | Use those fonts (confirm web license) |
| No font preference | Default: Fraunces (headings) + Inter (body) |
| Hero image provided | Use customer image |
| No images provided | Stock from Unsplash/Pexels — document sources for disclosure |

---

## 3. Manual Website Build Process

**Trigger**: Build brief complete and approved internally.

### 3.1 Setup

1. Create project folder: `[ProjectID]-[BusinessSlug]/`
2. Copy base template:
   - One-Page: start from `assets/templates/` or build fresh (preferred for custom feel)
   - Multi-Page: scaffold all pages with consistent nav/footer before filling content
3. Open reference sites and build brief side-by-side.

### 3.2 Build Order

Build sections in this order for efficiency:

1. **Design tokens first** — Set CSS variables (colors, fonts, spacing) before adding content. Changes to tokens update everywhere.
2. **Navigation** — Desktop + mobile hamburger, all page links confirmed.
3. **Hero section** — Headline, subheadline, CTA. This is the highest-impact section; spend time here.
4. **Services / Offerings** — Cards or list with descriptions.
5. **About / Story** — Text + photo if available.
6. **Social proof** — Testimonials or client logos if provided.
7. **Process / How it works** — If package or customer includes it.
8. **Contact section** — Form, phone, WhatsApp button, address.
9. **Footer** — Logo, links, copyright.
10. **Commerce section** (if applicable) — Booking widget, service listings, payment integration.

### 3.3 Quality Standards — Must Pass Before Preview

Every build must pass these checks before a preview link is shared:

**Content**
- [ ] All placeholder text removed (no "Lorem ipsum", no "[Business Name]" literals)
- [ ] All phone numbers, emails, and addresses are real values from intake form
- [ ] CTA buttons link to correct destination (form, phone, WhatsApp, booking)
- [ ] All prices match intake form exactly

**Design**
- [ ] Consistent type scale throughout (no random font sizes)
- [ ] Color palette matches brand or approved direction
- [ ] Logo displays correctly at all sizes
- [ ] All images load and display correctly (no broken image icons)
- [ ] Spacing feels intentional — no cramped or oversized gaps

**Responsive**
- [ ] Tested at 375px (mobile), 768px (tablet), 1280px+ (desktop)
- [ ] No horizontal scroll on any viewport
- [ ] Mobile navigation works (hamburger opens/closes, links navigate)
- [ ] Touch targets are 44px+ minimum on mobile
- [ ] Text does not overflow containers on any screen size

**Performance**
- [ ] All images compressed (WebP preferred; max 200KB per image)
- [ ] No console errors
- [ ] Page loads in under 3 seconds on a simulated 3G connection

**Accessibility**
- [ ] All images have descriptive alt text
- [ ] All interactive elements reachable by keyboard
- [ ] Color contrast passes 4.5:1 for body text
- [ ] Form labels are visible (not placeholder-only)

**Analytics**
- [ ] PageSense script installed per project (or PAGESENSE_EMBED_PLACEHOLDER left and flagged)
- [ ] `data-goal` attributes on all CTA buttons
- [ ] Proposal ID (pid) wired up if applicable

### 3.4 Hosting Setup

1. Deploy to staging URL on Arumaldo managed hosting.
2. Confirm SSL certificate issued (HTTPS).
3. Confirm daily backup configured.
4. Note staging URL for preview delivery.

---

## 4. Preview Delivery Process

**Trigger**: Build passes all quality checks (Section 3.3).

### Steps

1. Confirm staging URL is accessible from an incognito browser.
2. Send **Template 10 — Preview Ready** to customer.
   - Variable: `{{preview_url}}` → staging URL
   - Note: template says "Round 1 of 2"
3. Update CRM deal stage → `Preview Delivered`.
4. Update CRM field "Preview Delivered Date" → today.
5. Set internal reminder: if no response in 7 business days, follow up once. If no response in 14 calendar days, trigger deemed acceptance per Agreement Section 9.3.

### Preview Link Guidelines

- Staging URL should not be indexed by search engines (`<meta name="robots" content="noindex">` on preview)
- Link should remain accessible until customer approves and launches
- If using a shared hosting subdomain (e.g., `preview.arumaldo.com/[slug]`), ensure it's password-protected or obscure enough to not be easily guessed

---

## 5. Approval Process

### 5.1 After Each Preview / Change Round

1. Customer reviews and replies with feedback (or "Approved").
2. If feedback: process change round (Section 6 or 7).
3. If "Approved" or equivalent written confirmation: proceed to next step.

### 5.2 Final Approval Before Launch

After the second change round (or after Round 1 if customer is satisfied early):

1. Send **Template 11 — Approval Request** to customer.
2. Wait for explicit written "Approved" or equivalent.
3. Log approval in CRM notes: `"[Date]: Final approval received from [Customer Name]. Proceeding to launch."`
4. **Do not launch without written approval.**

### 5.3 Deemed Acceptance

If customer does not respond after preview delivery:

- Day 7: Send one follow-up email.
- Day 14: Per Agreement Section 9.3, preview is deemed approved. Log in CRM: `"[Date]: No response received after 14 days from preview delivery and follow-up. Proceeding to launch per agreement Section 9.3."`
- Proceed to DNS Setup.

---

## 6. Two Change Rounds Process

**Included**: 2 rounds of revisions before launch at no additional cost.

### What Counts as a Change Round

A "change round" = **one batch of revision requests submitted together in a single email or communication**. The customer sends a numbered list; Arumaldo processes all items in that list as Round 1 or Round 2.

Examples of included changes:
- Text edits (headline, paragraph copy, contact details)
- Image swaps
- Color or style adjustments
- Layout reordering
- Section additions within the original agreed scope
- CTA text or link changes

NOT included in a change round (out of scope, quote separately):
- Adding new pages beyond the agreed package
- Major structural redesigns
- New features not in the original proposal
- Commerce integration if not originally proposed

### Round 1 Process

1. Customer sends feedback via email reply to Template 10.
2. Review all requests against scope. Flag any out-of-scope items immediately.
3. Implement all in-scope changes.
4. Re-run the quality checklist (Section 3.3) for affected sections.
5. Update staging URL.
6. Send updated preview link:
   - Use a brief email: "Hi [Name], I've applied all your Round 1 changes. Here's the updated preview: [URL]. Take a look and let me know if you'd like any further adjustments or if you're ready to approve for launch."
   - Note: "This is Round 2 of 2 — your final included change round."
7. Update CRM deal field "Change Rounds Used" → `1`.

### Round 2 Process

1. Customer sends Round 2 feedback.
2. Implement all in-scope changes.
3. Re-run quality checklist for affected sections.
4. Send updated preview link with approval request (or send Template 11 directly).
5. Update CRM: "Change Rounds Used" → `2`.
6. **After Round 2, no further changes are included.** Additional changes → Change Request process (Section 7).

### Early Approval

If customer is satisfied after Round 1 (or even before any changes), skip to the Approval Process (Section 5.2). Unused change rounds do not carry over post-launch.

---

## 7. Additional Change Request Process

**Applies to**: Changes requested after the two included rounds OR changes requested post-launch.

### Pricing (from Agreement Section 4.3)

| Option | Price | What's Included |
|--------|-------|-----------------|
| Per Change Request | $50.00 | 1 discrete task |
| WCR Monthly | $99/month | 5 change requests/month |
| WCR Annual | $999/year | 5 change requests/month |

**A "Change Request" = one discrete task** (e.g., "update phone number", "replace hero image", "change CTA button text").

### Pre-Launch Additional Changes

If a customer exhausts both change rounds before launch:

1. Inform customer: "We've used both included change rounds. Any further changes before launch are billed at $50 per request, or you can subscribe to the Change Request Service."
2. Issue add-on invoice via Zoho Billing (item: ARU-CR-ADD, $50) or provide WCR subscription link.
3. Wait for payment confirmation before implementing.
4. Implement change, update preview, send updated link.

### Post-Launch Change Requests

1. Customer emails a change request (single task per email, or numbered list).
2. Count tasks. Clarify if ambiguous: "I count X change requests here — want to confirm before I invoice?"
3. If customer has active WCR subscription: deduct from their monthly allowance. Implement immediately.
4. If no WCR subscription: issue invoice for $50 × number of tasks. Wait for payment.
5. Implement after payment confirmed.
6. Deploy to live site.
7. Notify customer: "Done — your changes are live at [domain]."
8. Update CRM notes.

### WCR Subscription Management

- Track monthly usage in CRM (deal/account notes or custom field).
- If customer hits 5 requests before month end: notify them, offer additional at $50 each or upgrade.
- Unused requests do NOT roll over per Agreement Section 4.4.
- Subscription auto-renews via Zoho Billing until cancelled.

---

## 8. DNS Instruction Process

**Trigger**: Customer approves the site and is ready for launch. DNS configuration is needed to point their domain to Arumaldo hosting.

### Gather Required DNS Values

Before sending instructions, collect the following from your hosting panel:

| Record | Type | Name/Host | Value |
|--------|------|-----------|-------|
| Root domain | A | @ | [Server IP address] |
| www subdomain | CNAME | www | [Hosting alias or IP] |
| (Optional) email MX | MX | @ | [Customer's email provider MX records — do not touch if already set] |

⚠️ **Never delete existing MX records.** Only add or update A and CNAME records unless customer explicitly requests email migration.

### Self-Configure Option (Free)

1. Send **Template 12 — DNS Instructions** to customer.
2. Fill in actual DNS record values for their specific hosting slot.
3. Instruct customer to:
   - Log into their domain registrar
   - Navigate to DNS settings
   - Add/update the A record and CNAME record as specified
4. Inform customer: DNS propagation can take up to 48 hours; the site will appear live gradually.
5. Monitor: check `https://[domain]` every few hours; SSL should auto-provision once DNS resolves.

### Troubleshooting Self-Configure

Common issues:

| Issue | Likely Cause | Fix |
|-------|-------------|-----|
| Site still showing registrar page after 24h | Old records still in place | Confirm customer deleted old A records before adding new one |
| SSL not issuing after DNS resolves | Propagation still in progress | Wait full 48h; if still failing, check hosting panel SSL status |
| www redirects but @ doesn't (or vice versa) | Only one record updated | Confirm both A (@) and CNAME (www) were added |
| DNS shows "pending" in registrar | Registrar-side propagation delay | Normal — wait |

---

## 9. Paid DNS Implementation Process

**Trigger**: Customer opts for Arumaldo to configure DNS ($100 fee).

### Prerequisites

- [ ] DNS Implementation invoice (ARU-DNS-IMP, $100) issued via Zoho Billing.
- [ ] Payment confirmed.
- [ ] Customer has granted access to domain registrar account.

⚠️ **Security note**: Never ask customer to share registrar credentials via email. Use a secure method: ask them to create a separate collaborator/invite access if their registrar supports it (most do: GoDaddy, Namecheap, Cloudflare). If not, use a secure note tool or a brief screen share call.

### Steps

1. Log in to customer's domain registrar.
2. Navigate to DNS Management for the relevant domain.
3. **Document current DNS settings before making any changes** (screenshot or paste into CRM notes).
4. Add/update records:

   ```
   Type: A
   Host/Name: @
   Value: [Arumaldo hosting IP]
   TTL: 3600 (or lowest available)

   Type: CNAME
   Host/Name: www
   Value: [Arumaldo hosting alias]
   TTL: 3600
   ```

5. **Do not modify MX records** unless customer explicitly requested email setup.
6. Save changes.
7. Log out of registrar.
8. Notify customer: "I've updated the DNS records. Propagation takes up to 48 hours — your site will come online during that window. I'll confirm once it's fully live."
9. Monitor DNS propagation (use `dnschecker.org` or `dig +short [domain] A`).
10. Once fully propagated and SSL is active, proceed to Launch Handoff (Section 10).

---

## 10. Launch Handoff Process

**Trigger**: DNS is configured (self or paid) and site resolves live with active SSL.

### Pre-Launch Final Check

Before confirming launch to customer, verify on the **live domain** (not staging):

- [ ] Site loads at `https://[domain]` (no HTTP redirect issues)
- [ ] SSL certificate valid (green padlock, no warnings)
- [ ] `www.[domain]` redirects correctly to `[domain]` (or vice versa per preference)
- [ ] All images load (no missing assets that were on staging only)
- [ ] All forms submit correctly to endpoint
- [ ] All links functional (no staging URLs hardcoded)
- [ ] Mobile view correct on live URL
- [ ] PageSense tracking fires (check PageSense dashboard for incoming events)

### Post-Launch CRM Updates

1. Update deal stage → `Launched`.
2. Update deal field "Launch Date" → today.
3. Update deal field "Live URL" → `https://[domain]`.
4. Update deal field "Hosting Status" → `Active`.
5. Note in CRM: `"Site launched at [domain] on [date]. SSL active. DNS configured by [Arumaldo/Customer]."`

### Launch Communication

1. Send **Template 13 — Launch Confirmation** to customer.
   - Variables: `{{first_name}}`, `{{domain}}`, `{{wcr_monthly_url}}`
2. Post a congratulatory message on WhatsApp (Panama clients) if applicable.

### Activate Hosting Subscription

- Confirm hosting subscription is active in Zoho Billing (should have started at payment, auto-renewing).
- If hosting was set to start at launch: activate now.
- Customer's billing period begins from launch date.

---

## 11. Post-Launch Change Request Process

**Trigger**: Any change request received after the site is confirmed live.

### Intake

Customer sends a change request via email (or WhatsApp for Panama clients). A complete change request includes:

- What needs to change (specific element or section)
- What the new content/design should be (text, image, link, etc.)
- Any reference if applicable (screenshot, reference URL)

### Triage

1. Is the request within the scope of a Change Request (a single discrete task)?
   - **Yes**: Proceed with billing and implementation.
   - **Ambiguous**: Clarify scope before invoicing. Example: "Update the Services section" could mean 1 request (rewrite copy) or 5 requests (change all service descriptions individually). Align with customer first.

2. Is the request actually a new feature or new page?
   - **Yes**: This is out-of-scope. Provide a custom quote per Agreement Section 10.2.

### Billing

- Customer on **WCR subscription**: Deduct from monthly allowance. Implement immediately if allowance available.
- Customer **not on subscription**:
  1. Confirm number of tasks.
  2. Issue invoice: ARU-CR-ADD ($50) × number of tasks.
  3. Wait for payment confirmation.
  4. Implement after payment.

### Implementation

1. Make changes on the live site (or on a local copy, then deploy).
2. For visual changes: take a before screenshot first (for reference and CRM record).
3. Implement change.
4. Verify on live site at `https://[domain]`.
5. Confirm no regressions (adjacent sections, mobile view).

### Delivery

Reply to customer: "Done — your changes are live. Here's a look: [link to specific section or full URL]."

### CRM Update

- Log note: `"[Date]: Change Request — [description of change]. Billed: [invoice # or WCR deduction]. Implemented and confirmed live."`
- If customer is on WCR: update "WCR Requests Used This Month" field.

---

## Appendix A: CRM Deal Stage Reference

| Stage | Meaning |
|-------|---------|
| Proposal Sent | Locked or unlocked proposal delivered |
| Pricing Unlocked | Email verified; full pricing visible |
| Payment Received | Zoho Billing confirms payment |
| Intake Pending | Awaiting intake form submission |
| Intake Received | Intake form submitted; review in progress |
| In Build | Build actively in progress |
| Preview Delivered | Preview link sent to customer |
| Change Round 1 | Round 1 feedback received; implementing |
| Change Round 2 | Round 2 feedback received; implementing |
| Awaiting Approval | Approval request sent; waiting for written OK |
| DNS Pending | Awaiting DNS configuration |
| Launched | Site live at customer domain |
| Post-Launch Active | Active hosting; change requests handled as needed |
| Churned | Hosting cancelled; site taken offline |

---

## Appendix B: Key Zoho Billing Items Reference

| Item | SKU | Price | Use |
|------|-----|-------|-----|
| One-Page Professional | ARU-WEB-1P | $1,500 one-time | Initial payment |
| Multi-Page Corporate | ARU-WEB-MP | $2,500 one-time | Initial payment |
| Hosting Monthly | ARU-HOST-M | $30/mo | Mandatory hosting |
| Hosting Annual | ARU-HOST-Y | $300/yr | Mandatory hosting |
| WCR Monthly | ARU-WCR-M | $99/mo | Change Request Service |
| WCR Annual | ARU-WCR-Y | $999/yr | Change Request Service |
| Additional Change Request | ARU-CR-ADD | $50 | Per extra change |
| DNS Implementation | ARU-DNS-IMP | $100 | Arumaldo configures DNS |

---

## Appendix C: Communication Channel Quick Reference

| Customer Location | Primary Channel | Language | Template Style |
|-------------------|-----------------|----------|----------------|
| Panama | WhatsApp | Spanish (tuteo) | Warm, conversational |
| USA | Email | English | Professional, concise |
| Other Latin America | WhatsApp or Email | Spanish | Warm, adapt to country |
| Other English-speaking | Email | English | Professional, concise |

See Template 16 (Panama) and Template 17 (USA) in `assets/emails/08_EMAIL_TEMPLATES.md` for full channel guidelines.

---

*Arumaldo · arumaldo.com*
