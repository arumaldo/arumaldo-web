# Arumaldo — QA & Launch Checklist

This document defines every test that must pass before the first paying pilot. Tests are ordered by the outbound path first (the initial launch route), followed by inbound, then supporting infrastructure.

Each test section lists its **prerequisites** — infrastructure that must be live before the test can be executed. Tests marked 🔴 cannot run until those prerequisites are met. Tests marked 🟡 can be partially verified now. Tests marked 🟢 can be run today.

---

## Infrastructure Prerequisites Map

Before any live testing begins, the following must be deployed. This table summarizes the build state at time of writing.

| Prerequisite | Status | Blocks |
|---|---|---|
| Zoho CRM — Lead/Deal fields created | ⬜ Not started | T-02, T-03, T-04, T-05, T-08, T-09, T-10 |
| Zoho CRM — Lead statuses + deal stages | ⬜ Not started | T-02, T-05, T-09 |
| Zoho CRM — Workflow rules (email verification, notifications) | ⬜ Not started | T-03, T-04, T-05, T-08 |
| Zoho CRM — Email templates loaded | ⬜ Not started | T-03, T-04, T-05, T-07, T-08 |
| Vercel Function — Proposal request endpoint | ⬜ Not started | T-05, T-06 |
| Vercel Function — Pricing unlock endpoint | ⬜ Not started | T-03, T-04 |
| Vercel Function — Intake form endpoint | ⬜ Not started | T-08 |
| PageSense — Projects created + embed codes installed | ⬜ Not started | T-06 |
| Zoho Billing — Payment links live | ✅ Done (Phase 3) | T-07 |
| Proposal template live on hosting | ⬜ Not started | T-01, T-03 |
| Demo template live on hosting | ⬜ Not started | T-06 |
| /thank-you page live on arumaldo.com | ⬜ Not started | T-07 |
| Intake form live on hosting | ⬜ Not started | T-08 |

> **Fast path to first pilot**: Items needed for a minimum outbound test with a real prospect: proposal template hosted + payment links (already done) + intake form hosted. CRM and Workers can be replaced temporarily by manual processes (see Section 12 — Manual Override Procedures).

---

## Test Groups

| # | Test Group | Path | Priority |
|---|---|---|---|
| T-01 | Outbound initial message + proposal delivery | Outbound | 🔥 Critical |
| T-02 | Pricing unlock flow | Outbound | 🔥 Critical |
| T-03 | Email verification | Outbound | 🔥 Critical |
| T-04 | Unlocked proposal delivery | Outbound | 🔥 Critical |
| T-05 | Inbound lead flow | Inbound | High |
| T-06 | Proposal and demo analytics (PageSense) | Both | Medium |
| T-07 | Payment links + success redirect | Both | 🔥 Critical |
| T-08 | Intake form submission + CRM conversion | Post-payment | 🔥 Critical |
| T-09 | CRM full conversion check | Both | High |
| T-10 | Abandoned payment chat trigger | Both | Medium |
| T-11 | Production checklist dry run | Pre-launch | 🔥 Critical |
| T-12 | First pilot | Launch | 🔥 Critical |

---

## T-01 — Outbound Initial Message + Proposal Delivery

**Prerequisite**: Proposal template hosted at a reachable URL with correct URL params.
**Status**: 🟡 Partial — proposal template built; hosting not yet deployed.

### Setup

1. Host `assets/templates/proposal.html` at a stable URL via Vercel (e.g., `https://arumaldo.com/p/` or a Vercel preview URL).
2. Generate a test proposal URL with all required params:
   ```
   https://[host]/p/proposal.html?type=outbound&state=locked&lang=en&pid=TEST-001&name=Test+Client
   ```
3. Open the URL in a private browser window. Confirm:
   - [ ] Page loads without errors
   - [ ] "Proposal #TEST-001" renders in the header
   - [ ] Client name displays correctly
   - [ ] All sections render (About, Timeline, Package, Pricing locked)
   - [ ] Pricing is blurred/hidden in locked state
   - [ ] "Unlock Pricing" CTA is visible and clickable
   - [ ] Page is mobile-responsive (test at 375px)
   - [ ] No broken images or missing icons

### Outbound Message Test (Panama — WhatsApp)

