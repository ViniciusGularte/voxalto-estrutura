/* eslint-disable @typescript-eslint/no-explicit-any */
function getByPath(obj: any, path: string) {
  return path
    .split(".")
    .reduce((acc, k) => (acc == null ? undefined : acc[k]), obj);
}

function normalizeWA(v: string) {
  const digits = String(v || "").replace(/\D/g, "");
  return digits ? `https://wa.me/${digits}` : "#";
}

export function makeCtx(data: any) {
  return {
    // config
    cfg: (key: string, fallback = "") => {
      const v = getByPath(data, `config.${key}`);
      const out = String(v ?? "").trim();
      return out || fallback;
    },

    link: (key: string, fallback = "") => {
      const v = getByPath(data, `config.${key}`);
      const out = String(v ?? "").trim();
      return out || fallback;
    },

    img: (key: string, fallback = "") => {
      const v = getByPath(data, `config.${key}`);
      const out = String(v ?? "").trim();
      return out || fallback;
    },

    wa: (key: string, fallback = "") => {
      const v = getByPath(data, `config.${key}`);
      const raw = String(v ?? "").trim() || fallback;
      return normalizeWA(raw);
    },

    // tabs
    tab: (name: string, fallback: any[] = []) => {
      const rows = Array.isArray(data?.tabs?.[name]) ? data.tabs[name] : [];
      const active = rows.filter(
        (r: any) => String(r?.ativo ?? "1").trim() !== "0",
      );
      const sorted = [...active].sort((a: any, b: any) => {
        const aa = Number(a?.ordem ?? 9999);
        const bb = Number(b?.ordem ?? 9999);
        return aa - bb;
      });

      return sorted.length ? sorted : fallback;
    },

    // row
    col: (item: any, field: string, fallback = "") => {
      const out = String(item?.[field] ?? "").trim();
      return out || fallback;
    },
  };
}
