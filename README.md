# arumaldo.com — Vercel Main Deployment

This folder is the deployable Vercel project for arumaldo.com.
It serves the main website, all customer-facing forms, and the three Zoho CRM API endpoints.

---

## Project Structure

```
vercel-main/
├── vercel.json           ← Vercel project config
├── api/                  ← Vercel serverless functions (Node.js)
│   ├── _zoho.js          ← Shared Zoho OAuth2 auth helper
│   ├── proposal-request.js  ← /api/proposal-request
│   ├── pricing-unlock.js    ← /api/pricing-unlock
│   └── intake.js            ← /api/intake
└── public/               ← Static site (outputDirectory)
    ├── index.html           ← Main website (EN)
    ├── es/index.html        ← Main website (ES)
    ├── proposal/index.html  ← Proposal template
    ├── demo/index.html      ← Demo site template
    ├── pricing-unlock/index.html  ← Pricing unlock form
    ├── intake/index.html    ← Post-payment intake form
    └── thank-you/index.html ← Payment success page (fires PageSense goal)
```

---

## One-Time Setup

### 1. Create GitHub repository
```bash
cd deploy/vercel-main
git init
git add .
git commit -m "Initial deploy: arumaldo.com Vercel project"
git remote add origin git@github.com:arumaldo/arumaldo-web.git
git push -u origin main
```

### 2. Create Vercel project
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `arumaldo-web` GitHub repo
3. Settings:
   - **Framework Preset:** Other
   - **Output Directory:** `public`
   - **Build Command:** (leave blank)
   - **Install Command:** (leave blank)
4. Click **Deploy**

### 3. Set environment variables
In Vercel → Project → Settings → Environment Variables, add:

| Variable              | Value                                                              |
|-----------------------|--------------------------------------------------------------------|
| `ZOHO_CLIENT_ID`      | `1000.5GNYX8KOGYLD227MF4YN2WH5FZGO8U`                            |
| `ZOHO_CLIENT_SECRET`  | `4117a2eddc7ef9e08d5369b017f697b914267392de`                      |
| `ZOHO_REFRESH_TOKEN`  | `1000.52bd1c8f0e7963945fbb5cef938a5bd0.b139d0330a79a6d437465da49d0c5416` |
| `ALLOWED_ORIGINS`     | `https://arumaldo.com,https://www.arumaldo.com`                   |

> **Note:** Set these for all environments (Production, Preview, Development).

### 4. Add custom domain
In Vercel → Project → Domains, add `arumaldo.com` and `www.arumaldo.com`.
Follow Vercel's DNS instructions for your registrar.

### 5. Verify PageSense embed
Replace the `<!-- PAGESENSE_EMBED_PLACEHOLDER -->` comment in each HTML file
with the actual PageSense project embed code before going live.

---

## API Endpoints

| Endpoint                  | Method | Purpose                                      |
|---------------------------|--------|----------------------------------------------|
| `/api/proposal-request`   | POST   | Website form → creates Lead in Zoho CRM      |
| `/api/pricing-unlock`     | POST   | Unlock form → updates Lead, triggers verify  |
| `/api/intake`             | POST   | Intake form → updates Deal, sets Submitted   |

All endpoints:
- Accept `Content-Type: application/json`
- Return `{ success: true, ... }` on success
- Return `{ error: "...", detail: "..." }` on failure
- Handle CORS for configured `ALLOWED_ORIGINS`

---

## Updating Static Pages

The `public/` folder is a snapshot of the `assets/` source files at the time of last sync.
When you update a source file in `assets/`, re-sync it to `public/`:

```bash
# From project root
cp assets/website/index.html    deploy/vercel-main/public/index.html
cp assets/website/es/index.html deploy/vercel-main/public/es/index.html
cp assets/templates/proposal.html  deploy/vercel-main/public/proposal/index.html
cp assets/templates/demo.html      deploy/vercel-main/public/demo/index.html
cp assets/forms/pricing-unlock.html        deploy/vercel-main/public/pricing-unlock/index.html
cp assets/forms/onboarding-questionnaire.html deploy/vercel-main/public/intake/index.html
```

> **Endpoint placeholders have already been replaced.** The `assets/` originals and `public/` copies
> all use the live relative paths (`/api/proposal-request`, `/api/pricing-unlock`, `/api/intake`).

---

## CRM Notes

- Zoho CRM org: `5811789` (Arumaldo production)
- Confirmed custom fields: `Email_Verification_Status`, `Payment_Status`, `Demo_Expires_At`,
  `Pricing_Status` (Leads); `Intake_Status` (Deals)
- Several Deal fields from the spec (`Package`, `Hosting_Plan`, etc.) are commented out in
  `api/intake.js` until confirmed via Zoho CRM UI → Setup → Deals → Fields.
  Uncomment each line after confirming the field API name exists in the live org.

---

## Zoho Billing Payment Success Redirect

The payment success redirect in Zoho Billing is already set to:
`https://arumaldo.com/thank-you`

This points to `public/thank-you/index.html`, which fires the PageSense `payment_completed` event.