1. Open Template 01 (Panama variant) from `assets/emails/08_EMAIL_TEMPLATES.md`.
2. Fill in test variables (first name, business name, proposal URL).
3. Send to yourself on WhatsApp.
4. Confirm:
   - [ ] Message renders without broken formatting
   - [ ] Proposal link is tappable and opens correctly on mobile
   - [ ] Tone and length feel right for WhatsApp

### Outbound Message Test (USA — Email)

1. Open Template 01 (USA variant).
2. Fill in test variables.
3. Send from your work email to a test inbox.
4. Confirm:
   - [ ] Subject line renders correctly
   - [ ] Body reads well on desktop and mobile email client
   - [ ] Proposal link is clickable and opens correctly
   - [ ] No spam filter issues (test with mail-tester.com if uncertain)

**Pass criteria**: Proposal URL opens, renders correctly, locked state is working, CTA is visible.

---

## T-02 — Pricing Unlock Flow

**Prerequisites**: Pricing unlock form hosted on Vercel; Vercel Function unlock endpoint live; Zoho CRM lead fields created.
**Status**: 🔴 Blocked — requires Worker and CRM.

### Setup

1. Host `assets/forms/pricing-unlock.html` at a stable URL.
2. Replace `{{UNLOCK_ENDPOINT}}` placeholder with live Vercel Function URL.
3. Confirm CRM is configured with required Lead fields (see Section B of master checklist).

### Test Steps

1. Navigate to a locked proposal URL in private browser.
2. Click "Unlock Pricing" CTA.
3. Confirm:
   - [ ] Redirects to (or opens) `pricing-unlock.html`
   - [ ] Form renders correctly — name and email fields visible, required
   - [ ] Form validation fires on empty submit (shows inline errors)
   - [ ] Form validation fires on invalid email format

4. Submit form with valid test data (use a real email you control):
   - Name: "QA Test"
   - Email: your test email
   - Confirm source/pid params passed through

5. Check Zoho CRM:
   - [ ] New Lead record created with correct name and email
   - [ ] Lead source = "Outbound Pricing Unlock" (or equivalent)
   - [ ] Proposal ID / pid captured in correct field
   - [ ] Lead status = correct initial status

6. Check email inbox:
   - [ ] Template 03 (Email Verification) received within 2 minutes
   - [ ] Subject line correct
   - [ ] Verification link present and clickable

**Pass criteria**: Form submits → Lead created in CRM → Verification email delivered.

---

## T-03 — Email Verification

**Prerequisites**: CRM workflow for verification active; verification landing page live.
**Status**: 🔴 Blocked — requires CRM workflow.

### Test Steps

1. Continuing from T-02: click the verification link in Template 03.
2. Confirm:
   - [ ] Link opens correctly (no 404)
   - [ ] Verification landing page displays confirmation message
   - [ ] PageSense `email_verified` goal fires (check PageSense dashboard)

3. Check CRM:
   - [ ] Lead record updated: "Email Verified" = true (or equivalent field)
   - [ ] Lead status updated to next stage

4. Check email inbox:
   - [ ] Template 04 (Pricing Unlocked) received within 2 minutes
   - [ ] Unlocked proposal URL is present and correct
   - [ ] URL contains `state=unlocked` param

**Pass criteria**: Verification link → lead updated in CRM → unlocked proposal URL delivered by email.

---

## T-04 — Unlocked Proposal Delivery

**Prerequisites**: Proposal template hosted; T-03 passed.
**Status**: 🟡 Partial — template built; hosting not yet deployed.

### Test Steps

1. Open the unlocked proposal URL from Template 04.
2. Confirm URL params: `state=unlocked`, correct `lang`, correct `pid`.
3. Verify:
   - [ ] Pricing cards are fully visible (not blurred)
   - [ ] One-Page Professional: $1,500 + hosting language visible
   - [ ] Multi-Page Corporate: $2,500 + hosting language visible + "Most Popular" badge
   - [ ] Hosting section: $30/mo and $300/yr cards present
   - [ ] Each package's payment CTA links to correct Zoho Billing payment URL
   - [ ] Payment URLs match `assets/payment_links.json`
   - [ ] Mandatory hosting notice is present ("Hosting is required")
   - [ ] If `wcr=1` param: WCR pricing card renders
   - [ ] If `commerce=1` param: Commerce notice renders
   - [ ] Proposal ID displays in header
   - [ ] "Valid for 14 days" language present
   - [ ] All CTAs have `data-goal` attributes for PageSense tracking

