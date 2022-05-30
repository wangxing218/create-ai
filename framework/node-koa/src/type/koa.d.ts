import { BaseContext } from 'koa'
/**
 * Context属性扩展
 */
declare module 'koa' {
  interface BaseContext {
    user: User
    version: string
  }
}
