import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {countUp, enter, exit, formatNumber, pop, progress} from '../anim';
import {content} from '../content';
import {COLORS} from '../theme';
import {Stage} from '../components/Stage';

const COLS = 8;
const ROWS = 4;
// Algunas personas de la plantilla "desaparecen".
const ABSENT = new Set([6, 17, 26]);

const Person: React.FC<{index: number; frame: number}> = ({index, frame}) => {
  const row = Math.floor(index / COLS);
  const col = index % COLS;
  const s = pop(frame, 18 + (row + col) * 1.5);
  const absent = ABSENT.has(index);

  // Las ausencias se marcan en naranja y luego quedan como hueco punteado.
  const mark = absent ? progress(frame, 58, 8) : 0;
  const vanish = absent ? progress(frame, 72, 12) : 0;
  const color = absent && mark > 0 ? COLORS.accent : COLORS.ink;

  return (
    <svg
      width={108}
      height={108}
      viewBox="0 0 100 100"
      style={{transform: `scale(${s * (1 + mark * 0.12 - vanish * 0.12)})`}}
    >
      <g
        fill="none"
        stroke={color}
        strokeWidth={absent ? 5 : 4}
        strokeLinecap="round"
        strokeDasharray={vanish > 0 ? `${vanish * 8} ${vanish * 8}` : undefined}
        opacity={1 - vanish * 0.35}
      >
        <circle cx={50} cy={32} r={16} />
        <path d="M20 90 C20 66 34 56 50 56 C66 56 80 66 80 90" />
      </g>
    </svg>
  );
};

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const value = countUp(frame, 12, 44, content.intro.number);
  const out = exit(frame, 98);
  const numberScale = interpolate(pop(frame, 12), [0, 1], [0.85, 1]);

  return (
    <Stage style={out}>
      <div style={{fontSize: 64, fontWeight: 500, lineHeight: 1.12, letterSpacing: -1, ...enter(frame, 4)}}>
        {content.intro.lead}
      </div>
      <div
        style={{
          fontSize: 250,
          fontWeight: 800,
          letterSpacing: -12,
          lineHeight: 1,
          color: COLORS.accent,
          marginTop: 10,
          marginLeft: -10,
          fontVariantNumeric: 'tabular-nums',
          transformOrigin: 'left center',
          opacity: progress(frame, 10, 8),
          scale: `${numberScale}`,
        }}
      >
        {formatNumber(value)}
      </div>
      <div style={{fontSize: 64, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1, marginTop: 8, whiteSpace: 'pre-line', ...enter(frame, 36)}}>
        {content.intro.after}
      </div>
      <div
        style={{
          marginTop: 52,
          display: 'grid',
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          rowGap: 8,
          justifyItems: 'center',
        }}
      >
        {Array.from({length: COLS * ROWS}, (_, i) => (
          <Person key={i} index={i} frame={frame} />
        ))}
      </div>
    </Stage>
  );
};
