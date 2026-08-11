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

## Configuración del negocio

Los datos editables están centralizados en `config/business.ts`: dirección, teléfono, horarios, redes, enlaces de Google Maps, reseñas y URL base.

Antes de publicar en un dominio real:

1. Definir `NEXT_PUBLIC_SITE_URL` con el dominio HTTPS definitivo.
2. Completar los datos fiscales en las páginas legales.
3. Conectar `app/api/contact/route.ts` con el proveedor de correo elegido.
4. Revisar los horarios especiales o festivos.

El formulario valida todos los campos, pero no simula envíos mientras no exista un proveedor de correo configurado.
