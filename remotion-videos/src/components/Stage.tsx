import React from 'react';

/** Área de contenido bajo la cabecera; centra verticalmente (sirve para 4:5 y 9:16). */
export const Stage: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({
  children,
  style,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 230,
      bottom: 90,
      left: 80,
      right: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);
