"use client";

import React, { useMemo, useState } from "react";
import { makeCtx } from "@/ui/ctx";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarClock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Monitor,
  Instagram,
  ChevronDown,
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

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/18 px-3 py-1.5 text-xs font-extrabold text-slate-900 shadow-sm backdrop-blur">
      {children}
    </span>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white/60 hover:text-slate-900 transition-colors"
    >
      {children}
    </a>
  );
}

function ButtonPrimary({
  href,
  children,
  reduce,
  className,
}: {
  href: string;
  children: React.ReactNode;
  reduce: boolean;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold text-white",
        "bg-slate-900 hover:bg-slate-800 shadow-[0_16px_40px_rgba(15,23,42,0.22)]",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}

function ButtonGhost({
  href,
  children,
  reduce,
  className,
}: {
  href: string;
  children: React.ReactNode;
  reduce: boolean;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      whileHover={reduce ? undefined : { y: -1 }}
      whileTap={reduce ? undefined : { scale: 0.99 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cx(
        "inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-extrabold text-slate-900",
        "border border-white/45 bg-white/25 hover:bg-white/45 shadow-sm backdrop-blur",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}

function MobileCta({
  waHref,
  waLabel,
  hoursHref,
  hoursLabel,
}: {
  waHref: string;
  waLabel: string;
  hoursHref: string;
  hoursLabel: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 md:hidden">
      <div className="mx-auto max-w-6xl px-4 pb-3">
        <div className="rounded-3xl border border-white/35 bg-white/70 p-2 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur">
          <div className="grid grid-cols-2 gap-2">
            <a
              href={waHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-3 py-3 text-sm font-extrabold text-white shadow-sm active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              {waLabel}
            </a>
            <a
              href={hoursHref}
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/45 bg-white/55 px-3 py-3 text-sm font-extrabold text-slate-900 shadow-sm active:scale-[0.99]"
            >
              <CalendarClock className="h-4 w-4" />
              {hoursLabel}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page({ data }: PageProps) {
  const c = makeCtx(data);
  const reduce = useReducedMotion();
  const motionOn = !reduce;

  const navSobre = c.cfg("nav_sobre", "Sobre");
  const navAtuacao = c.cfg("nav_atuacao", "Atuação");
  const navComo = c.cfg("nav_como", "Como funciona");
  const navValores = c.cfg("nav_valores", "Valores");
  const navDep = c.cfg("nav_depoimentos", "Depoimentos");
  const navDuvidas = c.cfg("nav_duvidas", "Dúvidas");
  // =========================
  // PERFIL (como no print)
  // =========================
  const nome = c.cfg("nome", "Claudia Cremonini");
  const cargo = c.cfg("cargo", "Psicóloga (o)");
  const crp = c.cfg("crp", "CRP: 27222/05");

  // HERO (mais “perfil” e menos “landing”)
  const heroBadge = c.cfg("hero_badge", "Atendimento online");

  // Título curto e claro (combina com o modal do print)
  const headline = c.cfg(
    "headline",
    "Psicoterapia online com abordagem Cognitivo-Comportamental (TCC)",
  );

  // Subtítulo objetivo (sem nichar em mulheres)
  const subheadline = c.cfg(
    "subheadline",
    "Sessões de 50 minutos por videochamada. Atendimento para adultos, casais, idosos e família, com acolhimento, ética e foco em estratégias práticas para o dia a dia.",
  );

  // Fundo pode continuar (ou trocar por algo mais neutro se quiser)
  const heroBg = c.img(
    "hero_fundo",
    "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80",
  );

  // ✅ FOTO DE PERFIL (URL DO PERFIL)
  const heroPhoto = c.img(
    "foto_perfil",
    "https://7c6915225a87bd63397895a06f4264e3.cdn.bubble.io/cdn-cgi/image/w=192,h=192,f=auto,dpr=1,fit=contain/f1738265581941x603476551214943900/foto%20perfil%20.jpg",
  );
  const heroPhotoAlt = c.cfg("foto_alt", "Foto da psicóloga");
  const instaHandle = c.cfg("instagram_handle", "@claudiacremonini");
  const instaUrl = c.link("instagram_url", "#");
  // =========================
  // CTA (como no print: WhatsApp)
  // =========================
  const waBase = c.wa("whatsapp_contato", "#");
  const waMsg = c.cfg(
    "whatsapp_mensagem",
    "Oi! Vi seu perfil e gostaria de saber sobre horários e como funciona o atendimento online.",
  );
  const waHref = useMemo(() => buildWaLink(waBase, waMsg), [waBase, waMsg]);

  const ctaWa = c.cfg("cta_whatsapp", "WhatsApp");

  // (se você ainda usa o botão de horários em algum lugar)
  const hoursHref = c.link("link_horarios", "#");
  const ctaHours = c.cfg("cta_horarios", "Ver horários");

  // Mini infos (pode manter)
  const mini1 = c.cfg("mini_1", "Sigilo e acolhimento");
  const mini2 = c.cfg("mini_2", "100% online");

  const [mobileOpen, setMobileOpen] = useState(false);

  const container = {
    hidden: {},
    show: {
      transition: motionOn
        ? { staggerChildren: 0.09, delayChildren: 0.05 }
        : undefined,
    },
  };

  const item = {
    hidden: motionOn
      ? { opacity: 0, y: 14, filter: "blur(8px)" }
      : { opacity: 1, y: 0, filter: "blur(0px)" },
    show: motionOn
      ? {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
        }
      : undefined,
  };

  return (
    <div
      className="min-h-[100svh] text-slate-900"
      style={{
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", "SF Pro Text", "Inter", "Segoe UI", Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
      }}
    >
      <section className="relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt={c.cfg("hero_fundo_alt", "Fundo")}
            className="h-full w-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7efe9]/70 via-[#f7efe9]/55 to-[#f7efe9]/65" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_60%_40%,rgba(251,113,133,0.22),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_20%_30%,rgba(244,114,182,0.16),transparent_55%)]" />
        </div>

        <header className="relative z-30 border-b border-white/35 bg-white/55 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full overflow-hidden border border-white/55 bg-white shadow-sm shrink-0">
                <img
                  src={heroPhoto}
                  alt={heroPhotoAlt}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="leading-tight min-w-0">
                <div className="text-sm font-black tracking-tight truncate">
                  {nome}{" "}
                  <span className="font-semibold text-slate-500">
                    • {cargo}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 truncate">{crp}</div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-1">
              <NavLink href="#sobre">{navSobre}</NavLink>
              <NavLink href="#atuacao">{navAtuacao}</NavLink>
              <NavLink href="#como">{navComo}</NavLink>
              <NavLink href="#valores">{navValores}</NavLink>
              <NavLink href="#depoimentos">{navDep}</NavLink>
              <NavLink href="#duvidas">{navDuvidas}</NavLink>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                className="lg:hidden inline-flex items-center justify-center rounded-2xl border border-white/50 bg-white/35 px-3 py-2 text-sm font-extrabold text-slate-900 shadow-sm backdrop-blur"
                aria-expanded={mobileOpen}
                aria-label={c.cfg("menu_label", "Abrir menu")}
              >
                <ChevronDown
                  className={cx(
                    "h-4 w-4 transition-transform",
                    mobileOpen && "rotate-180",
                  )}
                />
              </button>

              <motion.a
                href={waHref}
                whileHover={reduce ? undefined : { y: -1 }}
                whileTap={reduce ? undefined : { scale: 0.99 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-xs md:text-sm font-extrabold text-white shadow-sm hover:bg-slate-800"
              >
                <MessageCircle className="h-4 w-4" />
                {c.cfg("top_cta", "WhatsApp")}
              </motion.a>
            </div>
          </div>

          <motion.div
            initial={false}
            animate={
              mobileOpen
                ? { height: "auto", opacity: 1 }
                : { height: 0, opacity: 0 }
            }
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden"
          >
            <div className="mx-auto max-w-6xl px-4 pb-3 md:px-6">
              <div className="rounded-3xl border border-white/35 bg-white/50 p-2 backdrop-blur">
                <div className="grid grid-cols-2 gap-1">
                  <a
                    className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white/60"
                    href="#sobre"
                  >
                    {navSobre}
                  </a>
                  <a
                    className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white/60"
                    href="#atuacao"
                  >
                    {navAtuacao}
                  </a>
                  <a
                    className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white/60"
                    href="#como"
                  >
                    {navComo}
                  </a>
                  <a
                    className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white/60"
                    href="#valores"
                  >
                    {navValores}
                  </a>
                  <a
                    className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white/60"
                    href="#depoimentos"
                  >
                    {navDep}
                  </a>
                  <a
                    className="rounded-2xl px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-white/60"
                    href="#duvidas"
                  >
                    {navDuvidas}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </header>

        <div className="relative z-10">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6 md:py-16">
            <div className="grid items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
              <motion.div variants={container} initial="hidden" animate="show">
                <motion.div variants={item}>
                  <Pill>
                    <Sparkles className="h-4 w-4 text-rose-600" />
                    {heroBadge}
                  </Pill>
                </motion.div>

                <motion.h1
                  variants={item}
                  className="mt-5 text-4xl md:text-6xl font-black tracking-tight text-slate-900"
                >
                  {headline}
                </motion.h1>

                <motion.p
                  variants={item}
                  className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-slate-700"
                >
                  {subheadline}
                </motion.p>

                <motion.div
                  variants={item}
                  className="mt-6 flex flex-col sm:flex-row gap-3"
                >
                  <ButtonPrimary
                    href={waHref}
                    reduce={!!reduce}
                    className="w-full sm:w-auto"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {ctaWa}
                  </ButtonPrimary>
                  <ButtonGhost
                    href={hoursHref}
                    reduce={!!reduce}
                    className="w-full sm:w-auto"
                  >
                    <CalendarClock className="h-4 w-4" />
                    {ctaHours}
                  </ButtonGhost>
                </motion.div>

                <motion.div
                  variants={item}
                  className="mt-5 flex flex-wrap gap-4 text-xs text-slate-700"
                >
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <ShieldCheck className="h-4 w-4 text-slate-700" />
                    {mini1}
                  </span>
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <Monitor className="h-4 w-4 text-slate-700" />
                    {mini2}
                  </span>
                  <span className="inline-flex items-center gap-2 font-semibold">
                    <Instagram className="h-4 w-4 text-slate-700" />
                    {instaUrl && instaUrl !== "#" ? (
                      <a href={instaUrl} className="hover:underline">
                        {instaHandle}
                      </a>
                    ) : (
                      <span>{instaHandle}</span>
                    )}
                  </span>
                </motion.div>
              </motion.div>

              <motion.div
                initial={
                  motionOn ? { opacity: 0, y: 18, scale: 0.98 } : undefined
                }
                animate={motionOn ? { opacity: 1, y: 0, scale: 1 } : undefined}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex md:justify-end justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(244,114,182,0.26),transparent_60%)] blur-2xl" />
                  <motion.div
                    animate={motionOn ? { y: [0, -6, 0] } : undefined}
                    transition={
                      motionOn
                        ? {
                            duration: 4.8,
                            repeat: Infinity,
                            ease: [0.37, 0, 0.63, 1],
                          }
                        : undefined
                    }
                    className="relative"
                  >
                    <div className="relative h-60 w-60 md:h-72 md:w-72 rounded-full border-[10px] border-white/80 shadow-[0_26px_70px_rgba(15,23,42,0.18)] overflow-hidden">
                      <img
                        src={heroPhoto}
                        alt={heroPhotoAlt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <MobileCta
          waHref={waHref}
          waLabel={ctaWa}
          hoursHref={hoursHref}
          hoursLabel={ctaHours}
        />
      </section>
    </div>
  );
}
