const { Resend } = require("resend");

const DEFAULT_RECIPIENT_EMAIL = "psicologachristye@gmail.com";
const DEFAULT_FROM_EMAIL = "Christye Biagio <scan@withdonebetter.com>";

function getRecipientEmail() {
  return process.env.RESULT_EMAIL_TO || DEFAULT_RECIPIENT_EMAIL;
}

function getFromEmail() {
  return process.env.RESULT_EMAIL_FROM || DEFAULT_FROM_EMAIL;
}

function getResendApiKey() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("Configure RESEND_API_KEY para enviar e-mails pelo Resend.");
  }

  return process.env.RESEND_API_KEY;
}

async function sendResultEmail(payload) {
  const resend = new Resend(getResendApiKey());
  const receivedAt = formatDate(payload.createdAt || new Date().toISOString());
  const testTitle = payload.testTitle || "Teste";
  const name = payload.name || "Pessoa sem nome";
  const subject = `Novo resultado: ${testTitle} - ${name}`;

  const { data, error } = await resend.emails.send({
    from: getFromEmail(),
    to: getRecipientEmail(),
    subject,
    text: buildTextEmail(payload, receivedAt),
    html: buildHtmlEmail(payload, receivedAt),
  });

  if (error) {
    throw new Error(error.message || "Erro ao enviar e-mail pelo Resend.");
  }

  return data;
}

function buildTextEmail(payload, receivedAt) {
  return [
    "Uma pessoa acabou de finalizar um teste no site da Christye Biagio.",
    "",
    `Nome: ${present(payload.name)}`,
    `WhatsApp: ${present(payload.phone)}`,
    `Teste: ${present(payload.testTitle)}`,
    `Recebido em: ${receivedAt}`,
    `Página: ${present(payload.page)}`,
    "",
    "Resultado:",
    `${present(payload.resultTitle)} - ${present(payload.score)}/100`,
    present(payload.resultSummary),
    present(payload.focus),
    "",
    "Próximos passos:",
    formatList(payload.actions || payload.plan),
    "",
    "Detalhes do resultado:",
    formatScoreDetails(payload.scoreDetails),
    "",
    "Respostas:",
    formatAnswers(payload.answers),
  ].join("\n");
}

function buildHtmlEmail(payload, receivedAt) {
  return `
    <div style="margin:0;padding:24px;background:#fbf8f3;font-family:Arial,sans-serif;color:#17213f;line-height:1.5">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e6ddec;border-radius:18px;overflow:hidden">
        <div style="padding:24px;background:#223873;color:#ffffff">
          <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">Novo resultado recebido</p>
          <h1 style="margin:0;font-size:26px;line-height:1.25">${escapeHtml(
            payload.testTitle || "Teste",
          )}</h1>
        </div>

        <div style="padding:24px">
          <p style="margin:0 0 18px;font-size:16px">
            Uma pessoa acabou de finalizar um teste no site da Christye Biagio.
          </p>

          <div style="padding:16px;border:1px solid #e6ddec;border-radius:14px;background:#f8f4ff">
            ${renderRow("Nome", payload.name)}
            ${renderRow("WhatsApp", payload.phone)}
            ${renderRow("Recebido em", receivedAt)}
            ${renderRow("Página", payload.page)}
          </div>

          <h2 style="margin:26px 0 10px;font-size:20px;color:#223873">Resultado</h2>
          <div style="padding:18px;border-radius:16px;background:#fbf8f3;border:1px solid #e6ddec">
            <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#17213f">${escapeHtml(
              payload.resultTitle || "",
            )}</p>
            <p style="margin:0 0 12px;font-size:15px;color:#526079">
              Pontuação: <strong>${escapeHtml(present(payload.score))}/100</strong>
            </p>
            <p style="margin:0 0 12px">${escapeHtml(payload.resultSummary || "")}</p>
            <p style="margin:0;color:#223873;font-weight:700">${escapeHtml(
              payload.focus || "",
            )}</p>
          </div>

          <h2 style="margin:26px 0 10px;font-size:20px;color:#223873">Próximos passos</h2>
          ${renderList(payload.actions || payload.plan)}

          <h2 style="margin:26px 0 10px;font-size:20px;color:#223873">Detalhes do resultado</h2>
          ${renderScoreDetails(payload.scoreDetails)}

          <h2 style="margin:26px 0 10px;font-size:20px;color:#223873">Respostas</h2>
          ${renderAnswers(payload.answers)}
        </div>
      </div>
    </div>`;
}

