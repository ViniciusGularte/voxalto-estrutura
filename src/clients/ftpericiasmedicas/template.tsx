/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import React, { useMemo, useState } from "react";
import { makeCtx } from "@/ui/ctx";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CalendarClock,
  ClipboardList,
  FileText,
  Gavel,
  MapPin,
  MessageCircle,
  Phone,
  Scale,
  ShieldCheck,
  Stethoscope,
  Users,
  Instagram,
  Building2,
  IdCard,
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
    rigor: BookOpen,
    ciência: BookOpen,
    cientifico: BookOpen,
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
    (n.includes("rig") ? BookOpen : null) ||
    (n.includes("brasi") ? MapPin : null) ||
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
            staggerChildren: reduce ? 0 : 0.08,
            delayChildren: reduce ? 0 : 0.05,
          },
        },
      },
      fadeUp: {
        hidden: { opacity: 0, y: reduce ? 0 : 12 },
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

  const brand = {
    nome: c.cfg("nome_da_empresa", "FT Perícias Médicas LTDA"),
    subtitulo: c.cfg("subtitulo_da_empresa", "Perícias médicas técnicas"),
    logo: c.img("logo_da_empresa", "https://iili.io/fDc5k4j.md.jpg"),
    whatsapp: c.wa("whatsapp_contato", "+55 11 99999-9999"),
    mensagem_whatsapp: c.cfg(
      "mensagem_whatsapp",
      "Olá! Quero falar com um especialista sobre um caso.",
    ),
    texto_botao_hero: c.cfg("texto_botao_hero", "FALAR COM A FT PERÍCIAS"),
    texto_menor_hero: c.cfg("texto_menor_hero", "Resposta rápida via WhatsApp"),
    hero_titulo: c.cfg(
      "titulo_principal",
      "Perícia médica técnica e fundamentada para sustentar suas decisões e não gerar dúvidas.",
    ),
    palavra_destaque_hero: c.cfg(
      "palavra_destaque_hero",
      "técnica e fundamentada",
    ),
    hero_texto: c.cfg(
      "texto_principal",
      "Aumente suas chances de êxito com perícias precisas, claras e estrategicamente úteis para o processo.",
    ),
    hero_texto_2: c.cfg(
      "texto_principal_2",
      "Atendemos advogados, empresas e pessoas físicas que precisam de pareceres médicos com rigor técnico, linguagem adequada ao processo e prazos respeitados.",
    ),
    hero_texto_3: c.cfg(
      "texto_principal_3",
      "Atuação em todo o Brasil, com base em Campo Grande MS.",
    ),
    hero_fundo: c.img(
      "imagem_fundo_topo",
      "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=2200&q=80",
    ),
    hero_fundo_opacidade: c.cfg("opacidade_fundo_topo", "0.18"),

    // Identidade visual
    cor_primaria: c.cfg("cor_primaria_hex", "#001e36"),
    cor_secundaria: c.cfg("cor_secundaria_hex", "#8d7a5f"),
    cor_botao: c.cfg("cor_botao_hex", "#001e36"),
    cor_botao_hover: c.cfg("cor_botao_hover_hex", "#00152a"),
  };

  const deep = brand.cor_primaria;
  const deep2 = brand.cor_secundaria;

  const waBase = brand.whatsapp || "#";
  const waPrimary = useMemo(
    () => buildWaLink(waBase, brand.mensagem_whatsapp),
    [waBase, brand.mensagem_whatsapp],
  );

  const topBadgesRaw = (c.tab("destaques_topo") || []) as any[];
  const topBadgesFallback = [
    { icone: "brasil", titulo: "Atuação em todo o Brasil" },
    { icone: "perícia", titulo: "Perícias em diversas áreas da medicina" },
    { icone: "prazos", titulo: "Entregas dentro do prazo" },
  ];
  const topBadges = (
    topBadgesRaw.length ? topBadgesRaw : topBadgesFallback
  ) as any[];

  const alerta = {
    rotulo: c.cfg("rotulo_alerta", "Atenção"),
    titulo: c.cfg(
      "titulo_alerta",
      "O risco de uma perícia sem acompanhamento técnico é alto demais.",
    ),
    texto_1: c.cfg(
      "texto_alerta_1",
      "Um laudo mal fundamentado, quesitos genéricos ou a ausência de análise crítica de viabilidade podem comprometer anos de processo.",
    ),
    texto_2: c.cfg(
      "texto_alerta_2",
      "Para a justiça, o laudo técnico tem peso decisivo. Por isso, rigor e clareza importam.",
    ),
    caixa: c.cfg(
      "texto_caixa_alerta",
      "Você está deixando o destino da sua causa apenas nas mãos do perito judicial, ou tem um parceiro técnico para garantir que a verdade médica prevaleça?",
    ),
  };

  const servicosPrincipaisRaw = (c.tab("servicos_principais") || []) as any[];
  const servicosPrincipaisFallback = [
    {
      icone: "laudos",
      titulo: "Emissão de laudos e pareceres",
      descricao:
        "Documentos claros e objetivos, com fundamentação sólida e linguagem adequada ao processo.",
    },
    {
      icone: "processo",
      titulo: "Análise de documentos médicos",
      descricao:
        "Avaliação crítica de prontuários, exames, relatórios e documentos apresentados pelas partes.",
    },
    {
      icone: "quesitos",
      titulo: "Elaboração de quesitos",
      descricao:
        "Apoio na formulação de quesitos precisos e estratégicos para o juízo.",
    },
    {
      icone: "jurídico",
      titulo: "Parecer para sustentar teses",
      descricao:
        "Suporte técnico para fortalecer argumentos jurídicos com base médica consistente.",
    },
    {
      icone: "assistência",
      titulo: "Assistência técnica pericial",
      descricao:
        "Atuação como assistente técnico em perícias judiciais e particulares.",
    },
    {
      icone: "rigor",
      titulo: "Consultoria em alta complexidade",
      descricao:
        "Análise aprofundada para casos que exigem rigor técnico e embasamento clínico.",
    },
  ];
  const servicosPrincipais = (
    servicosPrincipaisRaw.length
      ? servicosPrincipaisRaw
      : servicosPrincipaisFallback
  ) as any[];

  const inteligencia = {
    fundo: c.img(
      "imagem_fundo_inteligencia",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=2070&q=80",
    ),
    opacidade: c.cfg("opacidade_fundo_inteligencia", "0.14"),
  };

  const inteligenciaCardsRaw = (c.tab("inteligencia_cards") || []) as any[];
  const inteligenciaCardsFallback = [
    {
      icone: "laudos",
      titulo: "Laudos técnicos claros",
      descricao:
        "Fundamentação consistente e formato compatível com o processo.",
    },
    {
      icone: "processo",
      titulo: "Leitura estratégica do caso",
      descricao:
        "Riscos, inconsistências e pontos de sustentação identificados com critério.",
    },
    {
      icone: "quesitos",
      titulo: "Quesitos e impugnações",
      descricao: "Perguntas precisas e contestação técnica quando cabível.",
    },
    {
      icone: "jurídico",
      titulo: "Suporte à tese jurídica",
      descricao:
        "Pareceres que ajudam a sustentar argumentos com rigor técnico.",
    },
    {
      icone: "assistência",
      titulo: "Assistência técnica",
      descricao:
        "Acompanhamento pericial em perícias judiciais e particulares.",
    },
    {
      icone: "rigor",
      titulo: "Casos de alta complexidade",
      descricao: "Consultoria médica aprofundada para decisões seguras.",
    },
  ];
  const inteligenciaCards = (
    inteligenciaCardsRaw.length
      ? inteligenciaCardsRaw
      : inteligenciaCardsFallback
  ) as any[];

  const compromisso = {
    titulo: c.cfg("titulo_compromisso", "Nosso compromisso com o cliente"),
  };

  const compromissoCardsRaw = (c.tab("compromissos") || []) as any[];
  const compromissoCardsFallback = [
    {
      icone: "rigor",
      titulo: "Rigor técnico e coerência clínica",
      descricao: "Sem achismos. Ciência, critério e consistência.",
    },
    {
      icone: "jurídico",
      titulo: "Linguagem adequada ao processo",
      descricao: "Objetividade e precisão para leitura do juízo.",
    },
    {
      icone: "prazos",
      titulo: "Entrega dentro dos prazos acordados",
      descricao: "Previsibilidade e compromisso do início ao fim.",
    },
    {
      icone: "atendimento",
      titulo: "Atendimento direto e ágil",
      descricao: "Contato com a equipe e alinhamento rápido.",
    },
  ];
  const compromissoCards = (
    compromissoCardsRaw.length ? compromissoCardsRaw : compromissoCardsFallback
  ) as any[];

  const publico = {
    titulo: c.cfg("titulo_publico", "Para quem é o nosso trabalho"),
  };

  const publicoRaw = (c.tab("publico") || []) as any[];
  const publicoFallback = [
    {
      icone: "jurídico",
      titulo: "Advogados",
      descricao:
        "Parecer técnico de qualidade para sustentar a tese e instruir o processo.",
    },
    {
      icone: "processo",
      titulo: "Empresas",
      descricao:
        "Trabalhista e responsabilidade civil com avaliação médica especializada.",
    },
    {
      icone: "segurança",
      titulo: "Órgãos públicos e privados",
      descricao: "Avaliação técnica para decisões seguras e documentadas.",
    },
    {
      icone: "perícia",
      titulo: "Pessoas físicas",
      descricao: "Laudos confiáveis para ações previdenciárias ou cíveis.",
    },
  ];
  const publicoItems = (
    publicoRaw.length ? publicoRaw : publicoFallback
  ) as any[];

  // Responsável técnico (menção apenas no final)
  const responsavel = {
    rotulo: c.cfg("rotulo_responsavel", "Responsável técnico"),
    nome: c.cfg("nome_responsavel", "Fábio Tonin"),
    credenciais: c.cfg(
      "credenciais_responsavel",
      "Médico há 15 anos | Perito em processos cíveis, trabalhistas e previdenciários",
    ),
    texto: c.cfg(
      "bio_responsavel",
      "Atuação em perícias e pareceres com foco em rigor técnico, clareza e aderência às exigências médico-jurídicas para análise objetiva do juízo.",
    ),
    foto: c.img("foto_responsavel", "https://iili.io/fDr0eeI.png"),
  };

  const faq = {
    rotulo: c.cfg("rotulo_faq", "Dúvidas frequentes"),
    titulo: c.cfg(
      "titulo_faq",
      "Precisa de um orçamento ou deseja discutir seu caso?",
    ),
  };

  const faqRaw = (c.tab("faq") || []) as any[];
  const faqFallback = [
    {
      pergunta: "Como funciona o primeiro contato?",
      resposta:
        "Você chama no WhatsApp, explica o caso e alinhamos as orientações iniciais e os próximos passos.",
    },
    {
      pergunta: "Vocês atendem em todo o Brasil?",
      resposta:
        "Sim. Atuamos em todo o Brasil, de forma remota e presencial quando necessário.",
    },
    {
      pergunta: "Quais documentos preciso enviar?",
      resposta:
        "Em geral: prontuários, exames, relatórios médicos, petição e laudo pericial (se houver). Orientamos no WhatsApp.",
    },
    {
      pergunta: "Vocês fazem quesitos e impugnação?",
      resposta:
        "Sim. Auxiliamos na elaboração de quesitos e na contestação técnica de laudos quando aplicável.",
    },
    {
      pergunta: "Qual o prazo médio de entrega?",
      resposta:
        "Varia por volume e complexidade. Trabalhamos com prazo acordado e previsibilidade de entrega.",
    },
  ];
  const faqItems = (faqRaw.length ? faqRaw : faqFallback) as any[];

  const finalCta = {
    titulo: c.cfg("titulo_chamada_final", "Fale com a FT Perícias"),
    texto: c.cfg(
      "texto_chamada_final",
      "Se você precisa de um parecer médico claro, técnico e estrategicamente útil para o processo, fale conosco agora.",
    ),
    texto_botao: c.cfg("texto_botao_final", "CHAMAR NO WHATSAPP"),
    mensagem_botao: c.cfg(
      "mensagem_botao_final",
      "Olá! Preciso de um orçamento e gostaria de discutir meu caso.",
    ),
    fundo_solido: c.cfg("cor_fundo_final_hex", "#001e36"),
  };

  const footer = {
    whatsapp_label: c.cfg("texto_footer_whatsapp", "WhatsApp"),
    instagram_label: c.cfg("texto_footer_instagram", "Instagram"),
    localidade_label: c.cfg("texto_footer_localidade", "Localidade"),
    cnpj_label: c.cfg("texto_footer_cnpj", "CNPJ"),
    whatsapp_display: c.cfg("whatsapp_footer_display", "(11) 99999-9999"),
    instagram: c.cfg("instagram_footer", "@ftpericiasmedicas"),
    localidade: c.cfg("localidade_footer", "Campo Grande - Mato Grosso do Sul"),
    cnpj: c.cfg("cnpj_footer", "60.576.742/0001-91"),
    rodape_final: c.cfg(
      "texto_rodape_final",
      "© 2026 FT Perícias Médicas. Todos os direitos reservados.",
    ),
    credito: c.cfg("texto_credito", "Desenvolvido por Martin Sistemas"),
    link_credito: c.link("link_credito", "#"),
  };

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const heroPieces = splitEmphasis(
    brand.hero_titulo,
    brand.palavra_destaque_hero,
  );

  const cardBase =
    "rounded-2xl bg-white shadow-[0_18px_60px_rgba(2,6,23,0.10)] border border-slate-200/70";
  const iconTile =
    "h-11 w-11 rounded-xl bg-[color:var(--deep)] text-white grid place-items-center shadow-[0_10px_30px_rgba(2,6,23,0.14)]";

  const marqueeItems = useMemo(() => {
    const base = topBadges.map((it, i) => ({
      titulo: c.col(it, "titulo", topBadgesFallback[i]?.titulo || "Destaque"),
      icone: c.col(it, "icone", topBadgesFallback[i]?.icone || "segurança"),
    }));
    const rep =
      base.length < 6
        ? Array.from({
            length: Math.ceil(10 / Math.max(1, base.length)),
          }).flatMap(() => base)
        : base;
    return rep;
  }, [topBadges, c]);

  const instagramHref = useMemo(
    () => normalizeInstagramUrl(footer.instagram),
    [footer.instagram],
  );

  return (
    <div
      className={cx(
        "min-h-screen bg-white text-slate-900 [font-family:Inter,system-ui,sans-serif] font-normal",
        "[--deep:var(--c-deep)] [--deep2:var(--c-deep2)] [--btn:var(--c-btn)] [--btnh:var(--c-btnh)]",
      )}
      style={
        {
          ["--c-deep" as any]: deep,
          ["--c-deep2" as any]: deep2,
          ["--c-btn" as any]: brand.cor_botao,
          ["--c-btnh" as any]: brand.cor_botao_hover,
        } as any
      }
    >
      <style>{`
        @keyframes ftMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={brand.hero_fundo}
            alt={c.cfg("texto_alt_fundo_topo", "Imagem de fundo")}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white" style={{ opacity: 0.9 }} />

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[color:var(--deep2)]/12 blur-2xl" />
            <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-[color:var(--deep)]/10 blur-2xl" />
            <div className="absolute top-16 right-10 h-40 w-40 rounded-3xl bg-[color:var(--deep)]/8 rotate-12 blur-[1px]" />
            <div className="absolute bottom-16 left-10 h-44 w-44 rounded-3xl bg-[color:var(--deep2)]/9 -rotate-6 blur-[1px]" />

            <svg
              className="absolute inset-0 h-full w-full opacity-[0.35]"
              viewBox="0 0 1200 700"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ftg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="rgba(141,122,95,0.12)" />
                  <stop offset="1" stopColor="rgba(0,30,54,0.08)" />
                </linearGradient>
              </defs>
              <path
                d="M980 80 C 860 160, 860 290, 980 370 C 1100 450, 1100 580, 980 660"
                fill="none"
                stroke="url(#ftg)"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M220 40 C 340 120, 340 250, 220 330 C 100 410, 100 540, 220 620"
                fill="none"
                stroke="url(#ftg)"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M610 120 l 70 40 l -70 40 l -70 -40 z"
                fill="rgba(141,122,95,0.09)"
              />
              <path
                d="M740 520 l 52 30 l -52 30 l -52 -30 z"
                fill="rgba(0,30,54,0.07)"
              />
              <circle cx="980" cy="170" r="34" fill="rgba(141,122,95,0.08)" />
              <circle cx="280" cy="520" r="26" fill="rgba(0,30,54,0.06)" />
            </svg>
          </div>
        </div>

        <div
          className={cx(container, "relative pt-12 sm:pt-14 pb-10 sm:pb-12")}
        >
          <motion.div variants={anim.stagger} initial="hidden" animate="show">
            <motion.div
              variants={anim.fadeUp}
              className="flex items-start ml-[-40px] mb-[-40px] gap-3"
            >
              <img
                src={brand.logo}
                alt={c.cfg("texto_alt_logo", "Logo")}
                className="h-64 sm:h-64 w-auto object-contain"
              />
            </motion.div>

            <div className="mt-10">
              <motion.div variants={anim.fadeUp} className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.06] text-slate-950">
                  {heroPieces.map((p, i) => (
                    <span
                      key={i}
                      className={p.emph ? "text-[color:var(--deep2)]" : ""}
                    >
                      {p.t}
                    </span>
                  ))}
                </h1>

                <p className="mt-5 text-[15px] leading-[26px] text-slate-800 max-w-2xl">
                  {brand.hero_texto}
                </p>
                <p className="mt-4 text-[15px] leading-[26px] text-slate-800 max-w-2xl">
                  {brand.hero_texto_2}
                </p>
                <p className="mt-4 text-[15px] leading-[26px] text-slate-800 max-w-2xl">
                  {brand.hero_texto_3}
                </p>

                <motion.a
                  href={waPrimary}
                  variants={anim.pop}
                  whileHover={reduce ? undefined : { y: -2 }}
                  whileTap={reduce ? undefined : { scale: 0.99 }}
                  className="mt-8 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_18px_50px_rgba(0,30,54,0.30)]"
                  style={{ background: "var(--btn)" }}
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>{brand.texto_botao_hero}</span>
                  <ArrowRight className="h-4 w-4 opacity-90" />
                </motion.a>

                <div className="mt-2 text-xs text-slate-600">
                  {brand.texto_menor_hero}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          <div className="h-14 sm:h-16 bg-[color:var(--deep)] overflow-hidden">
            <div className={cx(container, "h-full flex items-center")}>
              <div className="hidden sm:flex w-full items-center justify-between gap-4">
                {topBadges.map((it, i) => {
                  const titulo = c.col(
                    it,
                    "titulo",
                    topBadgesFallback[i]?.titulo || "Destaque",
                  );
                  const icon = c.col(
                    it,
                    "icone",
                    topBadgesFallback[i]?.icone || "segurança",
                  );
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-white/90 whitespace-nowrap"
                    >
                      <IconFromName
                        name={icon}
                        className="h-4 w-4 text-white/80"
                      />
                      <div className="text-xs sm:text-sm font-semibold">
                        {titulo}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="sm:hidden w-full">
                <div
                  className="flex items-center gap-6 w-[200%]"
                  style={{
                    animation: reduce
                      ? undefined
                      : "ftMarquee 18s linear infinite",
                    willChange: "transform",
                  }}
                >
                  {[...marqueeItems, ...marqueeItems].map((it, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-white/90 whitespace-nowrap"
                    >
                      <IconFromName
                        name={it.icone}
                        className="h-4 w-4 text-white/80"
                      />
                      <div className="text-xs font-semibold">{it.titulo}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-14 sm:py-16">
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={anim.fadeUp}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.20em] text-slate-600">
                <span className="h-[1px] w-10 bg-slate-300" />
                <span>{alerta.rotulo.toUpperCase()}</span>
                <span className="h-[1px] w-10 bg-slate-300" />
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {alerta.titulo}
              </h2>

              <p className="mt-5 text-[15px] leading-[26px] text-slate-800">
                {alerta.texto_1}
              </p>
              <p className="mt-4 text-[15px] leading-[26px] text-slate-800">
                {alerta.texto_2}
              </p>

              <motion.div
                variants={anim.pop}
                className="mt-8 rounded-2xl border border-slate-200/70 bg-white px-6 py-5 shadow-[0_16px_60px_rgba(2,6,23,0.08)]"
              >
                <div className="flex items-start gap-4">
                  <div className="h-full w-[3px] rounded-full bg-[color:var(--deep)]" />
                  <div className="text-left text-[15px] leading-[26px] text-slate-800">
                    {alerta.caixa}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0">
          <img
            src={c.img(
              "imagem_fundo_servicos_principais",
              "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=2200&q=80",
            )}
            alt={c.cfg("texto_alt_fundo_servicos_principais", "Fundo serviços")}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/92 to-white" />
        </div>

        <div className={cx(container, "relative")}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={anim.fadeUp}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.20em] text-slate-600">
                <span className="h-[1px] w-10 bg-slate-300" />
                <span>
                  {c
                    .cfg("rotulo_servicos_principais", "SERVIÇOS OFERECIDOS")
                    .toUpperCase()}
                </span>
                <span className="h-[1px] w-10 bg-slate-300" />
              </div>

              <h2 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-950">
                {c.cfg(
                  "titulo_servicos_principais",
                  "Perícias precisas e estratégicas para sustentar sua tese com rigor técnico.",
                )}
              </h2>
              <p className="mt-4 text-[15px] leading-[26px] text-slate-800 max-w-3xl mx-auto">
                {c.cfg(
                  "texto_servicos_principais",
                  "Emissão de laudos, análise de documentos, elaboração de quesitos, assistência técnica e consultoria em casos de alta complexidade.",
                )}
              </p>
            </motion.div>

            <motion.div
              variants={anim.stagger}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {servicosPrincipais.map((it, i) => {
                const titulo = c.col(
                  it,
                  "titulo",
                  servicosPrincipaisFallback[i]?.titulo || "Serviço",
                );
                const desc = c.col(
                  it,
                  "descricao",
                  servicosPrincipaisFallback[i]?.descricao || "",
                );
                const icon = c.col(
                  it,
                  "icone",
                  servicosPrincipaisFallback[i]?.icone || "perícia",
                );
                const bg = c.col(
                  it,
                  "imagem_fundo",
                  "https://placehold.co/900x600",
                );

                return (
                  <motion.div
                    key={i}
                    variants={anim.pop}
                    whileHover={reduce ? undefined : { y: -6 }}
                    className={cx(cardBase, "relative overflow-hidden")}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={bg}
                        alt={c.cfg(
                          "texto_alt_imagem_card_servico",
                          "Imagem do serviço",
                        )}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-white/92" />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/92 to-white" />
                    </div>

                    <div className="relative p-6">
                      <div className="flex items-start gap-4">
                        <div className={iconTile}>
                          <IconFromName name={icon} className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-extrabold text-slate-950">
                            {titulo}
                          </div>
                          <div className="mt-2 text-[15px] leading-[26px] text-slate-800">
                            {desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0">
          <img
            src={inteligencia.fundo}
            alt={c.cfg("texto_alt_fundo_inteligencia", "Fundo seção")}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white" style={{ opacity: 0.9 }} />
        </div>

        <div className={cx(container, "relative")}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={anim.fadeUp} className="max-w-4xl">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                <span className="text-[color:var(--deep2)]">
                  {c.cfg("palavra_destaque_inteligencia", "Serviços")}
                </span>{" "}
                <span className="text-slate-950">
                  {c.cfg(
                    "complemento_titulo_inteligencia",
                    "com execução técnica e linguagem para o processo",
                  )}
                </span>
              </h2>
            </motion.div>

            <motion.div
              variants={anim.stagger}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {inteligenciaCards.map((it, i) => {
                const titulo = c.col(
                  it,
                  "titulo",
                  inteligenciaCardsFallback[i]?.titulo || "Item",
                );
                const desc = c.col(
                  it,
                  "descricao",
                  inteligenciaCardsFallback[i]?.descricao || "",
                );
                const icon = c.col(
                  it,
                  "icone",
                  inteligenciaCardsFallback[i]?.icone || "processo",
                );
                const bg = c.col(
                  it,
                  "imagem_fundo",
                  "https://placehold.co/900x600",
                );

                return (
                  <motion.div
                    key={i}
                    variants={anim.pop}
                    whileHover={reduce ? undefined : { y: -6 }}
                    className={cx(cardBase, "relative overflow-hidden")}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={bg}
                        alt={c.cfg(
                          "texto_alt_imagem_card_inteligencia",
                          "Imagem do card",
                        )}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-white/93" />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/92 to-white" />
                    </div>

                    <div className="relative p-6">
                      <div className="flex items-start gap-4">
                        <div className={iconTile}>
                          <IconFromName name={icon} className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-extrabold text-slate-950">
                            {titulo}
                          </div>
                          <div className="mt-2 text-[15px] leading-[26px] text-slate-800">
                            {desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={anim.fadeUp}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.20em] text-slate-600">
                <span className="h-[1px] w-10 bg-slate-300" />
                <span>
                  {c
                    .cfg("rotulo_compromisso", "NOSSO COMPROMISSO")
                    .toUpperCase()}
                </span>
                <span className="h-[1px] w-10 bg-slate-300" />
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {compromisso.titulo}
              </h2>
            </motion.div>

            <motion.div
              variants={anim.stagger}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {compromissoCards.map((it, i) => {
                const titulo = c.col(
                  it,
                  "titulo",
                  compromissoCardsFallback[i]?.titulo || "Compromisso",
                );
                const desc = c.col(
                  it,
                  "descricao",
                  compromissoCardsFallback[i]?.descricao || "",
                );
                const icon = c.col(
                  it,
                  "icone",
                  compromissoCardsFallback[i]?.icone || "segurança",
                );

                return (
                  <motion.div
                    key={i}
                    variants={anim.pop}
                    whileHover={reduce ? undefined : { y: -5 }}
                    className="rounded-2xl bg-[color:var(--deep)] text-white shadow-[0_20px_70px_rgba(2,6,23,0.18)] overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="h-11 w-11 rounded-xl bg-white/10 border border-white/15 grid place-items-center">
                        <IconFromName
                          name={icon}
                          className="h-5 w-5 text-white"
                        />
                      </div>
                      <div className="mt-4 text-base font-extrabold">
                        {titulo}
                      </div>
                      <div className="mt-2 text-[13px] leading-[22px] text-white/85">
                        {desc}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0">
          <img
            src={c.img(
              "imagem_fundo_publico",
              "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=2200&q=80",
            )}
            alt={c.cfg("texto_alt_fundo_publico", "Fundo público")}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-white/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/92 to-white" />
        </div>

        <div className={cx(container, "relative")}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={anim.fadeUp}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.20em] text-slate-600">
                <span className="h-[1px] w-10 bg-slate-300" />
                <span>
                  {c.cfg("rotulo_publico", "PARA QUEM É").toUpperCase()}
                </span>
                <span className="h-[1px] w-10 bg-slate-300" />
              </div>

              <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {publico.titulo}
              </h2>
            </motion.div>

            <motion.div
              variants={anim.stagger}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {publicoItems.map((it, i) => {
                const titulo = c.col(
                  it,
                  "titulo",
                  publicoFallback[i]?.titulo || "Público",
                );
                const desc = c.col(
                  it,
                  "descricao",
                  publicoFallback[i]?.descricao || "",
                );
                const icon = c.col(
                  it,
                  "icone",
                  publicoFallback[i]?.icone || "processo",
                );
                const bg = c.col(
                  it,
                  "imagem_fundo",
                  "https://placehold.co/900x600",
                );

                return (
                  <motion.div
                    key={i}
                    variants={anim.pop}
                    whileHover={reduce ? undefined : { y: -6 }}
                    className={cx(cardBase, "relative overflow-hidden")}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={bg}
                        alt={c.cfg(
                          "texto_alt_imagem_card_publico",
                          "Imagem do card",
                        )}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-white/93" />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/88 via-white/92 to-white" />
                    </div>

                    <div className="relative p-6">
                      <div className="flex items-start gap-4">
                        <div className={iconTile}>
                          <IconFromName name={icon} className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-lg font-extrabold text-slate-950">
                            {titulo}
                          </div>
                          <div className="mt-2 text-[15px] leading-[26px] text-slate-800">
                            {desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={anim.fadeUp} className="mt-10 text-center">
              <motion.a
                href={waPrimary}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.99 }}
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_18px_50px_rgba(0,30,54,0.30)]"
                style={{ background: "var(--btn)" }}
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>
                  {c.cfg("texto_botao_publico", "CHAMAR NO WHATSAPP")}
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-16 sm:py-20">
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={anim.fadeUp}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.20em] text-slate-600">
                <span className="h-[1px] w-10 bg-slate-300" />
                <span>{faq.rotulo.toUpperCase()}</span>
                <span className="h-[1px] w-10 bg-slate-300" />
              </div>
              <h2 className="mt-4 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {faq.titulo}
              </h2>
              <p className="mt-4 text-[15px] leading-[26px] text-slate-800 max-w-2xl mx-auto">
                {c.cfg(
                  "texto_faq_intro",
                  "Fale conosco e retornaremos com orientação inicial e próximos passos.",
                )}
              </p>

              <motion.a
                href={waPrimary}
                variants={anim.pop}
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={reduce ? undefined : { scale: 0.99 }}
                className="mt-6 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_18px_50px_rgba(0,30,54,0.30)]"
                style={{ background: "var(--btn)" }}
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{c.cfg("texto_botao_faq", "CHAMAR NO WHATSAPP")}</span>
              </motion.a>
            </motion.div>

            <motion.div
              variants={anim.stagger}
              className="mt-10 max-w-4xl mx-auto space-y-3"
            >
              {faqItems.map((it, i) => {
                const q = c.col(
                  it,
                  "pergunta",
                  faqFallback[i]?.pergunta || "Pergunta",
                );
                const a = c.col(it, "resposta", faqFallback[i]?.resposta || "");
                const open = openFaq === i;

                return (
                  <motion.div
                    key={i}
                    variants={anim.pop}
                    className={cx(cardBase, "overflow-hidden")}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4"
                    >
                      <div className="text-sm sm:text-base font-bold text-slate-950">
                        {q}
                      </div>
                      <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 grid place-items-center">
                        <ArrowRight
                          className={cx(
                            "h-4 w-4 text-slate-700 transition-transform",
                            open && "rotate-90",
                          )}
                        />
                      </div>
                    </button>
                    <div
                      className={cx(
                        "px-5 sm:px-6 pb-4",
                        open ? "block" : "hidden",
                      )}
                    >
                      <div className="text-[15px] leading-[26px] text-slate-800">
                        {a}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        className="relative py-16 sm:py-20"
        style={{ background: finalCta.fundo_solido }}
      >
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl"
          >
            <motion.h2
              variants={anim.fadeUp}
              className="text-3xl sm:text-4xl font-black tracking-tight text-white"
            >
              {finalCta.titulo}
            </motion.h2>
            <motion.p
              variants={anim.fadeUp}
              className="mt-4 text-[15px] leading-[26px] text-white/85 max-w-2xl"
            >
              {finalCta.texto}
            </motion.p>

            <motion.a
              variants={anim.pop}
              href={buildWaLink(waBase, finalCta.mensagem_botao)}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.99 }}
              className="mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-bold text-white shadow-[0_18px_55px_rgba(0,0,0,0.20)]"
              style={{ background: "var(--btn)" }}
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>{finalCta.texto_botao}</span>
              <ArrowRight className="h-4 w-4 opacity-90" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Responsável técnico (apenas no final) */}
      <section className="relative py-14 sm:py-16 bg-white">
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={anim.fadeUp} className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.20em] text-slate-600">
                <span className="h-[1px] w-10 bg-slate-300" />
                <span>{responsavel.rotulo.toUpperCase()}</span>
                <span className="h-[1px] w-10 bg-slate-300" />
              </div>
            </motion.div>

            <motion.div
              variants={anim.pop}
              className="mt-6 rounded-3xl border border-slate-200/70 bg-white shadow-[0_22px_80px_rgba(2,6,23,0.10)] overflow-hidden"
            >
              <div className="grid lg:grid-cols-12 gap-0 items-stretch">
                <div className="lg:col-span-4 p-6 sm:p-8 flex items-center justify-center">
                  <div className="rounded-3xl border border-[color:var(--deep)]/15 p-3 bg-white shadow-[0_18px_60px_rgba(2,6,23,0.10)]">
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
                  <div className="mt-2 text-sm font-semibold text-[color:var(--deep2)]">
                    {responsavel.credenciais}
                  </div>
                  <p className="mt-5 text-[15px] leading-[26px] text-slate-800 max-w-2xl">
                    {responsavel.texto}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="relative bg-white">
        <div className={cx(container, "py-14 sm:py-16")}>
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5">
              <div className="flex items-center justify-center gap-3">
                <img
                  src={brand.logo}
                  alt={c.cfg("texto_alt_logo_footer", "Logo")}
                  className="h-64 sm:h-64 w-auto object-contain"
                />
              </div>
              <p className="mt-4 text-[15px] leading-[26px] text-slate-700 max-w-md">
                {c.cfg(
                  "texto_footer_1",
                  "Perícia médica técnica e fundamentada para sustentar decisões e reduzir dúvidas no processo.",
                )}
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="text-xs font-semibold tracking-[0.20em] text-slate-600">
                {c
                  .cfg("titulo_footer_informacoes", "INFORMAÇÕES")
                  .toUpperCase()}
              </div>

              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                <a
                  href={buildWaLink(waBase, brand.mensagem_whatsapp)}
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50"
                >
                  <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 grid place-items-center">
                    <Phone className="h-4 w-4 text-[color:var(--deep2)]" />
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
                  className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 hover:bg-slate-50"
                >
                  <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 grid place-items-center">
                    <Instagram className="h-4 w-4 text-[color:var(--deep2)]" />
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

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 grid place-items-center">
                    <Building2 className="h-4 w-4 text-[color:var(--deep2)]" />
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

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 grid place-items-center">
                    <IdCard className="h-4 w-4 text-[color:var(--deep2)]" />
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
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="text-xs text-slate-600">{footer.rodape_final}</div>
            <a
              href={footer.link_credito}
              className="text-xs text-slate-600 hover:text-slate-900"
            >
              {footer.credito}
            </a>
          </div>
        </div>
      </footer>

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
          className="h-14 w-14 rounded-full text-white shadow-[0_18px_60px_rgba(0,30,54,0.35)] border border-[color:var(--deep2)]/25 flex items-center justify-center"
          style={{ background: "var(--btn)" }}
        >
          <WhatsAppIcon className="h-7 w-7" />
        </motion.div>
      </motion.a>
    </div>
  );
}
