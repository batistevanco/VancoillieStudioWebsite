"use client";

import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { Player } from "@remotion/player";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export interface InfiniteBentoPanProps {
  panSpeed?: number;
  accentColor?: string;
  speed?: number;
  className?: string;
}

export interface InfiniteBentoPanSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  metrics: readonly {
    value: string;
    label: string;
  }[];
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

const SUPER_W = 3500;
const SUPER_H = 2500;

type CardKind =
  | "chart"
  | "counter"
  | "gradient"
  | "code"
  | "logo"
  | "stat"
  | "bars";

interface CardDef {
  x: number;
  y: number;
  w: number;
  h: number;
  kind: CardKind;
  hue: number;
  label?: string;
}

const CARDS: CardDef[] = [
  { x: 80, y: 80, w: 480, h: 280, kind: "chart", hue: 220, label: "Websites" },
  { x: 600, y: 80, w: 280, h: 280, kind: "counter", hue: 210, label: "Leads" },
  { x: 920, y: 80, w: 360, h: 180, kind: "gradient", hue: 190 },
  { x: 1320, y: 80, w: 480, h: 280, kind: "code", hue: 0, label: "site.tsx" },
  { x: 1840, y: 80, w: 280, h: 280, kind: "logo", hue: 215 },
  { x: 2160, y: 80, w: 380, h: 180, kind: "stat", hue: 155, label: "Uptime" },
  { x: 2580, y: 80, w: 360, h: 280, kind: "bars", hue: 35, label: "Bezoekers" },
  { x: 920, y: 300, w: 360, h: 200, kind: "counter", hue: 175, label: "Klanten" },
  {
    x: 2160,
    y: 300,
    w: 380,
    h: 200,
    kind: "chart",
    hue: 105,
    label: "Snelheid",
  },
  { x: 80, y: 400, w: 280, h: 280, kind: "gradient", hue: 340 },
  { x: 400, y: 400, w: 480, h: 280, kind: "code", hue: 0, label: "app.ts" },
  { x: 1320, y: 420, w: 280, h: 280, kind: "stat", hue: 60, label: "SEO" },
  { x: 1640, y: 420, w: 380, h: 280, kind: "bars", hue: 255, label: "Builds" },
  { x: 2580, y: 420, w: 360, h: 280, kind: "logo", hue: 205 },
  { x: 80, y: 720, w: 480, h: 240, kind: "chart", hue: 285, label: "Support" },
  { x: 600, y: 720, w: 280, h: 240, kind: "stat", hue: 20, label: "Respons" },
  { x: 920, y: 740, w: 380, h: 220, kind: "gradient", hue: 240 },
  {
    x: 1320,
    y: 740,
    w: 360,
    h: 220,
    kind: "counter",
    hue: 140,
    label: "Actief",
  },
  {
    x: 1720,
    y: 740,
    w: 480,
    h: 240,
    kind: "code",
    hue: 0,
    label: "invoxa.ts",
  },
  { x: 2240, y: 740, w: 360, h: 240, kind: "bars", hue: 320, label: "Tickets" },
  { x: 80, y: 1000, w: 360, h: 220, kind: "logo", hue: 180 },
  { x: 460, y: 1000, w: 380, h: 220, kind: "stat", hue: 80, label: "Conversie" },
  { x: 880, y: 1000, w: 480, h: 220, kind: "chart", hue: 200, label: "Dashboard" },
  {
    x: 1400,
    y: 1000,
    w: 280,
    h: 220,
    kind: "counter",
    hue: 360,
    label: "Taken",
  },
  { x: 1720, y: 1020, w: 360, h: 220, kind: "gradient", hue: 120 },
  { x: 2120, y: 1020, w: 380, h: 220, kind: "code", hue: 0, label: "data.sql" },
  { x: 2540, y: 1020, w: 400, h: 220, kind: "bars", hue: 280, label: "Planning" },
  { x: 80, y: 1280, w: 480, h: 260, kind: "code", hue: 0, label: "edge.ts" },
  { x: 600, y: 1280, w: 360, h: 260, kind: "chart", hue: 240, label: "Laadtijd" },
  { x: 1000, y: 1280, w: 280, h: 260, kind: "logo", hue: 60 },
  { x: 1320, y: 1280, w: 380, h: 260, kind: "stat", hue: 200, label: "Bereik" },
  {
    x: 1740,
    y: 1280,
    w: 360,
    h: 260,
    kind: "counter",
    hue: 300,
    label: "Pagina's",
  },
  { x: 2140, y: 1280, w: 380, h: 260, kind: "gradient", hue: 160 },
  { x: 2560, y: 1280, w: 380, h: 260, kind: "bars", hue: 0, label: "Checks" },
  { x: 80, y: 1600, w: 380, h: 220, kind: "stat", hue: 280, label: "Bespaard" },
  { x: 500, y: 1600, w: 480, h: 220, kind: "chart", hue: 40, label: "Groei" },
  { x: 1020, y: 1600, w: 360, h: 220, kind: "code", hue: 0, label: "auth.ts" },
  { x: 1420, y: 1600, w: 280, h: 220, kind: "logo", hue: 220 },
  {
    x: 1740,
    y: 1620,
    w: 380,
    h: 220,
    kind: "counter",
    hue: 100,
    label: "Flows",
  },
  { x: 2160, y: 1620, w: 360, h: 220, kind: "bars", hue: 340, label: "Runs" },
  { x: 2560, y: 1620, w: 380, h: 220, kind: "gradient", hue: 200 },
  { x: 80, y: 1880, w: 480, h: 240, kind: "bars", hue: 180, label: "Apps" },
  { x: 600, y: 1880, w: 380, h: 240, kind: "gradient", hue: 320 },
  { x: 1020, y: 1880, w: 360, h: 240, kind: "logo", hue: 80 },
  {
    x: 1420,
    y: 1880,
    w: 480,
    h: 240,
    kind: "chart",
    hue: 260,
    label: "Automatie",
  },
  {
    x: 1940,
    y: 1880,
    w: 280,
    h: 240,
    kind: "counter",
    hue: 20,
    label: "Calls",
  },
  { x: 2260, y: 1880, w: 380, h: 240, kind: "stat", hue: 140, label: "Score" },
  { x: 2680, y: 1880, w: 260, h: 240, kind: "code", hue: 0, label: "api.ts" },
];

