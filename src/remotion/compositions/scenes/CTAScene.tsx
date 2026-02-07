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
import { Particles } from "../../library/components/effects/Particles";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: outfitFont } = loadOutfit("normal", {
  weights: ["600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: interFont } = loadInter("normal", {
  weights: ["400", "500", "600"],
  subsets: ["latin"],
});

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Button animation
  const btnScale = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.8)),
  });
  const btnOpacity = interpolate(frame, [40, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulse on button
  const pulseCycle = ((frame - 55) / fps) * 2;
  const pulseScale = frame > 55 ? 1 + Math.sin(pulseCycle * Math.PI) * 0.03 : 1;

  // URL fade in
  const urlOpacity = interpolate(frame, [58, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const urlY = interpolate(frame, [58, 70], [15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill>
      {/* Celebratory particles */}
      <Particles
        type="sparks"
        count={30}
        colors={["#F56B3D", "#FFB347", "#FAFAFA", "#8B5CF6"]}
        speed={0.5}
        seed="cta-sparks"
      />

      {/* Central glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 50% 45%, rgba(245,107,61,0.12), transparent 60%)",
        }}
      />

      {/* Main CTA headline */}
      <div style={{ position: "absolute", top: 180, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <TextAnimation
          startFrom={5}
          style={{
            fontFamily: outfitFont,
            fontSize: 56,
            fontWeight: 800,
            color: "#FAFAFA",
            textAlign: "center",
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            maxWidth: 800,
            textWrap: "balance",
          }}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 50,
              scale: 0.85,
              rotationX: -25,
              duration: 0.6,
              stagger: 0.08,
              ease: "back.out(1.5)",
            });
            return tl;
          }}
        >
          Start Selling Today — For Free
        </TextAnimation>
      </div>

      {/* Subtitle */}
      <div style={{ position: "absolute", top: 320, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
        <TextAnimation
          startFrom={22}
          style={{
            fontFamily: interFont,
            fontSize: 22,
            fontWeight: 400,
            color: "rgba(250,250,250,0.55)",
            textAlign: "center",
            maxWidth: 600,
            textWrap: "balance",
          }}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 12,
              duration: 0.4,
              stagger: 0.03,
              ease: "power2.out",
            });
            return tl;
          }}
        >
          No credit card. No coding. Just your knowledge and a link.
        </TextAnimation>
      </div>

      {/* CTA Button */}
      <div
        style={{
          position: "absolute",
          top: 420,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Glow color="#F56B3D" intensity={20} pulsate pulseDuration={2} pulseMin={0.5}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 44px",
              borderRadius: 9999,
              background: "linear-gradient(135deg, #F56B3D, #E05525)",
              opacity: btnOpacity,
              transform: `scale(${btnScale * pulseScale})`,
              boxShadow: "0 0 30px rgba(245,107,61,0.4), 0 8px 30px rgba(0,0,0,0.3)",
            }}
          >
            <Img
              src="https://api.iconify.design/ph/rocket-launch-fill.svg?color=%23FFFFFF&width=24"
              style={{ width: 24, height: 24 }}
            />
            <span
              style={{
                fontFamily: interFont,
                fontSize: 22,
                fontWeight: 600,
                color: "#FFFFFF",
                letterSpacing: "0.01em",
              }}
            >
              Start for Free
            </span>
          </div>
        </Glow>
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          top: 520,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: interFont,
            fontSize: 26,
            fontWeight: 500,
            color: "#F56B3D",
            letterSpacing: "0.03em",
          }}
        >
          superlinks.ai
        </span>
      </div>
    </AbsoluteFill>
  );
};
