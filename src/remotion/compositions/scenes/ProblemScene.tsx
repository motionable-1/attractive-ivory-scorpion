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
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: outfitFont } = loadOutfit("normal", {
  weights: ["600", "700"],
  subsets: ["latin"],
});
const { fontFamily: interFont } = loadInter("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

const PAIN_POINTS = [
  {
    icon: "https://api.iconify.design/ph/clock-countdown-bold.svg?color=%23F56B3D&width=36",
    text: "Hours wasted on tech setup",
  },
  {
    icon: "https://api.iconify.design/ph/puzzle-piece-bold.svg?color=%23F56B3D&width=36",
    text: "Stitching tools together",
  },
  {
    icon: "https://api.iconify.design/ph/currency-dollar-bold.svg?color=%23F56B3D&width=36",
    text: "Revenue left on the table",
  },
];

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      {/* Headline */}
      <div style={{ position: "absolute", top: 140, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <TextAnimation
          startFrom={5}
          style={{
            fontFamily: outfitFont,
            fontSize: 48,
            fontWeight: 700,
            color: "#FAFAFA",
            textAlign: "center",
            letterSpacing: "-0.01em",
            textWrap: "balance",
          }}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "chars" });
            tl.from(split.chars, {
              opacity: 0,
              y: 25,
              scale: 0.9,
              duration: 0.4,
              stagger: 0.02,
              ease: "power3.out",
            });
            return tl;
          }}
        >
          Sound Familiar?
        </TextAnimation>
      </div>

      {/* Pain point cards */}
      <div
        style={{
          position: "absolute",
          top: 270,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 40,
        }}
      >
        {PAIN_POINTS.map((point, i) => {
          const delay = 15 + i * 10;
          const cardOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const cardY = interpolate(frame, [delay, delay + 15], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(1.5)),
          });
          const cardScale = interpolate(frame, [delay, delay + 15], [0.85, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.cubic),
          });

          // Subtle floating
          const floatY = Math.sin((frame / fps) * 1.5 + i * 1.2) * 3;

          return (
            <div
              key={i}
              style={{
                width: 300,
                padding: "36px 28px",
                borderRadius: 20,
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(245,107,61,0.12)",
                backdropFilter: "blur(8px)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
                opacity: cardOpacity,
                transform: `translateY(${cardY + floatY}px) scale(${cardScale})`,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  backgroundColor: "rgba(245,107,61,0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Img src={point.icon} style={{ width: 36, height: 36 }} />
              </div>
              <span
                style={{
                  fontFamily: interFont,
                  fontSize: 20,
                  fontWeight: 500,
                  color: "rgba(250,250,250,0.85)",
                  textAlign: "center",
                  lineHeight: 1.4,
                }}
              >
                {point.text}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom message */}
      <div style={{ position: "absolute", bottom: 120, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <TextAnimation
          startFrom={50}
          style={{
            fontFamily: outfitFont,
            fontSize: 32,
            fontWeight: 600,
            color: "#F56B3D",
            textAlign: "center",
          }}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              scale: 0.8,
              duration: 0.5,
              stagger: 0.08,
              ease: "back.out(1.7)",
            });
            return tl;
          }}
        >
          There&apos;s a better way.
        </TextAnimation>
      </div>
    </AbsoluteFill>
  );
};