function noise(i: number, frame: number) {
  return Math.sin(frame / 30 + i) * 0.5 + 0.5;
}

function ChartCard({ accent, t }: { accent: string; t: number }) {
  const points: string[] = [];
  for (let i = 0; i < 12; i++) {
    const x = (i / 11) * 100;
    const y =
      50 - (Math.sin(i * 0.7 + t) * 18 + Math.cos(i * 0.4 + t * 0.6) * 8);
    points.push(`${x},${y}`);
  }

  return (
    <svg
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "100%" }}
    >
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={accent}
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points={`${points.join(" ")} 100,60 0,60`}
        fill={`${accent}22`}
        stroke="none"
      />
    </svg>
  );
}

function BarsCard({ accent, t }: { accent: string; t: number }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        gap: 6,
        height: "100%",
        width: "100%",
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => {
        const h = 25 + (Math.sin(i * 0.8 + t) * 0.5 + 0.5) * 70;
        return (
          <div
            key={i}
            style={{
              flex: 1,
              height: `${h}%`,
              background: `linear-gradient(180deg, ${accent} 0%, ${accent}55 100%)`,
              borderRadius: 4,
            }}
          />
        );
      })}
    </div>
  );
}

function CodeCard() {
  const lines = [
    { indent: 0, w: 60, c: "#7dd3fc" },
    { indent: 1, w: 80, c: "rgba(255,255,255,0.8)" },
    { indent: 1, w: 50, c: "#86efac" },
    { indent: 2, w: 70, c: "rgba(255,255,255,0.8)" },
    { indent: 2, w: 40, c: "#fde047" },
    { indent: 1, w: 30, c: "rgba(255,255,255,0.6)" },
    { indent: 0, w: 20, c: "rgba(255,255,255,0.6)" },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            marginLeft: line.indent * 14,
            width: `${line.w}%`,
            height: 8,
            borderRadius: 3,
            background: line.c,
            opacity: 0.7,
          }}
        />
      ))}
    </div>
  );
}

function LogoCard({ accent, hue }: { accent: string; hue: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          background: `linear-gradient(135deg, ${accent} 0%, hsl(${hue},70%,55%) 100%)`,
          boxShadow: `0 10px 30px ${accent}44`,
        }}
      />
    </div>
  );
}

function GradientCard({ hue }: { hue: number }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `radial-gradient(circle at 30% 30%, hsl(${hue},80%,60%) 0%, hsl(${(hue + 70) % 360},70%,42%) 52%, #09090b 100%)`,
      }}
    />
  );
}

