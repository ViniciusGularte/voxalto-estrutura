"use client";

import React, { useMemo } from "react";
import { makeCtx } from "@/ui/ctx";
import { motion, useReducedMotion, cubicBezier } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  CheckCircle2,
  ChevronDown,
  Crown,
  HeartHandshake,
  MessageCircle,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

type PageProps = { data: unknown };

type CardItem = {
  title?: string;
  text?: string;
  icon?: string;
};

function isCardItemArray(v: unknown): v is CardItem[] {
  return Array.isArray(v);
}

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

function safeSplit(s: string) {
  return String(s || "")
    .split("|")
    .map((x) => x.trim())
    .filter(Boolean);
}

function useMotionEase(reduce: boolean) {
  return reduce ? undefined : cubicBezier(0.22, 1, 0.36, 1);
}

function scrollToId(id: string, reduce: boolean) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

function IconFor(key: string) {
  const k = String(key || "").toLowerCase();
  if (k.includes("crown")) return Crown;
  if (k.includes("scroll")) return ScrollText;
  if (k.includes("shield")) return ShieldCheck;
  if (k.includes("book")) return BookOpen;
  if (k.includes("calendar")) return CalendarClock;
  if (k.includes("message")) return MessageCircle;
  if (k.includes("heart")) return HeartHandshake;
  return Sparkles;
}

type ButtonBaseProps = {
  children: React.ReactNode;
  variant?: "primary" | "soft" | "ghost";
  icon?: boolean;
  reduce: boolean;
  className?: string; // classes no elemento (a/button)
  wrapClassName?: string; // classes no wrapper motion.div
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
    "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-extrabold tracking-tight transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(252,232,193,0.35)]";

  const style =
    variant === "primary"
      ? "bg-[linear-gradient(180deg,rgba(252,232,193,0.95),rgba(224,181,120,0.92))] text-[#24170f] shadow-[0_18px_50px_rgba(0,0,0,0.35)] hover:brightness-[1.03]"
      : variant === "soft"
        ? "border border-[rgba(252,232,193,0.22)] bg-[rgba(252,232,193,0.08)] text-[rgba(252,232,193,0.92)] hover:bg-[rgba(252,232,193,0.12)]"
        : "text-[rgba(252,232,193,0.9)] hover:text-[rgba(255,246,230,0.95)]";

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

function Pill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "gold";
}) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-extrabold tracking-[0.14em] uppercase",
        tone === "gold"
          ? "border-[rgba(252,232,193,0.22)] bg-[rgba(252,232,193,0.10)] text-[rgba(252,232,193,0.92)]"
          : "border-[rgba(255,255,255,0.10)] bg-[rgba(255,255,255,0.06)] text-[rgba(255,246,230,0.80)]",
      )}
    >
      {children}
    </span>
  );
}

