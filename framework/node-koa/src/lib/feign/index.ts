import { getInstance } from '@/lib/register'
import qs from 'querystring'
import axios, { AxiosRequestConfig } from 'axios'

import { eureka } from '@/config'

// feign 调用入参
interface FeignOptions {
  /**
   * 微服务名
   */
  service: string
  /**
   * url地址
   */
  url: string
  /**
   * 请求方式
   * @default get
   */
  method?: 'get' | 'post' | 'put' | 'delete'
  /**
   * url参数
   */
  query?: Record<string, any>
  /**
   * 请求体
   */
  data?: any
  /**
   * 请求格式
   * @default json
   */
  accept?: 'json' | 'form' | 'formData' | 'text'
  /**
   * headers请求头
   */
  headers?: Record<string, string>
  /**
   * token
   */
  token?: string
  /**
   * 超时时间
   */
  timeout?: number
}

// axios实例与代理
const axiosInstance = axios.create()
if (eureka.proxy) {
  const pUrl = new URL(eureka.proxy)
  axiosInstance.defaults.proxy = {
    host: pUrl.hostname,
    port: Number(pUrl.port),
  }
}

// feign 调用
export const feign = async (options: FeignOptions, extOptions?: AxiosRequestConfig) => {
  // 获取服务
  const target = await getInstance(options.service)

  // 请求转换
  const cTypeMaps = {
    json: 'application/json',
    form: 'application/x-www-form-urlencoded',
    formData: 'multipart/form-data',
    text: 'text/plain',
  }
  const headers: Record<string, any> = {
    ...options.headers,
    'Content-Type': cTypeMaps[options.accept || 'json'],
  }
  if (options.token) {
    headers['Authorization'] = 'Bearer ' + options.token
  }
  let data = options.data
  if (options.accept === 'form' && typeof data === 'object') {
    data = qs.stringify(data)
  }

  // do request
  return axiosInstance({
    ...extOptions,
    baseURL: target,
    url: options.url,
    method: options.method || 'get',
    params: options.query,
    data,
    headers,
    timeout: options.timeout,
  })
}
