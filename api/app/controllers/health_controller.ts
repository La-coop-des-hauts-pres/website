import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'

export default class HealthController {
  async handle({ response }: HttpContext) {
    const database = await db
      .rawQuery('select 1')
      .then(() => true)
      .catch(() => false)

    return response.status(database ? 200 : 503).send({
      status: database ? 'ok' : 'degraded',
      database,
    })
  }
}