function SectionTitle({
  kicker,
  title,
  desc,
}: {
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="mb-3 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-[rgba(252,232,193,0.18)]" />
        <div className="text-xs font-extrabold tracking-[0.26em] uppercase text-[rgba(252,232,193,0.70)]">
          {kicker}
        </div>
        <span className="h-px w-10 bg-[rgba(252,232,193,0.18)]" />
      </div>
      <h2 className="text-2xl font-black tracking-tight text-[rgba(255,246,230,0.95)] sm:text-3xl">
        {title}
      </h2>
      {desc ? (
        <p className="mt-3 text-sm leading-relaxed text-[rgba(255,246,230,0.72)] sm:text-base">
          {desc}
        </p>
      ) : null}
    </div>
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
        "relative overflow-hidden rounded-2xl border border-[rgba(252,232,193,0.12)] bg-[rgba(16,10,7,0.58)] shadow-[0_28px_90px_rgba(0,0,0,0.55)] backdrop-blur-sm",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.75] [background:radial-gradient(circle_at_20%_15%,rgba(252,232,193,0.10),transparent_55%),radial-gradient(circle_at_80%_25%,rgba(255,255,255,0.06),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(to_right,rgba(252,232,193,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(252,232,193,0.04)_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionBg({
  img,
  alt,
  parchmentTex,
  parchmentAlt,
  overlay = "from-[#050403]/90 via-[#0a0706]/72 to-[#050403]/90",
  texture = true,
  imgOpacity = 0.55,
}: {
  img: string;
  alt: string;
  parchmentTex: string;
  parchmentAlt: string;
  overlay?: string;
  texture?: boolean;
  imgOpacity?: number;
}) {
  return (
    <div className="absolute inset-0">
      <img
        src={img}
        alt={alt}
        className="h-full w-full object-cover"
        style={{ opacity: imgOpacity }}
        loading="lazy"
      />
      <div className={cx("absolute inset-0 bg-gradient-to-b", overlay)} />
      {texture ? (
        <div className="absolute inset-0 opacity-[0.35] mix-blend-overlay">
          <img
            src={parchmentTex}
            alt={parchmentAlt}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="absolute inset-0 [background:radial-gradient(circle_at_20%_15%,rgba(252,232,193,0.12),transparent_55%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.06),transparent_45%)]" />
    </div>
  );
}

export default function Page({ data }: PageProps) {
  const c = makeCtx(data);
  const reduceMotion = useReducedMotion();
  const reduce = !!reduceMotion;
  const ease = useMotionEase(reduce);

  const brandName = c.cfg("brand_name", "Lay Nunes");
  const brandRole = c.cfg("brand_role", "Psicanalista e Teóloga");

  const nav1 = c.cfg("nav_1", "Sintomas");
  const nav2 = c.cfg("nav_2", "Quem sou");
  const nav3 = c.cfg("nav_3", "Terapia");
  const nav4 = c.cfg("nav_4", "E-book");
  const nav5 = c.cfg("nav_5", "Agendar");

  const heroTitle = c.cfg(
    "hero_title",
    "Se identifica com alguns desses sintomas?",
  );
  const heroSubtitle = c.cfg(
    "hero_subtitle",
    "Ansiedade, trauma, conflitos internos e depressão podem parecer um labirinto. Existe caminho, com acolhimento e clareza.",
  );

  const ctaPrimary = c.cfg("cta_primary", "Quero agendar uma sessão");
  const ctaSecondary = c.cfg("cta_secondary", "Clique aqui");

  const bookingLink = c.link("booking_link", "#");

  const waBase = c.wa("whatsapp_contato", "https://wa.me/5500000000000");
  const waText = c.cfg(
    "whatsapp_text",
    "Oi, Lay! Vi sua página e quero saber como funciona a terapia online. Pode me ajudar?",
  );
  const waLink = useMemo(() => buildWaLink(waBase, waText), [waBase, waText]);

  const heroBg = c.img("hero_bg", "https://iili.io/fD1p2Yx.md.png");
  const parchmentTex = c.img(
    "parchment_texture",
    "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1600&q=80",
  );
  const parchmentAlt = c.cfg("parchment_alt", "Textura rústica");

  const symptomsBg = c.img("symptoms_bg", "https://placehold.co/1200x800");
  const aboutBg = c.img("about_bg", "https://placehold.co/1200x800");
  const therapyBg = c.img(
    "therapy_bg",
    "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1600&q=80",
  );
  const ebookBg = c.img(
    "ebook_bg",
    "https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?auto=format&fit=crop&w=1600&q=80",
  );
  const finalBg = c.img(
    "final_bg",
    "https://images.unsplash.com/photo-1493836512294-502baa1986e2?auto=format&fit=crop&w=1600&q=80",
  );

  const aboutPhoto = c.img("about_photo", "https://iili.io/fDEddb4.md.png");

  const ebookMock = c.img("ebook_mock", "https://iili.io/fDE5MTQ.png");
  const ebookLink = c.link("ebook_link", "#");

  const heroChips = safeSplit(
    c.cfg("hero_chips", "Online | Acolhimento | Clareza | Cura interior"),
  );

  const symptomsFallback: Required<CardItem>[] = [
    {
      title: "Sobrecarga do dia a dia",
      text: "Sente-se sobrecarregada com as demandas da vida e não consegue encontrar tempo para cuidar de si mesma.",
      icon: "crown",
    },
    {
      title: "Fé e exaustão espiritual",
      text: "Busca respostas na fé, mas muitas vezes se sente sobrecarregada espiritualmente.",
      icon: "scroll",
    },
    {
      title: "Resistência em buscar ajuda",
      text: "Deseja despertar para a importância da saúde emocional, mas ainda tem dúvidas ou resistência em buscar ajuda terapêutica.",
      icon: "shield",
    },
  ];

  const symptomsRaw: unknown = c.tab("symptoms");
  const symptoms: CardItem[] =
    isCardItemArray(symptomsRaw) && symptomsRaw.length
      ? symptomsRaw
      : symptomsFallback;

  const aboutTitle = c.cfg("about_title", "Quem é Laiane Nunes?");
  const aboutDesc = c.cfg(
    "about_desc",
    "Uma história real, com propósito e direção.",
  );
  const aboutP1 = c.cfg(
    "about_p1",
    "Sou formada em psicanálise, com aprofundamento em Teologia e Psicologia Tomista e apaixonada pela mente humana, sofri com depressão dos 08 anos de idade até os 27 anos, consegui superar abusos, venci traumas de incapacidade e gagueira.",
  );
  const aboutP2 = c.cfg(
    "about_p2",
    "Com muitas crises internas encontrei cura na fé cristã e no cuidado consigo mesma. Busquei me desenvolver e através de muitos estudos e terapias me tornei uma mulher mais forte e resiliente.",
  );
  const aboutP3 = c.cfg(
    "about_p3",
    "E hoje após tudo isso, minha missão de vida é ajudar mulheres que vivem em ciclos repetitivos de traumas e desejam cura interior.",
  );
  const aboutP4 = c.cfg(
    "about_p4",
    "Tudo tem raiz e tem solução, quero ajudar você a vencer os traumas que tanto lhe paralisam e lhe impedem de viver uma vida mais leve e com clareza.",
  );

  const therapyTitle = c.cfg("therapy_title", "Terapia personalizada");
  const therapyText = c.cfg(
    "therapy_text",
    "Como psicanalista, ofereço um espaço seguro e acolhedor para você entender seus sentimentos, sua angústia e a bagunça interna que muitas vezes você nem sabe de onde vem. Te ajudo a identificar pensamentos repetitivos, emoções confusas e padrões que te travam. Juntas, vamos dar sentido ao que te machuca e iniciar um processo de autoconhecimento e cura.",
  );

  const therapyPointsFallback: Required<Pick<CardItem, "text" | "icon">>[] = [
    {
      text: "Atendimento 100% online, com privacidade e segurança",
      icon: "shield",
    },
    { text: "Direção prática, no seu ritmo, sem pressão", icon: "heart" },
    {
      text: "Clareza para entender raízes e padrões repetitivos",
      icon: "scroll",
    },
    {
      text: "Acolhimento para atravessar o processo com firmeza",
      icon: "sparkles",
    },
  ];

  const therapyPointsRaw: unknown = c.tab("therapy_points");
  const therapyPoints: CardItem[] =
    isCardItemArray(therapyPointsRaw) && therapyPointsRaw.length
      ? therapyPointsRaw
      : therapyPointsFallback;

  const ebookTitle = c.cfg("ebook_title", "E-book");
  const ebookSubtitle = c.cfg(
    "ebook_subtitle",
    "Traumas vividos na infância e seus reflexos na vida adulta.",
  );
  const ebookCta = c.cfg("ebook_cta", "Acesse o e-book");

  const finalTitle = c.cfg(
    "final_title",
    "O que você sente tem raiz e tem solução!",
  );
  const finalDesc = c.cfg(
    "final_desc",
    "Sei como ajudar você, vamos juntas em busca da cura.",
  );
  const footerSmall = c.cfg("footer_small", "Atendimento online");

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

  return (
    <div className="min-h-screen bg-[#050403] text-[rgba(255,246,230,0.92)]">
      <main className="relative">
        <section className="relative min-h-[100vh] overflow-hidden">
          <SectionBg
            img={heroBg}
            alt={c.cfg("hero_bg_alt", "Fundo rústico medieval")}
            parchmentTex={parchmentTex}
            parchmentAlt={parchmentAlt}
            overlay="from-[#050403]/92 via-[#0b0706]/72 to-[#050403]/92"
            texture
            imgOpacity={0.6}
          />

          {/* HEADER (mobile melhorado) */}
          <header className="relative z-10">
            <div className={cx(container, "pt-4 sm:pt-6")}>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <button
                  onClick={() => scrollToId("top", reduce)}
                  className={cx(
                    "w-full md:w-auto",
                    "inline-flex items-center gap-3 rounded-2xl border border-[rgba(252,232,193,0.14)] bg-[rgba(252,232,193,0.06)] px-4 py-2.5 shadow-[0_18px_60px_rgba(0,0,0,0.5)] backdrop-blur-sm transition hover:bg-[rgba(252,232,193,0.08)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(252,232,193,0.35)]",
                  )}
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(252,232,193,0.16)] bg-[rgba(16,10,7,0.35)]">
                    <ScrollText className="h-4 w-4 text-[rgba(252,232,193,0.92)]" />
                  </div>
                  <div className="leading-tight text-left">
                    <div className="text-sm font-black tracking-tight text-[rgba(255,246,230,0.95)]">
                      {brandName}
                    </div>
                    <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(252,232,193,0.62)]">
                      {brandRole}
                    </div>
                  </div>
                </button>

                <div className="hidden items-center gap-1.5 md:flex">
                  {[
                    ["symptoms", nav1],
                    ["about", nav2],
                    ["therapy", nav3],
                    ["ebook", nav4],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      onClick={() => scrollToId(id, reduce)}
                      className="rounded-xl px-3 py-2 text-sm font-extrabold tracking-tight text-[rgba(255,246,230,0.72)] transition hover:text-[rgba(255,246,230,0.92)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(252,232,193,0.35)]"
                    >
                      {label}
                    </button>
                  ))}
                </div>

                {/* ações mobile em 2 colunas, sem estourar */}
                <div className="grid w-full grid-cols-2 gap-2 md:flex md:w-auto md:items-center md:gap-2">
                  <Button
                    href={waLink}
                    variant="soft"
                    icon={false}
                    reduce={reduce}
                    wrapClassName="w-full"
                    className="w-full"
                  >
                    <span className="inline-flex items-center justify-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {c.cfg("header_whatsapp", "WhatsApp")}
                    </span>
                  </Button>

                  <Button
                    href={bookingLink}
                    variant="primary"
                    reduce={reduce}
                    wrapClassName="w-full"
                    className="w-full"
                  >
                    {ctaPrimary}
                  </Button>
                </div>
              </div>
            </div>
          </header>

          <div id="top" className="relative z-10">
            <div
              className={cx(
                container,
                "pt-10 pb-10 sm:pt-16 sm:pb-14 lg:pt-18 lg:pb-16",
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
                  className="lg:col-span-6"
                >
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    {heroChips.slice(0, 4).map((t) => (
                      <Pill key={t} tone="gold">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {t}
                      </Pill>
                    ))}
                  </div>

                  <h1 className="text-3xl font-black tracking-tight text-[rgba(255,246,230,0.96)] sm:text-4xl lg:text-5xl">
                    {heroTitle}
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[rgba(255,246,230,0.72)] sm:text-base">
                    {heroSubtitle}
                  </p>

                  <div className="mt-7 grid gap-3 sm:flex sm:items-center">
                    <Button
                      href={bookingLink}
                      variant="primary"
                      reduce={reduce}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      <span className="inline-flex items-center gap-2">
                        <CalendarClock className="h-4 w-4" />
                        {ctaPrimary}
                      </span>
                    </Button>
                    <Button
                      href={waLink}
                      variant="soft"
                      reduce={reduce}
                      wrapClassName="w-full sm:w-auto"
                      className="w-full sm:w-auto"
                    >
                      {ctaSecondary}
                    </Button>
                  </div>

                  <div className="mt-7 flex flex-col gap-2 text-xs font-extrabold tracking-[0.14em] uppercase text-[rgba(252,232,193,0.60)]">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[rgba(252,232,193,0.75)]" />
                      <span>
                        {c.cfg(
                          "hero_trust_1",
                          "Atendimento online, com privacidade",
                        )}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[rgba(252,232,193,0.75)]" />
                      <span>
                        {c.cfg("hero_trust_2", "Acolhimento e direção prática")}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => scrollToId("symptoms", reduce)}
                    className="mt-10 inline-flex items-center gap-2 rounded-xl px-2 py-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(255,246,230,0.58)] transition hover:text-[rgba(255,246,230,0.88)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(252,232,193,0.35)]"
                  >
                    <span>{c.cfg("hero_scroll", "Ver sintomas")}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="symptoms" className="relative overflow-hidden">
          <SectionBg
            img={symptomsBg}
            alt={c.cfg("symptoms_bg_alt", "Fundo rústico para sintomas")}
            parchmentTex={parchmentTex}
            parchmentAlt={parchmentAlt}
            overlay="from-[#050403]/94 via-[#0b0706]/78 to-[#050403]/94"
            texture
          />
          <div className="relative z-10">
            <div className={cx(container, yPad)}>
              <SectionTitle
                kicker={c.cfg("symptoms_kicker", "Sintomas")}
                title={c.cfg("symptoms_title", "Sinais que merecem atenção")}
                desc={c.cfg(
                  "symptoms_desc",
                  "Se você se reconhece aqui, o próximo passo é trazer clareza e cuidado para a sua história.",
                )}
              />

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={stagger}
                className="mt-10 grid gap-4 lg:grid-cols-3"
              >
                {symptoms.slice(0, 3).map((it, idx) => {
                  const title = c.col(
                    it,
                    "title",
                    symptomsFallback[idx]?.title || "Sinal",
                  ) as string;
                  const text = c.col(
                    it,
                    "text",
                    symptomsFallback[idx]?.text || "Descrição",
                  ) as string;
                  const iconKey = c.col(
                    it,
                    "icon",
                    symptomsFallback[idx]?.icon || "sparkles",
                  ) as string;
                  const Icon = IconFor(iconKey);

                  return (
                    <motion.div
                      key={`${idx}-${title}`}
                      variants={fadeUp}
                      transition={{ duration: reduce ? 0 : 0.65, ease }}
                    >
                      <Frame className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(252,232,193,0.16)] bg-[rgba(252,232,193,0.06)]">
                            <Icon className="h-5 w-5 text-[rgba(252,232,193,0.92)]" />
                          </div>
                          <div>
                            <div className="text-base font-black tracking-tight text-[rgba(255,246,230,0.95)]">
                              {title}
                            </div>
                            <div className="mt-2 text-sm leading-relaxed text-[rgba(255,246,230,0.72)]">
                              {text}
                            </div>
                          </div>
                        </div>
                      </Frame>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={fadeUp}
                transition={{ duration: reduce ? 0 : 0.7, ease }}
                className="mt-10 flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-[rgba(252,232,193,0.12)] bg-[rgba(252,232,193,0.06)] p-6 sm:flex-row sm:items-center"
              >
                <div className="text-sm font-extrabold tracking-tight text-[rgba(255,246,230,0.78)]">
                  {c.cfg(
                    "symptoms_cta_text",
                    "Se isso te descreve, você não precisa atravessar sozinha.",
                  )}
                </div>
                <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-row sm:gap-3">
                  <Button
                    href={bookingLink}
                    variant="primary"
                    reduce={reduce}
                    wrapClassName="w-full sm:w-auto"
                    className="w-full sm:w-auto"
                  >
                    {ctaPrimary}
                  </Button>
                  <Button
                    href={waLink}
                    variant="soft"
                    reduce={reduce}
                    wrapClassName="w-full sm:w-auto"
                    className="w-full sm:w-auto"
                  >
                    {c.cfg("symptoms_cta_wa", "Falar no WhatsApp")}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about" className="relative overflow-hidden">
          <SectionBg
            img={aboutBg}
            alt={c.cfg("about_bg_alt", "Fundo medieval para sobre")}
            parchmentTex={parchmentTex}
            parchmentAlt={parchmentAlt}
            overlay="from-[#050403]/94 via-[#0b0706]/75 to-[#050403]/94"
            texture
          />
          <div className="relative z-10">
            <div className={cx(container, yPad)}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.22 }}
                variants={stagger}
              >
                <SectionTitle
                  kicker={c.cfg("about_kicker", "Quem sou")}
                  title={aboutTitle}
                  desc={aboutDesc}
                />

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: reduce ? 0 : 0.75, ease }}
                  className="mt-10"
                >
                  <Frame className="p-6 sm:p-8">
                    <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
                      <div className="lg:col-span-5">
                        <div className="relative overflow-hidden rounded-2xl border border-[rgba(252,232,193,0.14)] bg-[rgba(255,255,255,0.04)]">
                          <div className="aspect-[4/5]">
                            <img
                              src={aboutPhoto}
                              alt={c.cfg("about_photo_alt", "Foto de Laiane")}
                              className="h-full w-full object-cover opacity-[0.95]"
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050403]/85 via-transparent to-transparent" />
                          <div className="absolute left-4 right-4 bottom-4">
                            <div className="rounded-xl border border-[rgba(252,232,193,0.14)] bg-[rgba(16,10,7,0.55)] p-4 backdrop-blur">
                              <div className="text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(252,232,193,0.72)]">
                                {brandRole}
                              </div>
                              <div className="mt-1 text-base font-black tracking-tight text-[rgba(255,246,230,0.92)]">
                                {brandName}
                              </div>
                              <div className="mt-2 text-xs font-extrabold tracking-[0.14em] uppercase text-[rgba(255,246,230,0.58)]">
                                {footerSmall}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3">
                          {safeSplit(
                            c.cfg(
                              "about_badges",
                              "Psicanálise | Teologia | Psicologia Tomista | Acolhimento",
                            ),
                          )
                            .slice(0, 4)
                            .map((t) => (
                              <div
                                key={t}
                                className="flex items-start gap-3 rounded-xl border border-[rgba(252,232,193,0.12)] bg-[rgba(252,232,193,0.06)] p-4"
                              >
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[rgba(252,232,193,0.85)]" />
                                <div className="text-sm font-extrabold tracking-tight text-[rgba(255,246,230,0.78)]">
                                  {t}
                                </div>
                              </div>
                            ))}
                        </div>

                        <div className="mt-6 grid gap-2 sm:flex sm:flex-row sm:gap-3">
                          <Button
                            href={bookingLink}
                            variant="primary"
                            reduce={reduce}
                            wrapClassName="w-full sm:w-auto"
                            className="w-full sm:w-auto"
                          >
                            {ctaPrimary}
                          </Button>
                          <Button
                            href={waLink}
                            variant="soft"
                            reduce={reduce}
                            wrapClassName="w-full sm:w-auto"
                            className="w-full sm:w-auto"
                          >
                            {c.cfg("about_wa", "Me chamar no WhatsApp")}
                          </Button>
                        </div>
                      </div>

                      <div className="lg:col-span-7">
                        <div className="space-y-4 text-sm leading-relaxed text-[rgba(255,246,230,0.74)] sm:text-base">
                          <p>{aboutP1}</p>
                          <p>{aboutP2}</p>
                          <p>{aboutP3}</p>
                          <p className="text-[rgba(255,246,230,0.90)] font-extrabold">
                            {aboutP4}
                          </p>
                        </div>

                        <div className="mt-8">
                          <Frame className="p-6 sm:p-7">
                            <div className="flex flex-wrap items-center gap-2">
                              <Pill tone="gold">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                {c.cfg("about_callout_tag", "Cura interior")}
                              </Pill>
                              <Pill tone="neutral">
                                <ScrollText className="h-3.5 w-3.5" />
                                {c.cfg("about_callout_tag2", "Tudo tem raiz")}
                              </Pill>
                            </div>
                            <div className="mt-4 text-base font-black tracking-tight text-[rgba(255,246,230,0.92)] sm:text-lg">
                              {c.cfg(
                                "about_callout_title",
                                "Você não precisa ficar presa nesse ciclo.",
                              )}
                            </div>
                            <div className="mt-2 text-sm leading-relaxed text-[rgba(255,246,230,0.72)]">
                              {c.cfg(
                                "about_callout_text",
                                "Vamos organizar o que está confuso, entender raízes e construir um caminho de clareza e leveza.",
                              )}
                            </div>
                            <div className="mt-6 grid gap-2 sm:flex sm:flex-row sm:gap-3">
                              <Button
                                href={bookingLink}
                                variant="primary"
                                reduce={reduce}
                                wrapClassName="w-full sm:w-auto"
                                className="w-full sm:w-auto"
                              >
                                {ctaPrimary}
                              </Button>
                              <Button
                                href={waLink}
                                variant="soft"
                                reduce={reduce}
                                wrapClassName="w-full sm:w-auto"
                                className="w-full sm:w-auto"
                              >
                                {c.cfg("about_callout_cta2", "Tirar dúvidas")}
                              </Button>
                            </div>
                          </Frame>
                        </div>
                      </div>
                    </div>
                  </Frame>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="therapy" className="relative overflow-hidden">
          <SectionBg
            img={therapyBg}
            alt={c.cfg("therapy_bg_alt", "Fundo rústico para terapia")}
            parchmentTex={parchmentTex}
            parchmentAlt={parchmentAlt}
            overlay="from-[#050403]/94 via-[#0b0706]/76 to-[#050403]/94"
            texture
          />
          <div className="relative z-10">
            <div className={cx(container, yPad)}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.22 }}
                variants={stagger}
                className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-10"
              >
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: reduce ? 0 : 0.75, ease }}
                  className="lg:col-span-7"
                >
                  <SectionTitle
                    kicker={c.cfg("therapy_kicker", "Terapia")}
                    title={therapyTitle}
                    desc={c.cfg(
                      "therapy_desc",
                      "Um espaço seguro e acolhedor para entender raízes, organizar emoções e avançar com firmeza.",
                    )}
                  />

                  <Frame className="mt-7 p-6 sm:p-8">
                    <p className="text-sm leading-relaxed text-[rgba(255,246,230,0.74)] sm:text-base">
                      {therapyText}
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {therapyPoints.slice(0, 4).map((it, idx) => {
                        const text = c.col(
                          it,
                          "text",
                          therapyPointsFallback[idx]?.text || "Ponto",
                        ) as string;
                        const iconKey = c.col(
                          it,
                          "icon",
                          therapyPointsFallback[idx]?.icon || "sparkles",
                        ) as string;
                        const Icon = IconFor(iconKey);

                        return (
                          <div
                            key={`${idx}-${text}`}
                            className="flex items-start gap-3 rounded-xl border border-[rgba(252,232,193,0.12)] bg-[rgba(252,232,193,0.06)] p-4"
                          >
                            <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border border-[rgba(252,232,193,0.16)] bg-[rgba(16,10,7,0.35)]">
                              <Icon className="h-4 w-4 text-[rgba(252,232,193,0.92)]" />
                            </div>
                            <div className="text-sm font-extrabold leading-relaxed text-[rgba(255,246,230,0.78)]">
                              {text}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-7 grid gap-2 sm:flex sm:flex-row sm:gap-3">
                      <Button
                        href={bookingLink}
                        variant="primary"
                        reduce={reduce}
                        wrapClassName="w-full sm:w-auto"
                        className="w-full sm:w-auto"
                      >
                        {c.cfg(
                          "therapy_cta_primary",
                          "Quero agendar uma sessão",
                        )}
                      </Button>
                      <Button
                        href={waLink}
                        variant="soft"
                        reduce={reduce}
                        wrapClassName="w-full sm:w-auto"
                        className="w-full sm:w-auto"
                      >
                        {c.cfg("therapy_cta_secondary", "Falar no WhatsApp")}
                      </Button>
                    </div>
                  </Frame>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: reduce ? 0 : 0.75, ease }}
                  className="lg:col-span-5"
                >
                  <Frame className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2">
                      <Pill tone="gold">
                        <CalendarClock className="h-3.5 w-3.5" />
                        {c.cfg("therapy_side_tag", "Online")}
                      </Pill>
                      <Pill tone="neutral">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        {c.cfg("therapy_side_tag2", "Privacidade")}
                      </Pill>
                    </div>

                    <div className="mt-5 overflow-hidden rounded-2xl border border-[rgba(252,232,193,0.14)] bg-[rgba(255,255,255,0.04)]">
                      <div className="aspect-[4/3]">
                        <img
                          src={c.img(
                            "therapy_side_img",
                            "https://iili.io/fDE2sMN.md.png",
                          )}
                          alt={c.cfg("therapy_side_alt", "Imagem rústica")}
                          className="h-full w-full object-cover opacity-[0.92]"
                          loading="lazy"
                        />
                      </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-[rgba(252,232,193,0.12)] bg-[rgba(252,232,193,0.06)] p-5">
                      <div className="text-sm font-black tracking-tight text-[rgba(255,246,230,0.92)]">
                        {c.cfg("therapy_side_title", "Comece do jeito certo")}
                      </div>
                      <div className="mt-2 text-sm leading-relaxed text-[rgba(255,246,230,0.72)]">
                        {c.cfg(
                          "therapy_side_text",
                          "Você não precisa ter todas as respostas. Basta começar com honestidade, no seu tempo.",
                        )}
                      </div>
                      <div className="mt-4">
                        <Button
                          href={waLink}
                          variant="soft"
                          icon={false}
                          reduce={reduce}
                          wrapClassName="w-full"
                          className="w-full"
                        >
                          <span className="inline-flex items-center justify-center gap-2">
                            <MessageCircle className="h-4 w-4" />
                            {c.cfg("therapy_side_cta", "Clique aqui")}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </Frame>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* E-BOOK (mobile melhorado) */}
        <section id="ebook" className="relative overflow-hidden">
          <SectionBg
            img={ebookBg}
            alt={c.cfg("ebook_bg_alt", "Fundo rústico para e-book")}
            parchmentTex={parchmentTex}
            parchmentAlt={parchmentAlt}
            overlay="from-[#050403]/94 via-[#0b0706]/78 to-[#050403]/94"
            texture
          />
          <div className="relative z-10">
            <div className={cx(container, yPad)}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={stagger}
              >
                <SectionTitle
                  kicker={c.cfg("ebook_kicker", "E-book")}
                  title={ebookTitle}
                  desc={c.cfg(
                    "ebook_desc",
                    "Um material para aprofundar, reconhecer padrões e dar nome ao que você sente.",
                  )}
                />

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: reduce ? 0 : 0.75, ease }}
                  className="mt-10"
                >
                  <Frame className="p-6 sm:p-8">
                    <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                      <div className="lg:col-span-6">
                        <div className="flex flex-wrap items-center gap-2">
                          <Pill tone="gold">
                            <BookOpen className="h-3.5 w-3.5" />
                            {c.cfg("ebook_tag", "Leitura guiada")}
                          </Pill>
                          <Pill tone="neutral">
                            <ScrollText className="h-3.5 w-3.5" />
                            {c.cfg("ebook_tag2", "Clareza e direção")}
                          </Pill>
                        </div>

                        <h3 className="mt-4 text-xl font-black tracking-tight text-[rgba(255,246,230,0.95)] sm:text-2xl">
                          {ebookSubtitle}
                        </h3>

                        <div className="mt-4 grid gap-2 text-sm font-extrabold text-[rgba(255,246,230,0.72)]">
                          {safeSplit(
                            c.cfg(
                              "ebook_points",
                              "Identifique raízes emocionais | Reconheça padrões repetitivos | Entenda reflexos na vida adulta | Dê passos práticos",
                            ),
                          )
                            .slice(0, 4)
                            .map((t) => (
                              <div key={t} className="flex items-start gap-3">
                                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[rgba(252,232,193,0.85)]" />
                                <span className="leading-relaxed">{t}</span>
                              </div>
                            ))}
                        </div>

                        <div className="mt-6 grid gap-2 sm:flex sm:flex-row sm:gap-3">
                          <Button
                            href={ebookLink}
                            variant="primary"
                            reduce={reduce}
                            wrapClassName="w-full sm:w-auto"
                            className="w-full sm:w-auto"
                          >
                            {ebookCta}
                          </Button>
                          <Button
                            href={waLink}
                            variant="soft"
                            reduce={reduce}
                            wrapClassName="w-full sm:w-auto"
                            className="w-full sm:w-auto"
                          >
                            {c.cfg("ebook_cta2", "Tirar dúvidas")}
                          </Button>
                        </div>
                      </div>

                      {/* Mock centralizado e com tamanho controlado no mobile */}
                      <div className="lg:col-span-6">
                        <div className="mx-auto w-full max-w-[320px] sm:max-w-[380px]">
                          <div className="overflow-hidden rounded-2xl border border-[rgba(252,232,193,0.14)] bg-[rgba(255,255,255,0.04)] shadow-[0_18px_60px_rgba(0,0,0,0.35)]">
                            <div className="aspect-[3/4]">
                              <img
                                src={ebookMock}
                                alt={c.cfg("ebook_mock_alt", "Capa do e-book")}
                                className="h-full w-full object-cover opacity-[0.95]"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          <div className="mt-3 text-center text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(252,232,193,0.62)]">
                            {c.cfg("ebook_mock_caption", "Acesso imediato")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Frame>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="final" className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#f3e1c7,#e4c797)]" />
          <div className="absolute inset-0 opacity-[0.10] mix-blend-multiply">
            <img
              src={finalBg}
              alt={c.cfg("final_bg_alt", "Textura final")}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="absolute inset-0 opacity-[0.35] [background:radial-gradient(circle_at_20%_20%,rgba(0,0,0,0.22),transparent_55%),radial-gradient(circle_at_80%_25%,rgba(0,0,0,0.16),transparent_45%)]" />

          <div className="relative z-10">
            <div className={cx(container, "py-16 sm:py-20 lg:py-24")}>
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={stagger}
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <motion.div
                  variants={fadeUp}
                  transition={{ duration: reduce ? 0 : 0.75, ease }}
                  className="lg:col-span-7"
                >
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,0,0,0.16)] bg-[rgba(255,255,255,0.35)] px-3 py-1.5 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(36,23,15,0.85)]">
                    <ShieldCheck className="h-4 w-4" />
                    {c.cfg("final_tag", "Pronta para começar")}
                  </div>

                  <h3 className="mt-4 text-2xl font-black tracking-tight text-[#24170f] sm:text-3xl">
                    {finalTitle}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[rgba(36,23,15,0.82)] sm:text-base">
                    {finalDesc}
                  </p>

                  <div className="mt-6 grid gap-2 sm:flex sm:flex-row sm:gap-3">
                    <motion.div
                      whileHover={reduce ? undefined : { y: -1 }}
                      whileTap={reduce ? undefined : { scale: 0.99 }}
                      className="w-full sm:w-auto"
                    >
                      <a
                        href={bookingLink}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#24170f] px-5 py-3 text-sm font-extrabold tracking-tight text-[#fff4df] shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition hover:brightness-[1.05] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(36,23,15,0.35)] sm:w-auto"
                        target={
                          isExternalHref(bookingLink) ? "_blank" : undefined
                        }
                        rel={
                          isExternalHref(bookingLink) ? "noreferrer" : undefined
                        }
                      >
                        <CalendarClock className="h-4 w-4" />
                        {c.cfg("final_cta_primary", "Quero agendar uma sessão")}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </motion.div>

                    <motion.div
                      whileHover={reduce ? undefined : { y: -1 }}
                      whileTap={reduce ? undefined : { scale: 0.99 }}
                      className="w-full sm:w-auto"
                    >
                      <a
                        href={waLink}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(36,23,15,0.22)] bg-[rgba(255,255,255,0.35)] px-5 py-3 text-sm font-extrabold tracking-tight text-[#24170f] transition hover:bg-[rgba(255,255,255,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(36,23,15,0.35)] sm:w-auto"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {c.cfg("final_cta_secondary", "Clique aqui")}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </motion.div>
                  </div>

                  <div className="mt-8 text-xs font-extrabold tracking-[0.20em] uppercase text-[rgba(36,23,15,0.70)]">
                    {brandName} • {brandRole}
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  transition={{ duration: reduce ? 0 : 0.75 }}
                  className="lg:col-span-5"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-[rgba(36,23,15,0.20)] bg-[rgba(255,255,255,0.35)] shadow-[0_28px_90px_rgba(0,0,0,0.25)]">
                    <div className="aspect-[4/5]">
                      <img
                        src={c.img(
                          "final_portrait",
                          "https://iili.io/fDEddb4.md.png",
                        )}
                        alt={c.cfg("final_portrait_alt", "Foto final")}
                        className="h-full w-full object-cover opacity-[0.95]"
                        loading="lazy"
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(36,23,15,0.78)] via-transparent to-transparent" />
                    <div className="absolute left-4 right-4 bottom-4">
                      <div className="rounded-xl border border-[rgba(255,244,223,0.24)] bg-[rgba(36,23,15,0.72)] p-4 backdrop-blur">
                        <div className="text-xs font-extrabold tracking-[0.22em] uppercase text-[rgba(255,244,223,0.80)]">
                          {c.cfg("final_box_kicker", "Vamos juntas")}
                        </div>
                        <div className="mt-2 text-sm leading-relaxed text-[rgba(255,244,223,0.88)] font-extrabold">
                          {c.cfg(
                            "final_box_text",
                            "Sei como ajudar você. Comece com um passo simples e seguro.",
                          )}
                        </div>
                        <div className="mt-3 flex items-center gap-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(255,244,223,0.70)]">
                          <ShieldCheck className="h-4 w-4" />
                          <span>
                            {c.cfg("final_box_small", "Atendimento online")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <div className="mt-10 border-t border-[rgba(36,23,15,0.18)] pt-6">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="text-xs font-extrabold tracking-[0.20em] uppercase text-[rgba(36,23,15,0.65)]">
                    {c.cfg(
                      "copyright",
                      "© 2026. Todos os direitos reservados.",
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      ["symptoms", nav1],
                      ["about", nav2],
                      ["therapy", nav3],
                      ["ebook", nav4],
                      ["final", nav5],
                    ].map(([id, label]) => (
                      <button
                        key={id}
                        onClick={() => scrollToId(id, reduce)}
                        className="rounded-xl px-3 py-2 text-xs font-extrabold tracking-[0.18em] uppercase text-[rgba(36,23,15,0.68)] transition hover:text-[rgba(36,23,15,0.92)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(36,23,15,0.35)]"
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        html,
        body {
          background: #050403;
        }
        ::selection {
          background: rgba(252, 232, 193, 0.22);
        }
      `}</style>
    </div>
  );
}
