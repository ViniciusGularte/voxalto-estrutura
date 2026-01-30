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

function setAdd(map, key, val) {
  if (!map.has(key)) map.set(key, new Set());
  map.get(key).add(val);
}

function tryParseArray(str) {
  try {
    // Using Function to parse array literal (trusted internal templates only)
    return Function(`"use strict";return (${str})`)();
  } catch {
    return null;
  }
}

// ---------------------------
// 1) Extract CONFIG keys + fallbacks
//   c.cfg("key", "fallback")
//   c.link("key", "fallback")
//   c.img("key", "fallback")
//   c.wa("key", "fallback")
// ---------------------------
const CONFIG_CALL_RE =
  /c\.(cfg|link|img|wa)\(\s*["']([a-zA-Z0-9_]+)["']\s*(?:,\s*["']([^"']*)["']\s*)?\)/g;

const configMap = new Map(); // key -> fallback
let m;

while ((m = CONFIG_CALL_RE.exec(src))) {
  const key = m[2];
  const fallback = m[3] ?? "";
  uniqPush(configMap, key, fallback);
}

// ---------------------------
// 2) Extract tabs used
//   c.tab("services")
//   c.tab("services", [...fallbackItems])
// ---------------------------
const TAB_CALL_RE = /c\.tab\(\s*["']([a-zA-Z0-9_]+)["']/g;
const tabs = new Set(["config"]);

while ((m = TAB_CALL_RE.exec(src))) tabs.add(m[1]);

// ---------------------------
// 3) Extract tab fallback rows (optional)
//   c.tab("services", [ { ... }, { ... } ])
// ---------------------------
const TAB_FALLBACK_RE =
  /c\.tab\(\s*["']([a-zA-Z0-9_]+)["']\s*,\s*(\[[\s\S]*?\])\s*\)/g;

const tabFallbackRows = new Map(); // tab -> array<object>

while ((m = TAB_FALLBACK_RE.exec(src))) {
  const tab = m[1];
  const arrStr = m[2];
  const parsed = tryParseArray(arrStr);
  if (Array.isArray(parsed) && parsed.length) {
    tabFallbackRows.set(tab, parsed);
  }
}

// ---------------------------
// 4) Extract columns used in lists
//   c.col(item, "campo", "fallback")
// We'll collect fields used via c.col and apply them to all tabs used.
// This may create extra columns in some tabs (harmless).
// ---------------------------
const COL_CALL_RE =
  /c\.col\(\s*([a-zA-Z0-9_]+)\s*,\s*["']([a-zA-Z0-9_]+)["']\s*(?:,\s*["']([^"']*)["']\s*)?\)/g;

const globalFields = new Set();
while ((m = COL_CALL_RE.exec(src))) globalFields.add(m[2]);

// per-tab columns set
const tabCols = new Map(); // tab -> Set(cols)

// Default columns always included for lists
const BASE_LIST_COLS = ["ordem", "ativo"];

// Nice-to-have common fields (keeps sheets friendly)
const COMMON_FIELDS = [
  "titulo",
  "descricao",
  "imagem",
  "link",
  "icone",
  "preco",
  "cta",
  "link_texto",
];

for (const t of tabs) {
  if (t === "config") continue;

  for (const base of BASE_LIST_COLS) setAdd(tabCols, t, base);
  for (const f of globalFields) setAdd(tabCols, t, f);

  // If no c.col was used, include common fields so sheet isn't empty/useless
  if (globalFields.size === 0) {
    for (const f of COMMON_FIELDS) setAdd(tabCols, t, f);
  }
}

// Also include fields present in fallback rows (if any)
for (const [tab, rows] of tabFallbackRows.entries()) {
  if (!tabs.has(tab)) tabs.add(tab);
  if (tab === "config") continue;
  for (const base of BASE_LIST_COLS) setAdd(tabCols, tab, base);

  for (const r of rows) {
    if (r && typeof r === "object") {
      for (const k of Object.keys(r)) setAdd(tabCols, tab, k);
    }
  }
}

// Ensure tabs array stable
const tabsArr = Array.from(tabs).sort((a, b) => a.localeCompare(b));

// ---------------------------
// 5) Write outputs
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

  // Friendly ordering: main fields first, then others, then ordem/ativo
  const main = [
    "titulo",
    "descricao",
    "imagem",
    "link",
    "icone",
    "preco",
    "link_texto",
    "cta",
  ];
  const ordered = [
    ...main.filter((x) => cols.includes(x)),
    ...cols.filter((x) => !main.includes(x) && x !== "ordem" && x !== "ativo"),
    ...["ordem", "ativo"].filter((x) => cols.includes(x)),
  ];

  const header = ordered.join(",");

  const fallbackRows = tabFallbackRows.get(t) || [];
  let body = "";

  if (fallbackRows.length) {
    body = fallbackRows
      .map((row) => ordered.map((col) => escapeCSV(row?.[col] ?? "")).join(","))
      .join("\n");
  }

  const csv = [header, body].join("\n");
  fs.writeFileSync(path.join(outDir, `${t}.csv`), csv, "utf8");
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
  `list fields detected (global): ${Array.from(globalFields).sort().join(", ") || "(none)"}`,
  `tab fallbacks: ${Array.from(tabFallbackRows.keys()).sort().join(", ") || "(none)"}`,
].join("\n");

fs.writeFileSync(path.join(outDir, "notes.txt"), notes, "utf8");

console.log(`✅ Sheets gerados em: ${outDir}`);
console.log(`   - config.csv (${configKeys.length} keys)`);
console.log(`   - tabs.json (${tabsArr.length} tabs)`);
console.log(
  `   - list tabs: ${tabsArr.filter((t) => t !== "config").join(", ") || "(none)"}`,
);
console.log(
  `   - fallbacks em tabs: ${Array.from(tabFallbackRows.keys()).join(", ") || "(none)"}`,
);
