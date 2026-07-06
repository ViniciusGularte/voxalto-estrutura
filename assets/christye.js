const CHRISTYE_WHATSAPP =
  "https://api.whatsapp.com/send/?phone=5519996527253&type=phone_number&app_absent=0";

const TESTS = {
  "roda-emocional": {
    title: "Roda Emocional",
    eyebrow: "Autopercepcao emocional",
    intro:
      "Mapeie como estao as principais areas da sua vida emocional neste momento.",
    scale: ["Muito baixo", "Baixo", "Medio", "Bom", "Muito bom"],
    dimensions: {
      energia: "Energia",
      clareza: "Clareza mental",
      limites: "Limites",
      relacoes: "Relacoes",
      descanso: "Descanso",
      autoestima: "Autoestima",
      proposito: "Proposito",
      regulacao: "Regulacao emocional",
    },
    questions: [
      ["energia", "Tenho energia emocional para cumprir minha rotina."],
      ["clareza", "Consigo organizar pensamentos antes de tomar decisoes."],
      ["limites", "Consigo dizer nao quando algo ultrapassa meus limites."],
      ["relacoes", "Minhas relacoes me trazem seguranca e apoio."],
      ["descanso", "Tenho pausas reais para recuperar corpo e mente."],
      ["autoestima", "Reconheco meu valor mesmo quando erro."],
      ["proposito", "Sinto direcao nas escolhas que estou fazendo."],
      ["regulacao", "Consigo lidar com emocoes intensas sem me perder nelas."],
    ],
    result: function (scores) {
      const entries = Object.entries(scores);
      const avg =
        entries.reduce((sum, item) => sum + item[1].avg, 0) / entries.length;
      const lowest = entries.sort((a, b) => a[1].avg - b[1].avg)[0];
      const area = this.dimensions[lowest[0]];
      const title =
        avg >= 4
          ? "Boa sustentacao emocional"
          : avg >= 3
            ? "Emocional em reorganizacao"
            : "Pedido claro de cuidado";
      return {
        title,
        score: Math.round(avg * 20),
        summary:
          avg >= 4
            ? "Seu resultado mostra bons recursos internos. O proximo passo e manter rotina, limites e espacos de elaboracao."
            : avg >= 3
              ? "Ha areas funcionando bem, mas tambem sinais de sobrecarga. Um plano simples pode ajudar a recuperar direcao."
              : "O resultado sugere que sua base emocional pede acolhimento e acompanhamento mais proximo neste ciclo.",
        focus: "Area que mais pede atencao: " + area + ".",
        actions: [
          "Escolha uma pausa concreta para os proximos 7 dias.",
          "Nomeie a emocao dominante antes de reagir.",
          "Converse com uma profissional se o desgaste estiver recorrente.",
        ],
      };
    },
  },
  "projecao-de-vida": {
    title: "Projecao de Vida",
    eyebrow: "Direcao e metas",
    intro:
      "Entenda se suas escolhas atuais estao alinhadas com a vida que voce quer construir.",
    scale: ["Nada alinhado", "Pouco", "Parcial", "Alinhado", "Muito alinhado"],
    dimensions: {
      visao: "Visao de futuro",
      prioridades: "Prioridades",
      rotina: "Rotina",
      coragem: "Coragem de agir",
      suporte: "Rede de suporte",
    },
    questions: [
      ["visao", "Tenho clareza sobre o que quero construir nos proximos meses."],
      ["prioridades", "Minhas escolhas da semana refletem o que digo que importa."],
      ["rotina", "Minha rotina comporta meus objetivos sem me destruir."],
      ["coragem", "Dou passos mesmo quando ainda nao tenho certeza total."],
      ["suporte", "Tenho pessoas ou recursos que sustentam meu processo."],
      ["visao", "Consigo imaginar uma versao possivel e realista do meu futuro."],
      ["prioridades", "Sei diferenciar urgencia de prioridade."],
      ["rotina", "Consigo transformar intencao em agenda."],
      ["coragem", "Aceito ajustar a rota sem abandonar o objetivo."],
      ["suporte", "Peco ajuda quando percebo que estou travando."],
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
              : "Futuro pedindo reconexao",
        score: Math.round(avg * 20),
        summary:
          avg >= 4
            ? "Voce demonstra boa leitura de futuro e capacidade de transformar desejo em movimento."
            : avg >= 3
              ? "Existe desejo e algum movimento, mas alguns pontos precisam sair do campo mental e ganhar estrutura."
              : "Seu resultado sugere distanciamento entre desejo, rotina e energia disponivel. Recomecar pequeno pode ser decisivo.",
        focus: "Ponto de ajuste: " + this.dimensions[weakest[0]] + ".",
        actions: [
          "Defina uma meta de 30 dias, nao uma meta de vida inteira.",
          "Quebre a meta em uma acao de 20 minutos.",
          "Revise o que precisa ser pausado para abrir espaco ao novo.",
        ],
      };
    },
  },
  disc: {
    title: "Perfil DISC",
    eyebrow: "Comportamento e comunicacao",
    intro:
      "Identifique tendencias de decisao, comunicacao, ritmo e relacao com regras.",
    choices: [
      ["D", "Decido rapido e enfrento problemas de frente."],
      ["I", "Conecto pessoas e influencio pelo entusiasmo."],
      ["S", "Busco estabilidade, escuta e cooperacao."],
      ["C", "Analiso detalhes, criterios e riscos antes de agir."],
    ],
    questions: [
      "Quando surge um desafio, minha primeira tendencia e:",
      "Em reunioes, costumo contribuir mais quando posso:",
      "Sob pressao, normalmente eu:",
      "Quando alguem discorda de mim, tendo a:",
      "Meu ambiente ideal de trabalho valoriza:",
      "Para confiar em uma decisao, eu preciso de:",
      "Quando lidero uma tarefa, meu foco principal e:",
      "Em mudancas inesperadas, eu costumo:",
      "Recebo melhor um feedback quando ele vem com:",
      "Minha forma natural de motivar pessoas e:",
      "Antes de comecar algo importante, eu prefiro:",
      "Quando o grupo perde ritmo, eu tendo a:",
    ],
    result: function (scores) {
      const labels = {
        D: "Dominancia",
        I: "Influencia",
        S: "Estabilidade",
        C: "Conformidade",
      };
      const descriptions = {
        D: "Voce tende a ser direta, objetiva e orientada a resultado. Funciona bem com autonomia e metas claras.",
        I: "Voce tende a criar conexoes, comunicar ideias e movimentar ambientes pelo entusiasmo.",
        S: "Voce tende a sustentar vinculos, escutar pessoas e buscar seguranca nas mudancas.",
        C: "Voce tende a analisar criterios, qualidade e riscos antes de avancar.",
      };
      const ordered = Object.entries(scores).sort((a, b) => b[1].total - a[1].total);
      const top = ordered[0][0];
      const second = ordered[1][0];
      return {
        title: "Predominancia " + labels[top],
        score: Math.round((ordered[0][1].total / this.questions.length) * 100),
        summary: descriptions[top],
        focus: "Combinacao secundaria: " + labels[second] + ".",
        actions: [
          "Observe como seu perfil aparece sob pressao.",
          "Ajuste sua comunicacao ao perfil de quem recebe a mensagem.",
          "Use este resultado como ponto de conversa, nao como rotulo fixo.",
        ],
      };
    },
  },
  "big-five": {
    title: "Big Five",
    eyebrow: "Tracos de personalidade",
    intro:
      "Uma leitura inicial dos cinco grandes fatores: abertura, consciencia, extroversao, amabilidade e neuroticismo.",
    scale: ["Discordo muito", "Discordo", "Neutro", "Concordo", "Concordo muito"],
    dimensions: {
      O: "Abertura",
      C: "Consciencia",
      E: "Extroversao",
      A: "Amabilidade",
      N: "Sensibilidade emocional",
    },
    questions: [
      ["O", "Gosto de explorar ideias, experiencias e formas novas de ver a vida."],
      ["C", "Costumo me organizar para cumprir o que prometo."],
      ["E", "Sinto energia ao interagir com pessoas."],
      ["A", "Tenho facilidade em considerar necessidades dos outros."],
      ["N", "Minhas emocoes ficam intensas com facilidade."],
      ["O", "Prefiro rotinas sempre iguais.", true],
      ["C", "Deixo tarefas importantes para a ultima hora.", true],
      ["E", "Preciso de longos periodos sozinha para me recuperar.", true],
      ["A", "Sou competitiva a ponto de ignorar o impacto nos outros.", true],
      ["N", "Mantenho calma mesmo em situacoes de tensao.", true],
      ["O", "Aprender algo novo me renova."],
      ["C", "Tenho disciplina para transformar planos em pratica."],
      ["E", "Costumo me expressar com facilidade em grupos."],
      ["A", "Escuto antes de concluir."],
      ["N", "Preocupacoes pequenas podem ocupar muito espaco mental."],
    ],
    result: function (scores) {
      const ordered = Object.entries(scores).sort((a, b) => b[1].avg - a[1].avg);
      const top = ordered[0][0];
      const high = this.dimensions[top];
      const avg =
        Object.values(scores).reduce((sum, item) => sum + item.avg, 0) /
        Object.values(scores).length;
      return {
        title: "Traco mais evidente: " + high,
        score: Math.round(avg * 20),
        summary:
          "Seu mapa mostra quais tendencias aparecem com mais forca agora. Isso ajuda a entender energia, relacoes, organizacao e respostas emocionais.",
        focus:
          top === "N"
            ? "Sensibilidade emocional alta pede estrategias de regulacao e descanso."
            : high + " aparece como uma forca importante no seu perfil.",
        actions: [
          "Leia o resultado como um retrato do momento.",
          "Observe onde o traco vira potencia e onde vira excesso.",
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
  const answers = new Array(test.questions.length).fill(null);

  title.textContent = test.title;
  intro.textContent = test.intro;
  eyebrow.textContent = test.eyebrow;
  document.title = test.title + " | Christye Biagio";

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
        ? "Escolha uma opcao para avancar."
        : currentIndex === test.questions.length - 1
          ? "Tudo pronto para gerar seu resultado."
          : "Opcao registrada. Voce pode continuar ou alterar.";
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
        : "Opcao registrada. Voce pode continuar ou alterar.";
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
      helper.textContent = "Marque uma opcao antes de continuar.";
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
    const shareText = `${name}, seu resultado no teste ${test.title}: ${result.title}. Pontuacao: ${result.score}/100. ${result.focus}`;
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
          "Ola, sou " +
            name +
            " e fiz o teste " +
            test.title +
            ". Meu WhatsApp e " +
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
            const labels = { D: "Dominancia", I: "Influencia", S: "Estabilidade", C: "Conformidade" };
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
