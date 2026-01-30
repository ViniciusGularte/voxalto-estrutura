"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Brain,
  Heart,
  MapPin,
  Shield,
  MessageCircle,
  ArrowRight,
  Quote,
} from "lucide-react";
import { makeCtx } from "@/ui/ctx";

type PageProps = {
  data: any;
};

function clampStr(v: any, n = 220) {
  const s = String(v ?? "").trim();
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

function IconFromKey({ k }: { k: string }) {
  const key = (k || "").toLowerCase().trim();
  const cls = "h-5 w-5";
  if (key.includes("gradu") || key.includes("form"))
    return <GraduationCap className={cls} />;
  if (key.includes("brain") || key.includes("avali"))
    return <Brain className={cls} />;
  if (key.includes("heart") || key.includes("acolh") || key.includes("escuta"))
    return <Heart className={cls} />;
  if (key.includes("pin") || key.includes("cidade") || key.includes("map"))
    return <MapPin className={cls} />;
  return <Shield className={cls} />;
}

function SectionHeader({
  kicker,
  title,
  sub,
  colors,
  align = "left",
}: {
  kicker: string;
  title: string;
  sub?: string;
  colors: any;
  align?: "left" | "center";
}) {
  const wrapCls = align === "center" ? "text-center mx-auto" : "";
  const subCls = align === "center" ? "mx-auto" : "";
  return (
    <div className={`space-y-3 ${wrapCls}`}>
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 shadow-sm ${align === "center" ? "mx-auto" : ""}`}
      >
        <span
          className="inline-block h-2 w-2 rounded-full"
          style={{ background: colors.brand }}
        />
        <span className="text-xs font-medium" style={{ color: colors.sub }}>
          {kicker}
        </span>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {sub ? (
        <p
          className={`text-sm leading-relaxed sm:text-base ${subCls}`}
          style={{ color: colors.sub, maxWidth: 720 }}
        >
          {sub}
        </p>
      ) : null}
    </div>
  );
}

export default function Page({ data }: PageProps) {
  const c = makeCtx(data);
  const reduce = useReducedMotion();

  const heroBadgesRaw = c.tab("hero_bullets");
  const heroBadgesFallback = [
    { text: "Dor na coluna e postura" },
    { text: "Recuperação pós-lesão" },
    { text: "Fisioterapia pélvica e feminina" },
    { text: "Atendimento personalizado" },
  ];
  const heroBadges = (
    heroBadgesRaw?.length ? heroBadgesRaw : heroBadgesFallback
  ) as any[];

  const aboutPointsRaw = c.tab("about_points");
  const aboutPointsFallback = [
    { title: "Formação e especializações", icon: "graduation" },
    { title: "Avaliação completa e individual", icon: "brain" },
    { title: "Atendimento com escuta e cuidado", icon: "heart" },
    { title: "Atendimento presencial em [cidade]", icon: "pin" },
  ];
  const aboutPoints = (
    aboutPointsRaw?.length ? aboutPointsRaw : aboutPointsFallback
  ) as any[];

  const identifyRaw = c.tab("identify");
  const identifyFallback = [
    { text: "Sinto dor na lombar quase todos os dias" },
    { text: "Trabalho muito sentada e minha postura piorou" },
    { text: "Depois da gravidez meu corpo mudou e dói" },
    { text: "Tenho medo de treinar por causa da dor" },
    { text: "Já tentei remédios, mas a dor sempre volta" },
  ];
  const identify = (
    identifyRaw?.length ? identifyRaw : identifyFallback
  ) as any[];

  const servicesRaw = c.tab("services");
  const servicesFallback = [
    {
      title: "Fisioterapia para dores na coluna",
      desc: "Tratamento para lombar, cervical, postura e sobrecarga.",
    },
    {
      title: "Fisioterapia feminina / pélvica",
      desc: "Saúde íntima, pós-parto, fortalecimento do assoalho pélvico.",
    },
    {
      title: "Reabilitação pós-lesão",
      desc: "Recupere movimentos com segurança e acompanhamento.",
    },
    {
      title: "Prevenção de dores",
      desc: "Fortalecimento e correção de padrões de movimento.",
    },
  ];
  const services = (
    servicesRaw?.length ? servicesRaw : servicesFallback
  ) as any[];

  const howRaw = c.tab("how");
  const howFallback = [
    {
      title: "Avaliação detalhada",
      desc: "Entendo sua rotina, dor e histórico.",
    },
    {
      title: "Plano de tratamento personalizado",
      desc: "Nada de protocolo igual pra todo mundo.",
    },
    {
      title: "Acompanhamento contínuo",
      desc: "Ajustes conforme sua evolução.",
    },
  ];
  const how = (howRaw?.length ? howRaw : howFallback) as any[];

  const testimonialsRaw = c.tab("testimonials");
  const testimonialsFallback = [
    {
      text: "Eu vivia com dor na lombar e hoje consigo trabalhar sem sofrer.",
      name: "Paciente",
    },
    {
      text: "Depois da gestação, me senti muito mais segura com o corpo.",
      name: "Paciente",
    },
  ];
  const testimonials = (
    testimonialsRaw?.length ? testimonialsRaw : testimonialsFallback
  ) as any[];

  const waHref = c.wa("whatsapp_contato", "https://wa.me/5500000000000");
  const waLabel = c.cfg("cta_whatsapp_label", "Agendar pelo WhatsApp");
  const heroSecondaryLabel = c.cfg("hero_secondary_label", "Ver como funciona");

  const colors = {
    brand: "#6FAF9D",
    bg: "#F7F9F8",
    section: "#E8F2EF",
    accent: "#EFDAD7",
    text: "#2F2F2F",
    sub: "#6B6B6B",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: reduce
        ? { duration: 0 }
        : {
            staggerChildren: 0.08,
            delayChildren: 0.05,
          },
    },
  };

  const itemUp = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const itemLeft = {
    hidden: { opacity: 0, x: -18 },
    show: {
      opacity: 1,
      x: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const itemRight = {
    hidden: { opacity: 0, x: 18 },
    show: {
      opacity: 1,
      x: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const hoverCard = reduce
    ? {}
    : {
        whileHover: { y: -3, scale: 1.01 },
        whileTap: { scale: 0.99 },
        transition: { duration: 0.18 },
      };

  const glass = "bg-white/70 backdrop-blur";
  const card = "rounded-[1.75rem] border border-black/5 bg-white shadow-sm";
  const cardSoft =
    "rounded-[1.75rem] border border-black/5 bg-white/80 shadow-sm backdrop-blur";
  const padX = "px-4 sm:px-6";
  const max = "mx-auto max-w-6xl";

  return (
    <div
      className="min-h-screen"
      style={{ background: colors.bg, color: colors.text }}
    >
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-40"
          style={{ background: colors.section }}
        />
        <div
          className="absolute -bottom-28 -right-28 h-96 w-96 rounded-full blur-3xl opacity-35"
          style={{ background: colors.accent }}
        />
      </div>

      <header className={`sticky top-0 z-40 border-b border-black/5 ${glass}`}>
        <div
          className={`${max} flex items-center justify-between ${padX} py-3`}
        >
          <a href="#top" className="flex items-center gap-2">
            <span
              className="inline-flex h-9 w-9 items-center justify-center rounded-2xl shadow-sm"
              style={{ background: colors.section, color: colors.brand }}
            >
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">
                {c.cfg("brand_name", "Ana Fisioterapia")}
              </div>
              <div className="text-xs" style={{ color: colors.sub }}>
                {c.cfg("brand_tagline", "Saúde da mulher • Fisioterapia")}
              </div>
            </div>
          </a>

          <div className="hidden items-center gap-2 sm:flex">
            <a
              href="#servicos"
              className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-black/5"
              style={{ color: colors.sub }}
            >
              {c.cfg("nav_services", "Serviços")}
            </a>
            <a
              href="#como-funciona"
              className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-black/5"
              style={{ color: colors.sub }}
            >
              {c.cfg("nav_how", "Como funciona")}
            </a>
            <a
              href="#depoimentos"
              className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-black/5"
              style={{ color: colors.sub }}
            >
              {c.cfg("nav_social", "Depoimentos")}
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm transition"
              style={{ background: colors.brand, color: "white" }}
            >
              <MessageCircle className="h-4 w-4" />
              {c.cfg("nav_cta", "Agendar")}
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className={`${max} ${padX} pb-10 pt-10 sm:pb-14 sm:pt-14`}>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
          >
            <motion.div variants={container} className="space-y-6">
              <motion.div
                variants={itemLeft}
                className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 shadow-sm"
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: colors.brand }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: colors.sub }}
                >
                  {c.cfg(
                    "hero_kicker",
                    "Atendimento particular • Humanizado • Individualizado",
                  )}
                </span>
              </motion.div>

              <motion.h1
                variants={itemLeft}
                className="text-3xl font-semibold leading-tight tracking-tight sm:text-5xl"
              >
                {c.cfg(
                  "hero_title",
                  "Fisioterapia para viver sem dor e com mais liberdade",
                )}
              </motion.h1>

              <motion.p
                variants={itemLeft}
                className="max-w-xl text-base sm:text-lg"
                style={{ color: colors.sub }}
              >
                {c.cfg(
                  "hero_subtitle",
                  "Atendimento humanizado e individualizado para mulheres que querem voltar a se movimentar sem medo.",
                )}
              </motion.p>

              <motion.ul
                variants={container}
                className="grid gap-3 sm:grid-cols-2"
              >
                {heroBadges.map((it, idx) => (
                  <motion.li
                    key={`hb-${idx}`}
                    variants={itemUp}
                    className="flex items-start gap-3 rounded-2xl border border-black/5 bg-white px-4 py-3 shadow-sm"
                  >
                    <span
                      className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl"
                      style={{
                        background: colors.section,
                        color: colors.brand,
                      }}
                    >
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div className="text-sm font-medium">
                      {c.col(it, "text", "Dor na coluna e postura")}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                variants={itemLeft}
                className="flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <motion.a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm"
                  style={{ background: colors.brand, color: "white" }}
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                >
                  <MessageCircle className="h-4 w-4" />
                  {waLabel}
                  <ArrowRight className="h-4 w-4 opacity-90" />
                </motion.a>

                <motion.a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-semibold shadow-sm"
                  style={{ color: colors.text }}
                  whileHover={reduce ? undefined : { scale: 1.01 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                >
                  {heroSecondaryLabel}
                </motion.a>

                <div className="text-xs sm:ml-2" style={{ color: colors.sub }}>
                  {c.cfg(
                    "hero_trust_note",
                    "Ambiente seguro, acolhedor e com acompanhamento de perto.",
                  )}
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemRight} className="relative">
              <div
                className="absolute -inset-3 rounded-[2rem] blur-2xl opacity-50"
                style={{ background: colors.section }}
              />
              <div className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-sm">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={c.img(
                      "hero_image",
                      "blob:https://aistudio.google.com/b2c1d5a3-da53-4ae7-acc1-29c5e0e74d1c",
                    )}
                    alt={c.cfg(
                      "hero_image_alt",
                      "Fisioterapeuta atendendo uma paciente",
                    )}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>
                <div className="grid gap-3 p-5 sm:grid-cols-2">
                  <div className="rounded-2xl border border-black/5 bg-white px-4 py-3">
                    <div
                      className="text-xs font-medium"
                      style={{ color: colors.sub }}
                    >
                      {c.cfg("hero_stat_1_label", "Atendimento")}
                    </div>
                    <div className="mt-1 text-sm font-semibold">
                      {c.cfg("hero_stat_1_value", "Individual e humanizado")}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-black/5 bg-white px-4 py-3">
                    <div
                      className="text-xs font-medium"
                      style={{ color: colors.sub }}
                    >
                      {c.cfg("hero_stat_2_label", "Foco")}
                    </div>
                    <div className="mt-1 text-sm font-semibold">
                      {c.cfg("hero_stat_2_value", "Saúde da mulher e dores")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div
                  className="h-10 w-10 overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
                  title={c.cfg("hero_avatar_title", "Profissional responsável")}
                >
                  <img
                    src={c.img("about_avatar", "https://placehold.co/800x800")}
                    alt={c.cfg("about_avatar_alt", "Foto da profissional")}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="text-sm">
                  <div className="font-semibold">
                    {c.cfg("about_name", "Ana")}
                  </div>
                  <div className="text-xs" style={{ color: colors.sub }}>
                    {c.cfg(
                      "about_role",
                      "Fisioterapeuta • Atendimento particular",
                    )}
                  </div>
                </div>
                <div
                  className="ml-auto hidden items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-2 text-xs font-medium shadow-sm sm:flex"
                  style={{ color: colors.sub }}
                >
                  <Shield className="h-4 w-4" style={{ color: colors.brand }} />
                  {c.cfg("hero_safety_badge", "Confiança e acolhimento")}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="sobre" className="py-12 sm:py-16">
          <div className={`${max} ${padX}`}>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-8 lg:grid-cols-2 lg:gap-12"
            >
              <motion.div variants={itemUp} className="space-y-5">
                <SectionHeader
                  kicker={c.cfg("about_kicker", "Sobre a profissional")}
                  title={c.cfg(
                    "about_title",
                    "Cuidando de você com técnica e acolhimento",
                  )}
                  sub={c.cfg(
                    "about_text",
                    "Sou Ana, fisioterapeuta focada na saúde da mulher e no tratamento de dores musculoesqueléticas. Acredito que cada corpo tem sua história, e o tratamento precisa respeitar sua rotina, limites e objetivos.",
                  )}
                  colors={colors}
                />

                <div className="grid gap-3 sm:grid-cols-2">
                  {aboutPoints.map((it, idx) => (
                    <motion.div
                      key={`ap-${idx}`}
                      variants={itemUp}
                      className={card}
                      {...hoverCard}
                    >
                      <div className="flex items-start gap-3 p-4">
                        <div
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                          style={{
                            background: colors.section,
                            color: colors.brand,
                          }}
                        >
                          <IconFromKey k={c.col(it, "icon", "shield")} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">
                            {c.col(it, "title", "Formação e especializações")}
                          </div>
                          <div
                            className="mt-1 text-xs leading-relaxed"
                            style={{ color: colors.sub }}
                          >
                            {clampStr(
                              c.col(
                                it,
                                "desc",
                                idx === 0
                                  ? "Atualizações constantes, técnicas modernas e visão clínica."
                                  : idx === 1
                                    ? "Entendemos causa, rotina e o que realmente dispara sua dor."
                                    : idx === 2
                                      ? "Acolhimento com clareza: você entende o plano e o porquê."
                                      : "Presencial em ambiente calmo e confortável.",
                              ),
                              120,
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className={cardSoft}>
                  <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
                    <div className="flex items-start gap-3">
                      <div
                        className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                        style={{
                          background: colors.accent,
                          color: colors.text,
                        }}
                      >
                        <Shield className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">
                          {c.cfg(
                            "about_trust_title",
                            "Um cuidado sério — no seu ritmo",
                          )}
                        </div>
                        <div
                          className="mt-1 text-xs leading-relaxed"
                          style={{ color: colors.sub }}
                        >
                          {c.cfg(
                            "about_trust_text",
                            "Sem pressa, sem julgamento e sem “protocolo pronto”. A ideia é você sentir segurança para se movimentar melhor a cada semana.",
                          )}
                        </div>
                      </div>
                    </div>

                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold shadow-sm sm:ml-auto sm:mt-0"
                      style={{ background: colors.brand, color: "white" }}
                    >
                      <MessageCircle className="h-4 w-4" />
                      {c.cfg("about_cta", "Quero agendar")}
                      <ArrowRight className="h-4 w-4 opacity-90" />
                    </a>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemUp} className="relative">
                <div
                  className="absolute -inset-3 rounded-[2rem] blur-2xl opacity-40"
                  style={{ background: colors.accent }}
                />
                <div className={`relative overflow-hidden ${card}`}>
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={c.img(
                        "about_image",
                        c.img("hero_image", "https://placehold.co/1200x1500"),
                      )}
                      alt={c.cfg(
                        "about_image_alt",
                        "Ambiente claro e acolhedor",
                      )}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="rounded-2xl border border-black/5 bg-white px-4 py-3">
                        <div
                          className="text-xs font-medium"
                          style={{ color: colors.sub }}
                        >
                          {c.cfg("about_stat_1_label", "Formato")}
                        </div>
                        <div className="mt-1 text-sm font-semibold">
                          {c.cfg("about_stat_1_value", "Particular")}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-black/5 bg-white px-4 py-3">
                        <div
                          className="text-xs font-medium"
                          style={{ color: colors.sub }}
                        >
                          {c.cfg("about_stat_2_label", "Sessões")}
                        </div>
                        <div className="mt-1 text-sm font-semibold">
                          {c.cfg("about_stat_2_value", "Personalizadas")}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 rounded-2xl border border-black/5 bg-white px-4 py-3">
                      <div
                        className="text-xs font-medium"
                        style={{ color: colors.sub }}
                      >
                        {c.cfg("about_location_label", "Local")}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-sm font-semibold">
                        <MapPin
                          className="h-4 w-4"
                          style={{ color: colors.brand }}
                        />
                        {c.cfg("about_location_value", "[cidade]")}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <section id="voce-se-identifica" className="py-12 sm:py-16">
          <div className={`${max} ${padX}`}>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <div
                className="rounded-[2rem] border border-black/5 p-6 sm:p-8"
                style={{ background: colors.section }}
              >
                <SectionHeader
                  kicker={c.cfg("identify_kicker", "Você se identifica?")}
                  title={c.cfg(
                    "identify_title",
                    "Se você sente isso, a fisioterapia pode te ajudar",
                  )}
                  sub={c.cfg(
                    "identify_subtitle",
                    "Você não precisa conviver com dor como se fosse normal. Existe um caminho seguro e possível — respeitando a sua rotina.",
                  )}
                  colors={colors}
                />

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {identify.map((it, idx) => (
                    <motion.div
                      key={`id-${idx}`}
                      variants={itemUp}
                      className="rounded-[1.5rem] border border-black/5 bg-white px-4 py-4 shadow-sm"
                      {...hoverCard}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl"
                          style={{
                            background: colors.accent,
                            color: colors.text,
                          }}
                        >
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <div className="text-sm font-medium">
                          {c.col(
                            it,
                            "text",
                            "Sinto dor na lombar quase todos os dias",
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="text-sm" style={{ color: colors.sub }}>
                    {c.cfg(
                      "identify_note",
                      "A dor tem causa. E com avaliação certa, dá pra tratar sem “achismos”.",
                    )}
                  </div>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm sm:ml-auto"
                    style={{ background: colors.brand, color: "white" }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {c.cfg("identify_cta", "Quero agendar uma avaliação")}
                    <ArrowRight className="h-4 w-4 opacity-90" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="servicos" className="py-12 sm:py-16">
          <div className={`${max} ${padX}`}>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <SectionHeader
                kicker={c.cfg("services_kicker", "Serviços")}
                title={c.cfg(
                  "services_title",
                  "Tratamentos pensados para o seu momento",
                )}
                sub={c.cfg(
                  "services_subtitle",
                  "Escolha o que faz sentido para você hoje — e ajuste conforme sua evolução.",
                )}
                colors={colors}
              />

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {services.map((it, idx) => (
                  <motion.div
                    key={`sv-${idx}`}
                    variants={itemUp}
                    className={card}
                    {...hoverCard}
                  >
                    <div className="p-5">
                      <div className="flex items-start gap-3">
                        <div
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                          style={{
                            background: colors.section,
                            color: colors.brand,
                          }}
                        >
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">
                            {c.col(
                              it,
                              "title",
                              "Fisioterapia para dores na coluna",
                            )}
                          </div>
                          <div
                            className="mt-2 text-xs leading-relaxed"
                            style={{ color: colors.sub }}
                          >
                            {c.col(
                              it,
                              "desc",
                              "Tratamento para lombar, cervical, postura e sobrecarga.",
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className="mt-4 rounded-2xl border border-black/5 px-4 py-3"
                        style={{ background: "rgba(232,242,239,0.45)" }}
                      >
                        <div
                          className="text-[11px] font-medium"
                          style={{ color: colors.sub }}
                        >
                          {c.cfg(
                            `service_${idx + 1}_note_label`,
                            "Indicado para",
                          )}
                        </div>
                        <div className="mt-1 text-xs font-semibold">
                          {c.cfg(
                            `service_${idx + 1}_note_value`,
                            idx === 0
                              ? "Dor, postura, tensão"
                              : idx === 1
                                ? "Pós-parto, assoalho pélvico"
                                : idx === 2
                                  ? "Recuperar movimentos"
                                  : "Fortalecer e prevenir",
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className={cardSoft}>
                <div className="flex flex-col gap-3 p-6 sm:flex-row sm:items-center">
                  <div>
                    <div className="text-sm font-semibold">
                      {c.cfg("services_cta_title", "Não sabe qual é o ideal?")}
                    </div>
                    <div className="mt-1 text-xs" style={{ color: colors.sub }}>
                      {c.cfg(
                        "services_cta_sub",
                        "Me chama no WhatsApp e me conta seu caso — eu te oriento no caminho mais seguro.",
                      )}
                    </div>
                  </div>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm sm:ml-auto"
                    style={{ background: colors.brand, color: "white" }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {c.cfg("services_cta_btn", "Falar agora")}
                    <ArrowRight className="h-4 w-4 opacity-90" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="como-funciona" className="py-12 sm:py-16">
          <div className={`${max} ${padX}`}>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <SectionHeader
                kicker={c.cfg("how_kicker", "Como funciona")}
                title={c.cfg(
                  "how_title",
                  "Um processo simples, claro e personalizado",
                )}
                sub={c.cfg(
                  "how_subtitle",
                  "Você entende o plano, participa do processo e sente a evolução na prática.",
                )}
                colors={colors}
              />

              <div className="grid gap-3 lg:grid-cols-3">
                {how.map((it, idx) => (
                  <motion.div
                    key={`hw-${idx}`}
                    variants={itemUp}
                    className={card}
                    {...hoverCard}
                  >
                    <div className="p-6">
                      <div className="flex items-center gap-3">
                        <div
                          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-black/5 bg-white"
                          style={{
                            boxShadow: "0 12px 26px rgba(15,23,42,0.06)",
                          }}
                        >
                          <div
                            className="text-sm font-semibold"
                            style={{ color: colors.brand }}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </div>
                        </div>
                        <div className="text-sm font-semibold">
                          {c.col(it, "title", "Avaliação detalhada")}
                        </div>
                      </div>

                      <div
                        className="mt-3 text-xs leading-relaxed"
                        style={{ color: colors.sub }}
                      >
                        {c.col(
                          it,
                          "desc",
                          "Entendo sua rotina, dor e histórico.",
                        )}
                      </div>

                      <div
                        className="mt-4 rounded-2xl border border-black/5 px-4 py-3"
                        style={{ background: "rgba(239,218,215,0.35)" }}
                      >
                        <div
                          className="text-[11px] font-medium"
                          style={{ color: colors.sub }}
                        >
                          {c.cfg(`how_${idx + 1}_micro_label`, "Você ganha")}
                        </div>
                        <div className="mt-1 text-xs font-semibold">
                          {c.cfg(
                            `how_${idx + 1}_micro_value`,
                            idx === 0
                              ? "clareza do que está acontecendo"
                              : idx === 1
                                ? "um plano realista pra sua rotina"
                                : "ajustes conforme sua evolução",
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div
                className="rounded-[2rem] border border-black/5 p-6 sm:p-8"
                style={{ background: colors.section }}
              >
                <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
                  <div>
                    <div className="text-sm font-semibold">
                      {c.cfg(
                        "how_callout_title",
                        "O objetivo é você voltar a confiar no seu corpo.",
                      )}
                    </div>
                    <div
                      className="mt-2 text-sm leading-relaxed"
                      style={{ color: colors.sub }}
                    >
                      {c.cfg(
                        "how_callout_text",
                        "Sem exageros e sem promessa vazia: com avaliação e acompanhamento, dá pra reduzir dor, recuperar movimento e voltar a fazer as coisas do dia a dia com mais leveza.",
                      )}
                    </div>
                  </div>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm lg:justify-self-end"
                    style={{ background: colors.brand, color: "white" }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {c.cfg("how_cta_btn", "Agendar avaliação")}
                    <ArrowRight className="h-4 w-4 opacity-90" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="depoimentos" className="py-12 sm:py-16">
          <div className={`${max} ${padX}`}>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <SectionHeader
                kicker={c.cfg("testimonials_kicker", "Prova social")}
                title={c.cfg(
                  "testimonials_title",
                  "Depoimentos de quem voltou a viver com mais leveza",
                )}
                sub={c.cfg(
                  "testimonials_subtitle",
                  "Resultados reais no dia a dia: menos medo, mais movimento e mais qualidade de vida.",
                )}
                colors={colors}
              />

              <div className="grid gap-3 lg:grid-cols-2">
                {testimonials.map((it, idx) => (
                  <motion.div
                    key={`t-${idx}`}
                    variants={itemUp}
                    className={card}
                    {...hoverCard}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-3">
                        <div
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                          style={{
                            background: colors.section,
                            color: colors.brand,
                          }}
                        >
                          <Quote className="h-5 w-5" />
                        </div>
                        <div
                          className="text-sm leading-relaxed"
                          style={{ color: colors.text }}
                        >
                          “
                          {c.col(
                            it,
                            "text",
                            "Eu vivia com dor na lombar e hoje consigo trabalhar sem sofrer.",
                          )}
                          ”
                          <div
                            className="mt-3 text-xs font-semibold"
                            style={{ color: colors.sub }}
                          >
                            — {c.col(it, "name", "Paciente")}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div
                className="rounded-[2rem] border border-black/5 p-6 sm:p-8"
                style={{ background: "rgba(255,255,255,0.7)" }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-3">
                    <div
                      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                      style={{ background: colors.accent, color: colors.text }}
                    >
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">
                        {c.cfg(
                          "social_trust_title",
                          "Atendimento com privacidade e respeito",
                        )}
                      </div>
                      <div
                        className="mt-1 text-xs leading-relaxed"
                        style={{ color: colors.sub }}
                      >
                        {c.cfg(
                          "social_trust_text",
                          "Tudo é conduzido com cuidado, escuta e clareza — para você se sentir segura em cada etapa.",
                        )}
                      </div>
                    </div>
                  </div>

                  <a
                    href={waHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm sm:ml-auto"
                    style={{ background: colors.brand, color: "white" }}
                  >
                    <MessageCircle className="h-4 w-4" />
                    {c.cfg("social_cta_btn", "Quero conversar")}
                    <ArrowRight className="h-4 w-4 opacity-90" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="cta" className="py-12 sm:py-16">
          <div className={`${max} ${padX}`}>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div
                variants={itemUp}
                className="relative overflow-hidden rounded-[2.25rem] border border-black/5 p-7 shadow-sm sm:p-10"
                style={{ background: colors.section }}
              >
                <div
                  className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full blur-3xl opacity-35"
                  style={{ background: colors.accent }}
                />
                <div
                  className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full blur-3xl opacity-35"
                  style={{ background: "rgba(111,175,157,0.35)" }}
                />

                <div className="relative grid gap-6 lg:grid-cols-[1.3fr,0.7fr] lg:items-center">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/5 bg-white px-3 py-1 shadow-sm">
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: colors.brand }}
                      />
                      <span
                        className="text-xs font-medium"
                        style={{ color: colors.sub }}
                      >
                        {c.cfg("cta_kicker", "Pronta para começar?")}
                      </span>
                    </div>

                    <h3 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
                      {c.cfg(
                        "cta_title",
                        "Pronta para cuidar do seu corpo com mais atenção e menos dor?",
                      )}
                    </h3>

                    <p
                      className="mt-3 text-sm leading-relaxed sm:text-base"
                      style={{ color: colors.sub, maxWidth: 720 }}
                    >
                      {c.cfg(
                        "cta_text",
                        "Me chama no WhatsApp e vamos entender seu caso. A partir disso, eu te explico o plano ideal — com clareza, sem exageros e respeitando sua rotina.",
                      )}
                    </p>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                      <a
                        href={waHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold shadow-sm"
                        style={{ background: colors.brand, color: "white" }}
                      >
                        <MessageCircle className="h-4 w-4" />
                        {c.cfg("cta_btn", "Agendar avaliação pelo WhatsApp")}
                        <ArrowRight className="h-4 w-4 opacity-90" />
                      </a>

                      <div className="text-xs" style={{ color: colors.sub }}>
                        {c.cfg(
                          "cta_note",
                          "Resposta rápida • Atendimento particular • Ambiente acolhedor",
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div
                          className="inline-flex h-10 w-10 items-center justify-center rounded-2xl"
                          style={{
                            background: colors.accent,
                            color: colors.text,
                          }}
                        >
                          <Heart className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">
                            {c.cfg(
                              "cta_card_title",
                              "Um primeiro passo seguro",
                            )}
                          </div>
                          <div
                            className="mt-1 text-xs leading-relaxed"
                            style={{ color: colors.sub }}
                          >
                            {c.cfg(
                              "cta_card_text",
                              "Você não precisa “aguentar” a dor. Dá pra tratar com técnica e cuidado — e voltar a ter liberdade no dia a dia.",
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-3">
                        <div
                          className="rounded-2xl border border-black/5 px-4 py-3"
                          style={{ background: "rgba(232,242,239,0.55)" }}
                        >
                          <div
                            className="text-[11px] font-medium"
                            style={{ color: colors.sub }}
                          >
                            {c.cfg("cta_card_row1_label", "Para quem é")}
                          </div>
                          <div className="mt-1 text-xs font-semibold">
                            {c.cfg(
                              "cta_card_row1_value",
                              "Mulheres com dor, insegurança ou limitação",
                            )}
                          </div>
                        </div>
                        <div
                          className="rounded-2xl border border-black/5 px-4 py-3"
                          style={{ background: "rgba(239,218,215,0.35)" }}
                        >
                          <div
                            className="text-[11px] font-medium"
                            style={{ color: colors.sub }}
                          >
                            {c.cfg("cta_card_row2_label", "O que você recebe")}
                          </div>
                          <div className="mt-1 text-xs font-semibold">
                            {c.cfg(
                              "cta_card_row2_value",
                              "Avaliação + plano claro + acompanhamento",
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="mt-8 border-t border-black/5 pt-6">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-xs" style={{ color: colors.sub }}>
                    {c.cfg(
                      "footer_note",
                      "© " +
                        new Date().getFullYear() +
                        " • Atendimento particular • Página demonstrativa",
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <a
                      href="#servicos"
                      className="rounded-xl px-3 py-2 text-xs font-medium hover:bg-black/5"
                      style={{ color: colors.sub }}
                    >
                      {c.cfg("footer_link_services", "Serviços")}
                    </a>
                    <a
                      href="#como-funciona"
                      className="rounded-xl px-3 py-2 text-xs font-medium hover:bg-black/5"
                      style={{ color: colors.sub }}
                    >
                      {c.cfg("footer_link_how", "Como funciona")}
                    </a>
                    <a
                      href="#depoimentos"
                      className="rounded-xl px-3 py-2 text-xs font-medium hover:bg-black/5"
                      style={{ color: colors.sub }}
                    >
                      {c.cfg("footer_link_social", "Depoimentos")}
                    </a>
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-xl px-3 py-2 text-xs font-semibold shadow-sm"
                      style={{ background: colors.brand, color: "white" }}
                    >
                      {c.cfg("footer_link_cta", "WhatsApp")}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="fixed bottom-4 right-4 z-50 sm:hidden">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-lg"
            style={{ background: colors.brand, color: "white" }}
          >
            <MessageCircle className="h-4 w-4" />
            {c.cfg("float_cta", "Agendar")}
          </a>
        </div>
      </main>
    </div>
  );
}
