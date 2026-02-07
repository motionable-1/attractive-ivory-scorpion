import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
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

const STATS = [
  { value: 10000, suffix: "+", label: "Creators Launched", color: "#06D6A0" },
  { value: 99, suffix: "%", label: "Uptime Guarantee", color: "#EF476F" },
  {
    value: 0,
    prefix: "$",
    suffix: " Fee",
    label: "Zero Platform Fees",
    color: "#7B61FF",
  },
];

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      {/* Decorative elements */}
      <div style={{ position: "absolute", top: 50, left: 120, opacity: 0.07 }}>
        <ShapeAnimation
          shape="star"
          animation="rotate"
          size={200}
          color="#FFD166"
          speed={0.1}
        />
      </div>
      <div
        style={{ position: "absolute", bottom: 50, right: 100, opacity: 0.06 }}
      >
        <ShapeAnimation
          shape="diamond"
          animation="breathe"
          size={150}
          color="#06D6A0"
          speed={0.3}
        />
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 120,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextAnimation
          startFrom={5}
          style={{
            fontFamily: outfitFont,
            fontSize: 46,
            fontWeight: 700,
            color: "#FAFAFA",
            textAlign: "center",
          }}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 35,
              duration: 0.5,
              stagger: 0.08,
              ease: "back.out(1.4)",
            });
            return tl;
          }}
        >
          Trusted by Value Creators
        </TextAnimation>
      </div>

      {/* Stats row */}
      <div
        style={{
          position: "absolute",
          top: 280,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 80,
        }}
      >
        {STATS.map((stat, i) => {
          const delay = 15 + i * 10;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const scale = interpolate(frame, [delay, delay + 18], [0.7, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(1.5)),
          });

          const counterStartFrame = delay;
          const counterProgress = interpolate(
            frame,
            [counterStartFrame, counterStartFrame + 40],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.cubic),
            },
          );

          const displayValue =
            stat.value === 0
              ? "$0"
              : `${stat.prefix || ""}${Math.round(stat.value * counterProgress).toLocaleString()}${stat.suffix || ""}`;

          return (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                opacity,
                transform: `scale(${scale})`,
              }}
            >
              {/* Number */}
              <span
                style={{
                  fontFamily: outfitFont,
                  fontSize: 72,
                  fontWeight: 800,
                  color: stat.color,
                  letterSpacing: "-0.02em",
                  textShadow: `0 0 35px ${stat.color}50`,
                }}
              >
                {displayValue}
              </span>

              {/* Label */}
              <span
                style={{
                  fontFamily: interFont,
                  fontSize: 20,
                  fontWeight: 500,
                  color: "rgba(250,250,250,0.6)",
                }}
              >
                {stat.label}
              </span>

              {/* Underline accent */}
              <div
                style={{
                  width: interpolate(frame, [delay + 15, delay + 30], [0, 60], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.out(Easing.cubic),
                  }),
                  height: 3,
                  borderRadius: 2,
                  backgroundColor: stat.color,
                  opacity: 0.7,
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