4. Test Spanish variant:
   - [ ] Add `lang=es` to URL — all text switches to Spanish
   - [ ] Spanish pricing labels and section headers correct
   - [ ] CTA still links to correct payment URL

5. Test expired state:
   - [ ] Add `state=expired` — full-screen overlay appears with contact CTA
   - [ ] Overlay does not reveal pricing underneath

**Pass criteria**: Pricing visible, payment CTAs point to correct Zoho Billing URLs, language switching works, expired state blocks content.

---

## T-05 — Inbound Lead Flow

**Prerequisites**: Main website form live with Worker endpoint; Zoho CRM configured.
**Status**: 🔴 Blocked — requires Worker and CRM.

### Test Steps

1. Open `assets/website/index.html` (English) or `assets/website/es/index.html` (Spanish).
2. Navigate to the proposal request form section.
3. Test form validation:
   - [ ] Required fields block submission when empty (name, email, business type)
   - [ ] Invalid email format shows inline error
   - [ ] Form accessible by keyboard (Tab through all fields)

4. Submit with valid test data:
   - [ ] Success state displays immediately ("Request received!")
   - [ ] Success message is correct and in the right language (EN/ES)
   - [ ] Form does not submit again on re-click

5. Check CRM:
   - [ ] New Lead record created with correct data
   - [ ] Lead source = "Website EN" or "Website ES" (matches `source` field in form payload)
   - [ ] All submitted fields mapped to correct CRM fields

6. Check email:
   - [ ] Template 05 (Inbound Proposal Received auto-response) delivered to test email within 2 minutes
   - [ ] Language matches form language (EN form → EN email, ES form → ES email)

7. Internal notification:
   - [ ] Internal CRM notification or email triggers to notify you of new inbound lead

**Pass criteria**: Form submits → success state → Lead in CRM → auto-response email delivered.

---

## T-06 — Proposal and Demo Analytics (PageSense)

**Prerequisites**: PageSense projects created; embed codes installed in all templates.
**Status**: 🔴 Blocked — PageSense projects require manual creation in PageSense dashboard.

### Setup

For each template/page, confirm PageSense project created and embed code installed:

| Page | Project Name | Embed Code Location |
|------|-------------|---------------------|
| Website EN | ARU-SITE-HOME-EN | `assets/website/index.html` |
| Website ES | ARU-SITE-HOME-ES | `assets/website/es/index.html` |
| Proposal (each PID) | ARU-PROP-[PID]-EN/ES | `assets/templates/proposal.html` |
| Demo (each) | ARU-DEMO-[SLUG]-EN/ES | `assets/templates/demo.html` |

### Goal Verification Tests

For each page, trigger each goal and confirm it fires in the PageSense dashboard (Goals → Real-time):

**Website**
- [ ] `pagesense_visit_site_home` fires on page load
- [ ] `click_proposal_cta` fires on "Request a Proposal" button click

**Locked Proposal**
- [ ] `visit_proposal` fires on page load
- [ ] `click_unlock_pricing` fires on "Unlock Pricing" CTA click

**Pricing Unlock Form**
- [ ] `start_unlock_form` fires on first field focus
- [ ] `submit_unlock_form` fires on form submission

**Verification Landing Page**
- [ ] `email_verified` fires on page load

**Unlocked Proposal**
- [ ] `visit_proposal` fires on page load
- [ ] `click_payment_button` fires on payment CTA click

**Thank-You Page**
- [ ] `payment_completed` fires on page load (confirms PageSense funnel completes)

**Pass criteria**: All goals fire in real-time dashboard when triggered manually.

---

## T-07 — Payment Links + Success Redirect

**Prerequisites**: Zoho Billing payment links active (✅ done); /thank-you page live on arumaldo.com.
**Status**: 🟡 Partial — payment links confirmed in Phase 3; /thank-you page not yet deployed.

### Payment Link Tests

For each payment link in `assets/payment_links.json`:

