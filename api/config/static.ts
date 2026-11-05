import { defineConfig } from '@adonisjs/static'

/**
 * Le site Astro (web/dist) est copié dans `public/` au déploiement : AdonisJS sert
 * les pages statiques, l'API répond sous /api/v1.
 */
const staticServerConfig = defineConfig({
  enabled: true,
  etag: true,
  lastModified: true,
  // .well-known (security.txt, validation du certificat) doit rester accessible.
  dotFiles: 'allow',
  // Les fichiers de _astro portent un hachage dans leur nom : cache longue durée.
  headers: (path) => ({
    'Cache-Control': path.includes('/_astro/')
      ? 'public, max-age=31536000, immutable'
      : /\.(png|jpe?g|webp|svg|ico|woff2)$/.test(path)
        ? 'public, max-age=2592000'
        : 'public, max-age=0, must-revalidate',
  }),
})

export default staticServerConfig
