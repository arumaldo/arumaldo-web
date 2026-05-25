# Email & Chat Templates — Arumaldo

All templates use `{{variable_name}}` placeholders.
When importing into Zoho CRM email templates, map to the equivalent merge field:
- `{{first_name}}` → `${Leads.First Name}` / `${Contacts.First Name}`
- `{{proposal_url}}` → custom field merge tag
- etc.

**Language note**: Templates marked [EN] are English-only, [ES] Spanish-only, [BILINGUAL] have both versions.

---

## Variables Reference

| Variable | Description |
|---|---|
| `{{first_name}}` | Contact's first name |
| `{{full_name}}` | Contact's full name |
| `{{email}}` | Contact's email address |
| `{{proposal_id}}` | Proposal ID (PID) |
| `{{proposal_url}}` | Full URL to proposal.html with params |
| `{{proposal_url_locked}}` | proposal.html?state=locked&pid=... |
| `{{proposal_url_unlocked}}` | proposal.html?state=unlocked&pid=... |
| `{{demo_url}}` | URL to the client's demo site |
| `{{payment_url}}` | Zoho Billing checkout URL |
| `{{intake_url}}` | URL to onboarding-questionnaire.html |
| `{{preview_url}}` | Private preview link |
| `{{launch_date}}` | Scheduled launch date |
| `{{domain}}` | Client's domain name |
| `{{wcr_monthly_url}}` | WCR monthly subscription link |
| `{{wcr_yearly_url}}` | WCR yearly subscription link |
| `{{agent_name}}` | Arumaldo agent/sender name |

---

## 01 — Outbound Initial Message

**Type**: WhatsApp / Direct message (chat)
**Trigger**: Manual; sent before proposal is prepared
**Channel variants**: Panama (ES), USA (EN)

### Panama variant (ES — WhatsApp)

```
Hola {{first_name}} 👋

Vi tu negocio y creo que podría ayudarte a conseguir más clientes con un sitio web profesional.

Trabajo con Arumaldo — creamos sitios web premium para negocios como el tuyo, con diseño a medida, hosting incluido y listo en 7–14 días.

¿Tienes un momento para que te cuente más? Solo quiero enviarte una propuesta sin compromiso.

— {{agent_name}}
```

### USA variant (EN — Email or LinkedIn DM)

**Subject**: Quick question about [Company Name]'s website

```
Hi {{first_name}},

I came across [Company/your work] and noticed you might benefit from a stronger web presence.

I build premium websites for service businesses — custom-designed, fast, and ready in 7–14 days. Hosting is included and you own everything.

Would you be open to receiving a quick proposal? No pressure at all.

Best,
{{agent_name}}
Arumaldo
```

---

## 02 — Outbound Pricing Unlock Email

**Type**: Email
**Trigger**: Sent after outbound prospect engages and Arumaldo prepares a locked proposal
**Purpose**: Delivers the locked proposal link; explains they can unlock pricing with email verification

### EN

**Subject**: Your website proposal from Arumaldo

```
Hi {{first_name}},

As promised, here's your proposal:

→ View Your Proposal: {{proposal_url_locked}}

The proposal walks through what we'd build for you, the timeline, and what's included. Pricing is revealed after a quick email confirmation — this just makes sure your proposal goes to the right place.

Any questions, just reply to this email.

Talk soon,
{{agent_name}}
Arumaldo
```

### ES

**Subject**: Tu propuesta de sitio web — Arumaldo

```
Hola {{first_name}},

Como te prometí, aquí está tu propuesta:

→ Ver tu propuesta: {{proposal_url_locked}}

La propuesta detalla lo que construiríamos para ti, el plazo y lo que está incluido. El precio se muestra después de una confirmación rápida de correo — esto solo nos asegura que tu propuesta llegue al lugar correcto.

Cualquier pregunta, responde a este correo.

Hasta pronto,
{{agent_name}}
Arumaldo
```

---

