import React from 'react';

/** Área de contenido bajo la cabecera; ocupa todo el ancho y centra en vertical. */
export const Stage: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({
  children,
  style,
}) => (
  <div
    style={{
      position: 'absolute',
      top: 190,
      bottom: 72,
      left: 72,
      right: 72,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);
