import { NacosNamingClient } from 'nacos'
import { nacos, system } from '@/config'
import { name } from 'package.json'
import { log } from '@/lib/log'
import { getIPAdress } from '.'

///获取本机ip
const ip = getIPAdress()

// eureka 链接实例
export const client = new NacosNamingClient({
  logger: log as any,
  serverList: nacos.service.split(','),
  namespace: nacos.namespace,
})

// 注册
export async function start() {
  if (!nacos.registry) {
    return client.ready()
  }
  await client.ready()
  return client.registerInstance(name, {
    ip,
    port: system.port,
  })
}

// 获取指定实例
interface NacosInstance {
  ip: string
  port: number
  healthy: boolean
  enabled: boolean
  serviceName: string
}
export async function getInstance(serviceName: string, group?: string): Promise<string> {
  const targetIns = await client.getAllInstances(serviceName, group || nacos.group)
  if (!targetIns || !targetIns.length) {
    throw new Error(`Service ${serviceName} not existed !`)
  }
  const ins: NacosInstance[] = (targetIns as any[]).filter((item) => item.healthy && item.enabled)
  if (ins.length === 0) {
    throw new Error(`Service ${serviceName} not work !`)
  }
  const target = ins[Math.floor(Math.random() * targetIns.length)]
  return `http://${target.ip}:${target.port}/`
}
