/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/preserve-manual-memoization */
"use client";

import React, { useMemo, useState } from "react";
import { makeCtx } from "@/ui/ctx";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  cubicBezier,
} from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Instagram,
  MessageCircle,
  Sparkles,
  X,
  Quote,
  HelpCircle,
  BadgeCheck,
} from "lucide-react";

type PageProps = { data?: any };

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(" ");
}

function isExternalHref(href?: string) {
  return !!href && /^https?:\/\//i.test(href);
}

function buildWaLink(base: string, text: string) {
  if (!base || base === "#") return "#";
  const joiner = base.includes("?") ? "&" : "?";
  return `${base}${joiner}text=${encodeURIComponent(text || "")}`;
}

function useMotionEase(reduce: boolean) {
  return reduce ? undefined : cubicBezier(0.22, 1, 0.36, 1);
}

function scrollToId(id: string, reduce: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "soft" | "ghost" | "dark";
  icon?: boolean;
  reduce: boolean;
  className?: string;
  wrapClassName?: string;
};

type ButtonAsLink = ButtonBaseProps & {
  href: string;
  onClick?: never;
  type?: never;
};

type ButtonAsButton = ButtonBaseProps & {
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    children,
    variant = "primary",
    icon = true,
    reduce,
    className,
    wrapClassName,
  } = props;

  const base =
    "group inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold tracking-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]";

  const style =
    variant === "primary"
      ? "bg-[#6B1F2B] text-[#FFF7F2] shadow-[0_18px_55px_rgba(31,26,23,0.24)] hover:brightness-[1.05] hover:shadow-[0_22px_70px_rgba(31,26,23,0.26)]"
      : variant === "soft"
        ? "border border-[rgba(31,26,23,0.12)] bg-[rgba(255,255,255,0.76)] text-[#1F1A17] shadow-[0_10px_30px_rgba(31,26,23,0.10)] hover:bg-[rgba(255,255,255,0.92)]"
        : variant === "dark"
          ? "bg-[#1F1A17] text-[#FFF7F2] shadow-[0_18px_55px_rgba(31,26,23,0.28)] hover:brightness-[1.08]"
          : "text-[#6B1F2B] hover:text-[#4A1620]";

  const commonClass = cx(base, style, className);

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      className={cx("inline-flex", wrapClassName)}
    >
      {"href" in props ? (
        <a
          href={props.href}
          className={commonClass}
          target={isExternalHref(props.href) ? "_blank" : undefined}
          rel={isExternalHref(props.href) ? "noreferrer" : undefined}
        >
          <span>{children}</span>
          {icon ? (
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          ) : null}
        </a>
      ) : (
        <button
          type={props.type ?? "button"}
          onClick={props.onClick}
          className={commonClass}
        >
          <span>{children}</span>
          {icon ? (
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
          ) : null}
        </button>
      )}
    </motion.div>
  );
}

function Frame({
  children,
  className,
  tone = "light",
  sketch = false,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "tint" | "dark";
  sketch?: boolean;
}) {
  const base =
    "relative overflow-hidden rounded-2xl shadow-[0_22px_70px_rgba(31,26,23,0.12)] backdrop-blur-sm";
  const toneCls =
    tone === "dark"
      ? "border border-[rgba(255,255,255,0.10)] bg-[rgba(31,26,23,0.86)] text-[#FFF7F2]"
      : tone === "tint"
        ? "border border-[rgba(107,31,43,0.14)] bg-[rgba(107,31,43,0.05)]"
        : "border border-[rgba(31,26,23,0.10)] bg-[rgba(255,255,255,0.74)]";

  return (
    <div className={cx(base, toneCls, className)}>
      <div
        className={cx(
          "pointer-events-none absolute inset-0 opacity-[0.62]",
          tone === "dark"
            ? "[background:radial-gradient(circle_at_18%_18%,rgba(255,247,242,0.14),transparent_55%),radial-gradient(circle_at_82%_22%,rgba(255,247,242,0.08),transparent_48%),linear-gradient(115deg,rgba(255,255,255,0.10),transparent_40%)]"
            : "[background:radial-gradient(circle_at_18%_18%,rgba(107,31,43,0.12),transparent_55%),radial-gradient(circle_at_82%_22%,rgba(31,26,23,0.06),transparent_48%),linear-gradient(115deg,rgba(255,255,255,0.45),transparent_40%)]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 opacity-[0.10] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22360%22 height=%22360%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22360%22 height=%22360%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
      {sketch ? (
        <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1200 800%22%3E%3Cpath d=%22M55 140c210-90 380-120 575-80 220 45 360 22 515-55%22 fill=%22none%22 stroke=%22%236B1F2B%22 stroke-width=%222.6%22 stroke-linecap=%22round%22 opacity=%220.22%22/%3E%3Cpath d=%22M105 690c230-60 430-70 610-30 210 45 335 35 465-15%22 fill=%22none%22 stroke=%22%231F1A17%22 stroke-width=%222.2%22 stroke-linecap=%22round%22 opacity=%220.16%22/%3E%3C/svg%3E')]" />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionTitle({
  subtitulo,
  titulo,
  descricao,
  alinhar = "center",
}: {
  subtitulo: string;
  titulo: string;
  descricao?: string;
  alinhar?: "center" | "left";
}) {
  return (
    <div
      className={cx(
        "mx-auto",
        alinhar === "left" ? "max-w-3xl" : "max-w-2xl",
        alinhar === "left" ? "text-left" : "text-center",
      )}
    >
      <div
        className={cx(
          "mb-3 flex items-center gap-3",
          alinhar === "left" ? "justify-start" : "justify-center",
        )}
      >
        <span className="h-px w-10 bg-[rgba(31,26,23,0.12)]" />
        <div className="text-xs font-extrabold tracking-[0.22em] uppercase text-[rgba(107,31,43,0.82)]">
          {subtitulo}
        </div>
        <span className="h-px w-10 bg-[rgba(31,26,23,0.12)]" />
      </div>
      <h2 className="text-2xl font-black tracking-tight text-[#1F1A17] sm:text-3xl">
        {titulo}
      </h2>
      {descricao ? (
        <p className="mt-3 text-sm leading-relaxed text-[rgba(31,26,23,0.76)] sm:text-base">
          {descricao}
        </p>
      ) : null}
    </div>
  );
}

function FullBanner({
  imagemFundo,
  overlay = "from-[rgba(246,239,234,0.92)] via-[rgba(246,239,234,0.76)] to-[rgba(246,239,234,0.94)]",
}: {
  imagemFundo: string;
  overlay?: string;
}) {
  return (
    <div className="absolute inset-0">
      <img
        src={imagemFundo}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className={cx("absolute inset-0 bg-gradient-to-b", overlay)} />
      <div className="absolute inset-0 opacity-[0.36] [background:radial-gradient(circle_at_18%_18%,rgba(107,31,43,0.22),transparent_58%),radial-gradient(circle_at_86%_24%,rgba(31,26,23,0.10),transparent_50%)]" />
    </div>
  );
}

function AbstractDecor({
  variante = "hero",
}: {
  variante?: "hero" | "section";
}) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "pointer-events-none absolute inset-0 overflow-hidden",
        variante === "hero" ? "opacity-100" : "opacity-[0.90]",
      )}
    >
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[rgba(107,31,43,0.14)] blur-3xl" />
      <div className="absolute -right-28 top-10 h-80 w-80 rounded-full bg-[rgba(31,26,23,0.08)] blur-3xl" />
      <div className="absolute left-1/2 top-[62%] h-72 w-72 -translate-x-1/2 rounded-full bg-[rgba(255,255,255,0.55)] blur-3xl" />
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(31,26,23,0.20)_1px,transparent_1px),linear-gradient(to_bottom,rgba(31,26,23,0.20)_1px,transparent_1px)] [background-size:52px_52px]" />
      <div className="absolute left-[6%] top-[22%] h-24 w-24 rotate-[12deg] rounded-3xl border border-[rgba(31,26,23,0.10)] bg-[rgba(255,255,255,0.45)] shadow-[0_24px_60px_rgba(31,26,23,0.10)] backdrop-blur-sm" />
      <div className="absolute right-[10%] top-[34%] h-20 w-28 -rotate-[10deg] rounded-3xl border border-[rgba(107,31,43,0.12)] bg-[rgba(107,31,43,0.06)] shadow-[0_24px_60px_rgba(31,26,23,0.10)] backdrop-blur-sm" />
      <div className="absolute left-[12%] bottom-[14%] h-16 w-40 rotate-[8deg] rounded-3xl border border-[rgba(31,26,23,0.10)] bg-[rgba(255,255,255,0.40)] shadow-[0_24px_60px_rgba(31,26,23,0.10)] backdrop-blur-sm" />
    </div>
  );
}

