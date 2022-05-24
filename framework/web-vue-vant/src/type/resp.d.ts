// 公共返回类-msg
interface Result {
  code: number
  msg: string
}

// 公共返回类-信息
interface Result<T> {
  code: number
  msg: string
  result: T
}

// 公共返回类-列表
interface PageResult<T> extends Result {
  result: {
    data: T[]
    total: number
  }
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
