// Sintetiza los efectos de sonido del video (sin samples externos ni licencias).
// Uso: node scripts/generate-sfx.mjs  → public/sfx/*.wav
import {mkdirSync, writeFileSync} from 'node:fs';

const SR = 44100;
const OUT = new URL('../public/sfx/', import.meta.url);
mkdirSync(OUT, {recursive: true});

// Ruido determinista para que cada render suene igual.
let seed = 1234567;
const noise = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 2 ** 31 - 1;
};

const buffer = (seconds) => new Float32Array(Math.round(seconds * SR));

const writeWav = (name, data, gain = 0.9) => {
  let peak = 0;
  for (const v of data) peak = Math.max(peak, Math.abs(v));
  const scale = peak > 0 ? gain / peak : 0;
  const bytes = Buffer.alloc(44 + data.length * 2);
  bytes.write('RIFF', 0);
  bytes.writeUInt32LE(36 + data.length * 2, 4);
  bytes.write('WAVEfmt ', 8);
  bytes.writeUInt32LE(16, 16);
  bytes.writeUInt16LE(1, 20); // PCM
  bytes.writeUInt16LE(1, 22); // mono
  bytes.writeUInt32LE(SR, 24);
  bytes.writeUInt32LE(SR * 2, 28);
  bytes.writeUInt16LE(2, 32);
  bytes.writeUInt16LE(16, 34);
  bytes.write('data', 36);
  bytes.writeUInt32LE(data.length * 2, 40);
  data.forEach((v, i) => bytes.writeInt16LE(Math.round(Math.max(-1, Math.min(1, v * scale)) * 32767), 44 + i * 2));
  writeFileSync(new URL(`${name}.wav`, OUT), bytes);
};

// Fades cortos para evitar clics al inicio/fin.
const declick = (data, ms = 4) => {
  const n = Math.round((ms / 1000) * SR);
  for (let i = 0; i < n && i < data.length; i++) {
    data[i] *= i / n;
    data[data.length - 1 - i] *= i / n;
  }
  return data;
};

/** Barrido de ruido filtrado (transiciones). */
const whoosh = (seconds, fromHz, toHz, attack) => {
  const out = buffer(seconds);
  let lp1 = 0, lp2 = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / out.length;
    const cutoff = fromHz * (toHz / fromHz) ** t;
    const a = 1 - Math.exp((-2 * Math.PI * cutoff) / SR);
    lp1 += a * (noise() - lp1);
    lp2 += a * (lp1 - lp2);
    const env = t < attack ? (t / attack) ** 2 : ((1 - t) / (1 - attack)) ** 1.6;
    out[i] = (lp1 - lp2 * 0.6) * env;
  }
  return declick(out);
};

/** Tono con caída de afinación y decaimiento exponencial. */
const tone = (seconds, f0, f1, decay, harmonics = [1]) => {
  const out = buffer(seconds);
  let phase = 0;
  for (let i = 0; i < out.length; i++) {
    const t = i / SR;
    const f = f1 + (f0 - f1) * Math.exp(-t * 30);
    phase += (2 * Math.PI * f) / SR;
    let v = 0;
    harmonics.forEach((h, k) => (v += Math.sin(phase * (k + 1)) * h));
    out[i] = v * Math.exp(-t / decay);
  }
  return declick(out, 2);
};

const mix = (target, source, atSeconds, gain = 1) => {
  const offset = Math.round(atSeconds * SR);
  for (let i = 0; i < source.length && offset + i < target.length; i++) target[offset + i] += source[i] * gain;
  return target;
};

// 1. Transición suave entre escenas
writeWav('whoosh', whoosh(0.55, 300, 5000, 0.65), 0.8);

// 2. Barrido corto y agudo (subrayado / línea que se dibuja)
writeWav('swish', whoosh(0.3, 1500, 9000, 0.5), 0.7);

// 3. Pop suave (aparece un elemento)
writeWav('pop', tone(0.12, 1100, 520, 0.03, [1, 0.25]), 0.8);

// 4. Contador: ticks que se espacian siguiendo la misma curva que el número (ease-out, 44 frames)
{
  const seconds = 44 / 30;
  const out = buffer(seconds + 0.1);
  const tick = tone(0.025, 2600, 2200, 0.006);
  const ticks = 22;
  for (let k = 0; k < ticks; k++) {
    const p = k / ticks; // progreso del número
    const t = (1 - Math.cbrt(1 - p)) * seconds; // inversa de easeOutCubic
    mix(out, tick, t, 0.55 + 0.45 * p);
  }
  writeWav('counter', out, 0.75);
}

// 5. "Ausencia": dos notas que bajan (algo falta)
{
  const out = buffer(0.5);
  mix(out, tone(0.3, 660, 659, 0.09, [1, 0.3, 0.1]), 0);
  mix(out, tone(0.35, 494, 493, 0.12, [1, 0.3, 0.1]), 0.11);
  writeWav('absent', out, 0.75);
}

// 6. Marca ✗: pluck corto y apagado
writeWav('mark', tone(0.16, 420, 300, 0.035, [1, 0.5, 0.2]), 0.8);

// 7. Grieta: ráfagas de ruido muy cortas
{
  const out = buffer(0.32);
  [0, 0.035, 0.06, 0.1, 0.17].forEach((at, k) => {
    const burst = buffer(0.03);
    for (let i = 0; i < burst.length; i++) burst[i] = noise() * Math.exp(-i / (SR * 0.004));
    mix(out, burst, at, 1 - k * 0.15);
  });
  // cuerpo grave
  mix(out, tone(0.25, 140, 90, 0.06), 0, 0.5);
  writeWav('crack', out, 0.8);
}

// 8. Impacto grave suave (frase clave)
{
  const out = tone(0.7, 120, 55, 0.18, [1, 0.15]);
  mix(out, whoosh(0.12, 2000, 300, 0.05), 0, 0.15);
  writeWav('impact', out, 0.85);
}

// 9. Campana final
{
  const out = buffer(1.6);
  [
    [880, 1],
    [1318.5, 0.5],
    [1760, 0.25],
  ].forEach(([f, g], k) => mix(out, tone(1.5, f, f, 0.5 - k * 0.1), 0, g));
  writeWav('chime', out, 0.7);
}

console.log('SFX generados en public/sfx/');
