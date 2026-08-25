import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Brand } from "@/components/Brand";
import { business, fullAddress } from "@/config/business";

const documents = {
  "aviso-legal": {
    title: "Aviso legal",
    text: "Esta página identifica a IBHOLA Trail Running como responsable del sitio. Antes de publicar la web en su dominio definitivo deberán incorporarse los datos fiscales del titular que no han sido facilitados (razón social completa y NIF/CIF).",
  },
  privacidad: {
    title: "Política de privacidad",
    text: "Los datos introducidos en el formulario no se envían ni almacenan actualmente porque el servicio de correo aún no está conectado. Cuando se habilite, esta política deberá completarse con la identidad fiscal del responsable, base jurídica, plazo de conservación y canal para ejercer derechos.",
  },
  cookies: {
    title: "Política de cookies",
    text: "Este sitio no instala cookies publicitarias ni de analítica. El mapa integrado de Google puede cargar recursos de terceros al mostrarse; conviene revisar y adaptar esta política si se añaden herramientas de analítica, marketing o un gestor de consentimiento.",
  },
} as const;

export function generateStaticParams() { return Object.keys(documents).map((legal) => ({ legal })); }

export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const { legal } = await params;
  const doc = documents[legal as keyof typeof documents];
  return doc ? { title: `${doc.title} | ${business.name}`, robots: { index: false } } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ legal: string }> }) {
  const { legal } = await params;
  const doc = documents[legal as keyof typeof documents];
  if (!doc) notFound();
  return (
    <main className="legal-page">
      <div className="legal-page__top"><Brand /><Link href="/">Volver a la web ↗</Link></div>
      <article><h1>{doc.title}</h1><p>{doc.text}</p><hr /><h2>Datos de contacto publicados</h2><p>{business.name}<br />{fullAddress}<br />Tel. {business.phoneDisplay}<br />{business.email}</p><small>Última revisión: agosto de 2026.</small></article>
    </main>
  );
}
