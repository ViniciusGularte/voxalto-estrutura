"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion, cubicBezier } from "framer-motion";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Instagram,
  MessageCircle,
  Sparkles,
} from "lucide-react";

type PageProps = { data?: unknown };

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
  variant?: "primary" | "soft" | "ghost";
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
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold tracking-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]";

  const style =
    variant === "primary"
      ? "bg-[#6B1F2B] text-[#FFF7F2] shadow-[0_18px_50px_rgba(31,26,23,0.22)] hover:brightness-[1.05]"
      : variant === "soft"
        ? "border border-[rgba(31,26,23,0.12)] bg-[rgba(255,255,255,0.62)] text-[#1F1A17] hover:bg-[rgba(255,255,255,0.78)]"
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
          {icon ? <ArrowRight className="h-4 w-4" /> : null}
        </a>
      ) : (
        <button
          type={props.type ?? "button"}
          onClick={props.onClick}
          className={commonClass}
        >
          <span>{children}</span>
          {icon ? <ArrowRight className="h-4 w-4" /> : null}
        </button>
      )}
    </motion.div>
  );
}

function Frame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-2xl border border-[rgba(31,26,23,0.10)] bg-[rgba(255,255,255,0.62)] shadow-[0_20px_60px_rgba(31,26,23,0.12)] backdrop-blur-sm",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.55] [background:radial-gradient(circle_at_18%_18%,rgba(107,31,43,0.10),transparent_55%),radial-gradient(circle_at_82%_22%,rgba(31,26,23,0.05),transparent_45%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionTitle({
  kicker,
  title,
  desc,
  align = "center",
}: {
  kicker: string;
  title: string;
  desc?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cx(
        "mx-auto",
        align === "left" ? "max-w-3xl" : "max-w-2xl",
        align === "left" ? "text-left" : "text-center",
      )}
    >
      <div
        className={cx(
          "mb-3 flex items-center gap-3",
          align === "left" ? "justify-start" : "justify-center",
        )}
      >
        <span className="h-px w-10 bg-[rgba(31,26,23,0.12)]" />
        <div className="text-xs font-extrabold tracking-[0.22em] uppercase text-[rgba(107,31,43,0.78)]">
          {kicker}
        </div>
        <span className="h-px w-10 bg-[rgba(31,26,23,0.12)]" />
      </div>
      <h2 className="text-2xl font-black tracking-tight text-[#1F1A17] sm:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm leading-relaxed text-[rgba(31,26,23,0.74)] sm:text-base">
          {desc}
        </p>
      ) : null}
    </div>
  );
}

function FullBanner({
  bg,
  overlay = "from-[rgba(246,239,234,0.90)] via-[rgba(246,239,234,0.74)] to-[rgba(246,239,234,0.92)]",
}: {
  bg: string;
  overlay?: string;
}) {
  return (
    <div className="absolute inset-0">
      <img
        src={bg}
        alt=""
        className="h-full w-full object-cover"
        loading="lazy"
      />
      <div className={cx("absolute inset-0 bg-gradient-to-b", overlay)} />
      <div className="absolute inset-0 opacity-[0.35] [background:radial-gradient(circle_at_20%_20%,rgba(107,31,43,0.18),transparent_55%),radial-gradient(circle_at_80%_25%,rgba(31,26,23,0.10),transparent_45%)]" />
    </div>
  );
}

type Service = {
  title: string;
  desc: string;
};

function ServiceCard({ title, desc, reduce }: Service & { reduce: boolean }) {
  return (
    <motion.div whileHover={reduce ? undefined : { y: -2 }} className="h-full">
      <Frame className="h-full p-6">
        <div className="flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-base font-black tracking-tight text-[#1F1A17]">
                {title}
              </div>
              <div className="mt-2 text-sm leading-relaxed text-[rgba(31,26,23,0.72)]">
                {desc}
              </div>
            </div>
            <div className="hidden sm:flex h-10 w-1.5 rounded-full bg-[#6B1F2B]/70" />
          </div>

          <div className="mt-5">
            <span className="inline-flex items-center gap-2 rounded-lg border border-[rgba(31,26,23,0.10)] bg-[rgba(255,255,255,0.62)] px-3 py-2 text-xs font-extrabold text-[#6B1F2B]">
              Saiba Mais <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Frame>
    </motion.div>
  );
}

