import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {enter, pop, progress} from '../anim';
import {content} from '../content';
import {COLORS} from '../theme';

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const line = progress(frame, 8, 16);

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          background: COLORS.accent,
          scale: `${pop(frame, 0)}`,
        }}
      />
      <div style={{marginTop: 30, fontSize: 52, fontWeight: 700, letterSpacing: -1, ...enter(frame, 4, 24)}}>
        {content.author}
      </div>
      <div style={{marginTop: 26, height: 5, width: 160 * line, background: COLORS.accent, borderRadius: 3}} />
    </AbsoluteFill>
  );
};
