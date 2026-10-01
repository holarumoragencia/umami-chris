import React from 'react';

/** SVG path que se "dibuja" según `p` (0 → 1). */
export const DrawPath: React.FC<
  {d: string; p: number; color: string; width?: number} & React.SVGProps<SVGPathElement>
> = ({d, p, color, width = 4, ...rest}) => (
  <path
    d={d}
    pathLength={1}
    strokeDasharray={1}
    strokeDashoffset={1 - p}
    fill="none"
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  />
);
