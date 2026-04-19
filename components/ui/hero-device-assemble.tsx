"use client";

import { Player } from "@remotion/player";
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export interface HeroDeviceAssembleProps {
  assembleStart?: number;
  device?: "laptop" | "phone";
  accentColor?: string;
  speed?: number;
  className?: string;
  screenImage?: {
    src: string;
    alt: string;
    objectFit?: "cover" | "contain";
    objectPosition?: string;
  };
}

export interface HeroDeviceAssemblePlayerProps
  extends Omit<HeroDeviceAssembleProps, "assembleStart" | "speed"> {
  durationInFrames?: number;
  fps?: number;
  compositionWidth?: number;
  compositionHeight?: number;
}

const FONT_FAMILY =
  "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, sans-serif";

function MockUI({ accentColor }: { accentColor: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        background: "#0b0b0f",
        fontFamily: FONT_FAMILY,
        color: "white",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "10%",
          background: "#111118",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
          }}
        />
      </div>
      <div style={{ flex: 1, display: "flex" }}>
        <div
          style={{
            width: "22%",
            background: "#0e0e14",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            padding: 16,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <div
            style={{
              height: 12,
              borderRadius: 4,
              background: accentColor,
              opacity: 0.85,
              width: "70%",
            }}
          />
          <div
            style={{
              height: 10,
              borderRadius: 4,
              background: "rgba(255,255,255,0.1)",
              width: "85%",
            }}
          />
          <div
            style={{
              height: 10,
              borderRadius: 4,
              background: "rgba(255,255,255,0.08)",
              width: "60%",
            }}
          />
          <div
            style={{
              height: 10,
              borderRadius: 4,
              background: "rgba(255,255,255,0.08)",
              width: "75%",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              height: 18,
              width: "40%",
              background: "rgba(255,255,255,0.85)",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              height: 10,
              width: "65%",
              background: "rgba(255,255,255,0.18)",
              borderRadius: 4,
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
              marginTop: 12,
            }}
          >
            <div
              style={{
                height: 90,
                borderRadius: 8,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
            <div
              style={{
                height: 90,
                borderRadius: 8,
                background: `linear-gradient(180deg, ${accentColor}33, ${accentColor}11)`,
                border: `1px solid ${accentColor}55`,
              }}
            />
            <div
              style={{
                height: 90,
                borderRadius: 8,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
          </div>
          <div
            style={{
              flex: 1,
              borderRadius: 8,
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function ScreenContent({
  accentColor,
  screenImage,
}: {
  accentColor: string;
  screenImage?: HeroDeviceAssembleProps["screenImage"];
}) {
  if (!screenImage) {
    return <MockUI accentColor={accentColor} />;
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "#f7f8fb",
      }}
    >
      <img
        src={screenImage.src}
        alt={screenImage.alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: screenImage.objectFit ?? "cover",
          objectPosition: screenImage.objectPosition ?? "top center",
          display: "block",
        }}
      />
    </div>
  );
}

export function HeroDeviceAssemble({
  assembleStart = 0,
  device = "laptop",
  accentColor = "#22c55e",
  speed = 1,
  className,
  screenImage,
}: HeroDeviceAssembleProps) {
  const frame = useCurrentFrame() * speed;
  const { fps } = useVideoConfig();

  const assemble = spring({
    frame: frame - assembleStart,
    fps,
    config: { mass: 1.4, damping: 12, stiffness: 90 },
    durationInFrames: 60,
  });

  const lidZ = interpolate(assemble, [0, 1], [1000, 0]);
  const baseZ = interpolate(assemble, [0, 1], [-800, 0]);
  const bezelZ = interpolate(assemble, [0, 1], [600, 0]);
  const screenZ = interpolate(assemble, [0, 1], [300, 0]);

  const rotX = interpolate(assemble, [0, 1], [-22, 0]);
  const rotY = interpolate(assemble, [0, 1], [28, 0]);

  const layerOpacity = interpolate(assemble, [0, 0.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const wakeStartFrame = assembleStart + 14;
  const screenWake = interpolate(
    frame,
    [wakeStartFrame, wakeStartFrame + 16],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const shimmerProgress = interpolate(
    frame,
    [wakeStartFrame + 14, wakeStartFrame + 38],
    [-1, 2],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const isPhone = device === "phone";
  const deviceW = isPhone ? 320 : 760;
  const deviceH = isPhone ? 640 : 470;
  const screenInset = isPhone ? 12 : 18;
  const bezelRadius = isPhone ? 36 : 14;

  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at center, #f8fafc 0%, #eef4ff 48%, #dfe7f4 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 2000,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          position: "relative",
          width: deviceW,
          height: deviceH,
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)`,
          willChange: "transform",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateZ(${lidZ - 8}px)`,
            background: "linear-gradient(180deg, #f8fafc 0%, #d7dee9 100%)",
            borderRadius: bezelRadius + 4,
            border: "1px solid rgba(15,23,42,0.12)",
            boxShadow:
              "0 60px 120px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.9)",
            opacity: layerOpacity,
          }}
        />

        {!isPhone && (
          <div
            style={{
              position: "absolute",
              left: -40,
              right: -40,
              bottom: -28,
              height: 28,
              transform: `translateZ(${baseZ}px) rotateX(78deg)`,
              transformOrigin: "top center",
              background: "linear-gradient(180deg, #edf2f7 0%, #cbd5e1 100%)",
              borderRadius: "0 0 12px 12px",
              border: "1px solid rgba(15,23,42,0.08)",
              boxShadow: "0 30px 60px rgba(15,23,42,0.18)",
              opacity: layerOpacity,
            }}
          />
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `translateZ(${bezelZ}px)`,
            background: "#f8fafc",
            borderRadius: bezelRadius,
            border: "1px solid rgba(15,23,42,0.16)",
            boxShadow:
              "inset 0 0 0 2px rgba(255,255,255,0.8), 0 20px 60px rgba(15,23,42,0.16)",
            opacity: layerOpacity,
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: screenInset,
            transform: `translateZ(${screenZ}px)`,
            borderRadius: Math.max(bezelRadius - 6, 8),
            overflow: "hidden",
            background: "white",
            opacity: layerOpacity,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "#0f172a",
              opacity: 1 - screenWake,
            }}
          />
          <div style={{ position: "absolute", inset: 0, opacity: screenWake }}>
            <ScreenContent
              accentColor={accentColor}
              screenImage={screenImage}
            />
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)",
              transform: `translateX(${shimmerProgress * 100}%)`,
              mixBlendMode: "screen",
              pointerEvents: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Scene(props: HeroDeviceAssembleProps) {
  return <HeroDeviceAssemble {...props} />;
}

export function HeroDeviceAssemblePlayer({
  durationInFrames = 120,
  fps = 30,
  compositionWidth = 1280,
  compositionHeight = 720,
  ...props
}: HeroDeviceAssemblePlayerProps) {
  return (
    <Player
      component={Scene}
      durationInFrames={durationInFrames}
      fps={fps}
      compositionWidth={compositionWidth}
      compositionHeight={compositionHeight}
      inputProps={props}
      style={{ width: "100%", height: "100%" }}
      controls={false}
      autoPlay
      loop
      clickToPlay={false}
      acknowledgeRemotionLicense
    />
  );
}
