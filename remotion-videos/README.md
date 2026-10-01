# Videos animados (Remotion)

Video de 15 s para LinkedIn: reacción al dato de absentismo laboral en el turismo español.

- `out/absentismo-4x5.mp4`: 1080×1350, el formato recomendado para el feed de LinkedIn
- `out/absentismo-9x16.mp4`: 1080×1920, para Reels, Stories o Shorts

## Editar

- **Textos y cifras:** `src/content.ts`
- **Colores:** `src/theme.ts` (fondo `#ffffff`, texto `#2a2a2a`, acento `#f99f1a`)
- **Tiempos de cada escena:** `SCENES` en `src/AbsentismoVideo.tsx`

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
| 0,0–3,7 s | Contador hasta **165.000** personas que no acuden cada día; 3 de 40 iconos desaparecen |
| 3,7–7,3 s | Coste de casi **6.000 M€**, el **2,6 %** de la facturación |
| 7,3–11,2 s | Lo que está en juego: calidad del servicio, competitividad y liderazgo turístico (trofeo que se agrieta) |
| 11,2–14,1 s | Reacción: "La pregunta no es quién falta. **Es por qué.**" |
| 14,1–15 s | Firma |

En la barra de facturación, la porción naranja está exagerada a propósito: el 2,6 % real casi no se vería.
