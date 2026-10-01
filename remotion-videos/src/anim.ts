import {Easing, interpolate, spring} from 'remotion';
import {FPS} from './theme';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

export const ease = Easing.bezier(0.22, 1, 0.36, 1);

/** 0 → 1 between `start` and `start + duration`, eased. */
export const progress = (frame: number, start: number, duration = 15) =>
  interpolate(frame, [start, start + duration], [0, 1], {...clamp, easing: ease});

/** Fade + slide up entrance. */
export const enter = (frame: number, start: number, distance = 40, duration = 16) => {
  const p = progress(frame, start, duration);
  return {opacity: p, transform: `translateY(${(1 - p) * distance}px)`};
};

/** Fade + slide up exit (multiply with an entrance). */
export const exit = (frame: number, start: number, duration = 10) => {
  const p = progress(frame, start, duration);
  return {opacity: 1 - p, translate: `0 ${-p * 30}px`};
};

export const pop = (frame: number, start: number) =>
  spring({frame: frame - start, fps: FPS, config: {damping: 12, stiffness: 160, mass: 0.6}});

/** Spanish thousands separator: 165000 → "165.000". */
export const formatNumber = (n: number) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

export const countUp = (frame: number, start: number, duration: number, to: number) =>
  interpolate(frame, [start, start + duration], [0, to], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
