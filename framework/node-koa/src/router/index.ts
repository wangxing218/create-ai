import Router from 'koa-router'

const router = new Router()

// import router components
import base from './base'

// mount with prefix
router.use('/base', base.routes())

export default router
