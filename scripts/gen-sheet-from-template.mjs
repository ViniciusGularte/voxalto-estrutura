// scripts/gen-sheet-from-template.mjs
import fs from "node:fs";
import path from "node:path";

const slug = process.argv[2];
if (!slug) {
  console.log("Use: pnpm gen:sheet <slug>");
  process.exit(1);
}

const ROOT = process.cwd();
const tpl = path.join(ROOT, "src", "clients", slug, "template.tsx");
if (!fs.existsSync(tpl)) throw new Error(`Template não encontrado: ${tpl}`);

const src = fs.readFileSync(tpl, "utf8");

// ---------------------------
// Helpers
// ---------------------------
function escapeCSV(v) {
  const s = String(v ?? "");
  if (/[,"\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}
function uniqPush(map, key, value) {
  if (!map.has(key)) map.set(key, value);
}
function tryParseArray(str) {
  try {
    return Function(`"use strict";return (${str})`)();
  } catch {
    return null;
  }
}
function addMany(set, arr) {
  for (const a of arr) set.add(a);
}

// ---------------------------
// 0) Resolve const <var> = [ ... ]
// ---------------------------
const arrayVarMap = new Map(); // varName -> array<object>
const ARRAY_VAR_RE =
  /\b(?:const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*(\[[\s\S]*?\])\s*;/g;

let m;
while ((m = ARRAY_VAR_RE.exec(src))) {
  const varName = m[1];
  const arrStr = m[2];
  const parsed = tryParseArray(arrStr);
  if (Array.isArray(parsed)) arrayVarMap.set(varName, parsed);
}

// ---------------------------
// 1) Extract CONFIG keys + fallbacks
// ---------------------------
const CONFIG_CALL_RE =
  /c\.(cfg|link|img|wa)\(\s*["']([a-zA-Z0-9_]+)["']\s*(?:,\s*["']([^"']*)["']\s*)?\)/g;

const configMap = new Map(); // key -> fallback
while ((m = CONFIG_CALL_RE.exec(src))) {
  const key = m[2];
  const fallback = m[3] ?? "";
  uniqPush(configMap, key, fallback);
}

// ---------------------------
// 2) Extract tabs used
// ---------------------------
const TAB_CALL_RE = /c\.tab\(\s*["']([a-zA-Z0-9_]+)["']/g;
const tabs = new Set(["config"]);
while ((m = TAB_CALL_RE.exec(src))) tabs.add(m[1]);

// ---------------------------
// 3) Extract tab fallbacks
//    a) inline array: c.tab("x", [ ... ])
//    b) var ref:     c.tab("x", someFallbackVar)
// ---------------------------
const tabFallbackRows = new Map(); // tab -> array<object>

// a) inline
const TAB_FALLBACK_INLINE_RE =
  /c\.tab\(\s*["']([a-zA-Z0-9_]+)["']\s*,\s*(\[[\s\S]*?\])\s*\)/g;

while ((m = TAB_FALLBACK_INLINE_RE.exec(src))) {
  const tab = m[1];
  const arrStr = m[2];
  const parsed = tryParseArray(arrStr);
  if (Array.isArray(parsed) && parsed.length) tabFallbackRows.set(tab, parsed);
}

// b) variable reference
const TAB_FALLBACK_VAR_RE =
  /c\.tab\(\s*["']([a-zA-Z0-9_]+)["']\s*,\s*([a-zA-Z0-9_]+)\s*\)/g;

while ((m = TAB_FALLBACK_VAR_RE.exec(src))) {
  const tab = m[1];
  const varName = m[2];

  if (tabFallbackRows.has(tab)) continue; // inline vence

  const parsed = arrayVarMap.get(varName);
  if (Array.isArray(parsed) && parsed.length) tabFallbackRows.set(tab, parsed);
}

// ---------------------------
// 4) Minimal schema per-tab (o que o site realmente usa)
// ---------------------------
const BASE_LIST_COLS = ["ordem", "ativo"];

function presetForTab(tab) {
  const t = String(tab || "").toLowerCase();

  // você usa: hero_bullets -> { texto } com fallback em text também
  if (t.includes("hero") && t.includes("bullet")) return ["texto", "text"];

  // sobre parágrafos -> { texto } fallback text
  if (t.includes("about") || t.includes("sobre")) return ["texto", "text"];

  // faq -> pergunta/resposta fallback q/a
  if (t === "faq" || t.includes("faq"))
    return ["pergunta", "q", "resposta", "a"];

  // depoimentos -> texto/meta fallback text/autor
  if (t.includes("testimonial") || t.includes("depo"))
    return ["texto", "text", "meta", "autor"];

  // serviços -> exatamente como seu mapper
  if (t.includes("service") || t.includes("serv"))
    return [
      "grupo",
      "categoria",
      "titulo",
      "title",
      "descricao",
      "desc",
      "detalhes",
      "detail",
      "etiqueta",
      "tag",
    ];

  // default safe
  return ["titulo", "title", "texto", "text", "descricao", "desc"];
}

// ---------------------------
// 5) Build per-tab columns (preset + fallback keys + ordem/ativo)
// ---------------------------
const tabCols = new Map(); // tab -> Set(cols)

for (const t of tabs) {
  if (t === "config") continue;

  const cols = new Set();
  addMany(cols, presetForTab(t));
  addMany(cols, BASE_LIST_COLS);

  const fallbackRows = tabFallbackRows.get(t) || [];
  for (const row of fallbackRows) {
    if (row && typeof row === "object") {
      for (const k of Object.keys(row)) cols.add(k);
    }
  }

  tabCols.set(t, cols);
}

const tabsArr = Array.from(tabs).sort((a, b) => a.localeCompare(b));

// ---------------------------
// 6) Write outputs
// ---------------------------
const outDir = path.join(ROOT, "out", "sheets", slug);
fs.mkdirSync(outDir, { recursive: true });

// config.csv
const configKeys = Array.from(configMap.keys()).sort((a, b) =>
  a.localeCompare(b),
);
const configCsv = [
  "key,value",
  ...configKeys.map((k) => `${k},${escapeCSV(configMap.get(k) || "")}`),
].join("\n");
fs.writeFileSync(path.join(outDir, "config.csv"), configCsv, "utf8");

// list tabs csv
for (const t of tabsArr) {
  if (t === "config") continue;

  const cols = Array.from(tabCols.get(t) || new Set()).sort((a, b) =>
    a.localeCompare(b),
  );

  // ordena: campos do preset primeiro, depois extras do fallback, depois ordem/ativo
  const preset = presetForTab(t);
  const ordered = [
    ...preset.filter((x) => cols.includes(x)),
    ...cols.filter(
      (x) => !preset.includes(x) && x !== "ordem" && x !== "ativo",
    ),
    ...["ordem", "ativo"].filter((x) => cols.includes(x)),
  ];

  const header = ordered.join(",");

  const fallbackRows = tabFallbackRows.get(t) || [];
  let body = "";

  if (fallbackRows.length) {
    body = fallbackRows
      .map((row) => ordered.map((col) => escapeCSV(row?.[col] ?? "")).join(","))
      .join("\n");
  } else {
    // deixa 4 linhas vazias só pra orientar (sem lixo de colunas)
    body = Array.from({ length: 4 })
      .map(() => ordered.map(() => "").join(","))
      .join("\n");
  }

  fs.writeFileSync(
    path.join(outDir, `${t}.csv`),
    [header, body].join("\n"),
    "utf8",
  );
}

// tabs.json
fs.writeFileSync(
  path.join(outDir, "tabs.json"),
  JSON.stringify({ tabs: tabsArr }, null, 2),
  "utf8",
);

// notes.txt
const notes = [
  `template: ${path.relative(ROOT, tpl)}`,
  `config keys: ${configKeys.length}`,
  `tabs: ${tabsArr.join(", ")}`,
  `array vars detected: ${Array.from(arrayVarMap.keys()).sort().join(", ") || "(none)"}`,
  `tab fallbacks resolved: ${Array.from(tabFallbackRows.keys()).sort().join(", ") || "(none)"}`,
].join("\n");

fs.writeFileSync(path.join(outDir, "notes.txt"), notes, "utf8");

console.log(`✅ Sheets gerados em: ${outDir}`);
console.log(`   - config.csv (${configKeys.length} keys)`);
console.log(`   - tabs.json (${tabsArr.length} tabs)`);
console.log(
  `   - list tabs: ${tabsArr.filter((t) => t !== "config").join(", ") || "(none)"}`,
);
console.log(
  `   - fallbacks resolvidos: ${Array.from(tabFallbackRows.keys()).join(", ") || "(none)"}`,
);
