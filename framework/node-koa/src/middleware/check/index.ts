import { error } from '@/util/resp'
import { Context, Next } from 'koa'
import Schema, { Rules } from 'async-validator'

// 验证类型
type CheckType = 'AUTO' | 'QUERY' | 'BODY' | 'FILE'

/**
 * 参数验证中间件
 */
export function check(rules: Rules, type: CheckType = 'AUTO') {
  const validator = new Schema(rules)
  return async function (ctx: Context, next: Next) {
    const data = {
      QUERY: ctx.query,
      BODY: ctx.request.body,
      FILE: ctx.request.files,
      AUTO: ctx.method === 'GET' ? ctx.query : ctx.request.body,
    }[type]
    if (!Object.keys(rules).length) {
      await next()
      return
    }
    let errMsg = ''
    try {
      await validator.validate(
        { ...data },
        {
          first: true,
        },
      )
    } catch ({ errors, fields }) {
      if (!errors) return
      errMsg = (errors as any)[0]?.message || '校验失败'
    }
    if (errMsg) {
      ctx.body = error(errMsg, 600)
      return
    }
    await next()
  }
}
