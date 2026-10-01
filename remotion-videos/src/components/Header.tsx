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
    <div style={{position: 'absolute', top: 72, left: 72, right: 72, opacity: out}}>
      <div style={{fontSize: 34, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.4, ...enter(frame, 0, 12)}}>
        {content.author}
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 3,
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
