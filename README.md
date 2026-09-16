# IBHOLA Trail Running

Web corporativa y escaparate para IBHOLA Trail Running, desarrollada con Next.js, React, TypeScript y Tailwind CSS.

## Desarrollo local

```bash
npm install
npm run dev
```

## Docker

```bash
docker compose up -d --build
docker compose logs -f
```

La web queda publicada en `http://localhost:8183`.

El contenedor sirve la aplicación con Node.js 22. Para publicar en producción hay que
definir `NEXT_PUBLIC_SITE_URL` con la URL HTTPS definitiva; si no se define durante un
build de producción, la aplicación usa `https://www.ibholahuelva.es`. En desarrollo se
mantiene `http://localhost:8183` como valor predeterminado.

Next.js añade las cabeceras de seguridad de las respuestas cuando se ejecuta con el
servidor standalone. Si el proxy inverso (por ejemplo, Caddy) también las configura,
mantén una única capa como autoridad para evitar valores duplicados o contradictorios.

La versión estática se genera automáticamente con GitHub Actions. El workflow crea `out/index.html` y actualiza la rama `gh-pages`.

Para activar la URL pública por primera vez, abre **Settings → Pages**, selecciona **Deploy from a branch**, rama **gh-pages** y carpeta **/(root)**. Después quedará disponible en `https://caporrfer.github.io/ibhola/` y las siguientes publicaciones serán automáticas.

## Configuración del negocio

Los datos editables están centralizados en `config/business.ts`: dirección, teléfono, horarios, redes, enlaces de Google Maps, reseñas y URL base.

Antes de publicar en un dominio real:

1. Definir `NEXT_PUBLIC_SITE_URL` con el dominio HTTPS definitivo (aunque exista el
   valor predeterminado de producción, la variable deja explícita la configuración del
   contenedor).
2. Completar los datos fiscales en las páginas legales.
3. Conectar `components/ContactForm.tsx` con el proveedor de correo o backend elegido
   si se desea sustituir el comportamiento actual basado en `mailto:`.
4. Revisar los horarios especiales o festivos.

El formulario valida todos los campos, pero no simula envíos mientras no exista un proveedor de correo configurado.
