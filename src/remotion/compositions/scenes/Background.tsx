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

  // Slowly drifting ambient glow orbs
  const orb1X = 25 + Math.sin(time * 0.3) * 10;
  const orb1Y = 30 + Math.cos(time * 0.2) * 8;
  const orb2X = 70 + Math.sin(time * 0.25 + 1) * 12;
  const orb2Y = 60 + Math.cos(time * 0.35 + 2) * 10;
  const orb3X = 50 + Math.sin(time * 0.15 + 3) * 15;
  const orb3Y = 80 + Math.cos(time * 0.2 + 1) * 8;

  // Fade in background
  const bgOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#09090B", opacity: bgOpacity }}>
      {/* Subtle animated grid */}
      <GridBackground
        cellSize={48}
        color="rgba(245,107,61,0.04)"
        lineWidth={0.5}
        backgroundColor="transparent"
        opacity={0.5}
        animate
        velocity={8}
        direction="up"
        fadeEdges
      />

      {/* Ambient glow orbs */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `
            radial-gradient(ellipse 45% 45% at ${orb1X}% ${orb1Y}%, rgba(245,107,61,0.15), transparent 70%),
            radial-gradient(ellipse 40% 40% at ${orb2X}% ${orb2Y}%, rgba(245,107,61,0.08), transparent 60%),
            radial-gradient(ellipse 50% 50% at ${orb3X}% ${orb3Y}%, rgba(139,92,246,0.06), transparent 60%)
          `,
        }}
      />

      {/* Film grain */}
      <Noise type="subtle" intensity={0.15} speed={0.8} opacity={0.3} blend="overlay" />
    </AbsoluteFill>
  );
};
