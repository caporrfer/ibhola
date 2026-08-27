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

La versión estática se genera automáticamente con GitHub Actions. El workflow crea `out/index.html` y actualiza la rama `gh-pages`.

La valoración de Google se consulta de forma segura durante cada despliegue y una vez al día. Para activarla, habilita **Places API (New)** en Google Cloud y añade estos secretos en **GitHub → Settings → Secrets and variables → Actions**:

- `GOOGLE_PLACES_API_KEY`: clave restringida exclusivamente a Places API (New).
- `GOOGLE_PLACE_ID`: identificador de la ficha de IBHOLA en Google Maps.

Si faltan las credenciales o Google no responde, la web mantiene automáticamente la valoración de fallback guardada en `config/google-reviews.generated.json`; la clave nunca se incluye en el frontend ni en la exportación estática.

Para activar la URL pública por primera vez, abre **Settings → Pages**, selecciona **Deploy from a branch**, rama **gh-pages** y carpeta **/(root)**. Después quedará disponible en `https://caporrfer.github.io/ibhola/` y las siguientes publicaciones serán automáticas.

## Configuración del negocio

Los datos editables están centralizados en `config/business.ts`: dirección, teléfono, horarios, redes, enlaces de Google Maps, reseñas y URL base.

Antes de publicar en un dominio real:

1. Definir `NEXT_PUBLIC_SITE_URL` con el dominio HTTPS definitivo.
2. Completar los datos fiscales en las páginas legales.
3. Conectar `components/ContactForm.tsx` con el proveedor de correo o backend elegido.
4. Revisar los horarios especiales o festivos.

El formulario valida todos los campos, pero no simula envíos mientras no exista un proveedor de correo configurado.
