// 错误
export function error(msg: string, code: number = 999) {
  return {
    code,
    msg,
  } as Result<void>
}

// 成功
export function success<T>(result: T) {
  return {
    code: 0,
    msg: 'ok',
    result,
  } as Result<T>
}

// 列表
export function list<T>(rows: T[], total: number = 0) {
  return {
    code: 0,
    msg: 'ok',
    result: {
      rows,
      total,
    },
  } as ResultPage<T>
}

export default {
  error,
  success,
  list,
}
