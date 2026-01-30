import type { KVConfig, SiteData, TabRows } from "./types";

const csvUrl = (sheetId: string, tab: string) =>
  `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&sheet=${encodeURIComponent(tab)}`;

function detectDelimiter(csv: string) {
  const firstLine = csv.split(/\r?\n/).find((l) => l.trim().length) ?? "";
  const commas = (firstLine.match(/,/g) ?? []).length;
  const semis = (firstLine.match(/;/g) ?? []).length;
  return semis > commas ? ";" : ",";
}

function parseCSV(csv: string): string[][] {
  const rows: string[][] = [];
  let cur = "";
  let row: string[] = [];
  let inQ = false;

  const delim = detectDelimiter(csv);

  for (let i = 0; i < csv.length; i++) {
    const c = csv[i];
    const n = csv[i + 1];

    if (c === '"' && inQ && n === '"') {
      cur += '"';
      i++;
      continue;
    }
    if (c === '"') {
      inQ = !inQ;
      continue;
    }

    if (!inQ && c === delim) {
      row.push(cur);
      cur = "";
      continue;
    }
    if (!inQ && (c === "\n" || c === "\r")) {
      if (c === "\r" && n === "\n") i++;
      row.push(cur);
      rows.push(row);
      cur = "";
      row = [];
      continue;
    }
    cur += c;
  }

  if (cur.length || row.length) {
    row.push(cur);
    rows.push(row);
  }

  return rows.filter((r) => r.some((x) => String(x ?? "").trim()));
}

function normalizeHeader(h: string) {
  return (h ?? "").trim().toLowerCase().replace(/\s+/g, "_");
}

function toObjects(rows: string[][]): TabRows {
  if (rows.length < 2) return [];
  const header = rows[0].map((h) => normalizeHeader(h));
  return rows.slice(1).map((r) => {
    const obj: Record<string, string> = {};
    header.forEach((h, i) => (obj[h] = (r[i] ?? "").trim()));
    return obj;
  });
}

function configKV(rows: string[][]): KVConfig {
  const out: KVConfig = {};
  for (const r of rows.slice(1)) {
    const k = (r[0] ?? "").trim();
    const v = (r[1] ?? "").trim();
    if (k) out[k] = v;
  }
  return out;
}

async function fetchCSV(url: string, revalidateSeconds: number) {
  const res = await fetch(url, { next: { revalidate: revalidateSeconds } });
  if (!res.ok) throw new Error(`Sheets fetch failed (${res.status})`);
  return res.text();
}

function normalizeTabs(tabs?: string[]) {
  const s = new Set<string>(["config"]);
  (tabs ?? []).forEach((t) => {
    const tt = String(t || "")
      .trim()
      .toLowerCase();
    if (tt) s.add(tt);
  });
  return Array.from(s);
}

export async function loadSiteData(
  sheetId: string,
  revalidateSeconds: number,
  wantedTabs: string[] = ["config"],
): Promise<SiteData> {
  const neededTabs = normalizeTabs(wantedTabs);

  const results = await Promise.all(
    neededTabs.map(async (tab) => {
      try {
        const csv = await fetchCSV(csvUrl(sheetId, tab), revalidateSeconds);
        return [tab, csv] as const;
      } catch {
        return [tab, ""] as const;
      }
    }),
  );

  const tabCSV = new Map(results);
  const raw = tabCSV.get("config") ?? "";
  console.log("RAW first 200:", JSON.stringify(raw.slice(0, 200)));

  const configRows = parseCSV(tabCSV.get("config") ?? "");
  const config = configRows.length >= 2 ? configKV(configRows) : {};

  const tabs: Record<string, TabRows> = {};

  for (const tab of neededTabs) {
    if (tab === "config") continue;
    const rows = parseCSV(tabCSV.get(tab) ?? "");
    tabs[tab] = rows.length >= 2 ? toObjects(rows) : [];
  }

  return { config, tabs };
}