1. Open each payment link URL in a private browser window.
2. For **One-Page Professional EN** (`ARU-WEB-1P`):
   - [ ] Checkout page loads correctly
   - [ ] Product name: "One-Page Professional Website"
   - [ ] Price: $1,500.00 USD
   - [ ] Hosted plan (ARU-HOST-M or ARU-HOST-Y) appears as required add-on
   - [ ] Checkout acknowledgment / store description displays the 10-point T&C
   - [ ] Test payment form renders (card fields visible)

3. For **Multi-Page Corporate EN** (`ARU-WEB-MP`):
   - [ ] Price: $2,500.00 USD
   - [ ] Same hosting requirement and T&C

4. Repeat for **ES variants** (same items, confirm language if Zoho Billing shows locale).

5. **Do not complete a real payment** during testing. Use Zoho Billing test mode if available, or verify by inspecting the checkout form only.

### Success Redirect Test

1. In Zoho Billing, confirm success redirect is set to `https://arumaldo.com/thank-you` on each product/plan.
2. Deploy a minimal `/thank-you` page (can be a simple HTML page).
3. Trigger a test payment (use Zoho Billing test card if available).
4. Confirm:
   - [ ] After payment, browser redirects to `https://arumaldo.com/thank-you`
   - [ ] Thank-you page loads (no 404)
   - [ ] PageSense `payment_completed` goal fires on the thank-you page

5. Check CRM + Billing:
   - [ ] Payment confirmed in Zoho Billing dashboard
   - [ ] If CRM webhook configured: deal/contact created or updated

**Pass criteria**: Payment checkout loads correctly with right product/price, success redirect fires, thank-you page live.

---

## T-08 — Intake Form Submission + CRM Update

**Prerequisites**: Intake form hosted on Vercel; Vercel Function intake endpoint live; CRM fields for intake status.
**Status**: 🔴 Blocked — requires Worker and CRM.

### Test Steps

1. Open `assets/forms/onboarding-questionnaire.html` at hosted URL.
2. Confirm all 5 steps render:
   - [ ] Step 1: Business information
   - [ ] Step 2: Services and offerings
   - [ ] Step 3: Design preferences and references
   - [ ] Step 4: Content and assets (file upload fields visible)
   - [ ] Step 5: Billing information (Company/Personal toggle works)
3. Test navigation:
   - [ ] "Next" button advances step; "Back" returns to previous step
   - [ ] Step indicator updates correctly
   - [ ] Required field validation fires before advancing each step
4. Test file upload fields:
   - [ ] Logo upload field accepts image files
   - [ ] Additional assets upload accepts multiple files
   - [ ] File size/type errors display correctly if wrong format submitted
5. Test company/personal toggle in Step 5:
   - [ ] Selecting "Company" shows Razón Social and RUC fields
   - [ ] Selecting "Personal" hides those fields
6. Complete all steps with test data and submit.
7. Confirm:
   - [ ] Success confirmation displays
   - [ ] CRM deal "Intake Status" updated to `Complete`
   - [ ] All form fields mapped to correct CRM deal fields
   - [ ] File uploads stored and linked in CRM or WorkDrive

**Pass criteria**: Multi-step form navigates correctly, submits, updates CRM deal record.

---

## T-09 — CRM Full Conversion Check

**Prerequisites**: All CRM fields, stages, and workflows configured (Section B).
**Status**: 🔴 Blocked — requires Section B completion.

### Full Funnel Trace

Walk a test lead through the entire CRM journey and confirm each transition:

| Stage | CRM State | Trigger | Expected Result |
|-------|-----------|---------|-----------------|
| Outbound contact | Lead: New | Manual | Lead record exists |
| Proposal sent | Lead: Proposal Sent | Manual update | Stage updated |
| Pricing unlock submitted | Lead: Pricing Unlock Requested | Form submit | Auto-updated by workflow |
| Email verified | Lead: Email Verified | Verification link click | Auto-updated |
| Unlocked proposal sent | Lead: Unlocked Proposal Sent | Workflow trigger | Email delivered |
| Payment received | Lead → Convert → Deal: Payment Received | Zoho Billing webhook | Lead converted; deal created |
| Intake submitted | Deal: Intake Complete | Form submit | Deal field updated |
| In build | Deal: In Build | Manual | Deal stage updated |
| Preview delivered | Deal: Preview Delivered | Manual | Stage + date field updated |
| Launched | Deal: Launched | Manual | Stage + launch URL updated |

