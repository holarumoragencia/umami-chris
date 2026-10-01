import {Config} from '@remotion/cli/config';
import {existsSync} from 'node:fs';

Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(95);
Config.setCodec('h264');
Config.setCrf(16);

// En entornos sin acceso a la descarga de Chrome (p. ej. contenedores cloud)
// usamos el headless shell ya instalado. En tu ordenador se ignora.
const LOCAL_SHELL =
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
if (existsSync(LOCAL_SHELL)) {
  Config.setBrowserExecutable(LOCAL_SHELL);
}
