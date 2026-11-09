import { test } from '@japa/runner'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { publishSite } from '../../scripts/build_site.js'

test.group('publishSite', () => {
  test('remplace le contenu de public/ par le site construit et garde .gitignore', ({ assert }) => {
    const root = mkdtempSync(join(tmpdir(), 'build-site-'))
    const dist = join(root, 'dist')
    const pub = join(root, 'public')
    mkdirSync(join(dist, '_astro'), { recursive: true })
    mkdirSync(join(pub, 'ancien'), { recursive: true })
    writeFileSync(join(dist, 'index.html'), '<h1>Coop</h1>')
    writeFileSync(join(dist, '_astro', 'app.js'), '')
    writeFileSync(join(pub, '.gitignore'), '*')
    writeFileSync(join(pub, 'ancien', 'page.html'), '')

    publishSite(dist, pub)

    assert.equal(readFileSync(join(pub, 'index.html'), 'utf8'), '<h1>Coop</h1>')
    assert.isTrue(existsSync(join(pub, '_astro', 'app.js')))
    assert.isTrue(existsSync(join(pub, '.gitignore')))
    assert.isFalse(existsSync(join(pub, 'ancien')))
  })
})
