import { get, post } from './ajax'

/**
 * 获取用户信息
 */
export function loginUser(data: {
  phone: string
  password: string
  verify: string
  remember: boolean
}): Promise<Result<UserInfo>> {
  return get('/login', data)
}

/**
 * 获取列表
 */
export function getUserList(data: Params): Promise<PageResult<ListItem>> {
  return post('/list', data)
}
