const { loadLocalEnv } = require("../lib/load-local-env");
const { sendResultEmail } = require("../lib/result-email");

loadLocalEnv();

const payload = {
  createdAt: new Date().toISOString(),
  page: "/testes/disc/",
  testId: "disc",
  testTitle: "Perfil DISC",
  name: "Teste Interno",
  phone: "11999999999",
  resultTitle: "Predominância Influência",
  resultSummary:
    "Você tende a se comunicar bem, criar conexões e animar o ambiente.",
  score: 67,
  focus: "Seu segundo jeito mais forte: Estabilidade.",
  actions: [
    "Observe como você age quando está sob pressão.",
    "Tente adaptar sua fala para quem está ouvindo.",
    "Use este resultado como reflexão, não como rótulo fixo.",
  ],
  scoreDetails: [
    { label: "Dominância", value: "2 respostas", percent: "17%" },
    { label: "Influência", value: "8 respostas", percent: "67%" },
    { label: "Estabilidade", value: "2 respostas", percent: "17%" },
    { label: "Conformidade", value: "0 respostas", percent: "0%" },
  ],
  answers: [
    {
      question: "Quando aparece um problema, eu costumo:",
      answer: "I",
      answerLabel: "Eu gosto de conversar, animar e conectar pessoas.",
    },
    {
      question: "Em conversas em grupo, eu me sinto melhor quando posso:",
      answer: "S",
      answerLabel: "Eu gosto de calma, segurança e cooperação.",
    },
  ],
};

sendResultEmail(payload)
  .then((result) => {
    console.log("E-mail de teste enviado pelo Resend.");
    console.log(`ID: ${result && result.id ? result.id : "sem id retornado"}`);
  })
  .catch((error) => {
    console.error("Falha ao enviar e-mail de teste:");
    console.error(error.message || error);
    process.exit(1);
  });
