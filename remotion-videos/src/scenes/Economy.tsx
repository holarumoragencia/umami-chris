import React from 'react';
import {useCurrentFrame} from 'remotion';
import {enter, exit, pop, progress} from '../anim';
import {content} from '../content';
import {COLORS} from '../theme';
import {Stage} from '../components/Stage';

/** Peso del turismo en la economía: dos cifras grandes separadas por una línea que se dibuja. */
export const Economy: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <Stage style={exit(frame, 96)}>
      <div style={{fontSize: 64, fontWeight: 500, letterSpacing: -1, ...enter(frame, 0)}}>
        {content.economy.lead}
      </div>
      {content.economy.stats.map((stat, i) => {
        const start = 8 + i * 22;
        return (
          <React.Fragment key={stat.label}>
            {i > 0 ? (
              <div
                style={{
                  height: 4,
                  borderRadius: 2,
                  background: COLORS.ink,
                  width: `${progress(frame, start - 6, 18) * 100}%`,
                  margin: '36px 0 20px',
                }}
              />
            ) : null}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 32,
                marginTop: i === 0 ? 20 : 0,
                ...enter(frame, start, 50, 18),
              }}
            >
              <span
                style={{
                  fontSize: 250,
                  fontWeight: 800,
                  letterSpacing: -12,
                  lineHeight: 1,
                  marginLeft: -10,
                  color: COLORS.accent,
                  display: 'inline-block',
                  scale: `${0.9 + 0.1 * pop(frame, start)}`,
                  transformOrigin: 'left bottom',
                }}
              >
                {stat.value}
              </span>
              <span style={{fontSize: 72, fontWeight: 700, letterSpacing: -1.5, whiteSpace: 'nowrap'}}>{stat.label}</span>
            </div>
          </React.Fragment>
        );
      })}
    </Stage>
  );
};
