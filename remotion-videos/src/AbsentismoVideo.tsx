import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {Header} from './components/Header';
import {Economy} from './scenes/Economy';
import {Intro} from './scenes/Intro';
import {Outro} from './scenes/Outro';
import {Reaction} from './scenes/Reaction';
import {Risk} from './scenes/Risk';
import {Soundtrack} from './Soundtrack';
import {COLORS, FONT_FAMILY} from './theme';

// Guion (30 fps, 15 s = 450 frames)
const SCENES = {
  intro: {from: 0, duration: 110}, // 0,0–3,7 s  165.000 ausencias diarias
  economy: {from: 110, duration: 108}, // 3,7–7,3 s  12,8% del PIB, 13% del empleo
  risk: {from: 218, duration: 118}, // 7,3–11,2 s lo que está en juego
  reaction: {from: 336, duration: 88}, // 11,2–14,1 s la reacción
  outro: {from: 424, duration: 26}, // 14,1–15 s firma
};

export const AbsentismoVideo: React.FC = () => (
  <AbsoluteFill
    style={{
      background: COLORS.background,
      color: COLORS.ink,
      fontFamily: FONT_FAMILY,
    }}
  >
    <Soundtrack />
    <Header hideAt={SCENES.outro.from - 8} />
    <Sequence from={SCENES.intro.from} durationInFrames={SCENES.intro.duration}>
      <Intro />
    </Sequence>
    <Sequence from={SCENES.economy.from} durationInFrames={SCENES.economy.duration}>
      <Economy />
    </Sequence>
    <Sequence from={SCENES.risk.from} durationInFrames={SCENES.risk.duration}>
      <Risk />
    </Sequence>
    <Sequence from={SCENES.reaction.from} durationInFrames={SCENES.reaction.duration}>
      <Reaction />
    </Sequence>
    <Sequence from={SCENES.outro.from} durationInFrames={SCENES.outro.duration}>
      <Outro />
    </Sequence>
  </AbsoluteFill>
);
