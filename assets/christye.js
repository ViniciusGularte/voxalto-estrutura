const CHRISTYE_WHATSAPP =
  "https://api.whatsapp.com/send/?phone=5519996527253&type=phone_number&app_absent=0";
const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxx-4KdNMtTggWAFCGsXiO3YKmJFcox9UOqvzRH0DsxTJ6x72ganO9X-rWC7Ch6WBLU7w/exec";

const TESTS = {
  "roda-emocional": {
    title: "Roda Emocional",
    eyebrow: "Roda da inteligência emocional",
    intro:
      "Avalie competências de 1 a 10 e escolha um plano de ação simples para evoluir.",
    mode: "wheel",
    competencies: [
      ["autoconsciencia", "Autoconsciência emocional", "Autoconhecimento", "#0b2d67"],
      ["autoavaliacao", "Autoavaliação correta", "Autoconhecimento", "#0b2d67"],
      ["autoconfianca", "Autoconfiança", "Autoconhecimento", "#0b2d67"],
      ["autocontrole", "Autocontrole", "Autogerenciamento", "#0f8b92"],
      ["confiabilidade", "Confiabilidade", "Autogerenciamento", "#0f8b92"],
      ["consciencia", "Consciência organizacional", "Autogerenciamento", "#0f8b92"],
      ["foco", "Foco", "Motivação", "#8d22a8"],
      ["iniciativa", "Iniciativa", "Motivação", "#8d22a8"],
      ["realizacao", "Orientação de realização", "Motivação", "#8d22a8"],
      ["comunicacao", "Comunicação eficaz", "Gerenciamento do outro", "#f45b00"],
      ["lideranca", "Liderança e influência", "Gerenciamento do outro", "#f45b00"],
      ["empatia", "Empatia", "Gerenciamento do outro", "#1264c8"],
    ],
    planOptions: [
      "Praticar uma pausa consciente antes de reagir.",
      "Pedir feedback objetivo para uma pessoa de confiança.",
      "Definir uma ação pequena para a competência com menor nota.",
      "Registrar gatilhos emocionais por 7 dias.",
      "Conversar com uma profissional para transformar o resultado em plano.",
    ],
    result: function (scores) {
      const entries = Object.entries(scores);
      const avg = entries.reduce((sum, item) => sum + item[1].value, 0) / entries.length;
      const lowest = entries.sort((a, b) => a[1].value - b[1].value)[0];
      const area = lowest[1].label;
      const title =
        avg >= 8
          ? "Boa sustentação emocional"
          : avg >= 6
            ? "Emocional em reorganização"
            : "Pedido claro de cuidado";
      return {
        title,
        score: Math.round(avg * 10),
        summary:
          avg >= 8
            ? "Seu resultado mostra bons recursos internos. O próximo passo é manter rotina, limites e espaços de elaboração."
            : avg >= 6
              ? "Há áreas funcionando bem, mas também sinais de sobrecarga. Um plano simples pode ajudar a recuperar direção."
              : "O resultado sugere que sua base emocional pede acolhimento e acompanhamento mais próximo neste ciclo.",
        focus: "Área que mais pede atenção: " + area + ".",
        actions: scores.__plan || this.planOptions.slice(0, 3),
      };
    },
  },
  "projecao-de-vida": {
    title: "Projeção de Vida",
    eyebrow: "Direção e metas",
    intro:
      "Entenda se suas escolhas atuais estão alinhadas com a vida que você quer construir.",
    scale: ["Nada alinhado", "Pouco", "Parcial", "Alinhado", "Muito alinhado"],
    dimensions: {
      visao: "Visão de futuro",
      prioridades: "Prioridades",
      rotina: "Rotina",
      coragem: "Coragem de agir",
      suporte: "Rede de suporte",
    },
    questions: [
      ["visao", "Tenho clareza sobre o que quero construir nos próximos meses."],
      ["prioridades", "Minhas escolhas da semana refletem o que digo que importa."],
      ["rotina", "Minha rotina comporta meus objetivos sem me destruir."],
      ["coragem", "Dou passos mesmo quando ainda não tenho certeza total."],
      ["suporte", "Tenho pessoas ou recursos que sustentam meu processo."],
      ["visao", "Consigo imaginar uma versão possível e realista do meu futuro."],
      ["prioridades", "Sei diferenciar urgência de prioridade."],
      ["rotina", "Consigo transformar intenção em agenda."],
      ["coragem", "Aceito ajustar a rota sem abandonar o objetivo."],
      ["suporte", "Peço ajuda quando percebo que estou travando."],
    ],
    result: function (scores) {
      const avg =
        Object.values(scores).reduce((sum, item) => sum + item.avg, 0) /
        Object.values(scores).length;
      const weakest = Object.entries(scores).sort((a, b) => a[1].avg - b[1].avg)[0];
      return {
        title:
          avg >= 4
            ? "Caminho bem direcionado"
            : avg >= 3
              ? "Potencial com ajustes de rota"
              : "Futuro pedindo reconexão",
        score: Math.round(avg * 20),
        summary:
          avg >= 4
            ? "Você demonstra boa leitura de futuro e capacidade de transformar desejo em movimento."
            : avg >= 3
              ? "Existe desejo e algum movimento, mas alguns pontos precisam sair do campo mental e ganhar estrutura."
              : "Seu resultado sugere distanciamento entre desejo, rotina e energia disponível. Recomeçar pequeno pode ser decisivo.",
        focus: "Ponto de ajuste: " + this.dimensions[weakest[0]] + ".",
        actions: [
          "Defina uma meta de 30 dias, não uma meta de vida inteira.",
          "Quebre a meta em uma ação de 20 minutos.",
          "Revise o que precisa ser pausado para abrir espaço ao novo.",
        ],
      };
    },
  },
  disc: {
    title: "Perfil DISC",
    eyebrow: "Comportamento e comunicação",
    intro:
      "Identifique tendências de decisão, comunicação, ritmo e relação com regras.",
    choices: [
      ["D", "Decido rápido e enfrento problemas de frente."],
      ["I", "Conecto pessoas e influencio pelo entusiasmo."],
      ["S", "Busco estabilidade, escuta e cooperação."],
      ["C", "Analiso detalhes, critérios e riscos antes de agir."],
    ],
    questions: [
      "Quando surge um desafio, minha primeira tendência é:",
      "Em reuniões, costumo contribuir mais quando posso:",
      "Sob pressão, normalmente eu:",
      "Quando alguém discorda de mim, tendo a:",
      "Meu ambiente ideal de trabalho valoriza:",
      "Para confiar em uma decisão, eu preciso de:",
      "Quando lidero uma tarefa, meu foco principal é:",
      "Em mudanças inesperadas, eu costumo:",
      "Recebo melhor um feedback quando ele vem com:",
      "Minha forma natural de motivar pessoas é:",
      "Antes de começar algo importante, eu prefiro:",
      "Quando o grupo perde ritmo, eu tendo a:",
    ],
    result: function (scores) {
      const labels = {
        D: "Dominância",
        I: "Influência",
        S: "Estabilidade",
        C: "Conformidade",
      };
      const descriptions = {
        D: "Você tende a ser direta, objetiva e orientada a resultado. Funciona bem com autonomia e metas claras.",
        I: "Você tende a criar conexões, comunicar ideias e movimentar ambientes pelo entusiasmo.",
        S: "Você tende a sustentar vínculos, escutar pessoas e buscar segurança nas mudanças.",
        C: "Você tende a analisar critérios, qualidade e riscos antes de avançar.",
      };
      const ordered = Object.entries(scores).sort((a, b) => b[1].total - a[1].total);
      const top = ordered[0][0];
      const second = ordered[1][0];
      return {
        title: "Predominância " + labels[top],
        score: Math.round((ordered[0][1].total / this.questions.length) * 100),
        summary: descriptions[top],
        focus: "Combinação secundária: " + labels[second] + ".",
        actions: [
          "Observe como seu perfil aparece sob pressão.",
          "Ajuste sua comunicação ao perfil de quem recebe a mensagem.",
          "Use este resultado como ponto de conversa, não como rótulo fixo.",
        ],
      };
    },
  },
  "big-five": {
    title: "Big Five",
    eyebrow: "Traços de personalidade",
    intro:
      "Uma leitura inicial dos cinco grandes fatores: abertura, consciência, extroversão, amabilidade e neuroticismo.",
    scale: ["Discordo muito", "Discordo", "Neutro", "Concordo", "Concordo muito"],
    dimensions: {
      O: "Abertura",
      C: "Consciência",
      E: "Extroversão",
      A: "Amabilidade",
      N: "Sensibilidade emocional",
    },
    questions: [
      ["O", "Gosto de explorar ideias, experiências e formas novas de ver a vida."],
      ["C", "Costumo me organizar para cumprir o que prometo."],
      ["E", "Sinto energia ao interagir com pessoas."],
      ["A", "Tenho facilidade em considerar necessidades dos outros."],
      ["N", "Minhas emoções ficam intensas com facilidade."],
      ["O", "Prefiro rotinas sempre iguais.", true],
      ["C", "Deixo tarefas importantes para a última hora.", true],
      ["E", "Preciso de longos períodos sozinha para me recuperar.", true],
      ["A", "Sou competitiva a ponto de ignorar o impacto nos outros.", true],
      ["N", "Mantenho calma mesmo em situações de tensão.", true],
      ["O", "Aprender algo novo me renova."],
      ["C", "Tenho disciplina para transformar planos em prática."],
      ["E", "Costumo me expressar com facilidade em grupos."],
      ["A", "Escuto antes de concluir."],
      ["N", "Preocupações pequenas podem ocupar muito espaço mental."],
    ],
    result: function (scores) {
      const ordered = Object.entries(scores).sort((a, b) => b[1].avg - a[1].avg);
      const top = ordered[0][0];
      const high = this.dimensions[top];
      const avg =
        Object.values(scores).reduce((sum, item) => sum + item.avg, 0) /
        Object.values(scores).length;
      return {
        title: "Traço mais evidente: " + high,
        score: Math.round(avg * 20),
        summary:
          "Seu mapa mostra quais tendências aparecem com mais força agora. Isso ajuda a entender energia, relações, organização e respostas emocionais.",
        focus:
          top === "N"
            ? "Sensibilidade emocional alta pede estratégias de regulação e descanso."
            : high + " aparece como uma força importante no seu perfil.",
        actions: [
          "Leia o resultado como um retrato do momento.",
          "Observe onde o traço vira potência e onde vira excesso.",
          "Use a devolutiva profissional para transformar insight em plano.",
        ],
      };
    },
  },
};