function Card({
  card,
  accent,
  index,
  frame,
}: {
  card: CardDef;
  accent: string;
  index: number;
  frame: number;
}) {
  const t = noise(index, frame) * 6.28;
  const baseStyle: CSSProperties = {
    position: "absolute",
    left: card.x,
    top: card.y,
    width: card.w,
    height: card.h,
    borderRadius: 8,
    background: "linear-gradient(180deg, #151515 0%, #09090b 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    overflow: "hidden",
    padding: 18,
    color: "white",
    display: "flex",
    flexDirection: "column",
  };

  const labelEl = card.label ? (
    <div
      style={{
        fontSize: 12,
        fontWeight: 600,
        color: "rgba(255,255,255,0.58)",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        marginBottom: 8,
      }}
    >
      {card.label}
    </div>
  ) : null;

  if (card.kind === "chart") {
    return (
      <div style={baseStyle}>
        {labelEl}
        <div style={{ flex: 1 }}>
          <ChartCard accent={accent} t={t} />
        </div>
      </div>
    );
  }

  if (card.kind === "bars") {
    return (
      <div style={baseStyle}>
        {labelEl}
        <div style={{ flex: 1 }}>
          <BarsCard accent={accent} t={t} />
        </div>
      </div>
    );
  }

  if (card.kind === "counter") {
    const value = Math.floor(18 + noise(index, frame) * 82);
    return (
      <div style={baseStyle}>
        {labelEl}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "white",
          }}
        >
          {value.toLocaleString("nl-BE")}
        </div>
        <div style={{ fontSize: 12, color: accent, fontWeight: 600 }}>
          +{(noise(index + 1, frame) * 12).toFixed(1)}%
        </div>
      </div>
    );
  }

  if (card.kind === "stat") {
    const value = (95 + noise(index, frame) * 5).toFixed(2);
    return (
      <div style={baseStyle}>
        {labelEl}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          {value}
          <span
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.5)",
              marginLeft: 4,
            }}
          >
            %
          </span>
        </div>
      </div>
    );
  }

  if (card.kind === "code") {
    return (
      <div style={baseStyle}>
        {labelEl}
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <div style={{ width: "100%" }}>
            <CodeCard />
          </div>
        </div>
      </div>
    );
  }

  if (card.kind === "logo") {
    return (
      <div style={{ ...baseStyle, padding: 0 }}>
        <LogoCard accent={accent} hue={card.hue} />
      </div>
    );
  }

  return (
    <div style={{ ...baseStyle, padding: 0 }}>
      <GradientCard hue={card.hue} />
    </div>
  );
}

export function InfiniteBentoPan({
  panSpeed = 1,
  accentColor = "#2563eb",
  speed = 1,
  className,
}: InfiniteBentoPanProps) {
  const frame = useCurrentFrame() * speed;
  const { durationInFrames, width, height } = useVideoConfig();

  const maxX = SUPER_W - width;
  const maxY = SUPER_H - height;

  const t = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const px = t * maxX * Math.min(1, panSpeed);
  const py = t * maxY * Math.min(1, panSpeed);

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        background: "#09090b",
        overflow: "hidden",
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: SUPER_W,
          height: SUPER_H,
          transform: `translate(${-px}px, ${-py}px)`,
          willChange: "transform",
        }}
      >
        {CARDS.map((card, i) => (
          <Card
            key={i}
            card={card}
            accent={accentColor}
            index={i}
            frame={frame}
          />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at center, transparent 30%, rgba(9,9,11,0.72) 76%, #09090b 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export function InfiniteBentoPanSection({
  eyebrow,
  title,
  description,
  metrics,
}: InfiniteBentoPanSectionProps) {
  const [isMounted, setIsMounted] = useState(false);
  const inputProps = useMemo(
    () => ({
      accentColor: "#3b82f6",
      panSpeed: 0.85,
      speed: 1,
    }),
    [],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="overflow-hidden bg-white px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-brand">
            {eyebrow}
          </p>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-zinc-950 md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-lg bg-[#09090b] shadow-2xl shadow-slate-300/60 ring-1 ring-black/10 md:mt-16">
          {isMounted ? (
            <Player
              component={InfiniteBentoPan}
              inputProps={inputProps}
              durationInFrames={240}
              fps={30}
              compositionWidth={1280}
              compositionHeight={720}
              autoPlay
              loop
              controls={false}
              clickToPlay={false}
              acknowledgeRemotionLicense
              style={{
                width: "100%",
                height: "auto",
                aspectRatio: "16 / 9",
                background: "#09090b",
              }}
            />
          ) : (
            <div className="aspect-video w-full bg-[#09090b]" />
          )}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-border/70 bg-gray-50 px-5 py-4"
            >
              <div className="text-2xl font-semibold tracking-tight text-zinc-950">
                {metric.value}
              </div>
              <div className="mt-1 text-sm leading-6 text-muted-foreground">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
