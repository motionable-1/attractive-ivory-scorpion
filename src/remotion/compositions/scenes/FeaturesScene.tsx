import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Img,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Glow } from "../../library/components/effects/Glow";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: outfitFont } = loadOutfit("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: interFont } = loadInter("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

const FEATURES = [
  {
    icon: "https://api.iconify.design/ph/book-open-text-bold.svg?color=%23F56B3D&width=40",
    title: "Course Sales",
    desc: "Launch digital courses in minutes with AI-powered content generation",
    accent: "#F56B3D",
  },
  {
    icon: "https://api.iconify.design/ph/megaphone-bold.svg?color=%2310B981&width=40",
    title: "Marketing Flows",
    desc: "Automated email campaigns and landing pages that convert",
    accent: "#10B981",
  },
  {
    icon: "https://api.iconify.design/ph/credit-card-bold.svg?color=%238B5CF6&width=40",
    title: "Payment Integration",
    desc: "Accept payments instantly — Stripe, cards, and more built-in",
    accent: "#8B5CF6",
  },
];

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      {/* Ambient decorative shapes */}
      <div style={{ position: "absolute", top: 80, right: 100, opacity: 0.08 }}>
        <ShapeAnimation shape="hexagon" animation="rotate" size={180} color="#F56B3D" speed={0.15} />
      </div>
      <div style={{ position: "absolute", bottom: 60, left: 80, opacity: 0.06 }}>
        <ShapeAnimation shape="ring" animation="breathe" size={140} color="#8B5CF6" strokeWidth={3} speed={0.5} />
      </div>

      {/* Section headline */}
      <div style={{ position: "absolute", top: 90, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <TextAnimation
          startFrom={5}
          style={{
            fontFamily: outfitFont,
            fontSize: 46,
            fontWeight: 700,
            color: "#FAFAFA",
            textAlign: "center",
            letterSpacing: "-0.01em",
          }}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 40,
              rotationX: -20,
              duration: 0.5,
              stagger: 0.07,
              ease: "back.out(1.4)",
            });
            return tl;
          }}
        >
          Everything You Need to Monetize
        </TextAnimation>
      </div>

      {/* Feature cards */}
      <div
        style={{
          position: "absolute",
          top: 220,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 36,
          padding: "0 80px",
        }}
      >
        {FEATURES.map((feat, i) => {
          const delay = 15 + i * 12;
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const cardX = interpolate(frame, [delay, delay + 18], [60, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(1.3)),
          });
          const cardScale = interpolate(frame, [delay, delay + 15], [0.9, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          // Floating effect
          const floatY = Math.sin((frame / fps) * 1.2 + i * 1.5) * 4;

          // Glow line at top
          const glowWidth = interpolate(frame, [delay + 10, delay + 30], [0, 100], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          return (
            <div
              key={i}
              style={{
                width: 340,
                padding: "0",
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.03)",
                border: `1px solid ${feat.accent}18`,
                overflow: "hidden",
                opacity: cardOpacity,
                transform: `translateX(${cardX}px) translateY(${floatY}px) scale(${cardScale})`,
              }}
            >
              {/* Top glow line */}
              <div
                style={{
                  height: 3,
                  width: `${glowWidth}%`,
                  background: `linear-gradient(90deg, transparent, ${feat.accent}, transparent)`,
                  borderRadius: 3,
                }}
              />

              <div style={{ padding: "32px 28px", display: "flex", flexDirection: "column", gap: 18 }}>
                {/* Icon */}
                <Glow color={feat.accent} intensity={12}>
                  <div
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 18,
                      backgroundColor: `${feat.accent}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Img src={feat.icon} style={{ width: 40, height: 40 }} />
                  </div>
                </Glow>

                {/* Title */}
                <span
                  style={{
                    fontFamily: outfitFont,
                    fontSize: 26,
                    fontWeight: 700,
                    color: "#FAFAFA",
                  }}
                >
                  {feat.title}
                </span>

                {/* Description */}
                <span
                  style={{
                    fontFamily: interFont,
                    fontSize: 17,
                    fontWeight: 400,
                    color: "rgba(250,250,250,0.55)",
                    lineHeight: 1.5,
                  }}
                >
                  {feat.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