function qs(selector, root) {
  return (root || document).querySelector(selector);
}

function qsa(selector, root) {
  return Array.from((root || document).querySelectorAll(selector));
}

function observeReveals(root) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  qsa(".reveal", root || document).forEach((node) => {
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
      node.classList.add("visible");
      return;
    }
    observer.observe(node);
  });
}

function initCommon() {
  const header = qs("[data-header]");
  const setHeader = () => {
    if (!header) return;
    header.classList.toggle("bg-[#fbf8f3]/90", window.scrollY > 30);
    header.classList.toggle("shadow-sm", window.scrollY > 30);
    header.classList.toggle("backdrop-blur-xl", window.scrollY > 30);
  };
  setHeader();
  window.addEventListener("scroll", setHeader, { passive: true });

  observeReveals();

  qsa("[data-faq]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest("[data-faq-item]");
      const panel = qs("[data-faq-panel]", item);
      const icon = qs("[data-faq-icon]", item);
      const open = panel.style.maxHeight && panel.style.maxHeight !== "0px";
      qsa("[data-faq-panel]").forEach((p) => {
        p.style.maxHeight = "0px";
      });
      qsa("[data-faq-icon]").forEach((i) => i.classList.remove("rotate-45"));
      if (!open) {
        panel.style.maxHeight = panel.scrollHeight + "px";
        icon.classList.add("rotate-45");
      }
    });
  });
}

