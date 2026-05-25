/**
 * _zoho.js — Shared Zoho CRM OAuth2 helper for Vercel Functions
 *
 * Environment variables (set in Vercel dashboard → Project → Settings → Environment Variables):
 *   ZOHO_CLIENT_ID      "1000.5GNYX8KOGYLD227MF4YN2WH5FZGO8U"
 *   ZOHO_CLIENT_SECRET  "4117a2eddc7ef9e08d5369b017f697b914267392de"
 *   ZOHO_REFRESH_TOKEN  "1000.52bd1c8f0e7963945fbb5cef938a5bd0.b139d0330a79a6d437465da49d0c5416"
 *   ALLOWED_ORIGINS     "https://arumaldo.com,https://www.arumaldo.com" (or * for dev)
 */

const CRM_BASE  = "https://www.zohoapis.com/crm/v8";
const TOKEN_URL = "https://accounts.zoho.com/oauth/v2/token";

// In-memory token cache — lives for the lifetime of a warm function instance
let _token       = null;
let _tokenExpiry = 0;

/**
 * Returns a valid Zoho CRM access token, refreshing if needed.
 */
async function getAccessToken() {
  if (_token && Date.now() < _tokenExpiry - 60_000) return _token;

  const params = new URLSearchParams({
    grant_type:    "refresh_token",
    client_id:     (process.env.ZOHO_CLIENT_ID     || "").trim(),
    client_secret: (process.env.ZOHO_CLIENT_SECRET || "").trim(),
    refresh_token: (process.env.ZOHO_REFRESH_TOKEN || "").trim(),
  });

  const res  = await fetch(TOKEN_URL, {
    method:  "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body:    params.toString(),
  });

  const data = await res.json();
  if (!data.access_token) {
    throw new Error("Zoho token refresh failed: " + JSON.stringify(data));
  }

  _token       = data.access_token;
  _tokenExpiry = Date.now() + (data.expires_in || 3600) * 1000;
  return _token;
}

/**
 * Standard JSON headers for Zoho CRM API calls.
 */
function crmHeaders(token) {
  return {
    Authorization:  `Zoho-oauthtoken ${token}`,
    "Content-Type": "application/json",
  };
}

/**
 * CORS headers for browser form submissions.
 * Checks the request Origin against ALLOWED_ORIGINS env variable.
 */
function corsHeaders(origin) {
  const allowed = (process.env.ALLOWED_ORIGINS || "*")
    .split(",")
    .map(o => o.trim());

  const allowOrigin =
    allowed.includes("*") || allowed.includes(origin) ? origin || "*" : "";

  return {
    "Access-Control-Allow-Origin":  allowOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age":       "86400",
  };
}

/**
 * Applies CORS headers and returns a JSON response.
 * @param {object} res  - Vercel response object
 * @param {number} status
 * @param {object} body
 * @param {string} origin - request Origin header value
 */
function sendJson(res, status, body, origin = "") {
  const cors = corsHeaders(origin);
  Object.entries(cors).forEach(([k, v]) => res.setHeader(k, v));
  res.setHeader("Content-Type", "application/json");
  res.status(status).json(body);
}

module.exports = { CRM_BASE, getAccessToken, crmHeaders, corsHeaders, sendJson };
