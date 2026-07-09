const { sendResultEmail } = require("../lib/result-email");

module.exports = async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST, OPTIONS");
    res.status(405).json({ ok: false, error: "Method not allowed" });
    return;
  }

  try {
    const payload = parseBody(req.body);
    await sendResultEmail(payload);

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      error: error.message || "Erro ao enviar e-mail.",
    });
  }
};

function parseBody(body) {
  if (!body) return {};
  if (typeof body === "object") return body;

  return JSON.parse(body);
}
