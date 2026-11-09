import { test } from '@japa/runner'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { publishSite } from '../../scripts/build_site.js'

function siteConstruit() {
  const root = mkdtempSync(join(tmpdir(), 'build-site-'))
  const dist = join(root, 'dist')
  mkdirSync(join(dist, '_astro'), { recursive: true })
  writeFileSync(join(dist, 'index.html'), '<h1>Coop</h1>')
  writeFileSync(join(dist, '_astro', 'app.js'), '')
  return { dist, pub: join(root, 'public') }
}

test.group('publishSite', () => {
  test('remplace tout le contenu de public/ par le site construit', ({ assert }) => {
    const { dist, pub } = siteConstruit()
    mkdirSync(join(pub, 'ancien'), { recursive: true })
    writeFileSync(join(pub, '.gitignore'), '*')

    publishSite(dist, pub)

    assert.equal(readFileSync(join(pub, 'index.html'), 'utf8'), '<h1>Coop</h1>')
    assert.isTrue(existsSync(join(pub, '_astro', 'app.js')))
    assert.isFalse(existsSync(join(pub, 'ancien')))
    assert.isFalse(existsSync(join(pub, '.gitignore')))
  })

  test('crée public/ s’il n’existe pas', ({ assert }) => {
    const { dist, pub } = siteConstruit()

    publishSite(dist, pub)

    assert.isTrue(existsSync(join(pub, 'index.html')))
  })
})
