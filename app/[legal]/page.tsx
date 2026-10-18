import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Brand } from "@/components/Brand";
import { EmbedConsentControls } from "@/components/ConsentEmbed";
import { EMBED_CONSENT_KEY } from "@/components/embedConsent";
import { business } from "@/config/business";

const { legal } = business;
const mail = <a href={`mailto:${business.email}`}>{business.email}</a>;
const external = (href: string, label: string) => <a href={href} target="_blank" rel="noreferrer">{label}</a>;

const holder = (
  <ul>
    <li><b>Titular:</b> {legal.holder}, {legal.status}</li>
    <li><b>Nombre comercial:</b> {business.name}</li>
    <li><b>NIF:</b> {legal.taxId}</li>
    <li><b>Domicilio:</b> {legal.address}</li>
    <li><b>Correo electrónico:</b> {mail}</li>
    <li><b>Teléfono:</b> <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a></li>
  </ul>
);

type LegalDocument = { title: string; intro: ReactNode; sections: { heading: string; body: ReactNode }[] };

const documents: Record<string, LegalDocument> = {
  "aviso-legal": {
    title: "Aviso legal",
    intro: <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), se facilitan los datos identificativos del titular de este sitio web, {business.siteUrl.replace(/^https?:\/\//, "")}.</p>,
    sections: [
      { heading: "Titular del sitio web", body: <>{holder}<p>Actividad: {legal.activity.toLowerCase()}.</p></> },
      { heading: "Objeto y condiciones de uso", body: <><p>Este sitio web informa sobre la tienda física {business.name}, sus productos, servicios y eventos. No se realizan ventas ni contrataciones a través de la web.</p><p>Acceder a la web implica aceptar este aviso legal. Te comprometes a hacer un uso adecuado de los contenidos, sin emplearlos para actividades ilícitas ni contrarias a la buena fe, y sin dañar los sistemas del sitio ni de terceros.</p></> },
      { heading: "Información sobre productos", body: <p>Las referencias a productos, marcas y servicios son informativas y no constituyen una oferta vinculante. La disponibilidad, las tallas y los precios se confirman en la tienda o por teléfono.</p> },
      { heading: "Propiedad intelectual e industrial", body: <><p>Los textos, fotografías, vídeos, diseño y logotipo de {business.name} pertenecen a su titular o se usan con autorización. No pueden reproducirse, distribuirse ni transformarse sin permiso previo y por escrito.</p><p>Las marcas y logotipos de fabricantes que aparecen en la web pertenecen a sus respectivos titulares y se muestran solo para identificar los productos que se comercializan en la tienda.</p></> },
      { heading: "Enlaces a terceros", body: <p>La web incluye enlaces a redes sociales, Google Maps, plataformas de inscripción y otras páginas externas. {business.name} no controla esos sitios ni responde de sus contenidos ni de sus políticas de privacidad.</p> },
      { heading: "Responsabilidad", body: <p>El titular procura que la información sea correcta y esté actualizada, pero no garantiza la ausencia de errores ni interrupciones del servicio. Tampoco responde de los daños derivados de un uso indebido de la web. Los contenidos pueden modificarse sin previo aviso.</p> },
      { heading: "Legislación aplicable", body: <p>Este aviso legal se rige por la legislación española. Si eres consumidor, cualquier controversia se resolverá en los juzgados y tribunales de tu domicilio. En los demás casos, se aplicarán los de Huelva.</p> },
    ],
  },
  privacidad: {
    title: "Política de privacidad",
    intro: <p>Esta política explica cómo se tratan los datos personales de quienes contactan con {business.name} o visitan su web, conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</p>,
    sections: [
      { heading: "Responsable del tratamiento", body: holder },
      { heading: "Qué datos tratamos", body: <><p>Solo los datos que nos facilitas voluntariamente al contactar con nosotros por correo electrónico, teléfono, redes sociales o en la tienda. Por ejemplo: nombre, teléfono, correo electrónico y el contenido de tu consulta. Si haces un encargo o una compra, también los datos necesarios para gestionarlo y facturarlo.</p><p>El formulario de contacto de la web no envía ni guarda datos en nuestros servidores. Prepara un correo en tu aplicación y eres tú quien decide enviarlo.</p><p>Al visitar la web, el proveedor de alojamiento registra datos técnicos, como la dirección IP y el navegador, para servir las páginas y garantizar la seguridad del sitio.</p></> },
      { heading: "Finalidades y base jurídica", body: <ul><li><b>Atender consultas y preparar presupuestos</b>, como los de diseño personalizado: a petición tuya, para aplicar medidas precontractuales (art. 6.1.b RGPD).</li><li><b>Gestionar encargos, compras y garantías:</b> ejecución del contrato (art. 6.1.b RGPD).</li><li><b>Cumplir obligaciones fiscales y contables:</b> obligación legal (art. 6.1.c RGPD).</li><li><b>Mostrar el mapa de Google y las publicaciones de Instagram</b> cuando lo aceptas: tu consentimiento (art. 6.1.a RGPD).</li><li><b>Mantener la seguridad de la web:</b> interés legítimo (art. 6.1.f RGPD).</li></ul> },
      { heading: "Comunicaciones comerciales", body: <p>No enviamos publicidad por correo electrónico ni mensajería sin tu consentimiento previo. Tampoco elaboramos perfiles ni tomamos decisiones automatizadas con tus datos.</p> },
      { heading: "Plazo de conservación", body: <p>Las consultas se conservan el tiempo necesario para responderlas y, como máximo, un año desde el último contacto si no da lugar a una relación comercial. Los datos de encargos y facturas se conservan durante los plazos legales (hasta seis años, según el Código de Comercio y la normativa tributaria). Pasados esos plazos, se eliminan.</p> },
      { heading: "Destinatarios", body: <><p>No cedemos tus datos a terceros, salvo obligación legal, por ejemplo a la Agencia Tributaria. Para prestar el servicio usamos estos proveedores, que actúan como encargados del tratamiento:</p><ul><li><b>Google Ireland Ltd.</b> (correo electrónico Gmail).</li><li><b>Vercel Inc.</b> (alojamiento de la web).</li></ul><p>Estos proveedores pueden tratar datos fuera del Espacio Económico Europeo. En ese caso, las transferencias se amparan en el Marco de Privacidad de Datos UE-EE. UU. o en cláusulas contractuales tipo aprobadas por la Comisión Europea.</p></> },
      { heading: "Redes sociales", body: <p>Si interactúas con nuestros perfiles de Instagram o Facebook, también se aplican las condiciones y la política de privacidad de Meta Platforms Ireland Ltd. Solo usamos esos datos para responderte dentro de la propia red social.</p> },
      { heading: "Tus derechos", body: <><p>Puedes solicitar el acceso, la rectificación, la supresión, la oposición, la limitación del tratamiento y la portabilidad de tus datos, así como retirar en cualquier momento el consentimiento que hayas dado. Escribe a {mail}, o envía una carta al domicilio indicado, con el asunto «Protección de datos» e indicando el derecho que quieres ejercer.</p><p>Si consideras que no hemos atendido correctamente tu solicitud, puedes presentar una reclamación ante la Agencia Española de Protección de Datos ({external("https://www.aepd.es", "www.aepd.es")}).</p></> },
      { heading: "Menores de edad", body: <p>Los menores de 14 años necesitan el consentimiento de sus padres o tutores para facilitarnos datos personales.</p> },
      { heading: "Cambios en esta política", body: <p>Podemos actualizar esta política para adaptarla a cambios legales o del servicio. La fecha de la última revisión aparece al final de la página.</p> },
    ],
  },
  cookies: {
    title: "Política de cookies",
    intro: <p>Las cookies y tecnologías similares son pequeños archivos o datos que un sitio web guarda en tu navegador. Esta política explica cuáles se usan aquí, conforme al artículo 22.2 de la LSSI-CE y a la guía sobre cookies de la Agencia Española de Protección de Datos.</p>,
    sections: [
      { heading: "Cookies propias", body: <><p>Esta web no utiliza cookies propias de analítica, publicidad ni seguimiento. Solo guarda en tu navegador un dato técnico para recordar si has aceptado ver contenidos de terceros:</p><ul><li><b>{EMBED_CONSENT_KEY}</b> (almacenamiento local, propio): recuerda qué contenidos externos has decidido mostrar. Se conserva hasta que retiras el consentimiento o borras los datos del navegador.</li></ul><p>Por ser necesario para respetar tu elección, este dato no requiere consentimiento.</p></> },
      { heading: "Contenidos de terceros", body: <><p>El mapa de Google Maps y las publicaciones de Instagram aparecen bloqueados hasta que pulsas el botón para mostrarlos. Al hacerlo, esos servicios pueden instalar sus propias cookies y recibir datos como tu dirección IP. Su uso se rige por las políticas de cada proveedor:</p><ul><li><b>Google Maps</b>, de Google Ireland Ltd.: {external("https://policies.google.com/technologies/cookies?hl=es", "política de cookies de Google")}.</li><li><b>Instagram</b>, de Meta Platforms Ireland Ltd.: {external("https://privacycenter.instagram.com/policies/cookies/", "política de cookies de Instagram")}.</li></ul><p>Los enlaces a Instagram, Facebook, Google y otras webs solo te llevan a esas páginas. No instalan nada en este sitio.</p></> },
      { heading: "Gestionar tu consentimiento", body: <><EmbedConsentControls /><p>También puedes bloquear o eliminar cookies desde la configuración de tu navegador: {external("https://support.google.com/chrome/answer/95647?hl=es", "Chrome")}, {external("https://support.mozilla.org/es/kb/Borrar%20cookies", "Firefox")}, {external("https://support.apple.com/es-es/guide/safari/sfri11471/mac", "Safari")} o {external("https://support.microsoft.com/es-es/microsoft-edge/eliminar-las-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09", "Edge")}.</p></> },
    ],
  },
};

export function generateStaticParams() { return Object.keys(documents).map((legal) => ({ legal })); }

export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const { legal } = await params;
  const doc = documents[legal];
  return doc ? { title: `${doc.title} | ${business.name}`, robots: { index: false } } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ legal: string }> }) {
  const { legal: slug } = await params;
  const doc = documents[slug];
  if (!doc) notFound();
  return (
    <main className="legal-page">
      <div className="legal-page__top"><Brand /><Link href="/">Volver a la web ↗</Link></div>
      <article>
        <h1>{doc.title}</h1>
        <div className="legal-page__intro">{doc.intro}</div>
        {doc.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.body}</section>)}
        <hr />
        <small>Última revisión: {legal.lastReview}.</small>
      </article>
    </main>
  );
}
