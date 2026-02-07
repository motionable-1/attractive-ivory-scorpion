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
import { Badge } from "../../library/components/effects/Badge";
import { Glow } from "../../library/components/effects/Glow";
import { loadFont as loadOutfit } from "@remotion/google-fonts/Outfit";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

const { fontFamily: outfitFont } = loadOutfit("normal", {
  weights: ["400", "600", "700", "800"],
  subsets: ["latin"],
});
const { fontFamily: interFont } = loadInter("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance animation
  const logoScale = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(1.4)),
  });
  const logoOpacity = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dot accent that appears with the logo
  const dotScale = interpolate(frame, [22, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.back(2)),
  });

  // Dashboard image float in
  const dashboardY = interpolate(frame, [55, 85], [60, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const dashboardOpacity = interpolate(frame, [55, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const dashboardScale = interpolate(frame, [55, 85], [0.92, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Floating motion for dashboard
  const floatY = Math.sin((frame / fps) * 1.2) * 4;

  return (
    <AbsoluteFill>
      {/* Badge */}
      <div
        style={{
          position: "absolute",
          top: 85,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Badge
          badgeStyle="glass"
          color="#06D6A0"
          textColor="#06D6A0"
          animation="scaleIn"
          delay={0.1}
          fontSize={18}
          paddingX={20}
          paddingY={10}
          borderRadius={40}
          style={{ fontFamily: interFont, fontWeight: 500 }}
        >
          <Img
            src="https://api.iconify.design/ph/rocket-launch-fill.svg?color=%2306D6A0&width=20"
            style={{ width: 20, height: 20 }}
          />
          AI-Powered Monetization
        </Badge>
      </div>

      {/* Logo / Brand name */}
      <div
        style={{
          position: "absolute",
          top: 155,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        <Glow
          color="#06D6A0"
          intensity={18}
          pulsate
          pulseDuration={3}
          pulseMin={0.4}
        >
          <span
            style={{
              fontFamily: outfitFont,
              fontSize: 72,
              fontWeight: 800,
              color: "#FAFAFA",
              letterSpacing: "-0.02em",
            }}
          >
            super
            <span
              style={{
                background: "linear-gradient(135deg, #06D6A0, #7B61FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              links
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, #EF476F, #FFD166)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "inline-block",
                transform: `scale(${dotScale})`,
                transformOrigin: "bottom center",
              }}
            >
              .ai
            </span>
          </span>
        </Glow>
      </div>

      {/* Headline */}
      <div
        style={{
          position: "absolute",
          top: 255,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextAnimation
          startFrom={18}
          className="text-center"
          style={{
            fontFamily: outfitFont,
            fontSize: 50,
            fontWeight: 700,
            color: "#FAFAFA",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
            maxWidth: 900,
            textWrap: "balance",
          }}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 30,
              rotationX: -15,
              duration: 0.5,
              stagger: 0.06,
              ease: "back.out(1.4)",
            });
            return tl;
          }}
        >
          Turn Your Knowledge Into Income
        </TextAnimation>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          top: 380,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TextAnimation
          startFrom={35}
          style={{
            fontFamily: interFont,
            fontSize: 22,
            fontWeight: 400,
            color: "rgba(250,250,250,0.6)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.5,
            textWrap: "balance",
          }}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.from(split.words, {
              opacity: 0,
              y: 15,
              duration: 0.4,
              stagger: 0.03,
              ease: "power2.out",
            });
            return tl;
          }}
        >
          Create, launch, and sell digital products with AI superpowers and zero
          tech stress
        </TextAnimation>
      </div>

      {/* Dashboard mockup */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: dashboardOpacity,
          transform: `translateY(${dashboardY + floatY}px) scale(${dashboardScale})`,
        }}
      >
        <div
          style={{
            width: 820,
            height: 340,
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid rgba(6,214,160,0.2)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(6,214,160,0.12), 0 0 80px rgba(123,97,255,0.06)",
          }}
        >
          <Img
            src="https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/superlinks/1770452928545_c3mu8z3rac6_superlinks_dashboard.png"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