For each row:
- [ ] CRM field/stage updates as expected
- [ ] No duplicate records created
- [ ] Workflow email triggers fire at correct stages
- [ ] No orphaned leads after conversion

**Pass criteria**: Lead flows through all stages without manual data entry beyond intended touchpoints.

---

## T-10 — Abandoned Payment Chat Trigger

**Prerequisites**: CRM workflow for payment abandonment configured; Template 07 loaded.
**Status**: 🔴 Blocked — requires CRM workflow.

### Test Scenario

Simulate: prospect clicked payment CTA (PageSense `click_payment_button` fired) but `payment_completed` did NOT fire within 24 hours.

1. Trigger the `click_payment_button` PageSense goal manually (or confirm it fired during T-07 testing).
2. Wait for the abandonment window (or simulate by adjusting CRM workflow timing for testing).
3. Confirm:
   - [ ] CRM workflow identifies the lead as "abandoned payment"
   - [ ] Template 07 (Panama: WhatsApp script prepared; USA: email queued) triggers
   - [ ] Notification sent to Abdiel (not auto-sent to prospect — this is a manual-send script)
   - [ ] Lead status updated to "Payment Abandoned" or equivalent

**Note**: Template 07 is a manually-sent script, not an automated outbound message to the prospect. The workflow should alert Abdiel and surface the script — Abdiel then sends it. Confirm the workflow is set up this way, NOT as an auto-send.

**Pass criteria**: Abandonment detected → Abdiel notified with script queued → lead status updated.

---

## T-11 — Production Checklist Dry Run

**Prerequisites**: All T-01 through T-10 passed (or manually verified). Site infrastructure live.
**Status**: 🟡 Runnable incrementally as infrastructure comes online.

This is a final end-to-end pass before accepting a real paying customer. Run through the entire fulfillment workflow (`assets/ops/10_FULFILLMENT_WORKFLOW.md`) using a fake project.

### Dry Run Project Setup

- Business name: "Test Business QA"
- Package: Multi-Page Corporate
- Language: English
- DNS: Self-configure
- Domain: Use a test subdomain you control

### Checklist

**Proposal**
- [ ] Generate proposal URL with `pid=DRY-RUN-001`, `type=outbound`, `state=locked`
- [ ] Proposal renders at hosted URL
- [ ] Unlock flow works end-to-end (T-02 → T-04)
- [ ] Payment link opens correct Zoho Billing checkout

**Post-Payment**
- [ ] Simulate payment confirmation
- [ ] Intake form link works
- [ ] Fill out intake form completely
- [ ] CRM deal updated correctly
- [ ] Build brief template completed (Section 2 of workflow doc)

**Build**
- [ ] Build a minimal test page using the design process
- [ ] Quality checklist (Section 3.3 of workflow doc) passes
- [ ] Deployed to staging URL

**Preview + Approval**
- [ ] Template 10 (Preview Ready) sent to test email
- [ ] Preview link opens correctly
- [ ] Mock "Round 1" change round: make 2–3 test changes
- [ ] Mock "Approval": send Template 11, confirm in writing

**DNS + Launch**
- [ ] DNS instruction email (Template 12) sent
- [ ] Point test domain to hosting
- [ ] SSL issues correctly
- [ ] Launch confirmation email (Template 13) sent
- [ ] Live URL confirmed in CRM

**Timing**
- [ ] Note actual time from "intake received" to "preview delivered" — target is ≤ 14 business days
- [ ] Identify any bottlenecks or missing steps in the workflow

**Pass criteria**: Full project lifecycle completed without hitting an undefined step or broken tool.

---

## T-12 — First Pilot

**Prerequisites**: T-11 passed. At least one warm prospect ready from outbound efforts.
**Status**: 🔴 Pending all prior tests.

### Pilot Selection Criteria

The first paying pilot should be:
- A prospect you know personally or have a warm connection with (lowers risk of disputes)
- Business that fits the ICP (service business, needs credibility online)
- Panama preferred for Pilot 1 (WhatsApp-first, faster feedback loop, easier to meet if needed)
- Not someone who will go dark after paying — pick someone responsive

### Pilot Scope

- Package: Multi-Page Corporate (the anchor offer — sets the right revenue expectation)
- Language: Spanish / Panama channel
- Full price: $2,500 one-time + hosting ($300/yr preferred for first pilot — annual is cleaner)
- No discounts on Pilot 1 — discounting before you have a track record undersells the product

