import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
import nprogress from 'nprogress'
import { ElMessage as Message } from 'element-plus'
import 'nprogress/nprogress.css'
nprogress.configure({
  showSpinner: false,
})

// 请求参数扩展
interface RequestConfig extends AxiosRequestConfig {
  /**
   * 自动提示错误信息
   */
  errTip: boolean | Function
  /**
   * 返回成功的code
   */
  successCode: number | string
  /**
   * 是否显示进度条
   */
  progress: boolean
  /**
   * 请求方式
   */
  requestType: 'form' | 'file' | ''
}

// 通用配置
const DefaultConfig: RequestConfig = {
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 8e3,
  errTip: true,
  successCode: 0,
  progress: true,
  requestType: '',
}

// 通用实例
const instance = axios.create(DefaultConfig)

// 请求拦截
instance.interceptors.request.use((config) => {
  const opt = config as RequestConfig
  if (opt.requestType) {
    ;(opt.headers as any)['Content-Type'] =
      opt.requestType === 'form' ? 'application/x-www-form-urlencoded' : 'multipart/form-data'
  }
  if (opt.requestType === 'form') {
    opt.data = qs.stringify(opt.data, { arrayFormat: 'repeat' })
  }
  return opt
})

/**
 * ajax请求
 * @param {*} opt
 */
const ajax = async (opt: RequestConfig) => {
  const config = {
    ...DefaultConfig,
    ...opt,
  }
  // 请求处理
  if (config.progress === true) {
    nprogress.start()
    nprogress.inc(0.6)
  }
  // 自动处理错误
  function handleError(err: any) {
    if (config.errTip === true) {
      Message.error(err.msg || err.message || 'Request Error')
    } else if (typeof config.errTip === 'function') {
      config.errTip(err)
    }
    return Promise.reject(err)
  }
  // 发起请求
  try {
    const resp = await instance(config)
    const res = resp.data
    if (typeof res === 'string') return Promise.resolve(res)
    if (res.code !== config.successCode) return handleError(res)
    return Promise.resolve(res)
  } catch (error) {
    return handleError(error)
  } finally {
    nprogress.done()
  }
}

/**
 * 提交get请求
 * @param {string} url
 * @param {object} params
 * @param {RequestConfig} opt
 */
export const get = (url: string, params: any = {}, opt?: RequestConfig) => {
  return ajax({
    ...(opt as RequestConfig),
    url,
    params,
    method: 'get',
  })
}

/**
 * 提交post请求
 * @param {string} url
 * @param {object} data
 * @param {RequestConfig} opt
 */
export const post = (url: string, data: any = {}, opt?: RequestConfig) => {
  return ajax({
    ...(opt as RequestConfig),
    method: 'post',
    url,
    data,
  })
}

/**
 * ajax上传文件请求
 * @param {string} url
 * @param {object} data
 * @param {RequestConfig} opt
 */
export const postFile = (url: string, data: any = {}, opt?: RequestConfig) => {
  let formData = new FormData()
  for (let key in data) {
    formData.append(key, data[key])
  }
  return ajax({
    ...(opt as RequestConfig),
    method: 'post',
    requestType: 'file',
    url,
    data: formData,
  })
}

/**
 * 提交post form请求
 * @param {string} url
 * @param {object} data
 * @param {RequestConfig} opt
 */
export const postForm = (url: string, data = {}, opt?: RequestConfig) => {
  return ajax({
    ...(opt as RequestConfig),
    method: 'post',
    requestType: 'form',
    url,
    data,
  })
}

export default ajax
