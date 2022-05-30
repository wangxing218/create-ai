import { Eureka, EurekaClient } from 'eureka-js-client'
import { eureka, system } from '@/config'
import { name } from 'package.json'
import os from 'os'
import { log } from '@/lib/log'

///获取本机ip
function getIPAdress(): string {
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
const ip = getIPAdress()

export const client = new Eureka({
  eureka: {
    fetchRegistry: eureka.fetch,
    registerWithEureka: eureka.registry,
    serviceUrls: {
      default: eureka.service,
    },
  },
  logger: log,
  instance: {
    instanceId: `${os.hostname()}:${name}:${system.port}`,
    hostName: ip,
    app: name,
    vipAddress: name,
    ipAddr: ip,
    homePageUrl: `http://${ip}:${system.port}/`,
    statusPageUrl: `http://${ip}:${system.port}/info`,
    healthCheckUrl: `http://${ip}:${system.port}/health`,
    port: {
      $: system.port,
      '@enabled': true,
    },
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
})
// 获取eureka所有实例
interface EurekaInstances {
  [key: string]: EurekaClient.EurekaInstanceConfig[]
}
export function getAllInstances(): EurekaInstances {
  return (client as any).cache.app
}
