# Contexto técnico de IBHOLA

Este documento sirve como mapa del proyecto para futuras modificaciones. La rama de desarrollo y producción es `main`; `gh-pages` contiene únicamente la exportación estática generada automáticamente y no debe editarse a mano.

## Tecnología y comandos

- Next.js 15 con App Router, React 19 y TypeScript.
- Estilos globales en `app/globals.css`; Tailwind está importado, pero el diseño actual utiliza principalmente CSS propio con metodología BEM.
- Iconos generales: `lucide-react`. Los logotipos de Instagram y Facebook son SVG propios en `components/SocialIcons.tsx`.
- Desarrollo: `npm run dev`.
- Verificación obligatoria antes de publicar: `npm run build`.
- Docker publica localmente en `http://localhost:8183`.

## Estructura de rutas

- `app/layout.tsx`: layout raíz, metadatos generales, color del navegador y `SiteEnhancements` global.
- `app/page.tsx`: portada y datos estructurados Schema.org. Renderiza `HomePage`.
- `app/catalogo/page.tsx`: catálogo de productos.
- `app/eventos/page.tsx`: eventos próximos y anteriores.
- `app/preguntas-frecuentes/page.tsx`: FAQ y formulario de contacto.
- `app/que-hacemos/page.tsx`: explicación de servicios.
- `app/[legal]/page.tsx`: rutas dinámicas estáticas para aviso legal, privacidad y cookies.
- `app/robots.ts` y `app/sitemap.ts`: SEO técnico generado por Next.js.
- `app/icon.svg`: favicon.

Las páginas interiores reutilizan `components/InteriorPage.tsx`, que aporta navbar, hero interior, observador de animaciones y footer.

## Portada

La composición principal está en `components/HomePage.tsx`, en este orden:

1. `LaunchScreen`, `RevealObserver` y `Header`.
2. Hero `#inicio` con imagen `hero-guadiana-junio-2025.webp`.
3. Franja de principios y valoración de Google.
4. Presentación / quiénes somos `#presentacion`.
5. Servicios `#que-hacemos`.
6. Reseñas `#opiniones`.
7. Sección social con imagen, accesos a Instagram/Facebook y embed oficial de Instagram.
8. Contacto y mapa `#contacto`.
9. `SiteFooter`.

La sección social no aparece en la navegación principal. El embed de Instagram usa `https://www.instagram.com/ibhola/embed/`. Facebook permite abrir su perfil, pero su widget oficial devuelve `has_posts: false`; no intentar mostrar una cronología automática sin configurar Meta Graph API.

## Componentes compartidos

- `Header.tsx`: navbar fijo, dropdown del catálogo, estado al hacer scroll y menú móvil.
- `Brand.tsx`: logotipo enlazado al inicio; admite variante de footer.
- `SiteFooter.tsx`: navegación secundaria, contacto, redes y barra de acciones móvil.
- `LaunchScreen.tsx`: animación del logotipo. Está montada únicamente en `HomePage`; debe aparecer cada vez que se carga o se vuelve a Inicio, nunca en páginas interiores. Su visibilidad se controla con estados React (`visible`, `leaving`, `hidden`).
- `Reveal.tsx`: `IntersectionObserver` para elementos `.reveal` y cálculo de la variable `--hero-scroll` usada en el parallax.
- `SiteEnhancements.tsx`: transición entre rutas internas y botón flotante para volver arriba.
- `InteriorPage.tsx`: estructura común de páginas interiores.
- `ProductCatalog.tsx`: datos, filtros y tarjetas del catálogo.
- `ContactForm.tsx`: formulario validado por campo. Prepara un `mailto:`; no existe backend ni almacenamiento de mensajes.
- `Topography.tsx`: líneas topográficas SVG decorativas.
- `SocialIcons.tsx`: logotipos SVG de Instagram y Facebook.

## Sistema visual y CSS

Todo el diseño está centralizado en `app/globals.css`, organizado por comentarios: apertura, header, hero, principios, presentación/servicios, catálogo, galería, reseñas, redes, eventos, FAQ, contacto, footer, legales, navegación multipágina y superficies verdes.

