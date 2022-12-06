import os from 'os'
import config from '@/config'
import * as nacos from './nacos'
import * as eureka from './eureka'

// 判断当前注册中心
export const isNacos = config.nacos && config.nacos.service

// 获取client
export const client = isNacos ? nacos.client : eureka.client

// 启动注册
export function start() {
  if (isNacos) return nacos.start()
  return eureka.start()
}

// 获取指定实例
export async function getInstance(serviceName: string, group?: string): Promise<string> {
  return isNacos ? nacos.getInstance(serviceName, group) : eureka.getInstance(serviceName)
}

///获取本机ip
export function getIPAdress(): string {
  const interfaces = os.networkInterfaces()
  let address = ''
  for (var devName in interfaces) {
    const iface = interfaces[devName]
    if (!Array.isArray(iface)) return ''
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        address = address && devName.includes('WLAN') ? address : alias.address
      }
    }
  }
  return address
}
