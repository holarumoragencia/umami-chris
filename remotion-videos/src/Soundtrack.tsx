import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';

type Sfx = 'whoosh' | 'swish' | 'pop' | 'counter' | 'absent' | 'mark' | 'crack' | 'impact' | 'chime';

// Volumen general de todos los efectos.
const MASTER = 1.5;

// Efectos sincronizados con las animaciones (frame global, 30 fps).
// Volúmenes bajos a propósito: acompañan, no protagonizan.
// Los whoosh arrancan ~11 frames antes del cambio de escena para que el pico caiga en el corte.
const CUES: {frame: number; sfx: Sfx; volume: number}[] = [
  // Intro: 165.000
  {frame: 0, sfx: 'whoosh', volume: 0.25},
  {frame: 12, sfx: 'counter', volume: 0.3},
  {frame: 20, sfx: 'pop', volume: 0.12},
  {frame: 26, sfx: 'pop', volume: 0.1},
  {frame: 58, sfx: 'absent', volume: 0.35},
  {frame: 99, sfx: 'whoosh', volume: 0.35},
  // PIB y empleo
  {frame: 118, sfx: 'pop', volume: 0.3},
  {frame: 134, sfx: 'swish', volume: 0.18},
  {frame: 140, sfx: 'pop', volume: 0.3},
  {frame: 207, sfx: 'whoosh', volume: 0.35},
  // Lo que está en juego
  {frame: 230, sfx: 'mark', volume: 0.32},
  {frame: 242, sfx: 'mark', volume: 0.32},
  {frame: 254, sfx: 'mark', volume: 0.32},
  {frame: 280, sfx: 'crack', volume: 0.35},
  {frame: 325, sfx: 'whoosh', volume: 0.35},
  // Reacción
  {frame: 358, sfx: 'impact', volume: 0.45},
  {frame: 372, sfx: 'swish', volume: 0.22},
  // Firma
  {frame: 413, sfx: 'whoosh', volume: 0.2},
  {frame: 424, sfx: 'chime', volume: 0.25},
];

export const Soundtrack: React.FC = () => (
  <>
    {CUES.map((cue, i) => (
      <Sequence key={i} from={cue.frame} layout="none">
        <Audio src={staticFile(`sfx/${cue.sfx}.wav`)} volume={Math.min(1, cue.volume * MASTER)} />
      </Sequence>
    ))}
  </>
);
