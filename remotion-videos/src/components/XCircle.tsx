import React from 'react';
import {DrawPath} from './Draw';

/** Ícono ⊗ que se dibuja: círculo y luego la cruz. */
export const XCircle: React.FC<{p: number; color: string; size?: number}> = ({p, color, size = 64}) => {
  const circle = Math.min(1, p / 0.6);
  const cross = Math.max(0, (p - 0.5) / 0.5);
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <DrawPath d="M32 4 A28 28 0 1 1 31.99 4" p={circle} color={color} width={4} />
      <DrawPath d="M22 22 L42 42" p={Math.min(1, cross * 2)} color={color} width={4} />
      <DrawPath d="M42 22 L22 42" p={Math.max(0, cross * 2 - 1)} color={color} width={4} />
    </svg>
  );
};
