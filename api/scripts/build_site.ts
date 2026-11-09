// Construit le site Astro (../web) et le copie dans public/, avant `node ace build` qui copie
// public/ dans build/. Lancé par `pnpm build`, donc par le déploiement Plesk.
import { execFileSync } from 'node:child_process'
import { cpSync, readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path'

export function publishSite(distDir: string, publicDir: string) {
  for (const entry of readdirSync(publicDir)) {
    if (entry !== '.gitignore') rmSync(join(publicDir, entry), { recursive: true, force: true })
  }
  cpSync(distDir, publicDir, { recursive: true })
}

if (import.meta.main) {
  const apiDir = join(import.meta.dirname, '..')
  const webDir = join(apiDir, '..', 'web')
  const pnpm = (args: string[], env: NodeJS.ProcessEnv = process.env) =>
    execFileSync('pnpm', ['--dir', webDir, ...args], { stdio: 'inherit', env })

  // Les outils de construction sont des devDependencies : ne pas les sauter si NODE_ENV=production.
  pnpm(['install', '--frozen-lockfile'], { ...process.env, NODE_ENV: 'development' })
  pnpm(['run', 'build'])
  publishSite(join(webDir, 'dist'), join(apiDir, 'public'))
}
