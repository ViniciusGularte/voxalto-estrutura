/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import React, { useMemo, useState } from "react";
import { makeCtx } from "@/ui/ctx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
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
    atenção: AlertTriangle,
    atencao: AlertTriangle,
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

  return <Ico className={className} aria-hidden="true" />;
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

  const marca = {
    nome: c.cfg("nome_empresa", "FT Perícias Médicas e Assistência Técnica"),
    logo: c.img("logo_da_empresa", "https://iili.io/fD10Vbj.png"),

    whatsapp: c.cfg("whatsapp_link", "https://wa.me/556792287408"),
    mensagem_whatsapp: c.cfg(
      "mensagem_whatsapp",
      "Olá! Quero enviar um caso e entender como a FT pode atuar como assistência técnica médica.",
    ),

    rotulo_hero: c.cfg("rotulo_hero", "PERÍCIA MÉDICA • ASSISTÊNCIA TÉCNICA"),
    hero_titulo: c.cfg(
      "titulo_principal",
      "Precisão técnica e rigor científico para sustentar a tese do seu processo.",
    ),
    palavra_destaque_hero: c.cfg("palavra_destaque_hero", "rigor científico"),
    hero_texto: c.cfg(
      "texto_principal",
      "Transformamos a complexidade médica em prova técnica utilizável no processo — com leitura crítica, fundamentação e direção estratégica ao lado do advogado.",
    ),
    hero_texto_2: c.cfg(
      "texto_principal_2",
      "Objetivo: reduzir risco, evitar suposições e sustentar decisões com fatos.",
    ),

    texto_botao_hero: c.cfg("texto_botao_hero", "FALAR COM O PERITO MÉDICO"),
    texto_menor_hero: c.cfg("texto_menor_hero", "Resposta rápida via WhatsApp"),

    hero_fundo: c.img(
      "imagem_fundo_topo",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=2200&q=80",
    ),

    cor_primaria: c.cfg("cor_primaria_hex", "#001e36"),
    cor_secundaria: c.cfg("cor_secundaria_hex", "#8d7a5f"),
    cor_fundo: c.cfg("cor_fundo_hex", "#ffffff"),

    cor_cta_verde: c.cfg("cor_cta_verde_hex", "#25D366"),
    cor_cta_verde_hover: c.cfg("cor_cta_verde_hover_hex", "#1FB85A"),
  };

  const waBase = marca.whatsapp || "#";
  const linkWhatsAppPrincipal = useMemo(
    () => buildWaLink(waBase, marca.mensagem_whatsapp),
    [waBase, marca.mensagem_whatsapp],
  );

  const tituloHeroComDestaque = splitEmphasis(
    marca.hero_titulo,
    marca.palavra_destaque_hero,
  );

  const destaquesTopoRaw = (c.tab("destaques_topo") || []) as any[];
  const destaquesTopoFallback = [
    { icone: "brasil", titulo: "Atuação em todo o Brasil" },
    { icone: "ciência", titulo: "Pareceres com alta complexidade" },
    { icone: "jurídico", titulo: "Suporte em múltiplas esferas do Direito" },
    { icone: "prazos", titulo: "Alinhamento objetivo e previsibilidade" },
  ];

  const destaquesTopo = (
    destaquesTopoRaw.length ? destaquesTopoRaw : destaquesTopoFallback
  ) as any[];

  const alerta = {
    rotulo: c.cfg("rotulo_alerta", "Atenção"),
    titulo: c.cfg(
      "titulo_alerta",
      "O risco de seguir sem acompanhamento técnico é alto.",
    ),
    texto: c.cfg(
      "texto_alerta",
      "Laudo mal fundamentado, quesitos genéricos e ausência de leitura crítica de viabilidade podem comprometer anos de estratégia processual.",
    ),
    texto_2: c.cfg(
      "texto_alerta_2",
      "Na prática, o laudo pericial pesa — e muitas vezes direciona a decisão. Você vai depender apenas do perito judicial, ou ter um braço técnico para sustentar a verdade médica no processo?",
    ),
  };

  const servicosFallback = [
    {
      icone: "jurídico",
      titulo: "Perícias Cíveis (Erro Médico)",
      descricao:
        "Análise criteriosa de prontuários, condutas e nexo causal para sustentar tese, identificar inconsistências e reduzir vulnerabilidades técnicas.",
      imagem:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80",
    },
    {
      icone: "laudos",
      titulo: "Perícias Previdenciárias",
      descricao:
        "Avaliação técnica de incapacidade e condições clínicas relacionadas a benefícios, revisões e controvérsias médico-legais.",
      imagem:
        "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1800&q=80",
    },
    {
      icone: "processo",
      titulo: "Perícias Trabalhistas",
      descricao:
        "Suporte em incapacidade, nexo técnico, doenças ocupacionais e documentação clínica — com foco no que importa para o processo.",
      imagem:
        "https://images.unsplash.com/photo-1521791055366-0d553872125f?auto=format&fit=crop&w=1800&q=80",
    },
    {
      icone: "perícia",
      titulo: "Perícias Criminais",
      descricao:
        "Leitura médico-legal cuidadosa, fundamentação robusta e apoio técnico em casos sensíveis e de alta responsabilidade.",
      imagem:
        "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1800&q=80",
    },
    {
      icone: "assistência",
      titulo: "Assistência Técnica",
      descricao:
        "Atuação estratégica ao lado do advogado para orientar o caso, reduzir ruído técnico e fortalecer o conjunto probatório.",
      imagem:
        "https://images.unsplash.com/photo-1554224154-22dec7ec8818?auto=format&fit=crop&w=1800&q=80",
    },
    {
      icone: "segurança",
      titulo: "Inteligência Técnica do Caso",
      descricao:
        "Análises de alta complexidade para mapear riscos, fragilidades e caminhos técnicos de sustentação com previsibilidade.",
      imagem:
        "https://images.unsplash.com/photo-1570929057588-6952f7dd2305?auto=format&fit=crop&w=1800&q=80",
    },
  ];

  const servicosRaw = (c.tab("servicos_principais") || []) as any[];
  const servicos = (
    servicosRaw.length ? servicosRaw : servicosFallback
  ) as any[];

  const inteligenciaRaw = (c.tab("inteligencia_tecnica") || []) as any[];
  const inteligenciaFallback = [
    {
      icone: "processo",
      titulo: "Análise de Viabilidade",
      texto:
        "Leitura técnica dos pontos críticos do caso para indicar riscos, inconsistências e linhas seguras de condução.",
    },
    {
      icone: "laudos",
      titulo: "Parecer Médico-Legal",
      texto:
        "Documento claro, estruturado e defensável: fundamentação, coerência e linguagem médico-jurídica utilizável no processo.",
    },
    {
      icone: "assistência",
      titulo: "Acompanhamento Pericial",
      texto:
        "Suporte antes, durante e após a perícia para garantir aderência a protocolos e consistência técnica do exame.",
    },
    {
      icone: "rigor",
      titulo: "Contestação de Laudos",
      texto:
        "Identificação objetiva de lacunas, equívocos e contradições em laudos desfavoráveis — com resposta técnica direcionada.",
    },
    {
      icone: "quesitos",
      titulo: "Formulação de Quesitos",
      texto:
        "Quesitos precisos e estratégicos para forçar o enfrentamento dos pontos técnicos realmente relevantes do processo.",
    },
    {
      icone: "jurídico",
      titulo: "Orientação Técnica ao Advogado",
      texto:
        "Tradução do ‘mediquês’, leitura de documentos e apoio técnico para audiência, estratégia e tomada de decisão.",
    },
  ];
  const inteligencia = (
    inteligenciaRaw.length ? inteligenciaRaw : inteligenciaFallback
  ) as any[];

  const comoFunciona = {
    rotulo: c.cfg("rotulo_como_funciona", "Como funciona"),
    titulo: c.cfg("titulo_como_funciona", "Fluxo simples, sem ruído"),
    imagem: c.img(
      "imagem_como_funciona",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1800&q=80",
    ),
    mini: c.cfg(
      "mini_titulo_como_funciona",
      "RIGOR • CLAREZA • PREVISIBILIDADE",
    ),
    titulo_card: c.cfg(
      "titulo_card_como_funciona",
      "Um fluxo objetivo para reduzir risco técnico no processo",
    ),
    passos: ((c.tab("como_funciona") || []) as any[]).length
      ? ((c.tab("como_funciona") || []) as any[])
      : [
          {
            titulo: "Triagem do caso",
            texto:
              "Você envia o contexto, objetivo e prazo. Indicamos o que é essencial para análise.",
          },
          {
            titulo: "Escopo e viabilidade",
            texto:
              "Alinhamos o tipo de entrega, riscos, formato e adequação ao processo.",
          },
          {
            titulo: "Produção do material",
            texto:
              "Documento claro, estruturado e tecnicamente consistente (linguagem médico-jurídica).",
          },
          {
            titulo: "Entrega e suporte",
            texto:
              "Entrega no prazo combinado e suporte para dúvidas, ajustes e próximos passos do caso.",
          },
        ],
  };

  const diferenciaisRaw = (c.tab("diferenciais") || []) as any[];
  const diferenciaisFallback = [
    {
      icone: "jurídico",
      titulo: "Visão Estratégica",
      texto:
        "Não é só medicina: é aplicar a medicina ao objetivo jurídico do caso, com foco em prova e sustentação.",
    },
    {
      icone: "prazos",
      titulo: "Agilidade e Prazos",
      texto:
        "Entendemos a dinâmica do Judiciário. Entregas com previsibilidade para você não ficar refém de prazo processual.",
    },
    {
      icone: "ciência",
      titulo: "Clareza que o Juiz Usa",
      texto:
        "Estrutura, linguagem e argumentos técnicos que advogados e magistrados conseguem utilizar com segurança na decisão.",
    },
  ];
  const diferenciais = (
    diferenciaisRaw.length ? diferenciaisRaw : diferenciaisFallback
  ) as any[];

  const faq = {
    rotulo: c.cfg("rotulo_faq", "Dúvidas frequentes"),
    titulo: c.cfg("titulo_faq", "Orçamento e orientações iniciais"),
    items:
      ((c.tab("faq") || []) as any[]).length > 0
        ? ((c.tab("faq") || []) as any[])
        : [
            {
              pergunta:
                "Qual o melhor momento para contratar assistência técnica?",
              resposta:
                "Quanto antes, melhor. Idealmente antes da perícia judicial e da formulação de quesitos. Ainda assim, é possível atuar em fases posteriores (inclusive em contestação de laudo).",
            },
            {
              pergunta:
                "A FT Perícias Médicas e Assistência Técnica atende em todo o Brasil?",
              resposta:
                "Sim. A maior parte da atuação pode ser remota. Quando necessário, avaliamos a possibilidade de atuação presencial conforme o caso.",
            },
            {
              pergunta:
                "Se já existe o perito do juiz, por que contratar suporte técnico?",
              resposta:
                "Porque o seu lado precisa de um olhar técnico próprio: para orientar estratégia, formular quesitos, revisar coerência e apontar lacunas — reduzindo risco de um laudo desfavorável por omissões.",
            },
            {
              pergunta: "Como funciona a análise de viabilidade?",
              resposta:
                "Você envia o resumo do caso e documentos principais. Avaliamos pontos críticos, riscos e caminhos técnicos para sustentar ou refutar hipóteses no processo.",
            },
            {
              pergunta: "E se o laudo judicial vier desfavorável?",
              resposta:
                "É possível contestar tecnicamente: identificamos inconsistências, lacunas e divergências e elaboramos parecer com fundamentação para apoiar a estratégia processual.",
            },
          ],
  };

  const responsavel = {
    rotulo: c.cfg("rotulo_responsavel", "Responsável técnico"),
    nome: c.cfg("nome_responsavel", "Dr. Fábio Tonin"),
    credenciais: c.cfg(
      "credenciais_responsavel",
      "Médico há 15+ anos | Atuação ampla em perícias cíveis, trabalhistas e previdenciárias",
    ),
    texto: c.cfg(
      "bio_responsavel",
      "Com mais de 15 anos de atuação em diferentes frentes da medicina (clínica e generalista), o Dr. Fábio Tonin reúne experiência prática e base conceitual que sustentam um trabalho pericial incisivo. Formado pelo Instituto Felipe Hurtado (IFH), referência nacional na área, possui vivência em perícias cíveis (danos corporais, suposto erro médico, necessidade de tratamentos), avaliações de capacidade civil e laboral, além de demandas trabalhistas envolvendo doenças e acidentes relacionados ao trabalho em múltiplas especialidades médicas.",
    ),
    foto: c.img("foto_responsavel", "https://iili.io/fDr0eeI.png"),
  };

  const chamadaFinal = {
    titulo: c.cfg(
      "titulo_chamada_final",
      "Proteja seu direito com suporte médico de elite.",
    ),
    texto: c.cfg(
      "texto_chamada_final",
      "Não deixe o resultado do seu processo ao acaso. Tenha ao lado uma consultoria que entende de medicina e domina a prática pericial.",
    ),
    texto_botao: c.cfg("texto_botao_final", "SOLICITAR ANÁLISE DO CASO"),
    mensagem_botao: c.cfg(
      "mensagem_botao_final",
      "Olá! Quero solicitar uma análise do caso e entender como a FT Perícias Médicas e Assistência Técnica pode ajudar.",
    ),
    fundo: c.img(
      "imagem_fundo_cta",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=2200&q=80",
    ),
  };

  const rodape = {
    whatsapp_label: c.cfg("texto_footer_whatsapp", "WhatsApp"),
    instagram_label: c.cfg("texto_footer_instagram", "Instagram"),
    localidade_label: c.cfg("texto_footer_localidade", "Localidade"),
    cnpj_label: c.cfg("texto_footer_cnpj", "CNPJ"),

    whatsapp_display: c.cfg("whatsapp_footer_display", "(67) 92287-7408"),
    instagram: c.cfg("instagram_footer", "@ftpericiasmedicas"),
    localidade: c.cfg("localidade_footer", "Campo Grande - Mato Grosso do Sul"),
    cnpj: c.cfg("cnpj_footer", "60.576.742/0001-91"),

    copyright: c.cfg(
      "texto_rodape_final",
      `© 2026 ${marca.nome}. Todos os direitos reservados.`,
    ),
  };

  const instagramHref = useMemo(
    () => normalizeInstagramUrl(rodape.instagram),
    [rodape.instagram],
  );

  const [faqAberto, setFaqAberto] = useState<number | null>(0);

  return (
    <div
      className={cx(
        "min-h-screen bg-white text-slate-900 [font-family:Inter,system-ui,sans-serif]",
        "[--deep:var(--c-deep)] [--gold:var(--c-gold)] [--paper:var(--c-paper)] [--cta:var(--c-cta)] [--ctaHover:var(--c-ctaHover)]",
      )}
      style={
        {
          ["--c-deep" as any]: marca.cor_primaria,
          ["--c-gold" as any]: marca.cor_secundaria,
          ["--c-paper" as any]: marca.cor_fundo,
          ["--c-cta" as any]: marca.cor_cta_verde,
          ["--c-ctaHover" as any]: marca.cor_cta_verde_hover,
        } as any
      }
    >
      <style>{`
        :root{
          --deep: var(--c-deep);
          --gold: var(--c-gold);
          --paper: var(--c-paper);
          --cta: var(--c-cta);
          --ctaHover: var(--c-ctaHover);

          --onDeep: rgba(255,255,255,.92);
          --onDeep2: rgba(255,255,255,.72);
          --inkOnGold: #061321;
        }

        .card {
          border-radius: 18px;
          border: 1px solid rgba(15, 23, 42, 0.10);
          box-shadow: 0 18px 55px rgba(2, 6, 23, 0.06);
          background: #ffffff;
        }

        .cardSoft {
          border-radius: 18px;
          border: 1px solid rgba(15, 23, 42, 0.10);
          background: rgba(255,255,255,0.70);
          backdrop-filter: blur(10px);
        }

        .glassCard{
          background: rgba(255,255,255,.08);
          border: 1px solid rgba(255,255,255,.14);
          backdrop-filter: blur(14px);
          box-shadow: 0 30px 90px rgba(0,0,0,.25);
          border-radius: 24px;
        }

        .hairline{
          background: linear-gradient(to right, rgba(148,163,184,.0), rgba(148,163,184,.55), rgba(148,163,184,.0));
          height: 1px;
        }

        .btnCta{
          background: var(--cta);
          color: #062013;
          box-shadow: 0 18px 55px rgba(0,0,0,.25);
          transition: transform .15s ease, filter .15s ease, background .15s ease;
        }
        .btnCta:hover{ background: var(--ctaHover); transform: translateY(-1px); }
        .btnCta:active{ transform: translateY(0px); }

        .btnDeep{
          background: var(--deep);
          color: #fff;
          box-shadow: 0 18px 55px rgba(0,30,54,.22);
          transition: transform .15s ease, filter .15s ease;
        }
        .btnDeep:hover{ filter: brightness(.98); transform: translateY(-1px); }
        .btnDeep:active{ transform: translateY(0px); }

        a:focus-visible, button:focus-visible{
          outline: 2px solid rgba(141,122,95,.55);
          outline-offset: 3px;
          border-radius: 14px;
        }
      `}</style>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[color:var(--deep)]" />
          <img
            src={marca.hero_fundo}
            alt={c.cfg("texto_alt_fundo_topo", "Imagem de fundo")}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 0.12 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--deep)]/92 via-[color:var(--deep)]/88 to-[#061321]" />

          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -left-40 h-[560px] w-[560px] rounded-full bg-[color:var(--gold)]/18 blur-3xl" />
            <div className="absolute -bottom-52 -right-52 h-[680px] w-[680px] rounded-full bg-white/8 blur-3xl" />
          </div>
        </div>

        <div
          className={cx(container, "relative pt-10 sm:pt-12 pb-12 sm:pb-14")}
        >
          <motion.div variants={anim.stagger} initial="hidden" animate="show">
            <motion.div
              variants={anim.fadeUp}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-start ml-[-40px] mb-[-40px] gap-3 hidden md:flex">
                <img
                  src={marca.logo}
                  alt={c.cfg("texto_alt_logo", "Logo")}
                  className="h-64 sm:h-64 w-auto object-contain"
                />
              </div>

              <a
                href={linkWhatsAppPrincipal}
                className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black glassCard"
              >
                <WhatsAppIcon className="h-4 w-4 text-white" />
                <span className="text-white">WhatsApp</span>
                <ArrowRight className="h-3.5 w-3.5 text-white/90" />
              </a>
            </motion.div>

            <div className="mt-10 grid lg:grid-cols-12 gap-10 items-start">
              <motion.div variants={anim.fadeUp} className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-black tracking-[0.20em] text-white/85">
                  {marca.rotulo_hero}
                </div>

                <h1 className="mt-4 text-[40px] sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] text-white">
                  {tituloHeroComDestaque.map((p, i) => (
                    <span
                      key={i}
                      className={p.emph ? "text-[color:var(--gold)]" : ""}
                    >
                      {p.t}
                    </span>
                  ))}
                </h1>

                <p className="mt-5 text-[15px] leading-[26px] text-white/85 max-w-2xl">
                  {marca.hero_texto}
                </p>
                <p className="mt-3 text-[15px] leading-[26px] text-white/75 max-w-2xl">
                  {marca.hero_texto_2}
                </p>

                <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3">
                  <a
                    href={linkWhatsAppPrincipal}
                    className="inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-black btnCta"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span>{marca.texto_botao_hero}</span>
                    <ArrowRight className="h-4 w-4 opacity-90" />
                  </a>
                  <div className="text-xs text-white/70">
                    {marca.texto_menor_hero}
                  </div>
                </div>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
                  {destaquesTopo.slice(0, 4).map((it, i) => {
                    const titulo = c.col(
                      it,
                      "titulo",
                      destaquesTopoFallback[i]?.titulo || "Destaque",
                    );
                    const icon = c.col(
                      it,
                      "icone",
                      destaquesTopoFallback[i]?.icone || "segurança",
                    );
                    return (
                      <div
                        key={i}
                        className="rounded-2xl border border-white/12 bg-white/6 px-4 py-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl border border-white/12 bg-white/8 grid place-items-center">
                            <IconFromName
                              name={icon}
                              className="h-5 w-5 text-[color:var(--gold)]"
                            />
                          </div>
                          <div className="text-[14px] font-semibold text-white/90 leading-snug">
                            {titulo}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              <motion.div variants={anim.pop} className="lg:col-span-5">
                <div className="glassCard overflow-hidden">
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-extrabold text-white">
                          {c.cfg(
                            "titulo_box_hero",
                            "Envie o caso e receba orientação inicial",
                          )}
                        </div>
                        <div className="mt-1 text-[13px] leading-[20px] text-white/70">
                          {c.cfg(
                            "texto_box_hero",
                            "WhatsApp direto. Triagem objetiva e alinhamento do próximo passo.",
                          )}
                        </div>
                      </div>
                      <div className="h-10 w-10 rounded-2xl bg-[color:var(--gold)]/18 border border-[color:var(--gold)]/22 grid place-items-center">
                        <MessageCircle className="h-4 w-4 text-[color:var(--gold)]" />
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl bg-white/7 border border-white/12 p-4">
                      <div className="text-xs font-black tracking-[0.18em] text-white/65">
                        {c.cfg("rotulo_lista_box_hero", "O QUE ENVIAR")}
                      </div>

                      <div className="mt-3 space-y-2">
                        {(((c.tab("checklist_whatsapp") as any[]) || []).length
                          ? (c.tab("checklist_whatsapp") as any[]) || []
                          : [
                              { t: "Resumo do caso e objetivo" },
                              { t: "Prontuários, exames e relatórios" },
                              { t: "Petição e laudo pericial (se houver)" },
                            ]
                        ).map((it: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="mt-0.5 h-5 w-5 rounded-full bg-white/10 border border-white/12 grid place-items-center">
                              <BadgeCheck className="h-3.5 w-3.5 text-[color:var(--gold)]" />
                            </div>
                            <div className="text-[13px] leading-[20px] text-white/78">
                              {c.col(it, "t", it?.t || "Item")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={linkWhatsAppPrincipal}
                      className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-3 text-sm font-black btnCta"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      <span>
                        {c.cfg("texto_botao_box_hero", "CHAMAR NO WHATSAPP")}
                      </span>
                      <ArrowRight className="h-4 w-4 opacity-90" />
                    </a>

                    <div className="mt-3 text-xs text-white/60">
                      {c.cfg(
                        "texto_mini_box_hero",
                        "Sigilo e cuidado com documentos. Prazos definidos no alinhamento.",
                      )}
                    </div>
                  </div>

                  <div className="h-1.5 w-full bg-[color:var(--gold)]/70" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-14 sm:py-16 bg-white">
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="max-w-4xl"
          >
            <motion.div
              variants={anim.fadeUp}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 grid place-items-center shadow-[0_12px_40px_rgba(2,6,23,0.06)]">
                  <AlertTriangle className="h-5 w-5 text-[color:var(--gold)]" />
                </div>
                <div>
                  <div className="text-xs font-black tracking-[0.18em] text-slate-600">
                    {alerta.rotulo.toUpperCase()}
                  </div>
                  <div className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-950">
                    {alerta.titulo}
                  </div>
                  <p className="mt-4 text-[15px] leading-[26px] text-slate-700">
                    {alerta.texto}
                  </p>
                  <p className="mt-3 text-[15px] leading-[26px] text-slate-700">
                    {alerta.texto_2}
                  </p>

                  <div className="mt-6">
                    <a
                      href={linkWhatsAppPrincipal}
                      className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-black btnCta"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      <span>
                        {c.cfg("texto_botao_alerta", "FALAR COM O PERITO")}
                      </span>
                      <ArrowRight className="h-4 w-4 opacity-90" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                <span className="text-xs font-black tracking-[0.18em] text-slate-700">
                  {c
                    .cfg("rotulo_servicos_principais", "Nossos serviços")
                    .toUpperCase()}
                </span>
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {c.cfg(
                  "titulo_servicos_principais",
                  "Atuação técnica completa em cada fase do caso.",
                )}
              </h2>
              <p className="mt-4 text-[15px] leading-[26px] text-slate-700">
                {c.cfg(
                  "texto_servicos_principais",
                  "Suporte médico-legal com linguagem clara, estrutura e fundamento técnico.",
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
                const img = c.col(
                  it,
                  "imagem",
                  servicosFallback[i]?.imagem || servicosFallback[0].imagem,
                );

                return (
                  <motion.div
                    key={i}
                    variants={anim.pop}
                    whileHover={reduce ? undefined : { y: -6 }}
                    className="rounded-3xl overflow-hidden border border-slate-200 shadow-[0_18px_55px_rgba(2,6,23,0.06)] bg-white"
                  >
                    <div className="aspect-[16/10] relative">
                      <img
                        src={img}
                        alt={c.cfg(
                          "texto_alt_imagem_servico",
                          "Imagem do serviço",
                        )}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/12 to-transparent" />
                      <div className="absolute left-5 bottom-5 flex items-center gap-3">
                        <div
                          className="h-11 w-11 rounded-2xl grid place-items-center text-white shadow-[0_14px_40px_rgba(0,30,54,0.18)]"
                          style={{ background: "var(--deep)" }}
                        >
                          <IconFromName
                            name={icon}
                            className="h-5 w-5 text-white"
                          />
                        </div>
                        <div className="text-white">
                          <div className="text-base font-black leading-tight">
                            {titulo}
                          </div>
                          <div className="text-xs text-white/75">
                            {marca.nome}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="text-[13px] leading-[22px] text-slate-700">
                        {desc}
                      </div>

                      <div className="mt-5">
                        <a
                          href={linkWhatsAppPrincipal}
                          className="inline-flex items-center gap-2 text-sm font-black text-[color:var(--deep)]"
                        >
                          <span>
                            {c.cfg(
                              "texto_cta_card_servico",
                              "Falar no WhatsApp",
                            )}
                          </span>
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={anim.fadeUp} className="mt-10">
              <a
                href={linkWhatsAppPrincipal}
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-black btnCta"
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
                <span className="text-xs font-black tracking-[0.18em] text-slate-700">
                  {c
                    .cfg("rotulo_inteligencia", "Inteligência técnica")
                    .toUpperCase()}
                </span>
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {c.cfg(
                  "titulo_inteligencia",
                  "Aplicada ao processo: menos suposição, mais prova.",
                )}
              </h2>
              <p className="mt-4 text-[15px] leading-[26px] text-slate-700">
                {c.cfg(
                  "texto_inteligencia",
                  "Entregas objetivas para orientar estratégia, sustentar teses e reduzir risco técnico.",
                )}
              </p>
            </motion.div>

            <motion.div
              variants={anim.stagger}
              className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {inteligencia.slice(0, 6).map((it, i) => (
                <motion.div
                  key={i}
                  variants={anim.pop}
                  className="rounded-2xl bg-white border border-slate-200 shadow-[0_18px_55px_rgba(2,6,23,0.06)] p-6"
                >
                  <div className="h-11 w-11 rounded-2xl bg-[color:var(--deep)] grid place-items-center shadow-[0_14px_40px_rgba(0,30,54,0.16)]">
                    <IconFromName
                      name={c.col(it, "icone", "laudos")}
                      className="h-5 w-5 text-white"
                    />
                  </div>
                  <div className="mt-4 text-base font-extrabold text-slate-950">
                    {c.col(it, "titulo", "Item")}
                  </div>
                  <div className="mt-2 text-[13px] leading-[22px] text-slate-700">
                    {c.col(it, "texto", "")}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={anim.fadeUp} className="mt-10">
              <a
                href={linkWhatsAppPrincipal}
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-black btnCta"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>
                  {c.cfg("texto_botao_inteligencia", "FALAR COM O PERITO")}
                </span>
                <ArrowRight className="h-4 w-4 opacity-90" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className={container}>
          <motion.div
            variants={anim.stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid lg:grid-cols-12 gap-8 items-start"
          >
            <motion.div variants={anim.fadeUp} className="lg:col-span-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1">
                <span className="text-xs font-black tracking-[0.18em] text-slate-700">
                  {comoFunciona.rotulo.toUpperCase()}
                </span>
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {comoFunciona.titulo}
              </h2>
            </motion.div>

            <motion.div variants={anim.pop} className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(2,6,23,0.10)] border border-slate-200 bg-white">
                <div className="aspect-[4/5] relative">
                  <img
                    src={comoFunciona.imagem}
                    alt={c.cfg(
                      "texto_alt_imagem_como_funciona",
                      "Imagem do fluxo",
                    )}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute left-6 bottom-6 right-6">
                    <div className="text-[11px] font-black tracking-[0.22em] text-white/75">
                      {comoFunciona.mini}
                    </div>
                    <div className="mt-2 text-2xl font-black leading-tight text-white">
                      {comoFunciona.titulo_card}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={anim.fadeUp} className="lg:col-span-7">
              <div className="relative pl-10">
                <div className="absolute left-[12px] top-2 bottom-2 w-px bg-slate-200" />

                <div className="space-y-4">
                  {comoFunciona.passos
                    .slice(0, 4)
                    .map((it: any, idx: number) => {
                      const t = c.col(it, "titulo", `Passo ${idx + 1}`);
                      const a = c.col(it, "texto", "");
                      return (
                        <motion.div
                          key={idx}
                          variants={anim.pop}
                          className="relative rounded-2xl bg-white border border-slate-200 shadow-[0_18px_55px_rgba(2,6,23,0.06)] p-5"
                        >
                          <div className="absolute -left-[34px] top-6 h-3 w-3 rounded-full bg-[color:var(--gold)] shadow-[0_0_0_6px_rgba(141,122,95,0.15)]" />

                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="text-[11px] font-black tracking-[0.20em] text-slate-500">
                                {String(idx + 1).padStart(2, "0")}
                              </div>
                              <div className="mt-1 text-base font-extrabold text-slate-950">
                                {t}
                              </div>
                              <div className="mt-2 text-[13px] leading-[22px] text-slate-700">
                                {a}
                              </div>
                            </div>
                            <div className="h-10 w-10 rounded-2xl bg-slate-50 border border-slate-200 grid place-items-center">
                              <ArrowRight className="h-4 w-4 text-[color:var(--gold)]" />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                </div>

                <div className="mt-8">
                  <a
                    href={linkWhatsAppPrincipal}
                    className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-black btnCta"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span>
                      {c.cfg("texto_botao_como_funciona", "ENVIAR MEU CASO")}
                    </span>
                    <ArrowRight className="h-4 w-4 opacity-90" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                <span className="text-xs font-black tracking-[0.18em] text-slate-700">
                  {c.cfg("rotulo_diferenciais", "Diferenciais").toUpperCase()}
                </span>
              </div>
              <h2 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
                {c.cfg(
                  "titulo_diferenciais",
                  `Por que escolher a ${marca.nome}?`,
                )}
              </h2>
            </motion.div>

            <motion.div
              variants={anim.stagger}
              className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              {diferenciais.slice(0, 3).map((it, i) => (
                <motion.div
                  key={i}
                  variants={anim.pop}
                  className="rounded-2xl bg-white border border-slate-200 shadow-[0_18px_55px_rgba(2,6,23,0.06)] p-6"
                >
                  <div className="h-11 w-11 rounded-2xl bg-[color:var(--deep)] grid place-items-center shadow-[0_14px_40px_rgba(0,30,54,0.16)]">
                    <IconFromName
                      name={c.col(it, "icone", "jurídico")}
                      className="h-5 w-5 text-white"
                    />
                  </div>
                  <div className="mt-4 text-base font-extrabold text-slate-950">
                    {c.col(it, "titulo", "Diferencial")}
                  </div>
                  <div className="mt-2 text-[13px] leading-[22px] text-slate-700">
                    {c.col(it, "texto", "")}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                <span className="text-xs font-black tracking-[0.18em] text-slate-700">
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
                const open = faqAberto === i;

                return (
                  <motion.div
                    key={i}
                    variants={anim.pop}
                    className="rounded-2xl bg-white border border-slate-200 shadow-[0_18px_55px_rgba(2,6,23,0.06)] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setFaqAberto(open ? null : i)}
                      className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between gap-4"
                      aria-expanded={open}
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
                href={linkWhatsAppPrincipal}
                className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-black btnCta"
              >
                <WhatsAppIcon className="h-5 w-5" />
                <span>{c.cfg("texto_botao_faq", "CHAMAR NO WHATSAPP")}</span>
                <ArrowRight className="h-4 w-4 opacity-90" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[color:var(--deep)]" />
          <img
            src={chamadaFinal.fundo}
            alt={c.cfg("texto_alt_imagem_cta", "Imagem de fundo CTA")}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: 0.18 }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--deep)]/92 via-[color:var(--deep)]/88 to-[#061321]" />
        </div>

        <div className={cx(container, "relative py-16 sm:py-20")}>
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
              {chamadaFinal.titulo}
            </motion.h2>
            <motion.p
              variants={anim.fadeUp}
              className="mt-4 text-[15px] leading-[26px] text-white/78"
            >
              {chamadaFinal.texto}
            </motion.p>

            <motion.a
              variants={anim.pop}
              href={buildWaLink(waBase, chamadaFinal.mensagem_botao)}
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.99 }}
              className="mt-7 inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-black btnCta"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span>{chamadaFinal.texto_botao}</span>
              <ArrowRight className="h-4 w-4 opacity-90" />
            </motion.a>

            <div className="mt-4 text-xs text-white/60">
              {c.cfg(
                "texto_mini_cta_final",
                "Excelência técnica. Fundamentação segura.",
              )}
            </div>
          </motion.div>
        </div>
      </section>

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
                <span className="text-xs font-black tracking-[0.18em] text-slate-700">
                  {responsavel.rotulo.toUpperCase()}
                </span>
              </div>
            </motion.div>

            <motion.div
              variants={anim.pop}
              className="mt-6 rounded-3xl bg-white border border-slate-200 shadow-[0_18px_55px_rgba(2,6,23,0.06)] overflow-hidden"
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
                        loading="lazy"
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

                  <div className="mt-7">
                    <a
                      href={linkWhatsAppPrincipal}
                      className="inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-black btnCta"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      <span>
                        {c.cfg("texto_botao_responsavel", "FALAR COM O PERITO")}
                      </span>
                      <ArrowRight className="h-4 w-4 opacity-90" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-white">
        <div className={cx(container, "py-12")}>
          <div className="grid md:grid-cols-4 gap-3">
            <a
              href={buildWaLink(waBase, marca.mensagem_whatsapp)}
              className="cardSoft px-4 py-3 flex items-center gap-3 hover:bg-white/80"
            >
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 grid place-items-center">
                <Phone className="h-4 w-4 text-[color:var(--gold)]" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-slate-600">
                  {rodape.whatsapp_label}
                </div>
                <div className="text-[15px] font-bold text-slate-900">
                  {rodape.whatsapp_display}
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
                  {rodape.instagram_label}
                </div>
                <div className="text-[15px] font-bold text-slate-900">
                  {rodape.instagram}
                </div>
              </div>
            </a>

            <div className="cardSoft px-4 py-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 grid place-items-center">
                <Building2 className="h-4 w-4 text-[color:var(--gold)]" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-slate-600">
                  {rodape.localidade_label}
                </div>
                <div className="text-[15px] font-bold text-slate-900">
                  {rodape.localidade}
                </div>
              </div>
            </div>

            <div className="cardSoft px-4 py-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 grid place-items-center">
                <IdCard className="h-4 w-4 text-[color:var(--gold)]" />
              </div>
              <div className="leading-tight">
                <div className="text-xs font-semibold text-slate-600">
                  {rodape.cnpj_label}
                </div>
                <div className="text-[15px] font-bold text-slate-900">
                  {rodape.cnpj}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-600">
            {rodape.copyright}
          </div>
        </div>
      </footer>

      <motion.a
        href={linkWhatsAppPrincipal}
        aria-label={c.cfg("texto_alt_botao_whatsapp_fixo", "Falar no WhatsApp")}
        initial={reduce ? undefined : { opacity: 0, scale: 0.98, y: 10 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1, y: 0 }}
        className="fixed bottom-5 right-5 z-50"
      >
        <motion.div
          whileHover={reduce ? undefined : { y: -3 }}
          whileTap={reduce ? undefined : { scale: 0.98 }}
          className="h-14 w-14 rounded-full shadow-[0_18px_60px_rgba(0,0,0,0.22)] border border-white/10 flex items-center justify-center"
          style={{ background: "var(--cta)" }}
        >
          <WhatsAppIcon className="h-7 w-7 text-[#062013]" />
        </motion.div>
      </motion.a>
    </div>
  );
}