## 03 — Email Verification Message

**Type**: Automated email (sent by CRM workflow)
**Trigger**: After prospect submits the pricing unlock form
**Purpose**: Verifies email address before unlocking pricing

### EN

**Subject**: Confirm your email to see pricing — Arumaldo

```
Hi {{first_name}},

Almost there! Click the button below to confirm your email and unlock the pricing in your proposal.

→ Confirm My Email & See Pricing: [VERIFICATION_LINK]

This link expires in 24 hours.

If you didn't request this, just ignore this email.

Arumaldo
```

### ES

**Subject**: Confirma tu correo para ver el precio — Arumaldo

```
Hola {{first_name}},

¡Ya casi! Haz clic en el botón de abajo para confirmar tu correo y desbloquear el precio en tu propuesta.

→ Confirmar mi correo y ver el precio: [VERIFICATION_LINK]

Este enlace vence en 24 horas.

Si no solicitaste esto, ignora este correo.

Arumaldo
```

---

## 04 — Pricing Unlocked Email

**Type**: Email
**Trigger**: After CRM workflow confirms email verification
**Purpose**: Delivers unlocked proposal link; nudge to proceed to payment

### EN

**Subject**: Your pricing is unlocked — here's your proposal

```
Hi {{first_name}},

Your email is confirmed. Your full proposal — including pricing — is ready:

→ View Your Proposal: {{proposal_url_unlocked}}

When you're ready to move forward, you can pay securely from the proposal page. After payment you'll receive a quick intake form to kick off the build.

If you have questions before paying, just reply here.

{{agent_name}}
Arumaldo
```

### ES

**Subject**: Tu precio está desbloqueado — aquí está tu propuesta

```
Hola {{first_name}},

Tu correo fue confirmado. Tu propuesta completa — con precios incluidos — está lista:

→ Ver tu propuesta: {{proposal_url_unlocked}}

Cuando estés listo para avanzar, puedes pagar de forma segura desde la página de la propuesta. Después del pago recibirás un formulario de incorporación para comenzar la construcción.

Si tienes preguntas antes de pagar, responde aquí.

{{agent_name}}
Arumaldo
```

---

## 05 — Inbound Proposal Received Email

**Type**: Automated email (auto-response)
**Trigger**: After inbound proposal request form is submitted on the website
**Purpose**: Acknowledge receipt; set expectations

### EN

**Subject**: We got your request — proposal coming within 24 hours

```
Hi {{first_name}},

Thanks for reaching out to Arumaldo!

We received your proposal request and will review it shortly. You'll hear from us within 24 hours with a custom proposal tailored to your project.

In the meantime, feel free to reply to this email if you have any questions.

Talk soon,
The Arumaldo Team
```

### ES

**Subject**: Recibimos tu solicitud — propuesta en menos de 24 horas

```
Hola {{first_name}},

¡Gracias por contactar a Arumaldo!

Recibimos tu solicitud de propuesta y la revisaremos en breve. Te contactaremos en menos de 24 horas con una propuesta personalizada para tu proyecto.

Mientras tanto, no dudes en responder a este correo si tienes preguntas.

Hasta pronto,
El equipo de Arumaldo
```

---

## 06 — Proposal Ready Email

**Type**: Email
**Trigger**: Manual; sent when Arumaldo finishes preparing the proposal
**Purpose**: Delivers the proposal link for review

### EN

**Subject**: Your Arumaldo proposal is ready

```
Hi {{first_name}},

Your custom website proposal is ready to view:

→ View Your Proposal (Proposal #{{proposal_id}}): {{proposal_url_locked}}

The proposal includes:
• The package we recommend for your business
• Timeline and what to expect
• Pricing (unlocked after quick email confirmation)
• What's included at every step

If you'd like to talk it through before deciding, just reply and we'll set up a quick call.

Looking forward to working with you,
{{agent_name}}
Arumaldo
```

### ES

**Subject**: Tu propuesta de Arumaldo está lista

