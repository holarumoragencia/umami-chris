import React from 'react';
import {useCurrentFrame} from 'remotion';
import {enter, progress} from '../anim';
import {content} from '../content';
import {COLORS} from '../theme';

/** Firma sutil arriba a la izquierda (el lugar del logo en el video de referencia). */
export const Header: React.FC<{hideAt: number}> = ({hideAt}) => {
  const frame = useCurrentFrame();
  const out = 1 - progress(frame, hideAt, 10);

  return (
    <div style={{position: 'absolute', top: 80, left: 80, right: 80, opacity: out}}>
      <div style={{display: 'flex', alignItems: 'center', gap: 14, ...enter(frame, 0, 12)}}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 7,
            background: COLORS.accent,
          }}
        />
        <div style={{fontSize: 30, fontWeight: 600, color: COLORS.ink, letterSpacing: -0.3}}>
          {content.author}
        </div>
      </div>
      <div
        style={{
          marginTop: 22,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 2.5,
          textTransform: 'uppercase',
          color: COLORS.ink,
          ...enter(frame, 4, 12),
        }}
      >
        <span style={{opacity: 0.55}}>{content.eyebrow}</span>
      </div>
    </div>
  );
};