function FloatingWhatsApp({ href, reduce }: { href: string; reduce: boolean }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      whileHover={reduce ? undefined : { scale: 1.03 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-extrabold text-white shadow-[0_18px_60px_rgba(31,26,23,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(37,211,102,0.45)]"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </motion.a>
  );
}

export default function Page(_props: PageProps) {
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const ease = useMotionEase(reduce);

  // Links
  const instagram = "https://www.instagram.com/christyebiagio/";
  const courseLink =
    "https://chk.eduzz.com/801EPYZNW7?utm_source=ig&utm_medium=social&utm_content=link_in_bio";

  // TROQUE PELO WHATSAPP REAL (com DDI/DDD)
  const waBase = "https://wa.me/55XXXXXXXXXXX";
  const waText =
    "Oi Christye! Vi seu site e quero saber mais sobre seus atendimentos.";
  const waLink = useMemo(() => buildWaLink(waBase, waText), [waBase]);

  // Imagens (placeholders — troque pela foto real dela e um banner)
  const heroBg =
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2000&q=80";
  const profilePhoto =
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=crop&w=1200&q=80";

  const container = "mx-auto w-full max-w-6xl px-4 sm:px-6";
  const yPad = "py-14 sm:py-18 lg:py-22";

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
  };

  const stagger = {
    hidden: {},
    show: {
      transition: reduce
        ? undefined
        : { staggerChildren: 0.08, delayChildren: 0.06 },
    },
  };

  const servicesMain: Service[] = [
    {
      title: "Psicoterapia Individual",
      desc: "Acompanhamento para ansiedade, estresse e desenvolvimento emocional. Sessões presenciais e online.",
    },
    {
      title: "Terapia de Casal",
      desc: "Processos de comunicação, reconexão e resolução de conflitos.",
    },
    {
      title: "Avaliação Vocacional e Redirecionamento de Carreira",
      desc: "Instrumentos validados para diagnóstico, orientação e tomada de decisão.",
    },
  ];

  const servicesAdvanced: Service[] = [
    {
      title: "Coaching Emocional e Desenvolvimento de Líderes",
      desc: "Programa para gestores, empreendedores e profissionais de alta performance.",
    },
    {
      title: "Avaliação Psicológica",
      desc: "Avaliações em contexto clínico, comportamental e ocupacional, seguindo diretrizes do CFP.",
    },
  ];

  const servicesCorporate: Service[] = [
    {
      title: "Perfil Profissional do Candidato (R&S)",
      desc: "Serviço especializado para empresas: perfil comportamental e aderência ao cargo.",
    },
    {
      title: "Consultoria em Saúde Mental Corporativa",
      desc: "Diagnóstico e ações para fortalecimento do clima organizacional e bem-estar.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6EFEA] text-[#1F1A17]">
      {/* Botão flutuante WhatsApp */}
      <FloatingWhatsApp href={waLink} reduce={reduce} />

      <main className="relative">
        {/* HERO / SOBRE */}
        <section className="relative min-h-[92vh] overflow-hidden">
          <FullBanner bg={heroBg} />

          <header className="relative z-10">
            <div className={cx(container, "pt-4 sm:pt-6")}>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                {/* Brand */}
                <button
                  onClick={() => scrollToId("top", reduce)}
                  className={cx(
                    "w-full md:w-auto",
                    "inline-flex items-center justify-between gap-3 rounded-2xl border border-[rgba(31,26,23,0.12)] bg-[rgba(255,255,255,0.62)] px-4 py-2.5 shadow-[0_18px_60px_rgba(31,26,23,0.12)] backdrop-blur-sm transition hover:bg-[rgba(255,255,255,0.78)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]",
                  )}
                >
                  <div className="leading-tight text-left">
                    <div className="font-serif text-lg font-black tracking-tight text-[#1F1A17]">
                      Christye Biagio
                    </div>
                    <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(107,31,43,0.78)]">
                      Psicóloga • Consultoria Corporativa
                    </div>
                  </div>

                  <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl border border-[rgba(31,26,23,0.10)] bg-[rgba(107,31,43,0.08)]">
                    <Sparkles className="h-5 w-5 text-[#6B1F2B]" />
                  </div>
                </button>

                {/* Nav desktop */}
                <nav className="hidden items-center gap-1.5 md:flex">
                  {[
                    ["about", "Conheça a Profissional"],
                    ["services", "Serviços"],
                    ["course", "Curso"],
                    ["instagram", "Instagram"],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => scrollToId(id, reduce)}
                      className="rounded-xl px-3 py-2 text-sm font-extrabold tracking-tight text-[rgba(31,26,23,0.70)] transition hover:text-[#1F1A17] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]"
                    >
                      {label}
                    </button>
                  ))}
                </nav>

                {/* CTAs (mobile em grid) */}
                <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:items-center">
                  <Button
                    href={instagram}
                    variant="soft"
                    icon={false}
                    reduce={reduce}
                    wrapClassName="w-full"
                    className="w-full"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <Instagram className="h-4 w-4" />
                      Instagram
                    </span>
                  </Button>

                  <Button
                    href={waLink}
                    variant="primary"
                    reduce={reduce}
                    wrapClassName="w-full"
                    className="w-full"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
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
                variants={stagger}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12"
              >
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: reduce ? 0 : 0.8, ease }}
                  className="lg:col-span-7"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(107,31,43,0.18)] bg-[rgba(107,31,43,0.08)] px-3 py-1.5 text-xs font-extrabold tracking-[0.18em] uppercase text-[#6B1F2B]">
                    Atendimento • Clínica • Corporativo
                  </div>

                  <h1 className="mt-4 font-serif text-4xl font-black leading-[1.02] tracking-tight text-[#1F1A17] sm:text-5xl">
                    Psicologia com profundidade, clareza e direção prática.
                  </h1>

                  <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[rgba(31,26,23,0.76)] sm:text-base">
                    Profissional com mais de 15 anos de experiência em
                    Psicologia Organizacional, Desenvolvimento Humano e Gestão
                    de Pessoas. Atuação clínica e consultoria corporativa com
                    foco em evolução emocional e performance saudável.
                  </p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {[
                      "Sessões presenciais e online",
                      "Acolhimento + objetividade",
                      "Instrumentos validados (quando aplicável)",
                      "Plano claro de evolução",
                    ].map((t) => (
                      <div key={t} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                        <span className="text-sm font-extrabold text-[rgba(31,26,23,0.74)]">
                          {t}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 grid gap-2 sm:flex sm:flex-row sm:gap-3">
                    <Button
                      href={waLink}
                      variant="primary"
                      reduce={reduce}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      Agendar / Tirar dúvidas
                    </Button>

                    <Button
                      onClick={() => scrollToId("services", reduce)}
                      variant="soft"
                      reduce={reduce}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      Ver serviços
                    </Button>
                  </div>

                  <button
                    onClick={() => scrollToId("about", reduce)}
                    className="mt-10 inline-flex items-center gap-2 rounded-xl px-2 py-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(31,26,23,0.55)] transition hover:text-[rgba(31,26,23,0.88)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]"
                  >
                    <span>Conheça a profissional</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: reduce ? 0 : 0.8, ease }}
                  className="lg:col-span-5"
                >
                  <Frame className="p-6 sm:p-7">
                    <div className="overflow-hidden rounded-2xl border border-[rgba(31,26,23,0.10)] bg-white">
                      <div className="aspect-[4/3]">
                        <img
                          src={profilePhoto}
                          alt="Christye Biagio"
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="mt-5">
                      <div className="font-serif text-xl font-black tracking-tight">
                        Christye Biagio
                      </div>
                      <div className="mt-1 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(107,31,43,0.78)]">
                        Psicóloga • Consultoria Corporativa
                      </div>

                      <div className="mt-4 grid gap-2 text-sm font-extrabold text-[rgba(31,26,23,0.70)]">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                          <span>Experiência clínica e organizacional</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                          <span>Treinamentos, palestras e consultorias</span>
                        </div>
                      </div>
                    </div>
                  </Frame>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="relative">
          <div className={cx(container, yPad)}>
            <SectionTitle
              kicker="Conheça"
              title="Sobre a profissional"
              desc="Uma atuação que integra cuidado humano, técnica e visão prática para evolução emocional e profissional."
              align="left"
            />

            <div className="mt-8 grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <Frame className="p-6 sm:p-8">
                  <div className="space-y-4 text-sm leading-relaxed text-[rgba(31,26,23,0.78)] sm:text-base">
                    <p>
                      Profissional com experiência consolidada em Psicologia
                      Organizacional, Desenvolvimento Humano e Gestão de
                      Pessoas.
                    </p>
                    <p>
                      Atua com propósito em formar profissionais, desenvolver
                      talentos e transformar ambientes por meio da educação,
                      psicologia e liderança humanizada.
                    </p>
                    <p>
                      Possui experiência clínica com psicoterapia, orientação
                      vocacional e processos de avaliação, ampliando
                      sensibilidade para ler pessoas e contextos com
                      profundidade.
                    </p>
                  </div>

                  <div className="mt-7 grid gap-2 sm:flex sm:flex-row sm:gap-3">
                    <Button
                      href={waLink}
                      variant="primary"
                      reduce={reduce}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      Falar com a Christye
                    </Button>
                    <Button
                      href={instagram}
                      variant="soft"
                      icon={false}
                      reduce={reduce}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </span>
                    </Button>
                  </div>
                </Frame>
              </div>

              <div className="lg:col-span-5">
                <Frame className="p-6 sm:p-7">
                  <div className="rounded-2xl border border-[rgba(31,26,23,0.10)] bg-[rgba(107,31,43,0.06)] p-5">
                    <div className="text-xs font-extrabold tracking-[0.22em] uppercase text-[#6B1F2B]">
                      Atendimento
                    </div>
                    <div className="mt-3 grid gap-2 text-sm font-extrabold text-[rgba(31,26,23,0.74)]">
                      <div className="flex items-start gap-3">
                        <CalendarClock className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                        <span>Presencial e Online</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                        <span>Clareza de processo + acompanhamento</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#6B1F2B]" />
                        <span>Foco em evolução contínua</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <Button
                      href={waLink}
                      variant="soft"
                      reduce={reduce}
                      wrapClassName="w-full"
                      className="w-full"
                    >
                      Ver disponibilidade
                    </Button>
                  </div>
                </Frame>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative">
          <div className={cx(container, yPad)}>
            <SectionTitle
              kicker="Serviços"
              title="Atendimentos e consultorias"
              desc="Escolha a modalidade que faz sentido para o seu momento. Se tiver dúvida, chame no WhatsApp."
            />

            {/* Serviços */}
            <div className="mt-10">
              <div className="mb-4 text-left font-serif text-xl font-black text-[#1F1A17]">
                Serviços
              </div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={stagger}
                className="grid gap-4 lg:grid-cols-3"
              >
                {servicesMain.map((s) => (
                  <motion.div
                    key={s.title}
                    variants={fadeUp}
                    transition={{ duration: reduce ? 0 : 0.65, ease }}
                  >
                    <ServiceCard
                      title={s.title}
                      desc={s.desc}
                      reduce={reduce}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Serviços psicológicos avançados */}
            <div className="mt-10">
              <div className="mb-4 text-left font-serif text-xl font-black text-[#1F1A17]">
                Serviços Psicológicos Avançados
              </div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={stagger}
                className="grid gap-4 lg:grid-cols-2"
              >
                {servicesAdvanced.map((s) => (
                  <motion.div
                    key={s.title}
                    variants={fadeUp}
                    transition={{ duration: reduce ? 0 : 0.65, ease }}
                  >
                    <ServiceCard
                      title={s.title}
                      desc={s.desc}
                      reduce={reduce}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Consultorias empresariais */}
            <div className="mt-10">
              <div className="mb-4 text-left font-serif text-xl font-black text-[#1F1A17]">
                Consultorias Empresariais
              </div>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={stagger}
                className="grid gap-4 lg:grid-cols-2"
              >
                {servicesCorporate.map((s) => (
                  <motion.div
                    key={s.title}
                    variants={fadeUp}
                    transition={{ duration: reduce ? 0 : 0.65, ease }}
                  >
                    <ServiceCard
                      title={s.title}
                      desc={s.desc}
                      reduce={reduce}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* CTA geral */}
            <div className="mt-10">
              <Frame className="p-6 sm:p-7">
                <div className="flex flex-col items-stretch justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="text-sm font-extrabold tracking-tight text-[rgba(31,26,23,0.78)]">
                    Quer ajuda para escolher o melhor serviço?
                  </div>
                  <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:gap-3">
                    <Button
                      href={waLink}
                      variant="primary"
                      reduce={reduce}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      Chamar no WhatsApp
                    </Button>
                    <Button
                      href={instagram}
                      variant="soft"
                      icon={false}
                      reduce={reduce}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      <span className="inline-flex items-center justify-center gap-2">
                        <Instagram className="h-4 w-4" />
                        Instagram
                      </span>
                    </Button>
                  </div>
                </div>
              </Frame>
            </div>
          </div>
        </section>

        {/* COURSE (apenas uma seção que leva pro checkout) */}
        <section id="course" className="relative">
          <div className={cx(container, "pb-14 sm:pb-18 lg:pb-22")}>
            <Frame className="p-7 sm:p-10">
              <div className="grid items-center gap-8 lg:grid-cols-12">
                <div className="lg:col-span-8">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(107,31,43,0.18)] bg-[rgba(107,31,43,0.08)] px-3 py-1.5 text-xs font-extrabold tracking-[0.18em] uppercase text-[#6B1F2B]">
                    Metas Realizáveis
                  </div>

                  <h3 className="mt-4 font-serif text-2xl font-black tracking-tight text-[#1F1A17] sm:text-3xl">
                    Clareza, equilíbrio e transformação real
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[rgba(31,26,23,0.76)] sm:text-base">
                    Exercícios práticos para autodesenvolvimento e evolução
                    contínua. Inclui bônus:
                    <b> Roda da Vida</b>, <b>Atividade prática</b>,{" "}
                    <b>Planner anual 2026</b> e <b>Perguntas disparadoras</b>.
                  </p>
                </div>

                <div className="lg:col-span-4">
                  <div className="grid gap-2">
                    <Button
                      href={courseLink}
                      variant="primary"
                      reduce={reduce}
                      wrapClassName="w-full"
                      className="w-full"
                    >
                      Acessar página do curso
                    </Button>
                    <Button
                      href={waLink}
                      variant="soft"
                      reduce={reduce}
                      wrapClassName="w-full"
                      className="w-full"
                    >
                      Tirar dúvidas no WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </Frame>
          </div>
        </section>

        {/* INSTAGRAM + FOOTER */}
        <section id="instagram" className="relative">
          <div className={cx(container, "pb-16 sm:pb-20 lg:pb-24")}>
            <div className="border-t border-[rgba(31,26,23,0.12)] pt-6">
              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <div className="text-xs font-extrabold tracking-[0.20em] uppercase text-[rgba(31,26,23,0.55)]">
                  © {new Date().getFullYear()} • Christye Biagio
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {[
                    ["about", "Profissional"],
                    ["services", "Serviços"],
                    ["course", "Curso"],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => scrollToId(id, reduce)}
                      className="rounded-xl px-3 py-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(31,26,23,0.62)] transition hover:text-[rgba(31,26,23,0.90)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]"
                    >
                      {label}
                    </button>
                  ))}

                  <a
                    href={instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl px-3 py-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[#6B1F2B] transition hover:text-[#4A1620] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(107,31,43,0.25)]"
                  >
                    Instagram
                  </a>
                </div>
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