function FundoComImagemSuave({
  imagem,
  opacidade = 0.16,
  blur = 6,
  vinheta = true,
}: {
  imagem: string;
  opacidade?: number;
  blur?: number;
  vinheta?: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src={imagem}
        alt=""
        className="h-full w-full object-cover"
        style={{ opacity: opacidade, filter: `blur(${blur}px)` }}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[#F6EFEA]/70" />
      {vinheta ? (
        <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.55),transparent_62%),radial-gradient(circle_at_20%_80%,rgba(107,31,43,0.08),transparent_55%)] opacity-[0.9]" />
      ) : null}
    </div>
  );
}

type Servico = {
  titulo: string;
  descricao: string;
  detalhes?: string;
  etiqueta?: string;
};

function CardServico({
  servico,
  reduzirAnimacoes,
  aoClicarSaibaMais,
  textoBotao,
}: {
  servico: Servico;
  reduzirAnimacoes: boolean;
  aoClicarSaibaMais: () => void;
  textoBotao: string;
}) {
  return (
    <motion.div
      whileHover={reduzirAnimacoes ? undefined : { y: -3 }}
      className="h-full"
    >
      <Frame className="group h-full p-6" sketch>
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="text-base font-black tracking-tight text-[#1F1A17]">
                {servico.titulo}
              </div>

              {servico.etiqueta ? (
                <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[rgba(31,26,23,0.10)] bg-[rgba(255,255,255,0.78)] px-3 py-1 text-xs font-extrabold text-[rgba(31,26,23,0.70)]">
                  <BadgeCheck className="h-4 w-4 text-[#6B1F2B]" />
                  {servico.etiqueta}
                </div>
              ) : null}

              <div className="mt-3 text-sm leading-relaxed text-[rgba(31,26,23,0.74)]">
                {servico.descricao}
              </div>
            </div>

            <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(31,26,23,0.10)] bg-white/70 shadow-[0_14px_40px_rgba(31,26,23,0.10)] sm:flex">
              <Sparkles className="h-5 w-5 text-[#6B1F2B]" />
            </div>
          </div>

          <div className="mt-auto pt-5">
            <button
              onClick={aoClicarSaibaMais}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-[rgba(31,26,23,0.12)] bg-[rgba(255,255,255,0.84)] px-4 py-2.5 text-xs font-extrabold text-[#6B1F2B] shadow-[0_10px_30px_rgba(31,26,23,0.08)] transition hover:bg-[rgba(255,255,255,0.98)] hover:shadow-[0_14px_40px_rgba(31,26,23,0.10)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]"
            >
              {textoBotao}
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-[32px] bg-[rgba(107,31,43,0.10)] blur-2xl opacity-70 transition group-hover:opacity-95" />
      </Frame>
    </motion.div>
  );
}

function BotaoWhatsAppFlutuante({
  link,
  reduzirAnimacoes,
  ariaLabel,
  rotulo,
}: {
  link: string;
  reduzirAnimacoes: boolean;
  ariaLabel: string;
  rotulo: string;
}) {
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel}
      whileHover={reduzirAnimacoes ? undefined : { scale: 1.03 }}
      whileTap={reduzirAnimacoes ? undefined : { scale: 0.98 }}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-extrabold text-white shadow-[0_18px_60px_rgba(31,26,23,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(37,211,102,0.45)]"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">{rotulo}</span>
    </motion.a>
  );
}

function Modal({
  aberto,
  titulo,
  children,
  aoFechar,
  reduzirAnimacoes,
  rotuloDetalhes,
  ariaFechar,
}: {
  aberto: boolean;
  titulo: string;
  children: React.ReactNode;
  aoFechar: () => void;
  reduzirAnimacoes: boolean;
  rotuloDetalhes: string;
  ariaFechar: string;
}) {
  return (
    <AnimatePresence>
      {aberto ? (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={aoFechar}
          />
          <motion.div
            className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: reduzirAnimacoes ? 0 : 0.22 },
            }}
            exit={{
              opacity: 0,
              y: 10,
              transition: { duration: reduzirAnimacoes ? 0 : 0.18 },
            }}
          >
            <div className="w-full max-w-xl">
              <Frame className="p-5 sm:p-6" sketch>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-extrabold tracking-[0.22em] uppercase text-[rgba(107,31,43,0.82)]">
                      {rotuloDetalhes}
                    </div>
                    <div className="mt-1 font-serif text-xl font-black tracking-tight text-[#1F1A17]">
                      {titulo}
                    </div>
                  </div>
                  <button
                    onClick={aoFechar}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(31,26,23,0.12)] bg-[rgba(255,255,255,0.78)] text-[rgba(31,26,23,0.70)] transition hover:bg-[rgba(255,255,255,0.94)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]"
                    aria-label={ariaFechar}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-4 text-sm leading-relaxed text-[rgba(31,26,23,0.78)] sm:text-base">
                  {children}
                </div>
              </Frame>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}

