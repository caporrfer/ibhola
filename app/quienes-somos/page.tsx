import Image from "next/image";
import { InteriorPage } from "@/components/InteriorPage";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const metadata = { title: "Quiénes somos | IBHOLA Trail Running" };
export default function Page() { return <InteriorPage eyebrow="Quiénes somos" title="Muchos años corriendo. Ahora, también a tu lado." intro="IBHOLA nace de la experiencia real sobre asfalto y montaña y de las ganas de ofrecer el tipo de atención que todo corredor agradece.">
  <section className="content-section"><div className="container split-content"><div><h2>Sabemos lo que se siente al empezar, volver o querer mejorar.</h2><p>El propietario de IBHOLA lleva muchos años corriendo, probando material y aprendiendo en entrenamientos y carreras. Esa experiencia permite entender mejor qué buscas y explicarte cada opción de forma clara.</p><p>Aquí no importa tu ritmo ni cuántos dorsales tengas. Atendemos con el mismo cuidado a quien compra sus primeras zapatillas y a quien prepara una competición exigente.</p><p>Nuestro compromiso es sencillo: trato profesional, atención cercana y recomendaciones que tengan sentido para ti.</p></div><div className="content-image"><Image src={`${basePath}/images/corredor.webp`} alt="Corredor de IBHOLA en carrera" fill sizes="(max-width: 800px) 100vw, 50vw" /></div></div></section>
</InteriorPage>; }
