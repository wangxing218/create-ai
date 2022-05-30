import { system } from '@/config'
import { Context, Next } from 'koa'
import { log } from '@/lib/log'
import { error } from '@/util/resp'

/**
 * 统一错误处理
 * @returns Function
 */
export const errorsHandler = () => {
  return async (ctx: Context, next: Next) => {
    const start = Date.now()
    try {
      await next()
      if (ctx.status === 404) {
        ctx.status = 404
        ctx.body = '404 Not Found!'
        return
      }
      if (system.isDev && ctx.type.toLowerCase() === 'application/json') {
        ctx.body = JSON.stringify(ctx.body, null, 2)
      }
    } catch (err: any) {
      const errs: Error = err
      ctx.body = error(errs.message || '服务器错误!')
      log.error(errs.stack || errs)
    } finally {
      log.info(`[path=${ctx.path}] 耗时 ${Date.now() - start} ms`)
    }
  }
}
