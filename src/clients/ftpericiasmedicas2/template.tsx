/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import React, { useMemo, useState } from "react";
import { makeCtx } from "@/ui/ctx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CalendarClock,
  ChevronDown,
  ClipboardList,
  FileText,
  Gavel,
  IdCard,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

type PageProps = { data: any };

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function buildWaLink(base: string, text: string) {
  if (!base || base === "#") return "#";
  const joiner = base.includes("?") ? "&" : "?";
  return `${base}${joiner}text=${encodeURIComponent(text || "")}`;
}

function normalizeInstagramUrl(v: string) {
  const s = String(v || "").trim();
  if (!s || s === "#") return "#";
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  const handle = s.startsWith("@") ? s.slice(1) : s;
  return `https://instagram.com/${handle}`;
}

function splitEmphasis(text: string, keyword: string) {
  const t = text || "";
  const k = (keyword || "").trim();
  if (!k) return [{ t, emph: false }];
  const i = t.toLowerCase().indexOf(k.toLowerCase());
  if (i < 0) return [{ t, emph: false }];
  return [
    { t: t.slice(0, i), emph: false },
    { t: t.slice(i, i + k.length), emph: true },
    { t: t.slice(i + k.length), emph: false },
  ];
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M19.11 17.1c-.23-.12-1.35-.67-1.56-.75-.21-.08-.37-.12-.52.12-.15.23-.6.75-.73.9-.13.15-.26.17-.49.06-.23-.12-.97-.36-1.85-1.14-.68-.61-1.14-1.36-1.27-1.59-.13-.23-.01-.35.1-.47.1-.1.23-.26.35-.39.12-.13.15-.23.23-.38.08-.15.04-.29-.02-.41-.06-.12-.52-1.25-.71-1.72-.19-.46-.39-.4-.52-.41-.13-.01-.29-.02-.45-.02-.15 0-.41.06-.62.29-.21.23-.81.79-.81 1.93 0 1.14.83 2.24.94 2.39.12.15 1.63 2.49 3.95 3.49.55.24.98.38 1.32.49.55.17 1.05.15 1.45.09.44-.06 1.35-.55 1.54-1.08.19-.53.19-.98.13-1.08-.06-.1-.21-.15-.44-.26z"
      />
      <path
        fill="currentColor"
        d="M16.02 2.67C8.77 2.67 2.9 8.49 2.9 15.67c0 2.28.62 4.41 1.7 6.25L3.5 29.33l7.64-1.98c1.78.97 3.82 1.52 5.98 1.52 7.25 0 13.12-5.82 13.12-13.2 0-7.18-5.87-13-13.22-13zm0 23.77c-2 0-3.86-.56-5.45-1.53l-.39-.24-4.52 1.17 1.2-4.43-.26-.41a10.97 10.97 0 0 1-1.72-5.84c0-6.11 4.95-11.06 11.14-11.06 6.09 0 10.94 4.95 10.94 11.06 0 6.27-4.86 11.28-10.94 11.28z"
      />
    </svg>
  );
}

