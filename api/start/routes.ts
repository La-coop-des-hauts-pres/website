import router from '@adonisjs/core/services/router'

const HealthController = () => import('#controllers/health_controller')

// Sonde de disponibilité sans base de données (supervision, Plesk).
router.get('/up', ({ response }) => response.send({ status: 'ok' }))

router
  .group(() => {
    router.get('health', [HealthController, 'handle']).as('api.v1.health')
  })
  .prefix('/api/v1')
