import { redis } from './../lib/redis/index'
import { error, list, success } from '@/util/resp'
import Router from 'koa-router'
import { userModel } from '@/model/user'

const router = new Router()

// 获取系统请求参数
router.all('/params', (ctx) => {
  ctx.body = success({
    query: ctx.query,
    post: ctx.request.body,
  })
})

// 返回列表
router.get('/list', (ctx) => {
  const rows: User[] = new Array(10)
    .fill(null)
    .map((_, index) => ({ id: index + 1 + '', name: '张三' }))
  const total = 123
  ctx.body = list<User>(rows, total)
})

// 错误信息
router.get('/error', (ctx) => {
  ctx.body = error('应用发生了错误')
})

// Redis信息
router.get('/redis', async (ctx) => {
  redis.set('test:user', '这是一个非常有用的缓存')
  const caches = await redis.get('test:user')
  ctx.body = success({
    redis: caches,
  })
})

// mysql 列表
router.get('/mysql', async (ctx) => {
  const query = ctx.query
  console.log('query :>> ', query)
  const users = await userModel.findAndCountAll({
    limit: 5,
    offset: 1,
    order: [['id', 'desc']],
  })
  ctx.body = list(users.rows, users.count)
})

export default router