```
Hola {{first_name}},

Tu propuesta de sitio web personalizada está lista para ver:

→ Ver tu propuesta (Propuesta #{{proposal_id}}): {{proposal_url_locked}}

La propuesta incluye:
• El paquete que recomendamos para tu negocio
• Plazo y qué esperar
• Precio (se desbloquea con confirmación rápida de correo)
• Lo que está incluido en cada paso

Si quieres conversarla antes de decidir, responde aquí y coordinamos una llamada rápida.

Con gusto de trabajar contigo,
{{agent_name}}
Arumaldo
```

---

## 07 — Payment Abandoned Automated Chat

**Type**: WhatsApp / automated follow-up (chat)
**Trigger**: 2–4 hours after proposal payment link was clicked but payment not completed
**Purpose**: Recover abandoned checkout

### EN

```
Hi {{first_name}}, this is {{agent_name}} from Arumaldo.

I noticed you were looking at the payment page for your website proposal but didn't complete it. Totally normal — just wanted to check if you had any questions or if something came up.

Here's your proposal link again if you want to revisit: {{proposal_url_unlocked}}

No pressure at all. Happy to answer anything.
```

### ES

```
Hola {{first_name}}, te escribe {{agent_name}} de Arumaldo.

Vi que estuviste en la página de pago de tu propuesta pero no la completaste. Completamente normal — solo quería ver si tienes alguna pregunta o si surgió algo.

Aquí está el enlace de tu propuesta por si quieres revisarla: {{proposal_url_unlocked}}

Sin ninguna presión. Con gusto respondo cualquier pregunta.
```

---

## 08 — Payment Success Email

**Type**: Automated email
**Trigger**: Zoho Billing payment confirmation webhook → CRM workflow
**Purpose**: Confirm payment, request intake form completion

### EN

**Subject**: Payment received — let's start building your website

```
Hi {{first_name}},

Payment confirmed — welcome to Arumaldo!

Your project is now in the queue. To get started, we need a few details about your business, content, and preferences:

→ Complete Your Intake Form: {{intake_url}}

This usually takes 10–15 minutes. The sooner you complete it, the sooner we can start building.

What happens next:
1. You complete the intake form
2. We review everything and start building (7–14 business days)
3. You receive a private preview link to review
4. Two rounds of changes, then launch

If you have questions at any point, just reply to this email.

Excited to build something great for you,
{{agent_name}}
Arumaldo
```

### ES

**Subject**: Pago recibido — empecemos a construir tu sitio web

```
Hola {{first_name}},

¡Pago confirmado — bienvenido a Arumaldo!

Tu proyecto está en la cola. Para comenzar, necesitamos algunos detalles sobre tu negocio, contenido y preferencias:

→ Completa tu formulario de incorporación: {{intake_url}}

Esto suele tomar 10–15 minutos. Cuanto antes lo completes, antes podremos comenzar.

¿Qué sigue?
1. Completas el formulario de incorporación
2. Revisamos todo y comenzamos a construir (7–14 días hábiles)
3. Recibes un enlace privado de vista previa para revisar
4. Dos rondas de cambios, luego lanzamiento

Si tienes preguntas en cualquier momento, responde a este correo.

Con mucho gusto de construir algo genial para ti,
{{agent_name}}
Arumaldo
```

---

## 09 — Intake Form Reminder Email

**Type**: Automated email
**Trigger**: 48 hours after payment if intake form not submitted
**Purpose**: Nudge client to complete intake

### EN

**Subject**: Reminder: your intake form is waiting

```
Hi {{first_name}},

Just a friendly reminder — we're ready to start building your website, but we're waiting on your intake form.

→ Complete Your Intake Form: {{intake_url}}

It takes about 10–15 minutes and includes things like your logo, brand colors, content, and preferences. We can't start the build until this is in.

Any questions? Just reply.

{{agent_name}}
Arumaldo
```

### ES

