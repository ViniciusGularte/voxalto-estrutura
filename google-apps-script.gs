const SPREADSHEET_ID = "1zb-45_G9ealoO1c_6VY2TaW-2H5dr2lkmjgrRfMXq9M";
const SHEET_NAME = "Leads";

const HEADERS = [
  "Recebido em",
  "Página",
  "Teste ID",
  "Teste",
  "Nome",
  "WhatsApp",
  "Resultado",
  "Pontuação",
  "Foco",
  "Plano",
  "Scores",
  "Respostas",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);

  try {
    const payload = JSON.parse((e.postData && e.postData.contents) || "{}");
    const sheet = getLeadsSheet_();

    sheet.appendRow([
      payload.createdAt || new Date().toISOString(),
      payload.page || "",
      payload.testId || "",
      payload.testTitle || "",
      payload.name || "",
      payload.phone || "",
      payload.resultTitle || "",
      payload.score || "",
      payload.focus || "",
      JSON.stringify(payload.plan || []),
      JSON.stringify(payload.scores || {}),
      JSON.stringify(payload.answers || []),
    ]);

    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return json_({ ok: true, service: "Christye Biagio Leads" });
}

function getLeadsSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function json_(data) {
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
