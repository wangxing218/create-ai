import Redis from 'ioredis'
import { redis as config } from '@/config'
import { log } from '@/lib/log'

function getRedisConn() {
  // 小哨兵
  if (config.nodes && config.nodes.length) {
    return new Redis({
      sentinels: config.nodes.split(',').map((item: string) => {
        const uri = item.split(':')
        return {
          host: uri[0],
          port: Number(uri[1]) || 6379,
        }
      }),
      name: config.name,
      password: config.password,
      db: config.database,
    })
  }
  // 单节点
  return new Redis(config.uri, {
    db: config.database,
    password: config.password,
  })
}

export const redis = getRedisConn()

redis.on('connect', () => {
  log.info('redis connect success')
})

redis.on('error', (err: Error) => {
  log.error('redis connect error', err)
})
