/* eslint-disable @typescript-eslint/no-explicit-any */
import { resolveBySlug } from "@/lib/sites";
import { loadSiteData } from "@/lib/sheets";

import Ana from "@/clients/ana/template";
import FTPericiasMedicas from "@/clients/ftpericiasmedicas/template";
import FTPericiasMedicas2 from "@/clients/ftpericiasmedicas2/template";
import FTPericiasMedicas3 from "@/clients/ftpericiasmedicas3/template";
import Psicologa from "@/clients/psicologa/template";
import LayNunes from "@/clients/laynunes/template";
const TEMPLATES: Record<string, any> = {
  ana: Ana,
  ftpericiasmedicas: FTPericiasMedicas,
  ftpericiasmedicas2: FTPericiasMedicas2,
  ftpericiasmedicas3: FTPericiasMedicas3,

  psicologa: Psicologa,
  laynunes: LayNunes,
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
