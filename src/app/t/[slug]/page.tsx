/* eslint-disable @typescript-eslint/no-explicit-any */
import { resolveBySlug } from "@/lib/sites";
import { loadSiteData } from "@/lib/sheets";

import Ana from "@/clients/ana/template";

const TEMPLATES: Record<string, any> = {
  ana: Ana,
};

export default async function ClientSite({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const site = resolveBySlug(slug);
  console.log("SITE:", site);

  if (!site) return <div className="p-8">Site não encontrado.</div>;

  let data: any;
  try {
    data = await loadSiteData(site.sheetId, site.revalidateSeconds, [
      "config",
      "services",
    ]);
  } catch {
    data = { config: {}, tabs: {} };
  }
  console.log("DATA:", data);

  const templateKey = site.template || site.slug;
  const Template = TEMPLATES[templateKey] ?? null;

  if (!Template) return <div className="p-8">Template não encontrado.</div>;

  return (
    <div className="min-h-screen ">
      <Template data={data} />
    </div>
  );
}
