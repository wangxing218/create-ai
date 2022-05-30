/**
 * 公共返回类
 */
interface Result {
  code: number
  msg: string
}
interface Result<T> {
  result: T
}
interface Page<T> {
  rows: T[]
  total: number
}
interface ResultPage<T> extends Result {
  code: number
  msg: string
  result: Page<T>
}

// 公共请求参数
type Params = {
  id?: string | number
  name?: string
  pageIndex?: number
  pageSize?: number
  keywords?: string
  startTime?: string
  endTime?: string
  status?: string | number
}
