import app from '@adonisjs/core/services/app'
import { type HttpContext, ExceptionHandler } from '@adonisjs/core/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  protected debug = !app.inProduction

  async handle(error: unknown, ctx: HttpContext) {
    // Toute l'API répond en JSON, y compris pour une route inconnue.
    if (ctx.request.url().startsWith('/api/'))
      ctx.request.request.headers.accept = 'application/json'

    // Page inconnue du site (hors API) : 404.html du site statique.
    if (this.isUnknownSitePage(error, ctx)) {
      const notFound = app.publicPath('404.html')
      return ctx.response.status(404).download(notFound)
    }
    return super.handle(error, ctx)
  }

  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }

  private isUnknownSitePage(error: unknown, ctx: HttpContext) {
    const status = (error as { status?: number }).status
    return status === 404 && !ctx.request.url().startsWith('/api/')
  }
}