function ItemFAQ({
  pergunta,
  resposta,
  aberto,
  aoAlternar,
  ariaAlternar,
}: {
  pergunta: string;
  resposta: string;
  aberto: boolean;
  aoAlternar: () => void;
  ariaAlternar: string;
}) {
  return (
    <div className="rounded-2xl border border-[rgba(31,26,23,0.10)] bg-[rgba(255,255,255,0.76)] shadow-[0_12px_35px_rgba(31,26,23,0.08)]">
      <button
        onClick={aoAlternar}
        aria-label={ariaAlternar}
        className="w-full rounded-2xl px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <HelpCircle className="mt-0.5 h-5 w-5 text-[#6B1F2B]" />
            <div className="text-sm font-extrabold text-[#1F1A17] sm:text-base">
              {pergunta}
            </div>
          </div>
          <ChevronDown
            className={cx(
              "h-5 w-5 text-[rgba(31,26,23,0.55)] transition",
              aberto && "rotate-180",
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {aberto ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm leading-relaxed text-[rgba(31,26,23,0.76)] sm:text-base">
              {resposta}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function CardDepoimento({
  texto,
  meta,
  reduzirAnimacoes,
}: {
  texto: string;
  meta: string;
  reduzirAnimacoes: boolean;
}) {
  return (
    <motion.div
      whileHover={reduzirAnimacoes ? undefined : { y: -2 }}
      className="h-full"
    >
      <Frame className="h-full p-6" sketch>
        <div className="flex h-full flex-col">
          <Quote className="h-5 w-5 text-[#6B1F2B]" />
          <div className="mt-3 text-sm leading-relaxed text-[rgba(31,26,23,0.78)] sm:text-base">
            {texto}
          </div>
          <div className="mt-5 border-t border-[rgba(31,26,23,0.10)] pt-4 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(31,26,23,0.55)]">
            {meta}
          </div>
        </div>
      </Frame>
    </motion.div>
  );
}

export default function Page({ data }: PageProps) {
  const c = makeCtx(data);
  const reduzirPreferencia = useReducedMotion();
  const reduzirAnimacoes = !!reduzirPreferencia;
  const easing = useMotionEase(reduzirAnimacoes);

  const nomeCliente = c.cfg("nome_cliente", "Christye Biagio");
  const tituloCliente = c.cfg("titulo_cliente", "Terapeuta");

  const linkInstagram = c.link(
    "link_instagram",
    "https://www.instagram.com/christyebiagio.dh",
  );

  const linkCurso = c.link(
    "link_curso",
    "https://chk.eduzz.com/801EPYZNW7?utm_source=ig&utm_medium=social&utm_content=link_in_bio",
  );

  const linkBaseWhatsApp = c.wa(
    "whatsapp_contato",
    "https://wa.me/5519996527253",
  );
  const numeroWhatsApp = c.cfg("whatsapp_display", "+55 19 99652-7253");

  const mensagemPadraoWhatsApp = c.cfg(
    "whatsapp_mensagem_padrao",
    "Olá! Vi seu site e quero saber mais sobre seus atendimentos.",
  );

  const linkWhatsApp = useMemo(
    () => buildWaLink(linkBaseWhatsApp, mensagemPadraoWhatsApp),
    [linkBaseWhatsApp, mensagemPadraoWhatsApp],
  );

  // Backdrops “do meio”
  const imagemHero = c.img(
    "imagem_hero",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80",
  );
  const imagemPerfil = c.img("imagem_perfil", "https://iili.io/fD4HHv9.md.png");
  const imagemSobre = c.img("imagem_sobre", "https://iili.io/fD4um6N.md.png");

  const imagemFundoServicos = c.img(
    "imagem_fundo_servicos",
    "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=2200&q=80",
  );
  const imagemFundoFAQ = c.img(
    "imagem_fundo_faq",
    "https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?auto=format&fit=crop&w=2200&q=80",
  );

  const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";
  const paddingVertical = "py-14 sm:py-18 lg:py-22";

  const animFadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  const animStagger = {
    hidden: {},
    show: {
      transition: reduzirAnimacoes
        ? undefined
        : { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  };

  // =========================
  // Tabs defaults em variáveis
  // (para o gerador de sheets preencher)
  // =========================

  const servicosFallback = [
    {
      grupo: "principal",
      titulo: "Terapia Individual",
      descricao:
        "Acompanhamento para ansiedade, estresse e desenvolvimento emocional. Sessões presenciais e online.",
      detalhes:
        "Um espaço seguro para entender padrões, organizar emoções e construir recursos práticos para o dia a dia. O processo é conduzido com acolhimento e direção objetiva, respeitando seu ritmo.",
      etiqueta: "Clínica",
    },
    {
      grupo: "principal",
      titulo: "Terapia de Casal",
      descricao:
        "Processos de comunicação, reconexão e resolução de conflitos.",
      detalhes:
        "Foco em comunicação, acordos, reconstrução de confiança e leitura de padrões do relacionamento. Sessões estruturadas para sair do ciclo de conflito e voltar à cooperação.",
      etiqueta: "Relacionamentos",
    },
    {
      grupo: "principal",
      titulo: "Avaliação Vocacional e Redirecionamento de Carreira",
      descricao:
        "Instrumentos validados para diagnóstico, orientação e tomada de decisão.",
      detalhes:
        "Processo guiado para clarear caminhos possíveis e tomar decisões com mais segurança. Inclui etapas de investigação e organização de prioridades, com instrumentos quando aplicável.",
      etiqueta: "Carreira",
    },
    {
      grupo: "avancado",
      titulo: "Coaching Emocional e Desenvolvimento de Líderes",
      descricao:
        "Programa para gestores, empreendedores e profissionais de alta performance.",
      detalhes:
        "Para quem precisa sustentar performance sem se perder emocionalmente. Trabalha autogestão, limites, tomada de decisão e comunicação — com foco em clareza e consistência.",
      etiqueta: "Performance saudável",
    },
    {
      grupo: "avancado",
      titulo: "Avaliação Psicológica",
      descricao:
        "Avaliações em contexto clínico, comportamental e ocupacional, seguindo diretrizes do CFP.",
      detalhes:
        "Quando há necessidade de avaliação formal, o processo segue critérios técnicos e ética profissional, com devolutiva clara e encaminhamentos objetivos.",
      etiqueta: "CFP / técnica",
    },
    {
      grupo: "empresas",
      titulo: "Perfil Profissional do Candidato (R&S)",
      descricao:
        "Serviço especializado para empresas: perfil comportamental e aderência ao cargo.",
      detalhes:
        "Suporte para decisões mais seguras em recrutamento: leitura de perfil, aderência ao contexto e recomendações para integração e gestão do desempenho.",
      etiqueta: "Empresas",
    },
    {
      grupo: "empresas",
      titulo: "Consultoria em Saúde Mental Corporativa",
      descricao:
        "Diagnóstico e ações para fortalecimento do clima organizacional e bem-estar.",
      detalhes:
        "Ações para reduzir desgaste, melhorar clima e fortalecer cultura. Pode envolver diagnóstico, workshops e orientação para líderes conforme a necessidade.",
      etiqueta: "Clima e bem-estar",
    },
  ];

  const depoimentosFallback = [
    {
      texto:
        "Eu estava muito ansiosa e sem direção. O processo foi acolhedor, mas ao mesmo tempo objetivo. Saí com clareza e ferramentas práticas para o meu dia a dia.",
      meta: "Avaliação anônima • Atendimento clínico",
    },
    {
      texto:
        "A forma de conduzir as sessões me ajudou a organizar pensamentos e colocar limites. Foi um divisor de águas para a minha rotina e minhas relações.",
      meta: "Avaliação anônima • Terapia",
    },
    {
      texto:
        "Na consultoria, a leitura do cenário e as recomendações foram extremamente aplicáveis. Comunicação interna e clima melhoraram muito em poucas semanas.",
      meta: "Avaliação anônima • Consultoria corporativa",
    },
  ];

  const faqsFallback = [
    {
      pergunta: "Como funciona o atendimento (online e presencial)?",
      resposta:
        "Você pode escolher a modalidade conforme sua rotina. No online, as sessões acontecem por chamada de vídeo. No presencial, combinamos local e horários disponíveis.",
    },
    {
      pergunta: "Como faço para agendar a primeira conversa?",
      resposta:
        "Pelo WhatsApp. Você me chama, diz sua preferência e eu te passo horários e próximos passos.",
    },
    {
      pergunta: "Em quanto tempo eu começo a ver resultados?",
      resposta:
        "Depende do objetivo e da frequência. Em geral, nas primeiras sessões já dá para sentir mais clareza e organização. A evolução é construída ao longo do processo.",
    },
    {
      pergunta: "Você atende demandas corporativas e treinamentos?",
      resposta:
        "Sim. Há formatos para consultoria, diagnóstico, workshops e desenvolvimento de lideranças, conforme a necessidade da empresa.",
    },
  ];

  const bulletsHeroFallback = [
    { texto: "Sessões presenciais e online" },
    { texto: "Acolhimento + objetividade" },
    { texto: "Instrumentos validados (quando aplicável)" },
    { texto: "Plano claro de evolução" },
  ];

  const paragrafosSobreFallback = [
    {
      texto:
        "Profissional com experiência consolidada em desenvolvimento humano, relações organizacionais e gestão de pessoas.",
    },
    {
      texto:
        "Atua com propósito em formar profissionais, desenvolver talentos e transformar ambientes por meio da educação, do cuidado terapêutico e da liderança humanizada.",
    },
    {
      texto:
        "Possui experiência clínica com terapia, orientação vocacional e processos de avaliação, ampliando sensibilidade para ler pessoas e contextos com profundidade.",
    },
  ];

  // =========================
  // Tabs (com fallback passado no c.tab)
  // =========================

  const servicosBrutos = (c.tab("services", servicosFallback) || []) as any[];

  const servicos = servicosBrutos.map((item: any) => {
    const grupo =
      c.col(item, "grupo", c.col(item, "categoria", "principal")) ||
      "principal";
    return {
      grupo: String(grupo).toLowerCase(),
      titulo: c.col(item, "titulo", c.col(item, "title", "Serviço")),
      descricao: c.col(item, "descricao", c.col(item, "desc", "")),
      detalhes: c.col(item, "detalhes", c.col(item, "detail", "")),
      etiqueta: c.col(item, "etiqueta", c.col(item, "tag", "")),
    } as Servico & { grupo: string };
  });

  const servicosPrincipais = servicos.filter(
    (s: any) => s.grupo === "principal",
  );
  const servicosAvancados = servicos.filter((s: any) => s.grupo === "avancado");
  const servicosEmpresas = servicos.filter((s: any) => s.grupo === "empresas");

  const depoimentosBrutos = (c.tab("testimonials", depoimentosFallback) ||
    []) as any[];
  const depoimentos = depoimentosBrutos.map((item: any) => ({
    texto: c.col(item, "texto", c.col(item, "text", "Depoimento")),
    meta: c.col(item, "meta", c.col(item, "autor", "Avaliação anônima")),
  }));

  const faqsBrutos = (c.tab("faq", faqsFallback) || []) as any[];
  const faqs = faqsBrutos.map((item: any) => ({
    pergunta: c.col(item, "pergunta", c.col(item, "q", "Pergunta")),
    resposta: c.col(item, "resposta", c.col(item, "a", "")),
  }));

  const bulletsHeroBrutos = (c.tab("hero_bullets", bulletsHeroFallback) ||
    []) as any[];
  const bulletsHero = bulletsHeroBrutos.map((item: any) => ({
    texto: c.col(item, "texto", c.col(item, "text", "Diferencial")),
  }));

  const paragrafosSobreBrutos = (c.tab(
    "about_paragraphs",
    paragrafosSobreFallback,
  ) || []) as any[];
  const paragrafosSobre = paragrafosSobreBrutos.map((item: any) => ({
    texto: c.col(item, "texto", c.col(item, "text", "")),
  }));

  const mensagemServicoTemplate = c.cfg(
    "whatsapp_mensagem_servico_template",
    "Olá! Tenho interesse em: {{servico}}. Pode me passar disponibilidade e próximos passos?",
  );

  const linkWhatsAppParaServico = (tituloServico: string) =>
    buildWaLink(
      linkBaseWhatsApp,
      mensagemServicoTemplate.replace("{{servico}}", tituloServico),
    );

  const [indiceServicoAtivo, setIndiceServicoAtivo] = useState<number | null>(
    null,
  );
  const [indiceFaqAberto, setIndiceFaqAberto] = useState<number>(0);

  const listaServicos = [
    ...servicosPrincipais,
    ...servicosAvancados,
    ...servicosEmpresas,
  ];
  const servicoAtivo =
    indiceServicoAtivo === null ? null : listaServicos[indiceServicoAtivo];

  const itensMenu = [
    { id: "about", label: c.cfg("menu_sobre", "Conheça") },
    { id: "services", label: c.cfg("menu_servicos", "Serviços") },
    { id: "testimonials", label: c.cfg("menu_avaliacoes", "Avaliações") },
    { id: "faq", label: c.cfg("menu_faq", "FAQ") },
    { id: "course", label: c.cfg("menu_curso", "Curso") },
    { id: "instagram", label: c.cfg("menu_instagram", "Instagram") },
  ];

  return (
    <div className="min-h-screen bg-[#F6EFEA] text-[#1F1A17]">
      <BotaoWhatsAppFlutuante
        link={linkWhatsApp}
        reduzirAnimacoes={reduzirAnimacoes}
        ariaLabel={c.cfg("aria_whatsapp_fixo", "Falar no WhatsApp")}
        rotulo={c.cfg("rotulo_whatsapp_fixo", "WhatsApp")}
      />

      <Modal
        aberto={!!servicoAtivo}
        titulo={servicoAtivo?.titulo ?? ""}
        aoFechar={() => setIndiceServicoAtivo(null)}
        reduzirAnimacoes={reduzirAnimacoes}
        rotuloDetalhes={c.cfg("modal_rotulo_detalhes", "Detalhes")}
        ariaFechar={c.cfg("aria_fechar_modal", "Fechar")}
      >
        <div className="space-y-4">
          <p>{servicoAtivo?.detalhes ?? ""}</p>

          <div className="rounded-2xl border border-[rgba(31,26,23,0.10)] bg-[rgba(255,255,255,0.76)] p-4 shadow-[0_12px_35px_rgba(31,26,23,0.08)]">
            <div className="text-xs font-extrabold tracking-[0.22em] uppercase text-[rgba(107,31,43,0.82)]">
              {c.cfg("modal_kicker_proximo_passo", "Próximo passo")}
            </div>
            <div className="mt-2 text-sm font-extrabold text-[rgba(31,26,23,0.78)]">
              {c.cfg(
                "modal_texto_proximo_passo",
                "Me chame no WhatsApp e eu te passo horários e como funciona.",
              )}
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <Button
              href={
                servicoAtivo
                  ? linkWhatsAppParaServico(servicoAtivo.titulo)
                  : linkWhatsApp
              }
              variant="primary"
              reduce={reduzirAnimacoes}
              wrapClassName="w-full"
              className="w-full"
            >
              {c.cfg("modal_botao_whatsapp", "Chamar no WhatsApp")}
            </Button>
            <Button
              onClick={() => setIndiceServicoAtivo(null)}
              variant="soft"
              reduce={reduzirAnimacoes}
              wrapClassName="w-full"
              className="w-full"
              icon={false}
            >
              {c.cfg("modal_botao_fechar", "Fechar")}
            </Button>
          </div>
        </div>
      </Modal>

      <main className="relative">
        <section className="relative min-h-[92vh] overflow-hidden">
          <FullBanner imagemFundo={imagemHero} />
          <AbstractDecor variante="hero" />

          <header className="relative z-10">
            <div className={cx(container, "pt-4 sm:pt-6")}>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <button
                  onClick={() => scrollToId("top", reduzirAnimacoes)}
                  className={cx(
                    "w-full md:w-auto",
                    "inline-flex items-center justify-between gap-3 rounded-2xl border border-[rgba(31,26,23,0.12)] bg-[rgba(255,255,255,0.78)] px-4 py-2.5 shadow-[0_18px_60px_rgba(31,26,23,0.12)] backdrop-blur-sm transition hover:bg-[rgba(255,255,255,0.92)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]",
                  )}
                >
                  <div className="leading-tight text-left">
                    <div className="font-serif text-lg font-black tracking-tight text-[#1F1A17]">
                      {nomeCliente}
                    </div>
                    <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(107,31,43,0.82)]">
                      {tituloCliente}
                    </div>
                  </div>

                  <div className="hidden h-10 w-10 items-center justify-center rounded-xl border border-[rgba(31,26,23,0.10)] bg-[rgba(107,31,43,0.08)] shadow-[0_10px_30px_rgba(31,26,23,0.10)] sm:flex">
                    <Sparkles className="h-5 w-5 text-[#6B1F2B]" />
                  </div>
                </button>

                <nav className="hidden items-center gap-1.5 md:flex">
                  {itensMenu.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToId(item.id, reduzirAnimacoes)}
                      className="rounded-xl px-3 py-2 text-sm font-extrabold tracking-tight text-[rgba(31,26,23,0.72)] transition hover:text-[#1F1A17] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]"
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>

                <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:items-center">
                  <Button
                    href={linkInstagram}
                    variant="soft"
                    icon={false}
                    reduce={reduzirAnimacoes}
                    wrapClassName="w-full"
                    className="w-full"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <Instagram className="h-4 w-4" />
                      {c.cfg("botao_instagram", "Instagram")}
                    </span>
                  </Button>

                  <Button
                    href={linkWhatsApp}
                    variant="primary"
                    reduce={reduzirAnimacoes}
                    wrapClassName="w-full"
                    className="w-full"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {c.cfg("botao_whatsapp", "WhatsApp")}
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div id="top" className="relative z-10">
            <div
              className={cx(
                container,
                "pt-10 pb-10 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-16",
              )}
            >
              <motion.div
                initial="hidden"
                animate="show"
                variants={animStagger}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12"
              >
                <motion.div
                  variants={animFadeUp}
                  transition={{
                    duration: reduzirAnimacoes ? 0 : 0.8,
                    ease: easing,
                  }}
                  className="lg:col-span-7"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(107,31,43,0.18)] bg-[rgba(255,255,255,0.66)] px-3 py-1.5 text-xs font-extrabold tracking-[0.18em] uppercase text-[#6B1F2B] shadow-[0_10px_30px_rgba(31,26,23,0.10)]">
                    {c.cfg("hero_selo", "Atendimento • Clínica • Corporativo")}
                  </div>

                  <h1 className="mt-4 font-serif text-4xl font-black leading-[1.02] tracking-tight text-[#1F1A17] sm:text-5xl">
                    {c.cfg(
                      "hero_titulo",
                      "Terapia com profundidade, clareza e direção prática.",
                    )}
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgba(31,26,23,0.80)] sm:text-base">
                    {c.cfg(
                      "hero_descricao",
                      "Profissional com mais de 15 anos de experiência em desenvolvimento humano, relações organizacionais e gestão de pessoas. Atuação clínica e consultoria corporativa com foco em evolução emocional e performance saudável.",
                    )}
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {bulletsHero.slice(0, 4).map((item: any, idx: number) => (
                      <div
                        key={`${item.texto}-${idx}`}
                        className="flex items-start gap-3 rounded-2xl border border-[rgba(31,26,23,0.10)] bg-[rgba(255,255,255,0.74)] px-4 py-3 shadow-[0_12px_35px_rgba(31,26,23,0.08)]"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                        <span className="text-sm font-extrabold text-[rgba(31,26,23,0.78)]">
                          {item.texto}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 grid gap-2 sm:flex sm:flex-row sm:gap-3">
                    <Button
                      href={linkWhatsApp}
                      variant="primary"
                      reduce={reduzirAnimacoes}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      {c.cfg("hero_botao_principal", "Agendar / Tirar dúvidas")}
                    </Button>

                    <Button
                      onClick={() => scrollToId("services", reduzirAnimacoes)}
                      variant="soft"
                      reduce={reduzirAnimacoes}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      {c.cfg("hero_botao_secundario", "Ver serviços")}
                    </Button>
                  </div>

                  <button
                    onClick={() => scrollToId("about", reduzirAnimacoes)}
                    className="mt-10 inline-flex items-center gap-2 rounded-xl px-2 py-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(31,26,23,0.62)] transition hover:text-[rgba(31,26,23,0.92)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]"
                  >
                    <span>
                      {c.cfg("hero_link_ancora", "Conheça a profissional")}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </motion.div>

                <motion.div
                  variants={animFadeUp}
                  transition={{
                    duration: reduzirAnimacoes ? 0 : 0.8,
                    ease: easing,
                  }}
                  className="lg:col-span-5"
                >
                  <Frame className="p-6 sm:p-7" sketch>
                    <div className="relative overflow-hidden rounded-2xl border border-[rgba(31,26,23,0.10)] bg-white">
                      <div className="aspect-[4/3]">
                        <img
                          src={imagemPerfil}
                          alt={c.cfg("perfil_alt", "Foto da profissional")}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(31,26,23,0.32)] via-transparent to-transparent" />
                      <div className="pointer-events-none absolute -left-10 -top-10 h-28 w-28 rounded-full bg-[rgba(107,31,43,0.16)] blur-2xl" />
                    </div>

                    <div className="mt-5">
                      <div className="font-serif text-xl font-black tracking-tight">
                        {nomeCliente}
                      </div>
                      <div className="mt-1 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(107,31,43,0.82)]">
                        {tituloCliente}
                      </div>

                      <div className="mt-4 grid gap-2 text-sm font-extrabold text-[rgba(31,26,23,0.74)]">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                          <span>
                            {c.cfg(
                              "card_ponto_1",
                              "Experiência clínica e organizacional",
                            )}
                          </span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                          <span>
                            {c.cfg(
                              "card_ponto_2",
                              "Treinamentos, palestras e consultorias",
                            )}
                          </span>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-2">
                        <Button
                          href={linkWhatsApp}
                          variant="soft"
                          reduce={reduzirAnimacoes}
                          wrapClassName="w-full"
                          className="w-full"
                        >
                          {c.cfg("card_botao", "Ver disponibilidade")}
                        </Button>
                      </div>
                    </div>
                  </Frame>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about" className="relative">
          <div className="absolute inset-0">
            <AbstractDecor variante="section" />
          </div>

          <div className={cx(container, paddingVertical, "relative")}>
            <SectionTitle
              subtitulo={c.cfg("sobre_subtitulo", "Conheça")}
              titulo={c.cfg("sobre_titulo", "Sobre a profissional")}
              descricao={c.cfg(
                "sobre_descricao",
                "Uma atuação que integra cuidado humano, técnica e visão prática para evolução emocional e profissional.",
              )}
              alinhar="left"
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Frame className="p-6 sm:p-8" sketch>
                  <div className="space-y-4 text-sm leading-relaxed text-[rgba(31,26,23,0.80)] sm:text-base">
                    {paragrafosSobre.slice(0, 8).map((p: any, idx: number) => (
                      <p key={idx}>{p.texto}</p>
                    ))}
                  </div>

                  <div className="mt-7 grid gap-2 sm:flex sm:flex-row sm:gap-3">
                    <Button
                      href={linkWhatsApp}
                      variant="primary"
                      reduce={reduzirAnimacoes}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      {c.cfg("sobre_botao_whatsapp", "Falar no WhatsApp")}
                    </Button>
                    <Button
                      href={linkInstagram}
                      variant="soft"
                      icon={false}
                      reduce={reduzirAnimacoes}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <Instagram className="h-4 w-4" />
                        {c.cfg("sobre_botao_instagram", "Instagram")}
                      </span>
                    </Button>
                  </div>
                </Frame>
              </div>

              <div className="lg:col-span-5">
                <Frame className="p-6 sm:p-7" tone="tint" sketch>
                  <div className="relative overflow-hidden rounded-2xl border border-[rgba(31,26,23,0.10)] bg-white">
                    <div className="aspect-[4/3]">
                      <img
                        src={imagemSobre}
                        alt={c.cfg(
                          "sobre_alt_imagem",
                          "Imagem da profissional",
                        )}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(31,26,23,0.26)] via-transparent to-transparent" />
                  </div>

                  <div className="mt-5 rounded-2xl border border-[rgba(31,26,23,0.10)] bg-[rgba(255,255,255,0.66)] p-5 shadow-[0_12px_35px_rgba(31,26,23,0.08)]">
                    <div className="text-xs font-extrabold tracking-[0.22em] uppercase text-[#6B1F2B]">
                      {c.cfg("sobre_box_titulo", "Atendimento")}
                    </div>
                    <div className="mt-3 grid gap-2 text-sm font-extrabold text-[rgba(31,26,23,0.76)]">
                      <div className="flex items-start gap-3">
                        <CalendarClock className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                        <span>
                          {c.cfg("sobre_box_linha_1", "Presencial e Online")}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                        <span>
                          {c.cfg(
                            "sobre_box_linha_2",
                            "Clareza de processo + acompanhamento",
                          )}
                        </span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                        <span>
                          {c.cfg(
                            "sobre_box_linha_3",
                            "Foco em evolução contínua",
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button
                      href={linkWhatsApp}
                      variant="soft"
                      reduce={reduzirAnimacoes}
                      wrapClassName="w-full"
                      className="w-full"
                    >
                      {c.cfg(
                        "sobre_botao_disponibilidade",
                        "Ver disponibilidade",
                      )}
                    </Button>
                  </div>
                </Frame>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="relative overflow-hidden">
          <FundoComImagemSuave
            imagem={imagemFundoServicos}
            opacidade={0.16}
            blur={7}
          />
          <div className="absolute inset-0">
            <AbstractDecor variante="section" />
          </div>

          <div className={cx(container, paddingVertical, "relative")}>
            <SectionTitle
              subtitulo={c.cfg("servicos_subtitulo", "Serviços")}
              titulo={c.cfg("servicos_titulo", "Atendimentos e consultorias")}
              descricao={c.cfg(
                "servicos_descricao",
                "Escolha a modalidade que faz sentido para o seu momento. Se tiver dúvida, chame no WhatsApp.",
              )}
            />

            <div className="mt-10">
              <div className="mb-4 text-left font-serif text-xl font-black text-[#1F1A17]">
                {c.cfg("servicos_grupo_principal_titulo", "Serviços")}
              </div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={animStagger}
                className="grid gap-4 lg:grid-cols-3"
              >
                {servicosPrincipais.map((s: any, i: number) => (
                  <motion.div
                    key={s.titulo}
                    variants={animFadeUp}
                    transition={{
                      duration: reduzirAnimacoes ? 0 : 0.65,
                      ease: easing,
                    }}
                  >
                    <CardServico
                      servico={s}
                      reduzirAnimacoes={reduzirAnimacoes}
                      aoClicarSaibaMais={() => setIndiceServicoAtivo(i)}
                      textoBotao={c.cfg(
                        "servicos_botao_saiba_mais",
                        "Saiba mais",
                      )}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            <div className="mt-10">
              <div className="mb-4 text-left font-serif text-xl font-black text-[#1F1A17]">
                {c.cfg("servicos_grupo_avancado_titulo", "Serviços Avançados")}
              </div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={animStagger}
                className="grid gap-4 lg:grid-cols-2"
              >
                {servicosAvancados.map((s: any, i: number) => {
                  const indice = i + servicosPrincipais.length;
                  return (
                    <motion.div
                      key={s.titulo}
                      variants={animFadeUp}
                      transition={{
                        duration: reduzirAnimacoes ? 0 : 0.65,
                        ease: easing,
                      }}
                    >
                      <CardServico
                        servico={s}
                        reduzirAnimacoes={reduzirAnimacoes}
                        aoClicarSaibaMais={() => setIndiceServicoAtivo(indice)}
                        textoBotao={c.cfg(
                          "servicos_botao_saiba_mais",
                          "Saiba mais",
                        )}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="mt-10">
              <div className="mb-4 text-left font-serif text-xl font-black text-[#1F1A17]">
                {c.cfg(
                  "servicos_grupo_empresas_titulo",
                  "Consultorias Empresariais",
                )}
              </div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={animStagger}
                className="grid gap-4 lg:grid-cols-2"
              >
                {servicosEmpresas.map((s: any, i: number) => {
                  const indice =
                    i + servicosPrincipais.length + servicosAvancados.length;
                  return (
                    <motion.div
                      key={s.titulo}
                      variants={animFadeUp}
                      transition={{
                        duration: reduzirAnimacoes ? 0 : 0.65,
                        ease: easing,
                      }}
                    >
                      <CardServico
                        servico={s}
                        reduzirAnimacoes={reduzirAnimacoes}
                        aoClicarSaibaMais={() => setIndiceServicoAtivo(indice)}
                        textoBotao={c.cfg(
                          "servicos_botao_saiba_mais",
                          "Saiba mais",
                        )}
                      />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="mt-10">
              <Frame className="p-6 sm:p-7" sketch>
                <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="text-sm font-extrabold tracking-tight text-[rgba(31,26,23,0.82)]">
                    {c.cfg(
                      "servicos_cta_texto",
                      "Quer ajuda para escolher o melhor serviço?",
                    )}
                  </div>
                  <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:gap-3">
                    <Button
                      href={linkWhatsApp}
                      variant="primary"
                      reduce={reduzirAnimacoes}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      {c.cfg(
                        "servicos_cta_botao_whatsapp",
                        "Chamar no WhatsApp",
                      )}
                    </Button>
                    <Button
                      href={linkInstagram}
                      variant="soft"
                      icon={false}
                      reduce={reduzirAnimacoes}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <Instagram className="h-4 w-4" />
                        {c.cfg("servicos_cta_botao_instagram", "Instagram")}
                      </span>
                    </Button>
                  </div>
                </div>
              </Frame>
            </div>
          </div>
        </section>

        <section
          id="testimonials"
          className="relative bg-[rgba(255,255,255,0.40)]"
        >
          <div className={cx(container, paddingVertical)}>
            <SectionTitle
              subtitulo={c.cfg("avaliacoes_subtitulo", "Avaliações")}
              titulo={c.cfg(
                "avaliacoes_titulo",
                "Relatos de quem buscou clareza e direção",
              )}
              descricao={c.cfg(
                "avaliacoes_descricao",
                "Depoimentos anônimos (modelo).",
              )}
            />

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={animStagger}
              className="mt-10 grid gap-4 lg:grid-cols-3"
            >
              {depoimentos.map((d: any, idx: number) => (
                <motion.div
                  key={`${d.meta}-${idx}`}
                  variants={animFadeUp}
                  transition={{
                    duration: reduzirAnimacoes ? 0 : 0.65,
                    ease: easing,
                  }}
                >
                  <CardDepoimento
                    texto={d.texto}
                    meta={d.meta}
                    reduzirAnimacoes={reduzirAnimacoes}
                  />
                </motion.div>
              ))}
            </motion.div>

            <div className="mt-10">
              <Frame className="p-6 sm:p-7" sketch>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm font-extrabold text-[rgba(31,26,23,0.80)]">
                    {c.cfg(
                      "avaliacoes_cta_texto",
                      "Quer entender qual abordagem faz mais sentido para você?",
                    )}
                  </div>
                  <Button
                    href={linkWhatsApp}
                    variant="primary"
                    reduce={reduzirAnimacoes}
                    wrapClassName="w-full sm:w-auto"
                    className="w-full sm:w-auto"
                  >
                    {c.cfg("avaliacoes_cta_botao", "Falar no WhatsApp")}
                  </Button>
                </div>
              </Frame>
            </div>
          </div>
        </section>

        <section id="faq" className="relative overflow-hidden">
          <FundoComImagemSuave
            imagem={imagemFundoFAQ}
            opacidade={0.14}
            blur={8}
          />
          <div className={cx(container, paddingVertical, "relative")}>
            <SectionTitle
              subtitulo={c.cfg("faq_subtitulo", "Dúvidas")}
              titulo={c.cfg("faq_titulo", "Perguntas frequentes")}
              descricao={c.cfg(
                "faq_descricao",
                "Informações rápidas para você decidir com tranquilidade.",
              )}
            />

            <div className="mt-10 grid gap-3 lg:grid-cols-2">
              {faqs.map((f: any, i: number) => (
                <ItemFAQ
                  key={`${f.pergunta}-${i}`}
                  pergunta={f.pergunta}
                  resposta={f.resposta}
                  aberto={indiceFaqAberto === i}
                  aoAlternar={() =>
                    setIndiceFaqAberto((p) => (p === i ? -1 : i))
                  }
                  ariaAlternar={c.cfg(
                    "faq_aria_toggle",
                    "Abrir/fechar pergunta",
                  )}
                />
              ))}
            </div>

            <div className="mt-10">
              <Frame className="p-7 sm:p-10" sketch>
                <div className="grid items-center gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-8">
                    <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(107,31,43,0.18)] bg-[rgba(255,255,255,0.66)] px-3 py-1.5 text-xs font-extrabold tracking-[0.18em] uppercase text-[#6B1F2B] shadow-[0_10px_30px_rgba(31,26,23,0.10)]">
                      {c.cfg("faq_cta_selo", "Resposta rápida")}
                    </div>
                    <div className="mt-3 font-serif text-2xl font-black tracking-tight text-[#1F1A17] sm:text-3xl">
                      {c.cfg(
                        "faq_cta_titulo",
                        "Se preferir, eu te explico no WhatsApp em 1 minuto.",
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[rgba(31,26,23,0.76)] sm:text-base">
                      {c.cfg(
                        "faq_cta_descricao",
                        "Você me chama, diz sua preferência e o objetivo. Eu te passo horários e próximos passos.",
                      )}
                    </p>
                  </div>
                  <div className="lg:col-span-4">
                    <Button
                      href={linkWhatsApp}
                      variant="primary"
                      reduce={reduzirAnimacoes}
                      wrapClassName="w-full"
                      className="w-full"
                    >
                      {c.cfg("faq_cta_botao", "Chamar no WhatsApp")}
                    </Button>
                  </div>
                </div>
              </Frame>
            </div>
          </div>
        </section>

        <section id="course" className="relative">
          <div className={cx(container, "pb-14 sm:pb-18 lg:pb-22")}>
            <Frame className="p-7 sm:p-10" tone="dark" sketch>
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-3 py-1.5 text-xs font-extrabold tracking-[0.18em] uppercase text-[#FFF7F2]">
                    {c.cfg("curso_selo", "Metas Realizáveis")}
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-black tracking-tight text-[#FFF7F2] sm:text-3xl">
                    {c.cfg(
                      "curso_titulo",
                      "Clareza, equilíbrio e transformação real",
                    )}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[rgba(255,247,242,0.84)] sm:text-base">
                    {c.cfg(
                      "curso_descricao",
                      "Exercícios práticos para autodesenvolvimento e evolução contínua. Inclui materiais complementares conforme disponibilidade.",
                    )}
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <div className="grid gap-2">
                    <Button
                      href={linkCurso}
                      variant="primary"
                      reduce={reduzirAnimacoes}
                      wrapClassName="w-full"
                      className="w-full"
                    >
                      {c.cfg(
                        "curso_botao_principal",
                        "Acessar página do curso",
                      )}
                    </Button>
                    <Button
                      href={linkWhatsApp}
                      variant="soft"
                      reduce={reduzirAnimacoes}
                      wrapClassName="w-full"
                      className="w-full"
                    >
                      {c.cfg(
                        "curso_botao_secundario",
                        "Tirar dúvidas no WhatsApp",
                      )}
                    </Button>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(255,247,242,0.62)]">
                    <BadgeCheck className="h-4 w-4" />
                    {c.cfg("curso_obs", "Conteúdo prático e direto")}
                  </div>
                </div>
              </div>
            </Frame>
          </div>
        </section>

        <section id="instagram" className="relative">
          <div className={cx(container, "pb-16 sm:pb-20 lg:pb-24")}>
            <div className="border-t border-[rgba(31,26,23,0.12)] pt-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="text-xs font-extrabold tracking-[0.20em] uppercase text-[rgba(31,26,23,0.58)]">
                  {c
                    .cfg("rodape_texto", "© {{ano}} • {{nome}}")
                    .replace("{{ano}}", String(new Date().getFullYear()))
                    .replace("{{nome}}", nomeCliente)}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[
                    ["about", c.cfg("rodape_link_sobre", "Profissional")],
                    ["services", c.cfg("rodape_link_servicos", "Serviços")],
                    [
                      "testimonials",
                      c.cfg("rodape_link_avaliacoes", "Avaliações"),
                    ],
                    ["faq", c.cfg("rodape_link_faq", "FAQ")],
                    ["course", c.cfg("rodape_link_curso", "Curso")],
                  ].map(([id, rotulo]) => (
                    <button
                      key={String(id)}
                      onClick={() => scrollToId(String(id), reduzirAnimacoes)}
                      className="rounded-xl px-3 py-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(31,26,23,0.66)] transition hover:text-[rgba(31,26,23,0.92)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]"
                    >
                      {rotulo}
                    </button>
                  ))}

                  <a
                    href={linkInstagram}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl px-3 py-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[#6B1F2B] transition hover:text-[#4A1620] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]"
                  >
                    {c.cfg("rodape_link_instagram", "Instagram")}
                  </a>
                </div>
              </div>

              <div className="mt-5">
                <Button
                  href={linkWhatsApp}
                  variant="soft"
                  reduce={reduzirAnimacoes}
                  wrapClassName="w-full sm:w-auto"
                  className="w-full sm:w-auto"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {c.cfg("rodape_botao_whatsapp", "Falar no WhatsApp")}
                  </span>
                </Button>
                <p className="mt-3 text-sm font-extrabold tracking-tight text-[rgba(31,26,23,0.66)]">
                  {numeroWhatsApp}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        html,
        body {
          background: #f6efea;
        }
        ::selection {
          background: rgba(107, 31, 43, 0.18);
        }
      `}</style>
    </div>
  );
}