function normalizePhone(value) {
  return String(value || "").replace(/\D/g, "");
}

function saveLeadToSheet(payload) {
  if (!GOOGLE_SHEETS_WEB_APP_URL) return Promise.resolve();

  return fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({
      createdAt: new Date().toISOString(),
      page: window.location.pathname,
      ...payload,
    }),
  }).catch(() => {});
}

function initWheelTestPage(test, elements) {
  const {
    form,
    progress,
    modal,
    leadForm,
    loading,
    resultSection,
    resultCard,
    testId,
  } = elements;
  const values = Object.fromEntries(
    test.competencies.map(([key, label, group, color]) => [
      key,
      { label, group, color, value: 5 },
    ]),
  );
  let selectedPlan = test.planOptions.slice(0, 2);
  let currentScores = null;
  let currentStep = 1;

  form.innerHTML = `
    <div class="soft-shadow reveal w-full rounded-3xl border border-[#e7def2] bg-white p-5 md:p-8">
      <div class="flex flex-col gap-4 border-b border-[#e6ddec] pb-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p data-wheel-step class="text-xs font-extrabold uppercase tracking-[0.24em] text-[#8052c6]"></p>
          <h2 data-wheel-heading class="mt-2 font-serif text-3xl font-semibold text-[#17213f]"></h2>
        </div>
        <div class="flex gap-2 text-xs font-extrabold text-[#223873]">
          <span data-step-pill="1" class="rounded-full px-3 py-2 ring-1 ring-[#e6ddec]">1 Avaliação</span>
          <span data-step-pill="2" class="rounded-full px-3 py-2 ring-1 ring-[#e6ddec]">2 Plano</span>
        </div>
      </div>
      <div data-wheel-stage class="mt-7"></div>
    </div>`;

  const stage = qs("[data-wheel-stage]", form);
  const stepLabel = qs("[data-wheel-step]", form);
  const heading = qs("[data-wheel-heading]", form);

  function setStep(step) {
    currentStep = step;
    qsa("[data-step-pill]", form).forEach((pill) => {
      const active = pill.dataset.stepPill === String(step);
      pill.classList.toggle("bg-[#223873]", active);
      pill.classList.toggle("text-white", active);
    });
    progress.textContent = `${step}/2`;
  }

  function renderAssessment() {
    setStep(1);
    stepLabel.textContent = "Etapa 1";
    heading.textContent = "Preencha sua avaliação";
    const groups = [...new Set(test.competencies.map((item) => item[2]))];
    stage.innerHTML = `
      <div class="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div class="rounded-2xl bg-[#f8f4ff] p-5 ring-1 ring-[#e7def2]">
          <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8052c6]">Como responder</p>
          <p class="mt-3 leading-7 text-[#526079]">Avalie cada competência de 1 a 10. No celular, use os controles abaixo; o gráfico é apenas uma prévia do resultado.</p>
          <div data-wheel-preview class="mt-5"></div>
        </div>
        <div class="grid gap-5">
          ${groups
            .map(
              (group) => `
              <section class="grid gap-3">
                <h3 class="text-sm font-extrabold uppercase tracking-[0.18em] text-[#223873]">${group}</h3>
                ${test.competencies
                  .filter((item) => item[2] === group)
                  .map(([key, label, , color]) => renderSlider(key, label, color))
                  .join("")}
              </section>`,
            )
            .join("")}
          <button type="button" data-wheel-next class="btn inline-flex items-center justify-center rounded-2xl bg-[#8052c6] px-7 py-4 text-sm font-extrabold text-white">Continuar para o plano</button>
        </div>
      </div>`;

    updateWheelPreview();
    qsa("[data-wheel-score]", stage).forEach((input) => {
      input.addEventListener("input", () => {
        values[input.dataset.wheelScore].value = Number(input.value);
        qs(`[data-wheel-value="${input.dataset.wheelScore}"]`, stage).textContent =
          input.value;
        updateWheelPreview();
      });
    });
    qs("[data-wheel-next]", stage).addEventListener("click", renderPlan);
  }

  function renderSlider(key, label, color) {
    const score = values[key].value;
    return `
      <label class="wheel-slider rounded-2xl bg-white p-4 ring-1 ring-[#e6ddec]" style="--wheel-color:${color}">
        <span class="flex items-center justify-between gap-4">
          <span class="text-sm font-extrabold text-[#17213f]">${label}</span>
          <strong data-wheel-value="${key}" class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#223873] text-sm text-white">${score}</strong>
        </span>
        <input data-wheel-score="${key}" class="mt-4 w-full accent-[#8052c6]" type="range" min="1" max="10" value="${score}" />
        <span class="mt-2 flex justify-between text-[11px] font-bold uppercase tracking-[0.12em] text-[#7a8499]">
          <span>Precisa desenvolver</span>
          <span>Excelente</span>
        </span>
      </label>`;
  }

  function renderPlan() {
    setStep(2);
    stepLabel.textContent = "Etapa 2";
    heading.textContent = "Escolha seu plano de ação";
    const priorities = Object.values(values)
      .sort((a, b) => a.value - b.value)
      .slice(0, 3);
    stage.innerHTML = `
      <div class="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div class="rounded-2xl bg-[#f8f4ff] p-5 ring-1 ring-[#e7def2]">
          <p class="text-xs font-extrabold uppercase tracking-[0.2em] text-[#8052c6]">Prioridades sugeridas</p>
          <div class="mt-4 grid gap-3">
            ${priorities
              .map(
                (item) => `
                <div class="rounded-2xl bg-white p-4 ring-1 ring-[#e6ddec]">
                  <p class="text-sm font-extrabold text-[#223873]">${item.label}</p>
                  <p class="mt-1 text-sm text-[#526079]">Nota ${item.value}/10</p>
                </div>`,
              )
              .join("")}
          </div>
        </div>
        <div>
          <p class="leading-7 text-[#526079]">Marque até 3 ações para sair do teste com um próximo passo claro.</p>
          <div class="mt-4 grid gap-3">
            ${test.planOptions
              .map(
                (option) => `
                <label class="answer-option cursor-pointer">
                  <input class="sr-only" type="checkbox" data-plan-option value="${option}" ${
                    selectedPlan.includes(option) ? "checked" : ""
                  }>
                  <span class="flex min-h-[4.25rem] items-center rounded-2xl border border-[#e6ddec] bg-white px-4 py-3 text-sm font-extrabold leading-6 text-[#34405c]">${option}</span>
                </label>`,
              )
              .join("")}
          </div>
          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <button type="button" data-wheel-back class="btn inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-[#223873] ring-1 ring-[#e6ddec]">Voltar</button>
            <button type="button" data-wheel-finish class="btn inline-flex items-center justify-center rounded-2xl bg-[#8052c6] px-7 py-4 text-sm font-extrabold text-white">Gerar resultado</button>
          </div>
        </div>
      </div>`;

    qsa("[data-plan-option]", stage).forEach((input) => {
      input.addEventListener("change", () => {
        selectedPlan = qsa("[data-plan-option]:checked", stage).map((node) => node.value);
        if (selectedPlan.length > 3) {
          input.checked = false;
          selectedPlan = selectedPlan.filter((item) => item !== input.value);
        }
      });
    });
    qs("[data-wheel-back]", stage).addEventListener("click", renderAssessment);
    qs("[data-wheel-finish]", stage).addEventListener("click", finishWheel);
  }

  function updateWheelPreview() {
    const preview = qs("[data-wheel-preview]", form);
    if (!preview) return;
    preview.innerHTML = renderWheelChart(values, 320);
  }

  function finishWheel() {
    currentScores = Object.fromEntries(
      Object.entries(values).map(([key, data]) => [key, { ...data }]),
    );
    currentScores.__plan = selectedPlan.length ? selectedPlan : test.planOptions.slice(0, 2);
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("modal-open");
    qs("#lead-name").focus();
  }

  qsa("[data-close-modal]").forEach((button) =>
    button.addEventListener("click", () => {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
      document.body.classList.remove("modal-open");
    }),
  );

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = qs("#lead-name").value.trim();
    const phone = normalizePhone(qs("#lead-phone").value);
    if (!name || phone.length < 10) {
      leadForm.reportValidity();
      return;
    }

    const result = test.result(currentScores);
    saveLeadToSheet({
      testId,
      testTitle: test.title,
      name,
      phone,
      resultTitle: result.title,
      score: result.score,
      focus: result.focus,
      plan: currentScores.__plan,
      scores: currentScores,
    });

    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("modal-open");
    loading.classList.remove("hidden");
    resultSection.classList.add("hidden");

    window.setTimeout(() => {
      loading.classList.add("hidden");
      renderWheelResult(name, phone, result);
      resultSection.classList.remove("hidden");
      resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 900);
  });

  function renderWheelResult(name, phone, result) {
    const shareText = `${name}, seu resultado na ${test.title}: ${result.title}. Pontuação: ${result.score}/100. ${result.focus}`;
    resultCard.innerHTML = `
      <div class="soft-shadow rounded-3xl border border-[#e6ddec] bg-white p-6 md:p-8" data-download-card>
        <p class="text-xs font-extrabold uppercase tracking-[0.24em] text-[#8052c6]">Resultado de ${name}</p>
        <div class="mt-4 grid gap-7 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 class="font-serif text-4xl font-semibold leading-tight text-[#17213f]">${result.title}</h2>
            <p class="mt-4 leading-7 text-[#526079]">${result.summary}</p>
            <p class="mt-4 rounded-2xl bg-[#f0e6fb] px-4 py-3 text-sm font-extrabold text-[#223873]">${result.focus}</p>
          </div>
          <div>${renderWheelChart(currentScores, 420)}</div>
        </div>
        ${renderWheelBars(currentScores)}
        <div class="mt-7 grid gap-3 md:grid-cols-3">
          ${result.actions
            .map(
              (action) => `
              <div class="rounded-2xl bg-white/80 p-4 text-sm font-bold leading-6 text-[#526079] ring-1 ring-[#e6ddec]">${action}</div>`,
            )
            .join("")}
        </div>
        <p class="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#8052c6]">Christye Biagio · Terapia e desenvolvimento humano</p>
      </div>
      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" data-share-result class="btn inline-flex items-center justify-center rounded-2xl bg-[#223873] px-6 py-4 text-sm font-extrabold text-white">Compartilhar</button>
        <button type="button" data-download-result class="btn inline-flex items-center justify-center rounded-2xl bg-[#8052c6] px-6 py-4 text-sm font-extrabold text-white">Baixar print</button>
        <a class="btn inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-[#223873] ring-1 ring-[#e6ddec]" href="${CHRISTYE_WHATSAPP}&text=${encodeURIComponent(
          "Olá, sou " +
            name +
            " e fiz a " +
            test.title +
            ". Meu WhatsApp é " +
            phone +
            ". Resultado: " +
            result.title +
            " (" +
            result.score +
            "/100).",
        )}" target="_blank" rel="noopener noreferrer">Enviar para Christye</a>
      </div>`;

    qs("[data-share-result]", resultCard).addEventListener("click", () =>
      shareResult(shareText),
    );
    qs("[data-download-result]", resultCard).addEventListener("click", downloadResult);
  }

  renderAssessment();
}