function renderRow(label, value) {
  return `<p style="margin:6px 0"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(
    present(value),
  )}</p>`;
}

function renderList(items) {
  if (!items || !items.length) return '<p style="margin:0">Nenhum item informado.</p>';

  return `<ul style="margin:0;padding-left:20px">${items
    .map((item) => `<li style="margin:7px 0">${escapeHtml(item)}</li>`)
    .join("")}</ul>`;
}

function renderScoreDetails(items) {
  if (!items || !items.length) {
    return '<p style="margin:0">Nenhum detalhe informado.</p>';
  }

  return `
    <table style="width:100%;border-collapse:collapse;border:1px solid #e6ddec;border-radius:12px;overflow:hidden">
      <thead>
        <tr style="background:#f0e6fb;color:#223873;text-align:left">
          <th style="padding:10px;border-bottom:1px solid #e6ddec">Área</th>
          <th style="padding:10px;border-bottom:1px solid #e6ddec">Grupo</th>
          <th style="padding:10px;border-bottom:1px solid #e6ddec">Valor</th>
          <th style="padding:10px;border-bottom:1px solid #e6ddec">Extra</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
              <tr>
                <td style="padding:10px;border-bottom:1px solid #eee">${escapeHtml(
                  item.label,
                )}</td>
                <td style="padding:10px;border-bottom:1px solid #eee">${escapeHtml(
                  item.group,
                )}</td>
                <td style="padding:10px;border-bottom:1px solid #eee;font-weight:700">${escapeHtml(
                  item.value,
                )}</td>
                <td style="padding:10px;border-bottom:1px solid #eee">${escapeHtml(
                  item.percent || item.average || "",
                )}</td>
              </tr>`,
          )
          .join("")}
      </tbody>
    </table>`;
}

function renderAnswers(answers) {
  if (!answers || !answers.length) {
    return '<p style="margin:0">Esse teste não possui perguntas individuais para listar.</p>';
  }

  return `<ol style="margin:0;padding-left:20px">${answers
    .map(
      (answer) => `
        <li style="margin:12px 0">
          <strong>${escapeHtml(answer.question)}</strong><br>
          ${escapeHtml(formatAnswerValue(answer))}
        </li>`,
    )
    .join("")}</ol>`;
}

function formatList(items) {
  if (!items || !items.length) return "Nenhum item informado.";

  return items.map((item) => `- ${item}`).join("\n");
}

function formatScoreDetails(items) {
  if (!items || !items.length) return "Nenhum detalhe informado.";

  return items
    .map((item) =>
      [
        `- ${present(item.label)}`,
        item.group ? `grupo: ${item.group}` : "",
        item.value ? `valor: ${item.value}` : "",
        item.percent ? `percentual: ${item.percent}` : "",
        item.average ? `média: ${item.average}` : "",
      ]
        .filter(Boolean)
        .join(" | "),
    )
    .join("\n");
}

function formatAnswers(answers) {
  if (!answers || !answers.length) {
    return "Esse teste não possui perguntas individuais para listar.";
  }

  return answers
    .map(
      (answer, index) =>
        `${index + 1}. ${present(answer.question)}\nResposta: ${formatAnswerValue(answer)}`,
    )
    .join("\n\n");
}

function formatAnswerValue(answer) {
  const label = present(answer.answerLabel);
  const raw = present(answer.answer);

  if (label && raw && label !== raw) return `${label} (${raw})`;
  return label || raw;
}

function formatDate(value) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return present(value);

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "America/Sao_Paulo",
  }).format(date);
}

function escapeHtml(value) {
  return present(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function present(value) {
  return value === null || value === undefined ? "" : String(value);
}

module.exports = {
  buildHtmlEmail,
  buildTextEmail,
  sendResultEmail,
};