**Subject**: Recordatorio: tu formulario de incorporación te está esperando

```
Hola {{first_name}},

Solo un recordatorio amable — estamos listos para comenzar a construir tu sitio, pero estamos esperando tu formulario de incorporación.

→ Completar tu formulario: {{intake_url}}

Toma unos 10–15 minutos e incluye cosas como tu logo, colores de marca, contenido y preferencias. No podemos empezar la construcción hasta que esté completo.

¿Preguntas? Solo responde.

{{agent_name}}
Arumaldo
```

---

## 10 — Preview Ready Email

**Type**: Email
**Trigger**: Manual; sent when Arumaldo completes the initial build
**Purpose**: Share private preview link; request first round of feedback

### EN

**Subject**: Your website preview is ready to review

```
Hi {{first_name}},

Your website is built and ready for your first review! Here's your private preview link:

→ View Your Website Preview: {{preview_url}}

Please take your time reviewing everything. You have two rounds of changes included — this is round one.

To request changes, just reply to this email with a list of what you'd like adjusted. Be as specific as possible (e.g., "Change the headline on the hero to..." / "Move the contact form above the services section").

A few things to check:
• Does the overall look and feel match your brand?
• Is all the content accurate?
• Are the contact details correct?
• Does it look good on your phone? (Try opening on mobile)

We'll make the adjustments and send you an updated preview for round two.

{{agent_name}}
Arumaldo
```

### ES

**Subject**: Tu vista previa de sitio web está lista para revisar

```
Hola {{first_name}},

¡Tu sitio web está construido y listo para tu primera revisión! Aquí está tu enlace privado de vista previa:

→ Ver la vista previa de tu sitio: {{preview_url}}

Tómate el tiempo que necesites para revisarlo todo. Tienes dos rondas de cambios incluidas — esta es la ronda uno.

Para solicitar cambios, responde a este correo con una lista de lo que deseas ajustar. Sé lo más específico posible (ej: "Cambiar el título principal por..." / "Mover el formulario de contacto encima de la sección de servicios").

Algunas cosas que verificar:
• ¿El diseño general coincide con tu marca?
• ¿Es todo el contenido exacto?
• ¿Los datos de contacto son correctos?
• ¿Se ve bien en tu celular? (Intenta abrirlo en móvil)

Haremos los ajustes y te enviaremos una vista previa actualizada para la ronda dos.

{{agent_name}}
Arumaldo
```

---

## 11 — Approval Request Email

**Type**: Email
**Trigger**: Manual; sent after second round of changes is applied
**Purpose**: Get final approval before launch

### EN

**Subject**: Ready to launch? Your final approval needed

```
Hi {{first_name}},

Your website is ready to go live. Here's the final version for your approval:

→ Final Preview: {{preview_url}}

If everything looks good, just reply with "Approved" or "Ready to launch" and we'll connect your domain and get it live.

If you need one last adjustment, let us know — though please note that changes after the two included rounds are billed at $50 each per our agreement.

Once you approve, we'll confirm the launch timeline and send DNS instructions.

{{agent_name}}
Arumaldo
```

### ES

**Subject**: ¿Listos para lanzar? Necesitamos tu aprobación final

```
Hola {{first_name}},

Tu sitio web está listo para publicarse. Aquí está la versión final para tu aprobación:

→ Vista previa final: {{preview_url}}

Si todo se ve bien, responde con "Aprobado" o "Listo para lanzar" y conectaremos tu dominio y lo pondremos en vivo.

Si necesitas un último ajuste, avísanos — aunque recuerda que los cambios después de las dos rondas incluidas se cobran a $50 cada uno según nuestro acuerdo.

Una vez que apruebes, confirmaremos el plazo de lanzamiento y enviaremos las instrucciones de DNS.

{{agent_name}}
Arumaldo
```

---

## 12 — DNS Instructions Email

**Type**: Email
**Trigger**: Manual; sent after client approves the site, if client will configure DNS themselves
**Purpose**: Guide client through DNS setup (or offer paid implementation)

