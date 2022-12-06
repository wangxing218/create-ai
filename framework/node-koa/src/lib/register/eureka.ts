import { Eureka, EurekaClient } from 'eureka-js-client'
import { eureka, system } from '@/config'
import { name } from 'package.json'
import os from 'os'
import { log } from '@/lib/log'
import { getIPAdress } from '.'

///获取本机ip
const ip = getIPAdress()

// eureka 链接实例
const services = typeof eureka.service === 'string' ? eureka.service.split(',') : eureka.service
export const client = new Eureka({
  eureka: {
    fetchRegistry: eureka.fetch,
    registerWithEureka: eureka.registry,
    serviceUrls: {
      default: services.map((url) => url + '/apps'),
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

// 启动注册
export async function start() {
  return client.start()
}

// 获取指定实例
export function getInstance(serviceName: string): Promise<string> {
  const allInstaneces = getAllInstances()
  const targetIns = allInstaneces[serviceName.toUpperCase()]
  if (!targetIns || !targetIns.length) {
    throw new Error(`Service ${serviceName} not existed !`)
  }
  const ins = allInstaneces[serviceName.toUpperCase()].filter((item) => item.status === 'UP')
  if (ins.length === 0) {
    throw new Error(`Service ${serviceName} not work !`)
  }
  return Promise.resolve(ins[Math.floor(Math.random() * ins.length)].homePageUrl || '')
}
