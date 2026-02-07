import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { GridBackground } from "../../library/components/effects/GridBackground";
import { Noise } from "../../library/components/effects/Noise";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  // Slowly drifting ambient glow orbs — now vibrant multi-color
  const orb1X = 20 + Math.sin(time * 0.3) * 12;
  const orb1Y = 25 + Math.cos(time * 0.2) * 10;
  const orb2X = 75 + Math.sin(time * 0.25 + 1) * 14;
  const orb2Y = 55 + Math.cos(time * 0.35 + 2) * 12;
  const orb3X = 50 + Math.sin(time * 0.15 + 3) * 18;
  const orb3Y = 78 + Math.cos(time * 0.2 + 1) * 10;
  const orb4X = 35 + Math.sin(time * 0.2 + 2) * 10;
  const orb4Y = 45 + Math.cos(time * 0.3 + 3) * 8;

  // Fade in background
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0A0A12", opacity: bgOpacity }}>
      {/* Subtle animated grid — cyan tinted */}
      <GridBackground
        cellSize={48}
        color="rgba(6,214,160,0.05)"
        lineWidth={0.5}
        backgroundColor="transparent"
        opacity={0.5}
        animate
        velocity={8}
        direction="up"
        fadeEdges
      />

      {/* Vibrant ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 50% 50% at ${orb1X}% ${orb1Y}%, rgba(6,214,160,0.18), transparent 70%),
            radial-gradient(ellipse 45% 45% at ${orb2X}% ${orb2Y}%, rgba(239,71,111,0.14), transparent 60%),
            radial-gradient(ellipse 50% 50% at ${orb3X}% ${orb3Y}%, rgba(123,97,255,0.12), transparent 60%),
            radial-gradient(ellipse 35% 35% at ${orb4X}% ${orb4Y}%, rgba(255,209,102,0.08), transparent 55%)
          `,
        }}
      />

      {/* Film grain */}
      <Noise
        type="subtle"
        intensity={0.15}
        speed={0.8}
        opacity={0.3}
        blend="overlay"
      />
    </AbsoluteFill>
  );
};
