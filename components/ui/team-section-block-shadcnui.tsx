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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getCopy } from "@/lib/i18n";
import type { Locale } from "@/lib/routes";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
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

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), {
    stiffness: 260,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), {
    stiffness: 260,
    damping: 28,
  });

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div variants={itemVariants} style={{ perspective: 1000 }}>
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
        <Card className="relative overflow-hidden border-0 bg-transparent text-zinc-950 shadow-none">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-slate-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={
              isHovered
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: shouldReduceMotion ? 1 : 0.75 }
            }
            className="absolute right-5 top-5 z-10"
          >
            <Sparkles className="h-5 w-5 text-blue-600" aria-hidden />
          </motion.div>

          <div className="relative z-10 grid gap-8 p-6 md:grid-cols-[260px_1fr] md:p-8">
            <div className="flex justify-center md:justify-start">
              <motion.div
                className="relative"
                whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <div className="relative h-56 w-44 overflow-hidden rounded-lg border border-border/70 bg-slate-50 p-1 shadow-xl shadow-slate-200/80 sm:h-64 sm:w-52">
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full rounded-md object-cover"
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col justify-center text-center md:text-left">
              <div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <Badge
                  variant="secondary"
                  className="bg-blue-50 text-xs uppercase tracking-[0.24em] text-blue-700"
                >
                  {member.role}
                </Badge>
                <Badge
                  variant="outline"
                  className="border-border/70 bg-white text-xs text-zinc-600"
                >
                  <Code2 className="mr-1.5 h-3 w-3" aria-hidden />
                  Solo studio
                </Badge>
              </div>

              <motion.h3
                className="text-3xl font-semibold tracking-tight text-zinc-950 md:text-5xl"
                animate={isHovered && !shouldReduceMotion ? { scale: 1.01 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {member.name}
              </motion.h3>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground md:justify-start">
                <MapPin className="h-4 w-4" aria-hidden />
                <span>{member.location}</span>
              </div>

              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
                {member.bio}
              </p>

              <div className="mt-6 flex flex-wrap justify-center gap-2 md:justify-start">
                {member.skills.map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ scale: 0.92, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.08 * index, type: "spring" }}
                  >
                    <Badge
                      variant="outline"
                      className="border-border/70 bg-slate-50 text-xs text-zinc-700"
                    >
                      {skill}
                    </Badge>
                  </motion.div>
                ))}
              </div>

              <div className="mt-7 flex justify-center gap-3 md:justify-start">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-lg border-border/70 bg-white text-zinc-900 hover:bg-slate-50 hover:text-zinc-900"
                  asChild
                >
                  <a href={member.social.github} target="_blank" rel="noreferrer">
                    <Github className="mr-2 h-4 w-4" aria-hidden />
                    GitHub
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="rounded-lg bg-blue-600 text-white hover:bg-blue-500"
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
        </Card>
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
      className="relative w-full overflow-hidden bg-white px-4 py-20 text-zinc-950 sm:px-6 lg:px-10"
    >
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="mb-12 text-center"
        >
          <Badge
            className="mb-6 gap-2 bg-blue-50 text-blue-700"
            variant="secondary"
          >
            <Sparkles className="h-3 w-3" aria-hidden />
            {content.badge}
          </Badge>

          <h2
            id="team-section-heading"
            className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight text-zinc-950 md:text-6xl"
          >
            {content.title}
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-balance text-base leading-7 text-muted-foreground md:text-lg">
            {content.description}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <TeamMemberCard member={member} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="mx-auto mt-10 max-w-3xl p-6 text-center"
        >
          <h3 className="text-2xl font-semibold">{content.ctaTitle}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            {content.ctaDescription}
          </p>
          <Button
            size="lg"
            className="mt-6 rounded-lg bg-zinc-900 px-8 text-white hover:bg-zinc-800"
            asChild
          >
            <a href={content.ctaHref}>{content.ctaLabel}</a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
