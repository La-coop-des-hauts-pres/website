import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Dev only: rebuild a local, gitignored print file. No address enters the site build.
export default function privateChecklist() {
  const webDir = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const envFile = resolve(webDir, '../.private/coordonnees.env');
  const generator = resolve(webDir, 'scripts/fiche-societaire.mjs');
  return {
    name: 'private-checklist',
    configureServer(server) {
      let running = false;
      let again = false;
      const rebuild = () => {
        if (running) {
          again = true;
          return;
        }
        running = true;
        const child = spawn(process.execPath, [generator], { cwd: webDir, stdio: 'ignore' });
        const finished = (code) => {
          running = false;
          if (code !== 0)
            server.config.logger.warn(
              'Fiche locale non mise à jour : vérifiez les adresses locales.',
            );
          if (again) {
            again = false;
            rebuild();
          }
        };
        child.once('error', () => finished(1));
        child.once('exit', finished);
      };
      server.watcher.add(envFile);
      server.watcher.on('change', (path) => {
        if (resolve(path) === envFile) rebuild();
      });
      server.watcher.on('add', (path) => {
        if (resolve(path) === envFile) rebuild();
      });
      rebuild();
    },
  };
}
