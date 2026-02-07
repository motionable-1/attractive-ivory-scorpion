import {
  AbsoluteFill,
  Sequence,
  Artifact,
  useCurrentFrame,
  Audio,
} from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

import { Background } from "./scenes/Background";
import { HeroScene } from "./scenes/HeroScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { FeaturesScene } from "./scenes/FeaturesScene";
import { StatsScene } from "./scenes/StatsScene";
import { CTAScene } from "./scenes/CTAScene";

// Scene durations (frames at 30fps)
const HERO_DUR = 150; // 5s
const PROBLEM_DUR = 120; // 4s
const FEATURES_DUR = 130; // ~4.3s
const STATS_DUR = 110; // ~3.7s
const CTA_DUR = 130; // ~4.3s
const TRANSITION_DUR = 18; // 0.6s per transition

// Audio URLs
const WHOOSH_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770452700559_2o1m3edesys_sfx_Modern_tech_corporate_whoosh_t.mp3";
const CHIME_SFX =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770452709969_2nlwlgxcpez_sfx_Soft_digital_notification_chim.mp3";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <>
      {/* Thumbnail */}
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}

      <AbsoluteFill style={{ backgroundColor: "#09090B" }}>
        {/* Persistent animated background */}
        <Background />

        {/* Scene transitions */}
        <TransitionSeries>
          {/* Scene 1: Hero */}
          <TransitionSeries.Sequence durationInFrames={HERO_DUR}>
            <HeroScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
          />

          {/* Scene 2: Problem */}
          <TransitionSeries.Sequence durationInFrames={PROBLEM_DUR}>
            <ProblemScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slide({ direction: "from-right" })}
            timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
          />

          {/* Scene 3: Features */}
          <TransitionSeries.Sequence durationInFrames={FEATURES_DUR}>
            <FeaturesScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
          />

          {/* Scene 4: Stats */}
          <TransitionSeries.Sequence durationInFrames={STATS_DUR}>
            <StatsScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slide({ direction: "from-bottom" })}
            timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
          />

          {/* Scene 5: CTA */}
          <TransitionSeries.Sequence durationInFrames={CTA_DUR}>
            <CTAScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* Sound effects */}
        {/* Transition whooshes */}
        <Sequence from={HERO_DUR - TRANSITION_DUR / 2}>
          <Audio src={WHOOSH_SFX} volume={0.25} />
        </Sequence>
        <Sequence
          from={HERO_DUR + PROBLEM_DUR - TRANSITION_DUR - TRANSITION_DUR / 2}
        >
          <Audio src={WHOOSH_SFX} volume={0.25} />
        </Sequence>
        <Sequence
          from={
            HERO_DUR +
            PROBLEM_DUR +
            FEATURES_DUR -
            2 * TRANSITION_DUR -
            TRANSITION_DUR / 2
          }
        >
          <Audio src={WHOOSH_SFX} volume={0.25} />
        </Sequence>
        <Sequence
          from={
            HERO_DUR +
            PROBLEM_DUR +
            FEATURES_DUR +
            STATS_DUR -
            3 * TRANSITION_DUR -
            TRANSITION_DUR / 2
          }
        >
          <Audio src={WHOOSH_SFX} volume={0.25} />
        </Sequence>

        {/* Chime on CTA */}
        <Sequence
          from={
            HERO_DUR +
            PROBLEM_DUR +
            FEATURES_DUR +
            STATS_DUR -
            4 * TRANSITION_DUR +
            40
          }
        >
          <Audio src={CHIME_SFX} volume={0.3} />
        </Sequence>
      </AbsoluteFill>
    </>
  );
};
