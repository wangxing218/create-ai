import { get, post } from './ajax'

/**
 * 获取用户信息
 */
export function getUserInfo(id: number): Promise<Result<UserInfo>> {
  return get('/data', { id })
}

/**
 * 获取列表
 */
export function getUserList(data: Params): Promise<PageResult<ListItem>> {
  return post('/list', data)
}
