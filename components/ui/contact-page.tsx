"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/ui/navbar";
import { Mail, MapPin, Receipt, ArrowRight } from "lucide-react";

export function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({ naam: "", email: "", onderwerp: "", bericht: "" });
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.naam.trim() || !form.email.trim() || !form.bericht.trim()) {
      setError("Vul alle verplichte velden in.");
      return;
    }

    setIsSending(true);
    setError("");

    try {
      const emailjs = (await import("@emailjs/browser")).default;
      await emailjs.send(
        "EmailVIH",
        "template_a69qiqd",
        {
          from_name: form.naam.trim(),
          from_email: form.email.trim(),
          subject: form.onderwerp.trim() || "Nieuwe contactaanvraag",
          message: form.bericht.trim(),
        },
        { publicKey: "zsAHVDd_EhMFKIEcy" }
      );
      router.push("/bedankt");
    } catch (err: any) {
      console.error("EmailJS error:", err);
      const detail = err?.text || err?.message || JSON.stringify(err);
      setError(`Fout: ${detail}`);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background image */}
      <Image
        src="/afbeeldingen/ContactAfbeelding.png"
        alt="Contact"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/30" />

      {/* Navbar */}
      <div className="relative z-20">
        <Navbar variant="overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-16 pb-20 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">

          {/* LEFT — info */}
          <div className="flex flex-col gap-6 pt-6">
            {/* Handwritten callout */}
            <div className="font-[family-name:var(--font-caveat)] text-white text-2xl leading-snug">
              Hey! 👋<br />
              Wil je een website<br />
              bouwen?
              <svg className="mt-1 ml-2" width="40" height="30" viewBox="0 0 40 30" fill="none">
                <path d="M2 2 Q20 0 30 15 Q35 22 28 28" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
                <path d="M24 26 L28 28 L26 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Contact</p>

            <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
              Laten we samen<br />
              <span className="text-[#7C6BFF]">iets bouwen.</span>
            </h1>

            <p className="text-sm text-white/70 max-w-xs leading-relaxed">
              Heb je een idee, project of vraag?<br />
              We luisteren graag en denken met je mee.
            </p>

            {/* Contact info */}
            <div className="flex flex-col gap-3 mt-2">
              {[
                { icon: Mail, label: "E-mail", value: "support@vancoilliestudio.be" },
                { icon: MapPin, label: "Locatie", value: "Roeselare, België" },
                { icon: Receipt, label: "BTW", value: "BE 1014.303.066" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur-md px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
                    <Icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/50">{label}</p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { label: "Instagram", href: "https://www.instagram.com/vancoilliestudio/", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
                { label: "X", href: "https://x.com/vancstudio", path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.532-8.502L1.264 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/batiste-vancoillie-622562291/", path: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" },
                { label: "Portfolio", href: "https://batistevancoillie.be/", path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" },
              ].map(({ label, href, path }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 transition-colors"
                  title={label}>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — form (shifted down) */}
          <div className="mt-16 lg:mt-32">
            <form onSubmit={handleSubmit} className="rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 p-6 md:p-8 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Naam"
                  value={form.naam}
                  onChange={e => setForm({ ...form, naam: e.target.value })}
                  required
                  className="rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50 backdrop-blur-sm"
                />
                <input
                  type="email"
                  placeholder="E-mailadres"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                  className="rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50 backdrop-blur-sm"
                />
              </div>
              <input
                type="text"
                placeholder="Onderwerp"
                value={form.onderwerp}
                onChange={e => setForm({ ...form, onderwerp: e.target.value })}
                className="rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50 backdrop-blur-sm"
              />
              <textarea
                placeholder="Je bericht"
                rows={6}
                value={form.bericht}
                onChange={e => setForm({ ...form, bericht: e.target.value })}
                required
                className="rounded-xl bg-white/20 border border-white/20 px-4 py-3 text-sm text-white placeholder-white/50 outline-none focus:border-white/50 backdrop-blur-sm resize-none"
              />
              {error && <p className="text-xs text-red-300">{error}</p>}
              <button
                type="submit"
                disabled={isSending}
                className="flex items-center justify-between rounded-xl bg-white px-6 py-4 text-sm font-semibold text-neutral-900 hover:bg-white/90 transition-colors disabled:opacity-60"
              >
                {isSending ? "Versturen..." : "Verstuur bericht"}
                <ArrowRight className="h-4 w-4" />
              </button>
              <p className="text-xs text-white/40 text-center">✓ We antwoorden meestal binnen 24 uur.</p>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
