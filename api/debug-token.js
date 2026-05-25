module.exports = async function handler(req, res) {
  const params = new URLSearchParams({
    grant_type:    "refresh_token",
    client_id:     process.env.ZOHO_CLIENT_ID,
    client_secret: process.env.ZOHO_CLIENT_SECRET,
    refresh_token: process.env.ZOHO_REFRESH_TOKEN,
  });

  const body = params.toString();
  
  const r = await fetch("https://accounts.zoho.com/oauth/v2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = await r.json();
  res.status(200).json({
    status: r.status,
    body_sent: body.replace(process.env.ZOHO_REFRESH_TOKEN, '[REDACTED]').replace(process.env.ZOHO_CLIENT_SECRET, '[REDACTED]'),
    zoho_response: data,
  });
};