### Pilot Goals

Beyond completing the project, use Pilot 1 to validate:
1. Is the intake form complete enough to build from? (Any missing fields?)
2. Is the 7–14 business day timeline achievable?
3. Are two change rounds enough for a real client?
4. Is the proposal template persuasive? (Did they hesitate anywhere specific?)
5. Did any email land in spam?
6. Was there any friction with the Zoho Billing checkout?
7. What did the client ask about that wasn't covered in the proposal or agreement?

### Post-Pilot Actions

After Pilot 1 completes and launches:
- [ ] Collect written testimonial (or screenshot of approval message with permission)
- [ ] Note all answers to the 7 validation questions above
- [ ] Update any templates, forms, or processes that need adjustment
- [ ] Add live site to portfolio on arumaldo.com
- [ ] Begin outbound for Pilot 2 and 3

---

## 12. Manual Override Procedures (Pre-Infrastructure)

Until the Vercel Functions and CRM workflows are built, use these manual procedures to run a real outbound pilot now.

### Manual Outbound Flow (No CRM Automation Required)

This covers what you can do today with just the hosted proposal template and Zoho Billing payment links.

**Step 1 — Send outbound message**
Use Template 01 manually (WhatsApp or email). No CRM required — track in a spreadsheet or Zoho CRM manually.

**Step 2 — Share locked proposal**
Host `proposal.html` as a static file on Vercel. Generate URL manually:
```
https://[host]/proposal.html?type=outbound&state=locked&lang=en&pid=[INITIALS-001]&name=[FirstName]
```
Send via Template 02.

**Step 3 — Handle pricing unlock manually**
Since the Worker isn't live yet: instead of the automated unlock form, simply reply to any "I'm interested in pricing" message with the unlocked proposal URL directly:
```
https://[host]/proposal.html?type=outbound&state=unlocked&lang=en&pid=[INITIALS-001]&name=[FirstName]
```
Skip email verification for Pilot 1 — verify interest by the conversation itself.

**Step 4 — Payment**
Send the correct Zoho Billing payment link from `assets/payment_links.json`. Confirm payment in Zoho Billing dashboard.

**Step 5 — Intake**
Host `assets/forms/onboarding-questionnaire.html` as a static page. Form submissions currently POST to `{{INTAKE_ENDPOINT}}` placeholder — for manual pilot, either:
- (a) Replace the endpoint temporarily with a Formspree or Netlify Forms URL to capture submissions by email, OR
- (b) Send the intake form as a PDF/Google Form temporarily and migrate to the HTML form once the Worker is live.

**Step 6 — Build + deliver**
Follow the full workflow from `assets/ops/10_FULFILLMENT_WORKFLOW.md`. All steps from "Website Build" onwards are manual and fully operational today.

**Tracking during manual phase**: Keep a simple Google Sheet or Zoho CRM deal (manual entry) with one row per prospect, columns: Name, Stage, Date Sent, Proposal URL, Payment Status, Intake Status, Launch Date.

---

## Infrastructure Build Order (Section B Prioritization)

When you're ready to build out the CRM and Workers, this is the recommended sequence to get to a fully automated outbound funnel as fast as possible:

| Priority | Item | Unlocks |
|----------|------|---------|
| 1 | Deploy proposal.html + intake form to Vercel | T-01, T-04, T-08 immediately |
| 2 | Build Vercel Function — intake endpoint | T-08; intake form fully live |
| 3 | Zoho CRM — Lead fields + deal fields | T-02, T-05, T-09 |
| 4 | Zoho CRM — Deal stages + lead statuses | T-09 |
| 5 | Zoho CRM — Email templates loaded | T-03, T-04, T-05, T-07, T-08 |
| 6 | Zoho CRM — Workflow rules | T-02, T-03, T-04, T-05, T-08, T-10 |
| 7 | Build Vercel Function — pricing unlock endpoint | T-02 fully automated |
| 8 | Build Vercel Function — proposal request endpoint | T-05 fully automated |
| 9 | Deploy /thank-you page | T-07 success redirect |
| 10 | PageSense projects + embed codes | T-06 |

---

*Arumaldo · arumaldo.com*
