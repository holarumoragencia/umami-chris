# Videos animados (Remotion)

Video de 15 s para LinkedIn: reacción al dato de absentismo laboral en el turismo español.

- `out/absentismo-4x5.mp4`: 1080×1350, el formato recomendado para el feed de LinkedIn
- `out/absentismo-9x16.mp4`: 1080×1920, para Reels, Stories o Shorts

## Editar

- **Textos y cifras:** `src/content.ts`
- **Colores:** `src/theme.ts` (fondo `#ffffff`, texto `#2a2a2a`, acento `#f99f1a`)
- **Tiempos de cada escena:** `SCENES` en `src/AbsentismoVideo.tsx`
- **Efectos de sonido:** cues y volúmenes en `src/Soundtrack.tsx` (`MASTER` = volumen general). Los sonidos se sintetizan con `npm run sfx` (`scripts/generate-sfx.mjs`), así que no dependen de librerías con licencia.

## Usar

```bash
npm install
npm run studio      # preview en el navegador con línea de tiempo
npm run render      # out/absentismo-4x5.mp4
npm run render:all  # ambos formatos
```

## Guion

| Tiempo | Escena |
|---|---|
| 0,0–3,7 s | "Cada día, en España, más de **165.000** profesionales del turismo se ausentan de su puesto"; varios iconos de personas desaparecen |
| 3,7–7,3 s | En un sector que aporta el **12,8 %** del PIB y el **13 %** del empleo |
| 7,3–11,2 s | Lo que está en juego: calidad del servicio, competitividad y liderazgo turístico (trofeo que se agrieta) |
| 11,2–14,1 s | Reacción: "La pregunta no es quién falta. **Es por qué.**" |
| 14,1–15 s | Firma |

Los datos provienen del análisis del Consejo de Turismo de CEOE publicado por Hosteltur.
