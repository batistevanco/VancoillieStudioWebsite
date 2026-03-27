"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaGithub, FaInstagram } from "react-icons/fa";
import { FaGlobe, FaTiktok, FaXTwitter } from "react-icons/fa6";
import { Globe, Mail, MapPin, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCopy } from "@/lib/i18n";
import { getLocalizedPath, type Locale } from "@/lib/routes";

interface ContactSectionProps {
  locale?: Locale;
}

const socialLinks = [
  {
    id: "github",
    name: "GitHub",
    href: "https://github.com/batistevanco?tab=repositories",
    icon: FaGithub,
  },
  {
    id: "instagram",
    name: "Instagram",
    href: "https://www.instagram.com/vancoilliestudio/",
    icon: FaInstagram,
  },
  {
    id: "tiktok",
    name: "TikTok",
    href: "https://www.tiktok.com/@vancoillieracing",
    icon: FaTiktok,
  },
  {
    id: "portfolio",
    name: "Portfolio",
    href: "https://batistevancoillie.be/",
    icon: FaGlobe,
  },
  {
    id: "x",
    name: "X",
    href: "https://x.com/vancstudio",
    icon: FaXTwitter,
  },
] as const;

export function ContactSection({ locale = "nl" }: ContactSectionProps) {
  const router = useRouter();
  const content = getCopy(locale).contact;
  const [isSending, setIsSending] = React.useState(false);
  const [status, setStatus] = React.useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        type: "error",
        message: content.errors.required,
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: null, message: "" });

    try {
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.send(
        "EmailVIH",
        "template_a69qiqd",
        {
          from_name: formData.name.trim(),
          from_email: formData.email.trim(),
          subject: "Nieuwe contactaanvraag",
          message: formData.message.trim(),
        },
        {
          publicKey: "zsAHVDd_EhMFKIEcy",
        },
      );

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      router.push(getLocalizedPath(locale, "thankYou"));
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({
        type: "error",
        message: content.errors.generic,
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.08),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.08),_transparent_28%)]"
      />
      <div className="relative mx-auto max-w-[1280px] px-4">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div className="flex flex-col justify-between gap-10">
            <div className="max-w-xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand">
                {content.detailsTitle}
              </p>
              <h1 className="text-4xl font-semibold tracking-[-0.05em] text-zinc-950 md:text-6xl md:leading-[0.95]">
                {content.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-zinc-600">
                {content.description}
              </p>
              <p className="mt-4 text-sm leading-7 text-zinc-500 md:text-base">
                {content.helper}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[24px] border border-border/70 bg-[#f7f9fc] p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Mail className="h-5 w-5" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {content.labels.email}
                </p>
                <a
                  href={`mailto:${content.details.email}`}
                  className="text-base font-medium text-zinc-950 underline-offset-4 hover:underline"
                >
                  {content.details.email}
                </a>
              </div>

              <div className="rounded-[24px] border border-border/70 bg-[#f7f9fc] p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <MapPin className="h-5 w-5" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {content.labels.location}
                </p>
                <p className="text-base font-medium text-zinc-950">
                  {content.details.location}
                </p>
              </div>

              <div className="rounded-[24px] border border-border/70 bg-[#f7f9fc] p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Building2 className="h-5 w-5" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {content.labels.vat}
                </p>
                <p className="text-base font-medium text-zinc-950">
                  {content.details.vat}
                </p>
              </div>

              <div className="rounded-[24px] border border-border/70 bg-[#f7f9fc] p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <Globe className="h-5 w-5" />
                </div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {content.labels.web}
                </p>
                <a
                  href={content.details.web.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-medium text-zinc-950 underline-offset-4 hover:underline"
                >
                  {content.details.web.label}
                </a>
              </div>
            </div>

            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {content.socialTitle}
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Button
                      key={link.id}
                      asChild
                      variant="outline"
                      className="rounded-full border-border/70 bg-white px-4"
                    >
                      <a href={link.href} target="_blank" rel="noreferrer">
                        <Icon className="mr-2 h-4 w-4" />
                        {link.name}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-border/70 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)] md:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
                {content.mainMessage}
              </h2>
              <p className="mt-2 text-sm leading-7 text-zinc-500">
                {content.helper}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{content.labels.name}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={content.placeholders.name}
                  value={formData.name}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-border/70 bg-[#f9fbff]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{content.labels.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={content.placeholders.email}
                  value={formData.email}
                  onChange={handleChange}
                  className="h-12 rounded-xl border-border/70 bg-[#f9fbff]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{content.labels.message}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={content.placeholders.message}
                  className="min-h-[140px] rounded-2xl border-border/70 bg-[#f9fbff]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSending}
                className="h-12 w-full rounded-xl bg-zinc-950 text-white hover:bg-zinc-800"
              >
                {isSending ? content.button.sending : content.button.idle}
              </Button>

              {status.type ? (
                <p
                  className={
                    status.type === "success"
                      ? "text-sm text-green-600"
                      : "text-sm text-red-600"
                  }
                >
                  {status.message}
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
