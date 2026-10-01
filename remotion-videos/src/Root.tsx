import React from 'react';
import {Composition} from 'remotion';
import {AbsentismoVideo} from './AbsentismoVideo';
import {fontsLoaded} from './fonts';
import {DURATION_IN_FRAMES, FPS} from './theme';

// Garantiza que Inter esté cargada antes de renderizar cualquier frame.
fontsLoaded;

export const RemotionRoot: React.FC = () => (
  <>
    {/* 4:5 — el formato que más ocupa en el feed de LinkedIn */}
    <Composition
      id="Absentismo-4x5"
      component={AbsentismoVideo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={1080}
      height={1350}
    />
    {/* 9:16 — por si se reutiliza en Reels/Stories */}
    <Composition
      id="Absentismo-9x16"
      component={AbsentismoVideo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={1080}
      height={1920}
    />
  </>
);
