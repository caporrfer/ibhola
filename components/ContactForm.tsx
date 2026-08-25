"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, MailCheck } from "lucide-react";
import { business } from "@/config/business";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ContactForm() {
  const [notice, setNotice] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function errorFor(field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
    if (field.validity.valueMissing) return field.type === "checkbox" ? "Debes aceptar la política de privacidad." : "Este campo es obligatorio.";
    if (field.validity.typeMismatch) return "Introduce una dirección de correo válida.";
    if (field.validity.patternMismatch) return "Introduce un teléfono válido de al menos 9 cifras.";
    return "";
  }

  function validateField(field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
    const message = errorFor(field);
    setErrors((current) => ({ ...current, [field.name]: message }));
    return !message;
  }

  function handleFieldEvent(target: EventTarget, onlyWhenInvalid = false) {
    if (!(target instanceof HTMLInputElement || target instanceof HTMLSelectElement || target instanceof HTMLTextAreaElement)) return;
    if (!onlyWhenInvalid || errors[target.name]) validateField(target);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Array.from(form.elements).filter((element): element is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement => element instanceof HTMLInputElement || element instanceof HTMLSelectElement || element instanceof HTMLTextAreaElement);
    if (!fields.map(validateField).every(Boolean)) {
      fields.find((field) => !field.validity.valid)?.focus();
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
    <form className="contact-form" onSubmit={submit} noValidate onBlur={(event) => handleFieldEvent(event.target)} onInput={(event) => handleFieldEvent(event.target, true)}>
      <div className="form-grid">
        <label>Nombre <input name="name" autoComplete="name" required placeholder="Tu nombre" aria-invalid={Boolean(errors.name)} aria-describedby="name-error" />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</label>
        <label>Teléfono <input name="phone" type="tel" autoComplete="tel" required placeholder="Tu teléfono" pattern="[0-9+ ()-]{9,}" aria-invalid={Boolean(errors.phone)} aria-describedby="phone-error" />{errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}</label>
      </div>
      <label>Email <input name="email" type="email" autoComplete="email" required placeholder="tu@email.com" aria-invalid={Boolean(errors.email)} aria-describedby="email-error" />{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</label>
      <label>¿En qué podemos ayudarte?
        <select name="topic" defaultValue="" required aria-invalid={Boolean(errors.topic)} aria-describedby="topic-error">
          <option value="" disabled>Selecciona una opción</option>
          <option>Zapatillas de Trail</option>
          <option>Zapatillas de Running</option>
          <option>Ropa</option>
          <option>Material / accesorios</option>
          <option>Otra consulta</option>
        </select>{errors.topic && <span className="field-error" id="topic-error">{errors.topic}</span>}
      </label>
      <label>Mensaje <textarea name="message" rows={4} required placeholder="Cuéntanos qué buscas, por dónde corres o qué dudas tienes" aria-invalid={Boolean(errors.message)} aria-describedby="message-error" />{errors.message && <span className="field-error" id="message-error">{errors.message}</span>}</label>
      <label className="check"><input name="privacy" type="checkbox" required aria-invalid={Boolean(errors.privacy)} aria-describedby="privacy-error" /><span>Acepto la <a href={`${basePath}/privacidad/`}>política de privacidad</a>.{errors.privacy && <span className="field-error" id="privacy-error">{errors.privacy}</span>}</span></label>
      <button className="button" type="submit">Preparar correo <ArrowUpRight size={18} /></button>
      <p className="form-help">La consulta no se almacena en esta web: se enviará desde tu aplicación de correo.</p>
      {notice && <div className="form-notice" role="status"><MailCheck size={18} />{notice}</div>}
    </form>
  );
}
