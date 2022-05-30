import { createClient } from 'redis'
import { redis as config } from '@/config'
import { log } from '@/lib/log'

export const redis = createClient({
  url: config.uri,
  database: config.database,
  password: config.password,
})

redis.on('connect', () => {
  log.info('redis connect success')
})

redis.on('error', (err: Error) => {
  log.error('redis connect error', err)
})

redis.connect()
