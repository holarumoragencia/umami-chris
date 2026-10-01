import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {enter, progress} from '../anim';
import {content} from '../content';
import {COLORS} from '../theme';

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const line = progress(frame, 6, 16);

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div style={{fontSize: 64, fontWeight: 700, letterSpacing: -1.5, ...enter(frame, 0, 24)}}>
        {content.author}
      </div>
      <div style={{marginTop: 22, height: 6, width: 200 * line, background: COLORS.accent, borderRadius: 3}} />
      <div
        style={{
          marginTop: 22,
          fontSize: 26,
          fontWeight: 600,
          letterSpacing: 3,
          textTransform: 'uppercase',
          ...enter(frame, 4, 20),
        }}
      >
        <span style={{opacity: 0.55}}>{content.eyebrow}</span>
      </div>
    </AbsoluteFill>
  );
};
