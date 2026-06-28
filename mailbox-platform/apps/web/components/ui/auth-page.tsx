"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react";

export interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

interface AuthPageProps {
  mode: "login" | "signup";
  title: React.ReactNode;
  description: React.ReactNode;
  heroImageSrc?: string;
  testimonials?: Testimonial[];
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  errorMessage?: string;
  statusMessage?: string;
  isSubmitting?: boolean;
}

const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-[1.35rem] border border-white/70 bg-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] backdrop-blur-xl transition-all focus-within:border-slate-950/30 focus-within:bg-white/75 focus-within:ring-4 focus-within:ring-slate-950/[0.06]">
    {children}
  </div>
);

const TestimonialCard = ({
  testimonial,
  delay,
}: {
  testimonial: Testimonial;
  delay: string;
}) => (
  <div
    className={`animate-testimonial ${delay} flex w-64 items-start gap-3 rounded-[1.6rem] border border-white/35 bg-white/45 p-5 shadow-soft-panel backdrop-blur-2xl`}
  >
    <img
      src={testimonial.avatarSrc}
      className="h-10 w-10 rounded-2xl object-cover"
      alt=""
    />
    <div className="text-sm leading-snug">
      <p className="font-medium text-slate-950">{testimonial.name}</p>
      <p className="text-slate-500">{testimonial.handle}</p>
      <p className="mt-1 text-slate-700">{testimonial.text}</p>
    </div>
  </div>
);

export const AuthPage: React.FC<AuthPageProps> = ({
  mode,
  title,
  description,
  heroImageSrc,
  testimonials = [],
  onSubmit,
  errorMessage,
  statusMessage,
  isSubmitting = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isSignup = mode === "signup";

  return (
    <main className="flex min-h-[100dvh] w-full flex-col overflow-hidden md:flex-row">
      <section className="flex flex-1 items-center justify-center px-6 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-[28rem]">
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/70 bg-white/60 shadow-sm backdrop-blur-xl">
              <Mail className="h-5 w-5 text-slate-950" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-950">
                Vancoillie Mailbox
              </p>
              <p className="text-xs text-slate-500">Private beta</p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="space-y-3">
              <div className="animate-element animate-delay-100 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/55 px-3 py-1.5 text-xs font-medium text-slate-600 backdrop-blur-xl">
                <Sparkles className="h-3.5 w-3.5 text-slate-950" />
                Secure account access
              </div>
              <h1 className="animate-element animate-delay-200 text-4xl font-semibold leading-[1.04] tracking-tight text-slate-950 md:text-5xl">
                {title}
              </h1>
              <p className="animate-element animate-delay-300 max-w-sm text-base leading-7 text-slate-600">
                {description}
              </p>
            </div>

            <form className="space-y-5" onSubmit={onSubmit}>
              {isSignup && (
                <div className="animate-element animate-delay-400 space-y-2">
                  <label className="text-sm font-medium text-slate-600">
                    Naam
                  </label>
                  <GlassInputWrapper>
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Je naam"
                      className="w-full rounded-[1.35rem] bg-transparent p-4 text-sm text-slate-950 outline-none placeholder:text-slate-400"
                      required
                    />
                  </GlassInputWrapper>
                </div>
              )}

              <div className="animate-element animate-delay-500 space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  E-mailadres
                </label>
                <GlassInputWrapper>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jij@voorbeeld.com"
                    className="w-full rounded-[1.35rem] bg-transparent p-4 text-sm text-slate-950 outline-none placeholder:text-slate-400"
                    required
                  />
                </GlassInputWrapper>
              </div>

              <div className="animate-element animate-delay-600 space-y-2">
                <label className="text-sm font-medium text-slate-600">
                  Wachtwoord
                </label>
                <GlassInputWrapper>
                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete={isSignup ? "new-password" : "current-password"}
                      placeholder="Minstens 12 tekens"
                      className="w-full rounded-[1.35rem] bg-transparent p-4 pr-12 text-sm text-slate-950 outline-none placeholder:text-slate-400"
                      minLength={12}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center rounded-full p-1 text-slate-500 transition hover:text-slate-950"
                      aria-label={
                        showPassword ? "Verberg wachtwoord" : "Toon wachtwoord"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </GlassInputWrapper>
              </div>

              {!isSignup && (
                <div className="animate-element animate-delay-700 flex items-center justify-between text-sm">
                  <label className="flex cursor-pointer items-center gap-3 text-slate-700">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      className="custom-checkbox"
                    />
                    Ingelogd blijven
                  </label>
                  <Link
                    href="/forgot-password"
                    className="font-medium text-slate-950 transition hover:text-slate-600"
                  >
                    Wachtwoord vergeten
                  </Link>
                </div>
              )}

              {isSignup && (
                <p className="animate-element animate-delay-700 flex gap-2 text-sm leading-6 text-slate-500">
                  <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-slate-950" />
                  We beveiligen je account met sterke wachtwoordregels, veilige
                  sessies en later MFA.
                </p>
              )}

              {(errorMessage || statusMessage) && (
                <div
                  className={`animate-element animate-delay-700 rounded-2xl border px-4 py-3 text-sm ${
                    errorMessage
                      ? "border-red-200 bg-red-50/80 text-red-700"
                      : "border-emerald-200 bg-emerald-50/80 text-emerald-700"
                  }`}
                  role="status"
                >
                  {errorMessage ?? statusMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="animate-element animate-delay-800 w-full rounded-[1.35rem] bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-950/15 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {isSubmitting
                  ? isSignup
                    ? "Account aanmaken..."
                    : "Inloggen..."
                  : isSignup
                    ? "Account aanmaken"
                    : "Inloggen"}
              </button>
            </form>

            <p className="animate-element animate-delay-900 text-center text-sm text-slate-500">
              {isSignup ? "Heb je al een account?" : "Nog geen account?"}{" "}
              <Link
                href={isSignup ? "/login" : "/signup"}
                className="font-semibold text-slate-950 transition hover:text-slate-600"
              >
                {isSignup ? "Log in" : "Maak er een aan"}
              </Link>
            </p>
          </div>
        </div>
      </section>

      {heroImageSrc && (
        <section className="relative hidden flex-1 p-4 md:block">
          <div
            className="animate-slide-right absolute inset-4 overflow-hidden rounded-[2rem] bg-cover bg-center shadow-soft-panel"
            style={{ backgroundImage: `url(${heroImageSrc})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/15 via-transparent to-slate-950/45" />
            <div className="absolute left-8 top-8 rounded-full border border-white/25 bg-white/20 px-4 py-2 text-sm font-medium text-white shadow-sm backdrop-blur-xl">
              Mail, zonder ruis.
            </div>
          </div>

          {testimonials.length > 0 && (
            <div className="absolute bottom-8 left-1/2 flex w-full -translate-x-1/2 justify-center gap-4 px-8">
              <TestimonialCard
                testimonial={testimonials[0]}
                delay="animate-delay-1000"
              />
              {testimonials[1] && (
                <div className="hidden xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[1]}
                    delay="animate-delay-1200"
                  />
                </div>
              )}
              {testimonials[2] && (
                <div className="hidden 2xl:flex">
                  <TestimonialCard
                    testimonial={testimonials[2]}
                    delay="animate-delay-1400"
                  />
                </div>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
};