function renderWheelChart(scores, size) {
  const entries = Object.values(scores).filter((item) => item && item.label);
  const center = size / 2;
  const radius = size * 0.38;
  const labelRadius = size * 0.46;
  const points = entries
    .map((item, index) => {
      const angle = (Math.PI * 2 * index) / entries.length - Math.PI / 2;
      const valueRadius = radius * (item.value / 10);
      return `${center + Math.cos(angle) * valueRadius},${center + Math.sin(angle) * valueRadius}`;
    })
    .join(" ");

  return `
    <svg class="wheel-chart mx-auto w-full" style="max-width:${size}px" viewBox="0 0 ${size} ${size}" role="img" aria-label="Gráfico da roda emocional">
      <circle cx="${center}" cy="${center}" r="${radius}" fill="#fbf8f3" stroke="#e6ddec" />
      ${[2, 4, 6, 8, 10]
        .map(
          (tick) =>
            `<circle cx="${center}" cy="${center}" r="${radius * (tick / 10)}" fill="none" stroke="#e6ddec" stroke-width="1" />`,
        )
        .join("")}
      ${entries
        .map((item, index) => {
          const angle = (Math.PI * 2 * index) / entries.length - Math.PI / 2;
          const x = center + Math.cos(angle) * radius;
          const y = center + Math.sin(angle) * radius;
          const lx = center + Math.cos(angle) * labelRadius;
          const ly = center + Math.sin(angle) * labelRadius;
          const anchor = Math.cos(angle) > 0.25 ? "start" : Math.cos(angle) < -0.25 ? "end" : "middle";
          return `
            <line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="${item.color}" stroke-width="1.2" />
            <text x="${lx}" y="${ly}" text-anchor="${anchor}" dominant-baseline="middle" fill="#223873" font-size="${size > 340 ? 10 : 9}" font-weight="800">${item.value}</text>`;
        })
        .join("")}
      <polygon points="${points}" fill="rgba(128,82,198,0.34)" stroke="#8052c6" stroke-width="3" />
      <circle cx="${center}" cy="${center}" r="${size * 0.1}" fill="#ffffff" stroke="#e6ddec" />
      <text x="${center}" y="${center - 3}" text-anchor="middle" font-size="${size > 340 ? 18 : 15}" fill="#17213f" font-family="serif">Christye</text>
      <text x="${center}" y="${center + 15}" text-anchor="middle" font-size="${size > 340 ? 14 : 12}" fill="#17213f" font-family="serif">Biagio</text>
    </svg>`;
}

