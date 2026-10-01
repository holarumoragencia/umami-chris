import React from 'react';
import {useCurrentFrame} from 'remotion';
import {enter, exit, progress} from '../anim';
import {content} from '../content';
import {COLORS} from '../theme';
import {DrawPath} from '../components/Draw';
import {Stage} from '../components/Stage';
import {XCircle} from '../components/XCircle';

const Trophy: React.FC<{frame: number}> = ({frame}) => {
  const draw = progress(frame, 14, 30);
  const tilt = progress(frame, 66, 20);
  const crack = progress(frame, 62, 12);

  return (
    <svg
      width={360}
      height={360}
      viewBox="0 0 200 200"
      style={{
        transform: `rotate(${tilt * -14}deg) translateY(${tilt * 16}px)`,
        transformOrigin: '50% 100%',
      }}
    >
      {/* copa */}
      <DrawPath d="M60 30 H140 V70 C140 102 122 120 100 120 C78 120 60 102 60 70 Z" p={draw} color={COLORS.ink} />
      {/* asas */}
      <DrawPath d="M60 44 H38 C38 72 48 86 64 90" p={draw} color={COLORS.ink} />
      <DrawPath d="M140 44 H162 C162 72 152 86 136 90" p={draw} color={COLORS.ink} />
      {/* pie y base */}
      <DrawPath d="M100 120 V148" p={draw} color={COLORS.ink} />
      <DrawPath d="M72 170 C72 156 84 148 100 148 C116 148 128 156 128 170 Z" p={draw} color={COLORS.ink} />
      <DrawPath d="M60 176 H140" p={draw} color={COLORS.ink} />
      {/* grieta */}
      <DrawPath d="M108 30 L96 52 L110 66 L94 92" p={crack} color={COLORS.accent} width={6} />
    </svg>
  );
};

export const Risk: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Stage style={exit(frame, 106)}>
      <div style={{fontSize: 56, fontWeight: 500, ...enter(frame, 0)}}>{content.risk.lead}</div>
      <div style={{marginTop: 40, display: 'flex', flexDirection: 'column', gap: 26}}>
        {content.risk.items.map((item, i) => {
          const start = 10 + i * 12;
          return (
            <div key={item} style={{display: 'flex', alignItems: 'center', gap: 28, ...enter(frame, start, 30)}}>
              <XCircle p={progress(frame, start + 2, 16)} color={COLORS.accent} size={72} />
              <span style={{fontSize: 68, fontWeight: 700, letterSpacing: -1.5}}>{item}</span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: 70,
          display: 'flex',
          justifyContent: 'center',
          opacity: progress(frame, 10, 10),
        }}
      >
        <Trophy frame={frame} />
      </div>
    </Stage>
  );
};
