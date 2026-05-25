module.exports = async function handler(req, res) {
  res.status(200).json({
    has_client_id: !!process.env.ZOHO_CLIENT_ID,
    client_id_prefix: (process.env.ZOHO_CLIENT_ID || '').slice(0, 10),
    has_secret: !!process.env.ZOHO_CLIENT_SECRET,
    secret_len: (process.env.ZOHO_CLIENT_SECRET || '').length,
    has_refresh: !!process.env.ZOHO_REFRESH_TOKEN,
    node_version: process.version,
  });
};
