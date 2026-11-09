import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * En-têtes de sécurité posés sur les réponses de l'API et des pages d'erreur.
 */
export default class SecurityHeadersMiddleware {
  async handle({ response }: HttpContext, next: NextFn) {
    response.header('Strict-Transport-Security', 'max-age=31536000')
    response.header('X-Content-Type-Options', 'nosniff')
    response.header('X-Frame-Options', 'SAMEORIGIN')
    response.header('Referrer-Policy', 'strict-origin-when-cross-origin')
    response.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    return next()
  }
}
