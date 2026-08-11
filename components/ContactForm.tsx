"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { business } from "@/config/business";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ContactForm() {
  const [notice, setNotice] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setNotice(`El formulario está validado y preparado para conectar el servicio de correo. Mientras tanto, llámanos al ${business.phoneDisplay}.`);
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <label>Nombre <input name="name" autoComplete="name" required placeholder="Tu nombre" /></label>
        <label>Teléfono <input name="phone" type="tel" autoComplete="tel" required placeholder="Tu teléfono" pattern="[0-9+ ()-]{9,}" /></label>
      </div>
      <label>Email <input name="email" type="email" autoComplete="email" required placeholder="tu@email.com" /></label>
      <label>¿En qué podemos ayudarte?
        <select name="topic" defaultValue="" required>
          <option value="" disabled>Selecciona una opción</option>
          <option>Zapatillas de Trail</option>
          <option>Zapatillas de Running</option>
          <option>Ropa</option>
          <option>Material / accesorios</option>
          <option>Otra consulta</option>
        </select>
      </label>
      <label>Mensaje <textarea name="message" rows={4} required placeholder="Cuéntanos qué buscas, por dónde corres o qué dudas tienes" /></label>
      <label className="check"><input name="privacy" type="checkbox" required /><span>Acepto la <a href={`${basePath}/privacidad/`}>política de privacidad</a>.</span></label>
      <button className="button" type="submit">Enviar consulta <ArrowUpRight size={18} /></button>
      <p className="form-help">El envío requiere conectar un proveedor de correo. No se simulará ningún mensaje enviado.</p>
      {notice && <div className="form-notice" role="status"><CheckCircle2 size={18} />{notice}</div>}
    </form>
  );
}