### Fondo

- El fondo verde es global y continuo: está definido en `body` mediante dos halos radiales y un gradiente negro–pistacho.
- Las secciones principales son transparentes para evitar que el patrón se reinicie y produzca un efecto de piezas de puzle.
- No añadir fondos completos independientes a una sección salvo que el diseño lo requiera expresamente.
- Las tarjetas, campos, mapa y widgets sí pueden mantener superficies propias por legibilidad.

### Colores principales

- Verde base: `--forest: #95c653`.
- Verde profundo: `--forest-deep: #18231f`.
- Acción pistacho: `--pistachio-action: #c9f27c`.
- Hover de acción: `--pistachio-action-hover: #ddff9f`.
- Terracota permanece para algunos acentos editoriales, pero no debe usarse como fondo de botones principales.
- Los botones pistacho usan texto oscuro para conservar contraste.

### Animaciones e interacción

- `.reveal` controla entradas suaves al hacer scroll.
- El hero tiene entrada escalonada de texto e imagen.
- `LaunchScreen` controla la animación inicial del logo solo en Inicio.
- `SiteEnhancements` añade salida suave al navegar y el botón “Arriba”.
- Botones, enlaces, tarjetas y elementos interactivos tienen hover/active.
- Se respeta `prefers-reduced-motion` en `globals.css` y en la pantalla de entrada.
- No aplicar `transform` ni animaciones al elemento `body`: en el pasado alteró el posicionamiento fijo de `LaunchScreen`. Las transiciones de página deben afectar solo a header, main y footer.

## Datos editables

`config/business.ts` es la fuente única para:

- Nombre comercial y descripción.
- Dirección, teléfono y correo.
- Horarios.
- Instagram y Facebook.
- URLs de Google Maps y reseñas.
- Valoración y número de reseñas.
- URL pública del sitio.

No duplicar estos datos directamente en componentes cuando puedan leerse desde `business`.

## Imágenes

Los recursos están en `public/images/`. Las rutas pasan por el helper `imagePath` en los componentes que necesitan soportar el prefijo de GitHub Pages. Al añadir una imagen, utilizar `next/image`, texto alternativo descriptivo y `sizes` apropiado.

## Variables de entorno y rutas base

- `NEXT_PUBLIC_SITE_URL`: dominio público utilizado en metadatos, sitemap y Schema.org.
- `BUILD_TARGET=static`: activa `output: "export"`.
- `NEXT_PUBLIC_BASE_PATH=/ibhola`: prefijo requerido para GitHub Pages.

`next.config.ts` activa exportación estática, `trailingSlash`, `basePath`, `assetPrefix` e imágenes sin optimización cuando `BUILD_TARGET=static`. En Vercel usa salida `standalone` y no aplica prefijo.

## Despliegues y ramas

### Vercel

- Rama de producción: `main`.
- `vercel.json` desactiva despliegues de la rama `gh-pages`.
- Vercel debe compilar desde la raíz con el preset Next.js.

### GitHub Pages

- `.github/workflows/pages.yml` se ejecuta al hacer push a `main`.
- Compila con `BUILD_TARGET=static`, genera `out/index.html`, añade `.nojekyll` y publica forzosamente el resultado en `gh-pages`.
- URL: `https://caporrfer.github.io/ibhola/`.
- En GitHub Pages la fuente debe ser la rama `gh-pages`, carpeta `/(root)`.
- Nunca desarrollar ni fusionar código fuente dentro de `gh-pages`; es una rama de artefactos reemplazable.

## Reglas para futuras modificaciones

1. Trabajar siempre sobre `main`.
2. Reutilizar componentes, variables CSS y `config/business.ts` antes de duplicar código.
3. Mantener el fondo global continuo y el contraste de textos.
4. No mover `LaunchScreen` al layout global: solo pertenece a Inicio.
5. No integrar feeds sociales mediante scraping ni credenciales expuestas.
6. Ejecutar `git diff --check` y `npm run build` antes de crear el commit.
7. Subir únicamente cambios relacionados; el workflow actualizará `gh-pages` automáticamente.