### EN

**Subject**: DNS setup instructions — your final step before launch

```
Hi {{first_name}},

Your site is approved and ready! The last step is pointing your domain ({{domain}}) to your new website.

**Option A: We handle it for you**
If you'd prefer, we can configure the DNS for you for a one-time fee of $100. Just reply saying "please handle DNS" and we'll coordinate access with your domain registrar.

**Option B: You configure it yourself**
Log in to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and update the following DNS records:

```
Type: A
Name: @ (or blank)
Value: [SERVER_IP]
TTL: 3600

Type: CNAME
Name: www
Value: [SERVER_HOST]
TTL: 3600
```

DNS changes can take up to 48 hours to fully propagate. Once you've made the change, reply and let us know — we'll confirm when the site is live.

{{agent_name}}
Arumaldo
```

### ES

**Subject**: Instrucciones de DNS — tu último paso antes del lanzamiento

```
Hola {{first_name}},

¡Tu sitio está aprobado y listo! El último paso es apuntar tu dominio ({{domain}}) a tu nuevo sitio web.

**Opción A: Nosotros lo hacemos por ti**
Si prefieres, podemos configurar el DNS por ti por un costo único de $100. Solo responde diciendo "por favor gestionen el DNS" y coordinaremos el acceso con tu registrador de dominio.

**Opción B: Tú lo configuras**
Inicia sesión en tu registrador de dominio (GoDaddy, Namecheap, Cloudflare, etc.) y actualiza los siguientes registros DNS:

```
Tipo: A
Nombre: @ (o en blanco)
Valor: [SERVER_IP]
TTL: 3600

Tipo: CNAME
Nombre: www
Valor: [SERVER_HOST]
TTL: 3600
```

Los cambios de DNS pueden tardar hasta 48 horas en propagarse completamente. Una vez que hagas el cambio, avísanos — confirmaremos cuando el sitio esté en vivo.

{{agent_name}}
Arumaldo
```

---

## 13 — Launch Confirmation Email

**Type**: Email
**Trigger**: Manual; sent when site is confirmed live
**Purpose**: Celebrate launch; set up post-launch support expectations

### EN

**Subject**: Your website is live! 🚀

```
Hi {{first_name}},

It's live. Your website is now published at:

→ {{domain}}

Congratulations — your new site is out there representing your business 24/7.

**What you own:**
✓ Your domain (registered in your name)
✓ Your brand, content, and all copy
✓ Your business — we just built the house

**What comes next:**
Your hosting renews automatically each month/year (you'll receive billing reminders from Zoho Billing). If you ever need to update something on your site, here are your options:

• **Change Request Service** ($99/mo or $999/yr) — 5 changes per month, just email us
• **Per-change** — $50 per request, no subscription needed

Want to add the Change Request Service? Start here: {{wcr_monthly_url}}

Wishing you great results with your new site. Don't hesitate to reach out whenever you need us.

{{agent_name}}
Arumaldo
```

### ES

**Subject**: ¡Tu sitio web está en vivo!

```
Hola {{first_name}},

Está en vivo. Tu sitio web ya está publicado en:

→ {{domain}}

Felicidades — tu nuevo sitio ya está representando tu negocio las 24 horas del día.

**Lo que es tuyo:**
✓ Tu dominio (registrado a tu nombre)
✓ Tu marca, contenido y todo el texto
✓ Tu negocio — nosotros solo construimos la casa

**¿Qué sigue?**
Tu hosting se renueva automáticamente cada mes/año (recibirás recordatorios de facturación de Zoho Billing). Si alguna vez necesitas actualizar algo en tu sitio, estas son tus opciones:

• **Servicio de Cambios** ($99/mes o $999/año) — 5 cambios por mes, solo escríbenos
• **Por cambio** — $50 por solicitud, sin suscripción necesaria

¿Quieres agregar el Servicio de Cambios? Comienza aquí: {{wcr_monthly_url}}

Te deseamos excelentes resultados con tu nuevo sitio. No dudes en contactarnos cuando nos necesites.

{{agent_name}}
Arumaldo
```

