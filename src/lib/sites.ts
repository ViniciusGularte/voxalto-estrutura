import sitesJson from "@/config/sites.json";

type RawSite = {
  slug: string;
  sheetId: string;
  revalidateSeconds?: number;
  template?: string;
  customDomains?: string[];
};

type RawFile = {
  appDomain: string;
  defaults?: { revalidateSeconds?: number };
  sites: RawSite[];
};

export type SiteBuild = {
  slug: string;
  sheetId: string;
  revalidateSeconds: number;
  template: string;
  customDomains: string[];
};

const raw = sitesJson as unknown as RawFile;

const DEFAULT_REVALIDATE = raw.defaults?.revalidateSeconds ?? 1200;

const BUILT: SiteBuild[] = (raw.sites ?? []).map((s) => ({
  slug: s.slug,
  sheetId: s.sheetId,
  revalidateSeconds: s.revalidateSeconds ?? DEFAULT_REVALIDATE,
  template: (s.template ?? s.slug).trim(),
  customDomains: (s.customDomains ?? []).map((d) => d.toLowerCase()),
}));

export function resolveBySlug(slug: string): SiteBuild | null {
  const key = (slug ?? "").toLowerCase().trim();
  return BUILT.find((s) => s.slug.toLowerCase() === key) ?? null;
}

export function resolveByHost(host: string | null): SiteBuild | null {
  const h = (host ?? "").split(":")[0].toLowerCase().trim();
  if (!h) return null;

  // custom domain
  const byCustom = BUILT.find((s) => s.customDomains.includes(h));
  if (byCustom) return byCustom;

  // (opcional) se você quiser suportar <slug>.appDomain
  const appDomain = (raw.appDomain ?? "").toLowerCase();
  if (appDomain && h.endsWith(appDomain)) {
    const maybeSlug = h.replace(`.${appDomain}`, "");
    const bySlug = BUILT.find((s) => s.slug.toLowerCase() === maybeSlug);
    if (bySlug) return bySlug;
  }

  return null;
}
