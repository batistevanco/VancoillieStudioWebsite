"use client";

import type { MouseEvent } from "react";
import { useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { Code2, Github, Mail, MapPin, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.6, 0.05, 0.01, 0.9] },
  },
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  location: string;
  skills: readonly string[];
  social: {
    github: string;
    email: string;
  };
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const shouldReduceMotion = useReducedMotion();

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), { stiffness: 260, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), { stiffness: 260, damping: 28 });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((event.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div variants={itemVariants} style={{ perspective: 1200 }}>
      <motion.div
        style={{
          rotateX: shouldReduceMotion ? 0 : rotateX,
          rotateY: shouldReduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative"
      >
        {/* Glass card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/8">
          {/* Glow on hover */}
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.04), transparent 40%)" }}
          />

          <div className="relative z-10 grid gap-10 p-8 md:grid-cols-[240px_1fr] lg:p-12">
            {/* Photo */}
            <div className="flex justify-center md:justify-start">
              <motion.div
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative"
              >
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-white/20 to-white/5 blur-sm" />
                <div className="relative h-64 w-52 overflow-hidden rounded-xl border border-white/15 shadow-2xl">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center text-center md:text-left">
              {/* Badges */}
              <div className="mb-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
                  {member.role}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60">
                  <Code2 className="h-3 w-3" aria-hidden />
                  Solo studio
                </span>
              </div>

              {/* Name */}
              <motion.h3
                className="text-4xl font-bold tracking-tight text-white md:text-5xl"
                animate={isHovered && !shouldReduceMotion ? { scale: 1.01 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {member.name}
              </motion.h3>

              {/* Location */}
              <div className="mt-3 flex items-center justify-center gap-1.5 text-sm text-white/50 md:justify-start">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                <span>{member.location}</span>
              </div>

              {/* Bio */}
              <p className="mt-5 max-w-lg text-base leading-7 text-white/65">
                {member.bio}
              </p>

              {/* Skills */}
              <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                {member.skills.map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.07 * index, type: "spring" }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-7 flex justify-center gap-3 md:justify-start">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm"
                  asChild
                >
                  <a href={member.social.github} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" aria-hidden />
                    GitHub
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="rounded-full bg-white text-black hover:bg-white/90"
                  asChild
                >
                  <a href={`mailto:${member.social.email}`}>
                    <Mail className="mr-2 h-4 w-4" aria-hidden />
                    Mail
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function TeamSectionBlock({ locale = "nl" }: { locale?: Locale }) {
  const content = getCopy(locale).aboutTeam;
  const shouldReduceMotion = useReducedMotion();
  const member = content.member;

  return (
    <section
      aria-labelledby="team-section-heading"
      className="relative w-full px-4 py-24 sm:px-6 lg:px-10"
    >
      <div className="relative mx-auto max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="mb-14 text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 text-xs text-white/70 backdrop-blur-sm">
            <Sparkles className="h-3 w-3" aria-hidden />
            {content.badge}
          </div>

          <h2
            id="team-section-heading"
            className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight text-white md:text-6xl"
          >
            {content.title}
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-balance text-base leading-7 text-white/60 md:text-lg">
            {content.description}
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <TeamMemberCard member={member} />
        </motion.div>

        {/* CTA block */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
        >
          <h3 className="text-2xl font-semibold text-white">{content.ctaTitle}</h3>
          <p className="mt-3 text-sm leading-6 text-white/60">
            {content.ctaDescription}
          </p>
          <Button
            size="lg"
            className="mt-6 rounded-full bg-white px-8 text-black hover:bg-white/90"
            asChild
          >
            <a href={content.ctaHref}>{content.ctaLabel}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