function IconFromName({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const n = (name || "").toLowerCase().trim();
  const map: Record<string, any> = {
    prazos: CalendarClock,
    prazo: CalendarClock,
    brasil: MapPin,
    atuação: MapPin,
    atuacao: MapPin,
    rigor: FileText,
    ciência: FileText,
    ciencia: FileText,
    segurança: ShieldCheck,
    seguranca: ShieldCheck,
    jurídico: Scale,
    juridico: Scale,
    processo: Gavel,
    laudos: FileText,
    laudo: FileText,
    quesitos: ClipboardList,
    assistência: BadgeCheck,
    assistencia: BadgeCheck,
    perícia: Stethoscope,
    pericia: Stethoscope,
    atendimento: MessageCircle,
    time: Users,
  };

  const Ico =
    map[n] ||
    (n.includes("laud") ? FileText : null) ||
    (n.includes("ques") ? ClipboardList : null) ||
    (n.includes("prazo") ? CalendarClock : null) ||
    (n.includes("segur") ? ShieldCheck : null) ||
    (n.includes("jur") ? Scale : null) ||
    (n.includes("proc") ? Gavel : null) ||
    (n.includes("peric") ? Stethoscope : null) ||
    BadgeCheck;

  return <Ico className={className} />;
}

export default function Page({ data }: PageProps) {
  const c = makeCtx(data);
  const reduce = useReducedMotion();

  const container = "mx-auto max-w-6xl px-5 sm:px-6";
  const ease: any = [0.22, 1, 0.36, 1];
  const dur = reduce ? 0 : 0.6;

  const anim = useMemo(() => {
    return {
      stagger: {
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : 0.07,
            delayChildren: reduce ? 0 : 0.04,
          },
        },
      },
      fadeUp: {
        hidden: { opacity: 0, y: reduce ? 0 : 14 },
        show: { opacity: 1, y: 0, transition: { duration: dur, ease } },
      },
      pop: {
        hidden: { opacity: 0, y: reduce ? 0 : 10, scale: reduce ? 1 : 0.985 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: dur, ease },
        },
      },
    };
  }, [reduce, dur]);

  // ====== BRAND (travado nas cores do logo) ======
  const brand = {
    logo: c.img("logo_da_empresa", "https://iili.io/fD10Vbj.png"),

    whatsapp: c.wa("whatsapp_contato", "+55 11 99999-9999"),
    mensagem_whatsapp: c.cfg(
      "mensagem_whatsapp",
      "Olá! Quero falar com a FT Perícias sobre um caso.",
    ),

    texto_botao_hero: c.cfg("texto_botao_hero", "CHAMAR NO WHATSAPP"),
    texto_menor_hero: c.cfg(
      "texto_menor_hero",
      "Resposta rápida. Atendimento direto.",
    ),

    hero_titulo: c.cfg(
      "titulo_principal",
      "Perícia médica com rigor técnico e linguagem adequada ao processo.",
    ),
    palavra_destaque_hero: c.cfg("palavra_destaque_hero", "rigor técnico"),
    hero_texto: c.cfg(
      "texto_principal",
      "Laudos, pareceres e assistência técnica para decisões seguras em ações cíveis, trabalhistas e previdenciárias.",
    ),
    hero_texto_2: c.cfg(
      "texto_principal_2",
      "Atendimento para advogados, empresas e pessoas físicas em todo o Brasil.",
    ),

    // Fundo abstrato/clean (você pode trocar por uma textura abstrata)
    hero_fundo: c.img(
      "imagem_fundo_topo",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80",
    ),
    hero_fundo_opacidade: c.cfg("opacidade_fundo_topo", "0.08"),

    cor_primaria: c.cfg("cor_primaria_hex", "#001e36"),
    cor_secundaria: c.cfg("cor_secundaria_hex", "#8d7a5f"),
    cor_fundo: c.cfg("cor_fundo_hex", "#ffffff"),
  };

  const waBase = brand.whatsapp || "#";
  const waPrimary = useMemo(
    () => buildWaLink(waBase, brand.mensagem_whatsapp),
    [waBase, brand.mensagem_whatsapp],
  );

  const heroPieces = splitEmphasis(
    brand.hero_titulo,
    brand.palavra_destaque_hero,
  );

  // ====== TOP PROOF (simples, sem “marquee”) ======
  const proofRaw = (c.tab("destaques_topo") || []) as any[];
  const proofFallback = [
    { icone: "brasil", titulo: "Atuação em todo o Brasil" },
    { icone: "prazos", titulo: "Prazos definidos e previsibilidade" },
    { icone: "jurídico", titulo: "Linguagem adequada ao processo" },
    { icone: "laudos", titulo: "Laudos e pareceres fundamentados" },
  ];
  const proof = (proofRaw.length ? proofRaw : proofFallback) as any[];

  // ====== SERVIÇOS (única seção) ======
  const servicosRaw = (c.tab("servicos_principais") || []) as any[];
  const servicosFallback = [
    {
      icone: "laudos",
      titulo: "Laudos e pareceres",
      descricao: "Documentos claros, objetivos e tecnicamente fundamentados.",
    },
    {
      icone: "processo",
      titulo: "Análise de documentos",
      descricao:
        "Leitura crítica de prontuários, exames, relatórios e petições.",
    },
    {
      icone: "quesitos",
      titulo: "Quesitos e impugnações",
      descricao: "Elaboração de quesitos e contestação técnica quando cabível.",
    },
    {
      icone: "assistência",
      titulo: "Assistência técnica pericial",
      descricao:
        "Acompanhamento do caso do início ao fim, com suporte ao processo.",
    },
    {
      icone: "jurídico",
      titulo: "Parecer para sustentar teses",
      descricao:
        "Suporte técnico para reforçar argumentos com base médica consistente.",
    },
    {
      icone: "rigor",
      titulo: "Casos de alta complexidade",
      descricao:
        "Consultoria aprofundada para decisões seguras e documentadas.",
    },
  ];
  const servicos = (
    servicosRaw.length ? servicosRaw : servicosFallback
  ) as any[];

  // ====== COMO FUNCIONA (3 passos) ======
  const como = {
    rotulo: c.cfg("rotulo_como_funciona", "Como funciona"),
    titulo: c.cfg("titulo_como_funciona", "Fluxo simples, sem ruído"),
    passos: ((c.tab("como_funciona") || []) as any[]).length
      ? ((c.tab("como_funciona") || []) as any[])
      : [
          {
            titulo: "Envie o resumo do caso",
            texto:
              "WhatsApp com contexto, prazos, documentos e objetivo do trabalho.",
          },
          {
            titulo: "Alinhamento técnico e escopo",
            texto: "Confirmamos viabilidade, tipo de entrega e prazo estimado.",
          },
          {
            titulo: "Entrega do material",
            texto:
              "Laudo/parecer com estrutura clara e linguagem compatível com o processo.",
          },
        ],
  };

  // ====== FAQ ======
  const faq = {
    rotulo: c.cfg("rotulo_faq", "Dúvidas frequentes"),
    titulo: c.cfg(
      "titulo_faq",
      "Precisa de um orçamento ou discutir seu caso?",
    ),
    items:
      ((c.tab("faq") || []) as any[]).length > 0
        ? ((c.tab("faq") || []) as any[])
        : [
            {
              pergunta: "Como funciona o primeiro contato?",
              resposta:
                "Você chama no WhatsApp, explica o caso e alinhamos orientação inicial e próximos passos.",
            },
            {
              pergunta: "Vocês atendem em todo o Brasil?",
              resposta:
                "Sim. Atuamos em todo o Brasil, de forma remota e presencial quando necessário.",
            },
            {
              pergunta: "Quais documentos preciso enviar?",
              resposta:
                "Em geral: prontuários, exames, relatórios, petição e laudo pericial (se houver).",
            },
            {
              pergunta: "Vocês fazem quesitos e impugnação?",
              resposta:
                "Sim. Auxiliamos na elaboração de quesitos e na contestação técnica quando aplicável.",
            },
          ],
  };

  // ====== RESPONSÁVEL TÉCNICO (apenas no final) ======
  const responsavel = {
    rotulo: c.cfg("rotulo_responsavel", "Responsável técnico"),
    nome: c.cfg("nome_responsavel", "Fábio Tonin"),
    credenciais: c.cfg(
      "credenciais_responsavel",
      "Médico há 15 anos | Atuação em processos cíveis, trabalhistas e previdenciários",
    ),
    texto: c.cfg(
      "bio_responsavel",
      "Atuação em perícias e pareceres com foco em rigor técnico, clareza e aderência às exigências médico-jurídicas.",
    ),
    foto: c.img("foto_responsavel", "https://iili.io/fDr0eeI.png"),
  };

  // ====== CTA FINAL ======
  const finalCta = {
    titulo: c.cfg("titulo_chamada_final", "Fale com a FT Perícias"),
    texto: c.cfg(
      "texto_chamada_final",
      "Envie um resumo do caso e retornamos com orientação inicial e próximos passos.",
    ),
    texto_botao: c.cfg("texto_botao_final", "CHAMAR NO WHATSAPP"),
    mensagem_botao: c.cfg(
      "mensagem_botao_final",
      "Olá! Preciso de um orçamento e gostaria de discutir meu caso.",
    ),
  };

  // ====== FOOTER (exatamente como você pediu) ======
  const footer = {
    whatsapp_label: c.cfg("texto_footer_whatsapp", "WhatsApp"),
    instagram_label: c.cfg("texto_footer_instagram", "Instagram"),
    localidade_label: c.cfg("texto_footer_localidade", "Localidade"),
    cnpj_label: c.cfg("texto_footer_cnpj", "CNPJ"),

    whatsapp_display: c.cfg("whatsapp_footer_display", "(11) 99999-9999"),
    instagram: c.cfg("instagram_footer", "@ftpericiasmedicas"),
    localidade: c.cfg("localidade_footer", "Campo Grande - Mato Grosso do Sul"),
    cnpj: c.cfg("cnpj_footer", "60.576.742/0001-91"),

    copyright: c.cfg(
      "texto_rodape_final",
      "© 2026 FT Perícias Médicas. Todos os direitos reservados.",
    ),
  };

  const instagramHref = useMemo(
    () => normalizeInstagramUrl(footer.instagram),
    [footer.instagram],
  );

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div
      className={cx(
        "min-h-screen bg-white text-slate-900 [font-family:Inter,system-ui,sans-serif]",
        "[--deep:var(--c-deep)] [--gold:var(--c-gold)] [--paper:var(--c-paper)]",
      )}
      style={
        {
          ["--c-deep" as any]: brand.cor_primaria,
          ["--c-gold" as any]: brand.cor_secundaria,
          ["--c-paper" as any]: brand.cor_fundo,
        } as any
      }
    >
      <style>{`
        .card {
          border-radius: 16px;
          border: 1px solid rgba(15, 23, 42, 0.10);
          box-shadow: 0 16px 55px rgba(2, 6, 23, 0.06);
          background: #ffffff;
        }
        .cardSoft {
          border-radius: 16px;
          border: 1px solid rgba(15, 23, 42, 0.10);
          background: rgba(255,255,255,0.70);
          backdrop-filter: blur(10px);
        }
        .btnPrimary {
          background: var(--deep);
          color: #fff;
        }
        .btnPrimary:hover { filter: brightness(0.95); }
        .btnGhost {
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.10);
          color: #fff;
        }
      `}</style>

      {/* HERO (novo layout) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[color:var(--deep)]" />
          <img
            src={brand.hero_fundo}
            alt={c.cfg("texto_alt_fundo_topo", "Imagem de fundo")}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: Number(brand.hero_fundo_opacidade || 0.08) }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--deep)] via-[color:var(--deep)] to-[#071523]" />
          {/* abstrato simples */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-32 -left-32 h-[520px] w-[520px] rounded-full bg-[color:var(--gold)]/25 blur-3xl" />
            <div className="absolute -bottom-44 -right-44 h-[620px] w-[620px] rounded-full bg-white/10 blur-3xl" />
          </div>
        </div>

        <div
          className={cx(container, "relative pt-10 sm:pt-12 pb-10 sm:pb-12")}
        >
          <motion.div variants={anim.stagger} initial="hidden" animate="show">
            {/* Header */}
            <motion.div
              variants={anim.fadeUp}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-start ml-[-40px] mb-[-40px] gap-3">
                <img
                  src={brand.logo}
                  alt={c.cfg("texto_alt_logo", "Logo")}
                  className="h-64 sm:h-64 w-auto object-contain"
                />
              </div>

              <a
                href={waPrimary}
                className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold btnGhost"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>{c.cfg("texto_botao_topo", "WhatsApp")}</span>
                <ArrowRight className="h-3.5 w-3.5 opacity-90" />
              </a>
            </motion.div>

            {/* Main */}
            <div className="mt-10 grid lg:grid-cols-12 gap-8 items-start">
              <motion.div variants={anim.fadeUp} className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-bold tracking-[0.20em] text-white/85">
                  {c.cfg(
                    "rotulo_hero",
                    "PERÍCIAS MÉDICAS E ASSISTÊNCIA TÉCNICA",
                  )}
                </div>

                <h1 className="mt-4 text-[38px] sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
                  {heroPieces.map((p, i) => (
                    <span
                      key={i}
                      className={p.emph ? "text-[color:var(--gold)]" : ""}
                    >
                      {p.t}
                    </span>
                  ))}
                </h1>

                <p className="mt-5 text-[15px] leading-[26px] text-white/85 max-w-2xl">
                  {brand.hero_texto}
                </p>
                <p className="mt-3 text-[15px] leading-[26px] text-white/80 max-w-2xl">
                  {brand.hero_texto_2}
                </p>

                <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
                  <a
                    href={waPrimary}
                    className="inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-black btnPrimary shadow-[0_18px_55px_rgba(0,0,0,0.25)]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span>{brand.texto_botao_hero}</span>
                    <ArrowRight className="h-4 w-4 opacity-90" />
                  </a>
                  <div className="text-xs text-white/70">
                    {brand.texto_menor_hero}
                  </div>
                </div>
              </motion.div>

              {/* Side contact card (conversão) */}
              <motion.div variants={anim.pop} className="lg:col-span-5">
                <div className="rounded-3xl bg-white/10 border border-white/15 backdrop-blur-xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-extrabold text-white">
                          {c.cfg(
                            "titulo_box_hero",
                            "Envie o caso e receba orientação inicial",
                          )}
                        </div>
                        <div className="mt-1 text-[13px] leading-[20px] text-white/75">
                          {c.cfg(
                            "texto_box_hero",
                            "WhatsApp direto com a equipe. Sem intermediários.",
                          )}
                        </div>
                      </div>
                      <div className="h-10 w-10 rounded-2xl bg-[color:var(--gold)]/20 border border-[color:var(--gold)]/25 grid place-items-center">
                        <MessageCircle className="h-4 w-4 text-[color:var(--gold)]" />
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-white/8 border border-white/12 p-4">
                      <div className="text-xs font-bold tracking-[0.18em] text-white/70">
                        {c.cfg("rotulo_lista_box_hero", "O QUE ENVIAR")}
                      </div>

                      <div className="mt-3 space-y-2">
                        {(((c.tab("checklist_whatsapp") as any[]) || []).length
                          ? (c.tab("checklist_whatsapp") as any[]) || []
                          : [
                              { t: "Contexto e objetivo do trabalho" },
                              { t: "Prontuários, exames e relatórios" },
                              { t: "Petição e laudo (se houver)" },
                            ]
                        ).map((it: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-0.5 h-5 w-5 rounded-full bg-white/10 border border-white/12 grid place-items-center">
                              <BadgeCheck className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                            </div>
                            <div className="text-[13px] leading-[20px] text-white/80">
                              {c.col(it, "t", it?.t || "Item")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={waPrimary}
                      className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-3 text-sm font-black text-white"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--gold), rgba(141,122,95,0.75))",
                      }}
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      <span>
                        {c.cfg("texto_botao_box_hero", "CHAMAR NO WHATSAPP")}
                      </span>
                      <ArrowRight className="h-4 w-4 opacity-90" />
                    </a>

                    <div className="mt-3 text-xs text-white/65">
                      {c.cfg(
                        "texto_mini_box_hero",
                        "Atuação em todo o Brasil. Prazos definidos no alinhamento.",
                      )}
                    </div>
                  </div>

                  <div className="h-2 w-full bg-[color:var(--gold)]/70" />
                </div>
              </motion.div>
            </div>

            {/* Proof bar (simples) */}
            <motion.div variants={anim.fadeUp} className="mt-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {proof.slice(0, 4).map((it, i) => {
                  const titulo = c.col(
                    it,
                    "titulo",
                    proofFallback[i]?.titulo || "Destaque",
                  );
                  const icon = c.col(
                    it,
                    "icone",
                    proofFallback[i]?.icone || "segurança",
                  );
                  return (
                    <div
                      key={i}
                      className="rounded-2xl bg-white/8 border border-white/12 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-white/10 border border-white/12 grid place-items-center">
                          <IconFromName
                            name={icon}
                            className="h-4 w-4 text-[color:var(--gold)]"
                          />
                        </div>
                        <div className="text-xs font-semibold text-white/85 leading-snug">
                          {titulo}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVIÇOS (único bloco) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={anim.fadeUp} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1">
                <span className="text-xs font-bold tracking-[0.18em] text-slate-700">
                  {c
                    .cfg("rotulo_servicos_principais", "SERVIÇOS")
                    .toUpperCase()}
                </span>
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {c.cfg(
                  "titulo_servicos_principais",
                  "Entregas técnicas, claras e úteis para o processo.",
                )}
              </h2>
              <p className="mt-4 text-[15px] leading-[26px] text-slate-700">
                {c.cfg(
                  "texto_servicos_principais",
                  "Selecione o tipo de entrega e alinhamos escopo e prazo no primeiro contato.",
                )}
              </p>
            </motion.div>

            <motion.div
              variants={anim.stagger}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {servicos.map((it, i) => {
                const titulo = c.col(
                  it,
                  "titulo",
                  servicosFallback[i]?.titulo || "Serviço",
                );
                const desc = c.col(
                  it,
                  "descricao",
                  servicosFallback[i]?.descricao || "",
                );
                const icon = c.col(
                  it,
                  "icone",
                  servicosFallback[i]?.icone || "laudos",
                );
                return (
                  <motion.div
                    key={i}
                    variants={anim.pop}
                    whileHover={reduce ? undefined : { y: -6 }}
                    className="card p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="h-11 w-11 rounded-xl grid place-items-center text-white shadow-[0_14px_40px_rgba(0,30,54,0.16)]"
                        style={{ background: "var(--deep)" }}
                      >
                        <IconFromName name={icon} className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="text-base font-extrabold text-slate-950">
                          {titulo}
                        </div>
                        <div className="mt-2 text-[13px] leading-[22px] text-slate-700">
                          {desc}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={anim.fadeUp} className="mt-10">
              <a
                href={waPrimary}
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-black btnPrimary shadow-[0_18px_50px_rgba(0,30,54,0.18)]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>
                  {c.cfg("texto_botao_servicos", "CHAMAR NO WHATSAPP")}
                </span>
                <ArrowRight className="h-4 w-4 opacity-90" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* COMO FUNCIONA (novo) */}
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={anim.fadeUp} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1">
                <span className="text-xs font-bold tracking-[0.18em] text-slate-700">
                  {como.rotulo.toUpperCase()}
                </span>
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {como.titulo}
              </h2>
            </motion.div>

            <motion.div
              variants={anim.stagger}
              className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {como.passos.slice(0, 3).map((it: any, idx: number) => {
                const t = c.col(it, "titulo", `Passo ${idx + 1}`);
                const a = c.col(it, "texto", "");
                return (
                  <motion.div
                    key={idx}
                    variants={anim.pop}
                    className="card p-6"
                  >
                    <div className="text-xs font-black tracking-[0.20em] text-[color:var(--gold)]">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-2 text-base font-extrabold text-slate-950">
                      {t}
                    </div>
                    <div className="mt-2 text-[13px] leading-[22px] text-slate-700">
                      {a}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ (clean) */}
      <section className="py-16 sm:py-20 bg-white">
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={anim.fadeUp} className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1">
                <span className="text-xs font-bold tracking-[0.18em] text-slate-700">
                  {faq.rotulo.toUpperCase()}
                </span>
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {faq.titulo}
              </h2>
            </motion.div>

            <motion.div
              variants={anim.stagger}
              className="mt-10 max-w-3xl space-y-3"
            >
              {faq.items.map((it: any, i: number) => {
                const q = c.col(it, "pergunta", "Pergunta");
                const a = c.col(it, "resposta", "");
                const open = openFaq === i;

                return (
                  <motion.div
                    key={i}
                    variants={anim.pop}
                    className="card overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4"
                    >
                      <div className="text-sm sm:text-base font-extrabold text-slate-950">
                        {q}
                      </div>
                      <div className="h-9 w-9 rounded-full bg-slate-50 border border-slate-200 grid place-items-center">
                        <ChevronDown
                          className={cx(
                            "h-4 w-4 text-slate-700 transition-transform",
                            open && "rotate-180",
                          )}
                        />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={
                            reduce
                              ? { opacity: 1, height: "auto" }
                              : { opacity: 0, height: 0 }
                          }
                          animate={
                            reduce
                              ? { opacity: 1, height: "auto" }
                              : { opacity: 1, height: "auto" }
                          }
                          exit={
                            reduce ? { opacity: 0 } : { opacity: 0, height: 0 }
                          }
                          transition={{ duration: reduce ? 0 : 0.25, ease }}
                          className="px-5 sm:px-6 pb-4"
                        >
                          <div className="text-[15px] leading-[26px] text-slate-700">
                            {a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={anim.fadeUp} className="mt-8">
              <a
                href={waPrimary}
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-black btnPrimary shadow-[0_18px_50px_rgba(0,30,54,0.18)]"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{c.cfg("texto_botao_faq", "CHAMAR NO WHATSAPP")}</span>
                <ArrowRight className="h-4 w-4 opacity-90" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 sm:py-20" style={{ background: "var(--deep)" }}>
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-3xl"
          >
            <motion.h2
              variants={anim.fadeUp}
              className="text-3xl sm:text-4xl font-black tracking-tight text-white"
            >
              {finalCta.titulo}
            </motion.h2>
            <motion.p
              variants={anim.fadeUp}
              className="mt-4 text-[15px] leading-[26px] text-white/80"
            >
              {finalCta.texto}
            </motion.p>

            <motion.a
              variants={anim.pop}
              href={buildWaLink(waBase, finalCta.mensagem_botao)}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.99 }}
              className="mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-black text-white shadow-[0_18px_55px_rgba(0,0,0,0.22)]"
              style={{
                background:
                  "linear-gradient(135deg, var(--gold), rgba(141,122,95,0.75))",
              }}
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>{finalCta.texto_botao}</span>
              <ArrowRight className="h-4 w-4 opacity-90" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Responsável técnico (somente aqui) */}
      <section className="py-14 sm:py-16 bg-white">
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={anim.fadeUp} className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1">
                <span className="text-xs font-bold tracking-[0.18em] text-slate-700">
                  {responsavel.rotulo.toUpperCase()}
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={anim.pop}
              className="mt-6 card overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-0 items-stretch">
                <div className="lg:col-span-4 p-6 sm:p-8 flex items-center justify-center">
                  <div className="rounded-3xl border border-slate-200 p-3 bg-white shadow-[0_12px_40px_rgba(2,6,23,0.08)]">
                    <div className="rounded-2xl overflow-hidden bg-slate-100">
                      <img
                        src={responsavel.foto}
                        alt={c.cfg(
                          "texto_alt_foto_responsavel",
                          "Foto do responsável técnico",
                        )}
                        className="sm:h-72 w-64 sm:w-80 object-cover"
                      />
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-8 p-6 sm:p-8">
                  <div className="text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                    {responsavel.nome}
                  </div>
                  <div className="mt-2 text-sm font-semibold text-[color:var(--gold)]">
                    {responsavel.credenciais}
                  </div>
                  <p className="mt-5 text-[15px] leading-[26px] text-slate-700 max-w-2xl">
                    {responsavel.texto}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer do jeito que você listou */}
      <footer className="bg-white">
        <div className={cx(container, "py-12")}>
          <div className="grid md:grid-cols-4 gap-3">
            <a
              href={buildWaLink(waBase, brand.mensagem_whatsapp)}
              className="cardSoft px-4 py-3 flex items-center gap-3 hover:bg-white/80"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 grid place-items-center">
                <Phone className="h-4 w-4 text-[color:var(--gold)]" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-slate-600">
                  {footer.whatsapp_label}
                </div>
                <div className="text-[15px] font-bold text-slate-900">
                  {footer.whatsapp_display}
                </div>
              </div>
            </a>

            <a
              href={instagramHref}
              target="_blank"
              rel="noreferrer"
              className="cardSoft px-4 py-3 flex items-center gap-3 hover:bg-white/80"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 grid place-items-center">
                <Instagram className="h-4 w-4 text-[color:var(--gold)]" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-slate-600">
                  {footer.instagram_label}
                </div>
                <div className="text-[15px] font-bold text-slate-900">
                  {footer.instagram}
                </div>
              </div>
            </a>

            <div className="cardSoft px-4 py-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 grid place-items-center">
                <Building2 className="h-4 w-4 text-[color:var(--gold)]" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-slate-600">
                  {footer.localidade_label}
                </div>
                <div className="text-[15px] font-bold text-slate-900">
                  {footer.localidade}
                </div>
              </div>
            </div>

            <div className="cardSoft px-4 py-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 grid place-items-center">
                <IdCard className="h-4 w-4 text-[color:var(--gold)]" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-slate-600">
                  {footer.cnpj_label}
                </div>
                <div className="text-[15px] font-bold text-slate-900">
                  {footer.cnpj}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-600">
            {footer.copyright}
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating */}
      <motion.a
        href={waPrimary}
        aria-label={c.cfg("texto_alt_botao_whatsapp_fixo", "Falar no WhatsApp")}
        initial={reduce ? undefined : { opacity: 0, scale: 0.98, y: 10 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
        className="fixed bottom-5 right-5 z-50"
      >
        <motion.div
          whileHover={reduce ? undefined : { y: -3 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
          className="h-14 w-14 rounded-full text-white shadow-[0_18px_60px_rgba(0,30,54,0.25)] border border-[color:var(--gold)]/25 flex items-center justify-center"
          style={{ background: "var(--deep)" }}
        >
          <WhatsAppIcon className="h-7 w-7" />
        </motion.div>
      </motion.a>
    </div>
  );
}