function renderWheelBars(scores) {
  return `<div class="mt-7 grid gap-3 md:grid-cols-2">
    ${Object.values(scores)
      .filter((item) => item && item.label)
      .map(
        (item) => `
        <div class="rounded-2xl bg-white/80 p-4 ring-1 ring-[#e6ddec]">
          <div class="flex items-center justify-between gap-4">
            <p class="text-sm font-extrabold text-[#223873]">${item.label}</p>
            <p class="text-sm font-extrabold text-[#8052c6]">${item.value}/10</p>
          </div>
          <div class="mt-3 h-2 overflow-hidden rounded-full bg-[#e6ddec]"><span class="block h-full rounded-full" style="width:${item.value * 10}%; background:${item.color}"></span></div>
        </div>`,
      )
      .join("")}
  </div>`;
}

function initTestPage() {
  const testId = document.body.dataset.test;
  if (!testId || !TESTS[testId]) return;

  const test = TESTS[testId];
  const form = qs("#test-form");
  const title = qs("[data-test-title]");
  const intro = qs("[data-test-intro]");
  const eyebrow = qs("[data-test-eyebrow]");
  const progress = qs("[data-progress]");
  const modal = qs("#lead-modal");
  const leadForm = qs("#lead-form");
  const loading = qs("#loading-state");
  const resultSection = qs("#result-section");
  const resultCard = qs("#result-card");
  let currentScores = null;
  let currentIndex = 0;
  const answers = new Array((test.questions || []).length).fill(null);

  title.textContent = test.title;
  intro.textContent = test.intro;
  eyebrow.textContent = test.eyebrow;
  document.title = test.title + " | Christye Biagio";

  if (test.mode === "wheel") {
    initWheelTestPage(test, {
      form,
      progress,
      modal,
      leadForm,
      loading,
      resultSection,
      resultCard,
      testId,
    });
    return;
  }

  form.innerHTML = `
    <div class="soft-shadow reveal w-full rounded-3xl border border-[#e7def2] bg-white p-5 md:p-8">
      <div class="test-panel-top grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p data-question-label class="text-xs font-extrabold uppercase tracking-[0.24em] text-[#8052c6]"></p>
          <div class="mt-4 h-2 overflow-hidden rounded-full bg-[#e7def2]">
            <span data-progress-bar class="test-progress-fill block h-full rounded-full bg-[#8052c6]"></span>
          </div>
        </div>
        <div data-test-rail class="hidden items-center gap-2 md:flex"></div>
      </div>
      <div data-question-stage class="test-stage mt-8"></div>
      <div class="test-controls mt-7 flex flex-col gap-3 border-t border-[#e6ddec] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="button" data-prev-question class="btn inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-[#223873] ring-1 ring-[#e6ddec]">
          Voltar
        </button>
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <p data-test-helper class="text-center text-sm font-bold text-[#526079] sm:text-left"></p>
          <button type="button" data-next-question class="btn inline-flex items-center justify-center rounded-2xl bg-[#8052c6] px-7 py-4 text-sm font-extrabold text-white">
            Continuar
          </button>
        </div>
      </div>
    </div>`;

  const stage = qs("[data-question-stage]", form);
  const questionLabel = qs("[data-question-label]", form);
  const progressBar = qs("[data-progress-bar]", form);
  const rail = qs("[data-test-rail]", form);
  const helper = qs("[data-test-helper]", form);
  const previousButton = qs("[data-prev-question]", form);
  const nextButton = qs("[data-next-question]", form);

  function optionItems(question) {
    if (test.choices) {
      return test.choices;
    }

    return test.scale.map((item, scaleIndex) => [String(scaleIndex + 1), item]);
  }

  function questionText(question) {
    return Array.isArray(question) ? question[1] : question;
  }

  function updateProgress() {
    const answered = answers.filter((value) => value !== null).length;
    const pct = Math.round((answered / test.questions.length) * 100);
    progress.textContent = `${answered}/${test.questions.length}`;
    progressBar.style.width = `${pct}%`;
    questionLabel.textContent = `Pergunta ${currentIndex + 1} de ${test.questions.length}`;
    rail.innerHTML = test.questions
      .map((_, index) => {
        const state =
          index === currentIndex
            ? "bg-[#223873] ring-4 ring-[#8052c6]/15"
            : answers[index] !== null
              ? "bg-[#8052c6]"
              : "bg-[#d9cbea]";
        return `<span class="h-2.5 w-2.5 rounded-full ${state}" aria-hidden="true"></span>`;
      })
      .join("");
  }

  function renderQuestion() {
    const question = test.questions[currentIndex];
    const selected = answers[currentIndex];
    const options = optionItems(question);
    const optionGrid = test.choices ? "md:grid-cols-2" : "sm:grid-cols-5";

    stage.innerHTML = `
      <fieldset class="question-card">
        <legend class="max-w-[18rem] font-serif text-2xl font-semibold leading-tight text-[#17213f] sm:max-w-3xl sm:text-3xl md:text-5xl">
          ${questionText(question)}
        </legend>
        <div class="mt-8 grid gap-3 ${optionGrid}">
          ${options
            .map(
              ([value, label], optionIndex) => `
              <label class="answer-option cursor-pointer">
                <input class="sr-only" type="radio" name="active-question" value="${value}" ${
                  selected === value ? "checked" : ""
                }>
                <span class="flex min-h-[4.6rem] items-center gap-3 rounded-2xl border border-[#e6ddec] bg-white px-4 py-4 text-sm font-extrabold leading-6 text-[#34405c]">
                  <span class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f0e6fb] text-xs text-[#8052c6]">${optionIndex + 1}</span>
                  <span>${label}</span>
                </span>
              </label>`,
            )
            .join("")}
        </div>
      </fieldset>`;

    helper.textContent =
      selected === null
        ? "Escolha uma opção para avançar."
        : currentIndex === test.questions.length - 1
          ? "Tudo pronto para gerar seu resultado."
          : "Opção registrada. Você pode continuar ou alterar.";
    previousButton.disabled = currentIndex === 0;
    previousButton.classList.toggle("opacity-45", currentIndex === 0);
    nextButton.textContent =
      currentIndex === test.questions.length - 1 ? "Gerar resultado" : "Continuar";
    updateProgress();
  }

  observeReveals(form);

  stage.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement)) return;
    answers[currentIndex] = input.value;
    helper.textContent =
      currentIndex === test.questions.length - 1
        ? "Tudo pronto para gerar seu resultado."
        : "Opção registrada. Você pode continuar ou alterar.";
    updateProgress();

    if (currentIndex < test.questions.length - 1) {
      const indexAtSelection = currentIndex;
      window.setTimeout(() => {
        if (currentIndex === indexAtSelection && answers[currentIndex] !== null) {
          currentIndex += 1;
          renderQuestion();
        }
      }, 260);
    }
  });

  previousButton.addEventListener("click", () => {
    if (currentIndex === 0) return;
    currentIndex -= 1;
    renderQuestion();
  });

  nextButton.addEventListener("click", () => {
    if (answers[currentIndex] === null) {
      helper.textContent = "Marque uma opção antes de continuar.";
      stage.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(6px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 180 },
      );
      return;
    }

    if (currentIndex < test.questions.length - 1) {
      currentIndex += 1;
      renderQuestion();
      return;
    }

    finishTest();
  });

  renderQuestion();

  function calculateScores() {
    if (test.choices) {
      const scores = { D: { total: 0 }, I: { total: 0 }, S: { total: 0 }, C: { total: 0 } };
      test.questions.forEach((_, index) => {
        const value = answers[index];
        scores[value].total += 1;
      });
      return scores;
    }

    const buckets = {};
    Object.keys(test.dimensions).forEach((key) => {
      buckets[key] = { total: 0, count: 0, avg: 0 };
    });

    test.questions.forEach((question, index) => {
      const value = Number(answers[index]);
      const key = question[0];
      const reverse = question[2] === true;
      buckets[key].total += reverse ? 6 - value : value;
      buckets[key].count += 1;
    });

    Object.keys(buckets).forEach((key) => {
      buckets[key].avg = buckets[key].total / buckets[key].count;
    });
    return buckets;
  }

  function openModal() {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("modal-open");
    qs("#lead-name").focus();
  }

  function closeModal() {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
    document.body.classList.remove("modal-open");
  }

  qsa("[data-close-modal]").forEach((button) =>
    button.addEventListener("click", closeModal),
  );

  function finishTest() {
    if (answers.some((value) => value === null)) {
      const firstMissing = answers.findIndex((value) => value === null);
      currentIndex = firstMissing;
      renderQuestion();
      helper.textContent = "Responda esta pergunta para liberar o resultado.";
      return;
    }

    currentScores = calculateScores();
    openModal();
  }

  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = qs("#lead-name").value.trim();
    const phone = normalizePhone(qs("#lead-phone").value);
    if (!name || phone.length < 10) {
      leadForm.reportValidity();
      return;
    }

    const result = test.result(currentScores);
    saveLeadToSheet({
      testId,
      testTitle: test.title,
      name,
      phone,
      resultTitle: result.title,
      score: result.score,
      focus: result.focus,
      scores: currentScores,
      answers: answers.map((answer, index) => ({
        question: questionText(test.questions[index]),
        answer,
      })),
    });

    closeModal();
    loading.classList.remove("hidden");
    resultSection.classList.add("hidden");

    window.setTimeout(() => {
      loading.classList.add("hidden");
      renderResult(name, phone);
      resultSection.classList.remove("hidden");
      resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 1100);
  });

  function renderResult(name, phone) {
    const result = test.result(currentScores);
    const dimensions = renderDimensions(currentScores, test);
    const shareText = `${name}, seu resultado no teste ${test.title}: ${result.title}. Pontuação: ${result.score}/100. ${result.focus}`;
    resultCard.innerHTML = `
      <div class="soft-shadow rounded-3xl border border-[#e6ddec] bg-white p-6 md:p-8" data-download-card>
        <p class="text-xs font-extrabold uppercase tracking-[0.24em] text-[#8052c6]">Resultado de ${name}</p>
        <div class="mt-4 grid gap-6 lg:grid-cols-[1fr_180px] lg:items-center">
          <div>
            <h2 class="font-serif text-4xl font-semibold leading-tight text-[#17213f]">${result.title}</h2>
            <p class="mt-4 leading-7 text-[#526079]">${result.summary}</p>
            <p class="mt-4 rounded-2xl bg-[#f0e6fb] px-4 py-3 text-sm font-extrabold text-[#223873]">${result.focus}</p>
          </div>
          <div class="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-[10px] border-[#8052c6] bg-white text-center">
            <span class="font-serif text-5xl font-bold text-[#223873]">${result.score}</span>
          </div>
        </div>
        ${dimensions}
        <div class="mt-7 grid gap-3 md:grid-cols-3">
          ${result.actions
            .map(
              (action) => `
              <div class="rounded-2xl bg-white/80 p-4 text-sm font-bold leading-6 text-[#526079] ring-1 ring-[#e6ddec]">${action}</div>`,
            )
            .join("")}
        </div>
        <p class="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#8052c6]">Christye Biagio · Terapia e desenvolvimento humano</p>
      </div>
      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" data-share-result class="btn inline-flex items-center justify-center rounded-2xl bg-[#223873] px-6 py-4 text-sm font-extrabold text-white">Compartilhar</button>
        <button type="button" data-download-result class="btn inline-flex items-center justify-center rounded-2xl bg-[#8052c6] px-6 py-4 text-sm font-extrabold text-white">Baixar print</button>
        <a class="btn inline-flex items-center justify-center rounded-2xl bg-white px-6 py-4 text-sm font-extrabold text-[#223873] ring-1 ring-[#e6ddec]" href="${CHRISTYE_WHATSAPP}&text=${encodeURIComponent(
          "Olá, sou " +
            name +
            " e fiz o teste " +
            test.title +
            ". Meu WhatsApp é " +
            phone +
            ". Resultado: " +
            result.title +
            " (" +
            result.score +
            "/100).",
        )}" target="_blank" rel="noopener noreferrer">Enviar para Christye</a>
      </div>`;

    qs("[data-share-result]", resultCard).addEventListener("click", () =>
      shareResult(shareText),
    );
    qs("[data-download-result]", resultCard).addEventListener("click", downloadResult);
  }

  function renderDimensions(scores, currentTest) {
    if (currentTest.choices) {
      const total = currentTest.questions.length;
      return `<div class="mt-7 grid gap-3 md:grid-cols-4">
        ${Object.entries(scores)
          .map(([key, data]) => {
            const labels = { D: "Dominância", I: "Influência", S: "Estabilidade", C: "Conformidade" };
            const pct = Math.round((data.total / total) * 100);
            return `<div class="rounded-2xl bg-white/80 p-4 ring-1 ring-[#e6ddec]">
              <p class="text-xs font-extrabold uppercase tracking-[0.16em] text-[#8052c6]">${labels[key]}</p>
              <div class="mt-3 h-2 overflow-hidden rounded-full bg-[#e6ddec]"><span class="block h-full bg-[#8052c6]" style="width:${pct}%"></span></div>
              <p class="mt-2 text-sm font-extrabold text-[#223873]">${pct}%</p>
            </div>`;
          })
          .join("")}
      </div>`;
    }

    return `<div class="mt-7 grid gap-3 md:grid-cols-2">
      ${Object.entries(scores)
        .map(([key, data]) => {
          const pct = Math.round(data.avg * 20);
          return `<div class="rounded-2xl bg-white/80 p-4 ring-1 ring-[#e6ddec]">
            <div class="flex items-center justify-between gap-4">
              <p class="text-sm font-extrabold text-[#223873]">${currentTest.dimensions[key]}</p>
              <p class="text-sm font-extrabold text-[#8052c6]">${pct}%</p>
            </div>
            <div class="mt-3 h-2 overflow-hidden rounded-full bg-[#e6ddec]"><span class="block h-full bg-[#8052c6]" style="width:${pct}%"></span></div>
          </div>`;
        })
        .join("")}
    </div>`;
  }
}

async function shareResult(text) {
  if (navigator.share) {
    await navigator.share({ title: "Resultado do teste", text });
    return;
  }

  await navigator.clipboard.writeText(text);
  alert("Resultado copiado para compartilhar.");
}

async function downloadResult() {
  const card = qs("[data-download-card]");
  if (!card) return;
  if (!window.html2canvas) {
    window.print();
    return;
  }
  const canvas = await window.html2canvas(card, {
    backgroundColor: "#fbf8f3",
    scale: 2,
  });
  const link = document.createElement("a");
  link.download = "resultado-christye-biagio.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

document.addEventListener("DOMContentLoaded", () => {
  initCommon();
  initTestPage();
});
