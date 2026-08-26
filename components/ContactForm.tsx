"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, MailCheck } from "lucide-react";
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
    const data = new FormData(form);
    const subject = `Consulta web: ${data.get("topic")}`;
    const body = [
      `Nombre: ${data.get("name")}`,
      `Teléfono: ${data.get("phone")}`,
      `Email: ${data.get("email")}`,
      "",
      String(data.get("message")),
    ].join("\n");
    setNotice("Tu aplicación de correo se abrirá con la consulta preparada. Revísala y pulsa enviar.");
    window.location.href = `mailto:${business.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
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
      <button className="button" type="submit">Preparar correo <ArrowUpRight size={18} /></button>
      <p className="form-help">La consulta no se almacena en esta web: se enviará desde tu aplicación de correo.</p>
      {notice && <div className="form-notice" role="status"><MailCheck size={18} />{notice}</div>}
    </form>
  );
}
