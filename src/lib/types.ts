export type KVConfig = Record<string, string>;
export type TabRows = Record<string, string>[];

export type SiteData = {
  config: KVConfig; // aba "config" (key/value)
  tabs: Record<string, TabRows>; // qualquer outra aba vira array de objetos
};
