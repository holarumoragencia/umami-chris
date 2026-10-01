import React from 'react';
import {useCurrentFrame} from 'remotion';
import {countUp, enter, exit, formatNumber, progress} from '../anim';
import {content} from '../content';
import {COLORS} from '../theme';
import {Stage} from '../components/Stage';

export const Cost: React.FC = () => {
  const frame = useCurrentFrame();
  const value = countUp(frame, 6, 40, content.cost.number);
  const bar = progress(frame, 34, 18);
  const slice = progress(frame, 50, 14);

  return (
    <Stage style={exit(frame, 96)}>
      <div style={{fontSize: 56, fontWeight: 500, ...enter(frame, 0)}}>{content.cost.lead}</div>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 24,
          marginTop: 12,
          lineHeight: 1,
          ...enter(frame, 4, 30),
        }}
      >
        <span
          style={{
            fontSize: 200,
            fontWeight: 800,
            letterSpacing: -8,
            color: COLORS.accent,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {formatNumber(value)}
        </span>
        <span style={{fontSize: 96, fontWeight: 800, letterSpacing: -2}}>{content.cost.unit}</span>
      </div>
      <div style={{fontSize: 56, fontWeight: 700, marginTop: 16, ...enter(frame, 22)}}>
        {content.cost.after}
      </div>

      {/* Barra de facturación con la porción que se pierde */}
      <div style={{marginTop: 110, ...enter(frame, 30)}}>
        <div
          style={{
            position: 'relative',
            height: 64,
            borderRadius: 32,
            border: `4px solid ${COLORS.ink}`,
            width: `${bar * 100}%`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              bottom: 0,
              // 2,6% real es casi invisible: lo exageramos un poco para que se lea.
              width: `${slice * 9}%`,
              background: COLORS.accent,
            }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'baseline',
            gap: 16,
            marginTop: 26,
            ...enter(frame, 56, 20),
          }}
        >
          <span style={{fontSize: 72, fontWeight: 800, color: COLORS.accent}}>{content.cost.percent}</span>
          <span style={{fontSize: 40, fontWeight: 500}}>{content.cost.percentLabel}</span>
        </div>
      </div>
    </Stage>
  );
};