---

## 14 — Change Request Service Upsell Email

**Type**: Email
**Trigger**: Sent 7–14 days after launch if client has not subscribed to WCR
**Purpose**: Convert to recurring revenue

### EN

**Subject**: Keep your website current — Change Request Service

```
Hi {{first_name}},

It's been a week or so since your website launched — congrats again!

As your business evolves, you'll likely want to keep your site updated. That's exactly what our Change Request Service is for:

**Monthly Plan — $99/month**
• 5 change requests per month
• Just email us what needs updating
• We implement it and notify you when it's done

**Annual Plan — $999/year (saves $189)**
• Same 5 changes/month
• Best value if you maintain the site regularly

→ Start Monthly: {{wcr_monthly_url}}
→ Start Annual: {{wcr_yearly_url}}

Or if you only need changes occasionally, you can always request a one-off change at $50 each — just reply to this email.

{{agent_name}}
Arumaldo
```

### ES

**Subject**: Mantén tu sitio actualizado — Servicio de Cambios

```
Hola {{first_name}},

Ya pasó una semana desde el lanzamiento de tu sitio — ¡felicidades de nuevo!

A medida que tu negocio evoluciona, seguramente querrás mantener tu sitio actualizado. Para eso existe nuestro Servicio de Cambios:

**Plan Mensual — $99/mes**
• 5 solicitudes de cambio por mes
• Solo escríbenos qué necesitas actualizar
• Lo implementamos y te notificamos cuando está listo

**Plan Anual — $999/año (ahorras $189)**
• Mismos 5 cambios/mes
• Mejor valor si mantienes el sitio regularmente

→ Comenzar mensual: {{wcr_monthly_url}}
→ Comenzar anual: {{wcr_yearly_url}}

O si solo necesitas cambios ocasionalmente, siempre puedes solicitar un cambio puntual a $50 — responde a este correo.

{{agent_name}}
Arumaldo
```

---

## 15 — Expired Demo / Proposal Message

**Type**: Email or WhatsApp
**Trigger**: Manual; when a demo or proposal reaches expiration date
**Purpose**: Re-engage or notify prospect

### EN — Email

**Subject**: Your Arumaldo proposal has expired

```
Hi {{first_name}},

Your website proposal (Proposal #{{proposal_id}}) has expired.

If you're still interested in moving forward, I'd be happy to send you a fresh proposal. Just reply to this email and we'll get one over to you.

If the timing isn't right right now, no worries — reach out whenever you're ready.

{{agent_name}}
Arumaldo
```

### EN — WhatsApp

```
Hi {{first_name}}, your Arumaldo website proposal has expired. If you're still interested, I can send you a fresh one — just let me know. No pressure at all. — {{agent_name}}
```

### ES — Email

**Subject**: Tu propuesta de Arumaldo ha vencido

```
Hola {{first_name}},

Tu propuesta de sitio web (Propuesta #{{proposal_id}}) ha vencido.

Si todavía tienes interés en avanzar, con gusto te envío una propuesta nueva. Solo responde a este correo y te la hacemos llegar.

Si el momento no es el adecuado ahora, sin problema — contáctanos cuando estés listo.

{{agent_name}}
Arumaldo
```

### ES — WhatsApp

```
Hola {{first_name}}, tu propuesta de sitio web de Arumaldo ha vencido. Si aún tienes interés, puedo enviarte una nueva — solo avísame. Sin ninguna presión. — {{agent_name}}
```

---

## 16 — Panama Channel Guidelines

**Channel context**: Panama market — predominantly Spanish-speaking, WhatsApp-first, relationship-driven, local business focus.

