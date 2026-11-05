import { test } from '@japa/runner'

test.group('Santé', () => {
  test('/up répond sans base de données', async ({ client }) => {
    const response = await client.get('/up')

    response.assertStatus(200)
    response.assertBodyContains({ status: 'ok' })
  })

  test('/api/v1/health indique que la base est joignable', async ({ client }) => {
    const response = await client.get('/api/v1/health')

    response.assertStatus(200)
    response.assertBody({ status: 'ok', database: true })
  })

  test('les réponses portent les en-têtes de sécurité', async ({ client, assert }) => {
    const response = await client.get('/up')

    assert.equal(response.header('x-content-type-options'), 'nosniff')
    assert.equal(response.header('x-frame-options'), 'SAMEORIGIN')
  })

  test('une route inconnue de l’API répond en JSON 404', async ({ client, assert }) => {
    const response = await client.get('/api/v1/inconnu')

    response.assertStatus(404)
    assert.include(response.header('content-type'), 'application/json')
  })
})
