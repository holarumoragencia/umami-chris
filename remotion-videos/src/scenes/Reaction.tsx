import React from 'react';
import {useCurrentFrame} from 'remotion';
import {enter, exit, progress} from '../anim';
import {content} from '../content';
import {COLORS} from '../theme';
import {DrawPath} from '../components/Draw';
import {Stage} from '../components/Stage';

export const Reaction: React.FC = () => {
  const frame = useCurrentFrame();
  const dim = progress(frame, 24, 12);

  return (
    <Stage style={exit(frame, 76)}>
      <div
        style={{
          fontSize: 96,
          fontWeight: 600,
          lineHeight: 1.1,
          letterSpacing: -3,
          whiteSpace: 'pre-line',
          ...enter(frame, 0, 40),
        }}
      >
        <span style={{opacity: 1 - dim * 0.55}}>{content.reaction.first}</span>
      </div>
      <div style={{position: 'relative', marginTop: 56, alignSelf: 'flex-start', ...enter(frame, 22, 50)}}>
        <div style={{fontSize: 160, fontWeight: 800, letterSpacing: -7, lineHeight: 1, whiteSpace: 'nowrap'}}>
          {content.reaction.second}
        </div>
        <svg
          width="100%"
          height={48}
          viewBox="0 0 600 40"
          preserveAspectRatio="none"
          style={{position: 'absolute', left: 0, bottom: -56}}
        >
          <DrawPath d="M6 26 C150 8 420 8 594 22" p={progress(frame, 36, 16)} color={COLORS.accent} width={10} />
        </svg>
      </div>
    </Stage>
  );
};