**Communication style**:
- Language: Spanish always (unless client writes in English)
- Platform: WhatsApp first, email for formal documents (proposals, invoices, DNS instructions)
- Tone: Warm, personal, conversational. Less formal than USA. Use "tuteo" (tú, no usted) unless context suggests otherwise.
- First contact: Always WhatsApp DM (Template 01 ES)
- Proposal delivery: WhatsApp link first, email backup
- Follow-up: WhatsApp within 24–48h if no response

**Sequence** (Panama outbound):
1. WhatsApp initial message (Template 01 ES)
2. If reply received: WhatsApp conversational follow-up, share proposal link
3. Email: Proposal Ready (Template 06 ES) with proposal URL
4. WhatsApp follow-up 2 days later if no email open
5. Email: Pricing Unlocked (Template 04 ES) after verification
6. WhatsApp: payment reminder if link clicked but abandoned (Template 07 ES)
7. Email: Payment Success → Intake (Template 08 ES)
8. All subsequent emails in Spanish

**Local context to include when relevant**:
- Reference Panama City neighborhoods or zones if known (e.g., "negocios en el Área Bancaria", "clientes en Costa del Este")
- Reference local payment processors if needed (ACH Panama, Yappy for smaller amounts — note: Zoho Billing handles primary payment)
- Panama business culture: trust and referrals matter; mention "sin compromiso" frequently

---

## 17 — USA Channel Guidelines

**Channel context**: USA market — English-speaking, email-first, more formal, higher price sensitivity awareness, expects professionalism upfront.

**Communication style**:
- Language: English always
- Platform: Email first; LinkedIn DM as alternative first touch; WhatsApp only if client initiates on that platform
- Tone: Professional but approachable. Concise. Respect their time.
- First contact: Email (Template 01 EN) or LinkedIn DM variant
- Proposal delivery: Always email
- Follow-up: Email at 3-day intervals; max 3 follow-ups before pausing

**Sequence** (USA outbound):
1. Email or LinkedIn DM (Template 01 EN)
2. If reply received: Email with proposal link locked (Template 02 EN)
3. Automated: Email verification (Template 03 EN)
4. Automated: Pricing unlocked (Template 04 EN)
5. Email follow-up at 3 days if proposal not viewed
6. Email: Payment abandoned follow-up (Template 07 EN) if checkout abandoned
7. Automated: Payment Success → Intake (Template 08 EN)
8. All subsequent emails in English

**USA market notes**:
- Emphasize: ownership, no lock-in, you own everything
- Emphasize: turnaround time (faster than most agencies)
- De-emphasize: price upfront (use "starting from $1,500" only; full pricing after verification)
- Social proof: Reference USA-based clients or case studies when available
- CAN-SPAM compliance: All marketing emails must include physical address and unsubscribe link
- Time zones: US clients span ET to PT; schedule follow-ups for 9–11 AM in their time zone

---

## Implementation Notes

### Zoho CRM Email Templates
1. Go to Zoho CRM → Setup → Templates → Email Templates
2. Create one template per email above
3. Map `{{variable_name}}` to the corresponding Zoho merge field
4. Set the "From" address to the agent's Arumaldo email

### Zoho CRM Workflow Triggers
- Template 03 (Email Verification): Triggered by pricing unlock form submission
- Template 04 (Pricing Unlocked): Triggered by CRM webhook on email verification
- Template 05 (Proposal Received): Triggered by inbound webform submission
- Template 08 (Payment Success): Triggered by Zoho Billing payment webhook
- Template 09 (Intake Reminder): Scheduled 48h after payment if intake_status ≠ submitted

### WhatsApp Templates
- Use WhatsApp Business API for automated messages
- Manual messages can be sent directly from WhatsApp Business app
- All templates starting with "Hola {{first_name}}" match WhatsApp template message format

### Subject Line A/B Tests (future)
- Template 06 EN alt: "We built something for you — take a look"
- Template 08 EN alt: "You're in! Here's what happens next"
- Template 13 EN alt: "{{first_name}}, your site is live"
