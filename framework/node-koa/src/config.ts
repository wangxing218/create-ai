import { merge } from 'lodash'

/**
 * 配置文件
 */
const config = {
  system: {
    isDev: process.env.NODE_ENV === 'development',
    env: process.env.NODE_ENV,
    host: '0.0.0.0',
    port: 3000,
    cluster: 0, // 多进程，0不启用，1按cpu核心数自动启用，number>1按配置个数启用
  },
  eureka: {
    service: ['http://10.50.60.201:33850/eureka/apps'],
    registry: true,
    fetch: true,
  },
  sso: {
    clientId: 'pcp',
    clientSecret: '123456',
    uri: 'http://pcp-dev.agilines.cn:85',
  },
  log: {
    type: 'file,console',
    level: 'info',
    filename: 'logs/app.log',
  },
  redis: {
    uri: 'redis://10.50.70.1:36379',
    password: '0Ckd1HohgbJ7',
    database: 0,
  },
  database: {
    uri: 'mysql://127.0.0.1:3306/test',
    username: 'root',
    password: '123456',
  },
  mongo: {
    uri: 'mongodb://10.50.70.2:27017/admin',
    username: 'admin',
    password: 'RXuFKKJGC9D6',
  },
}

// 不同环境覆盖
try {
  merge(config, require(process.cwd() + '/config'), true)
} catch {}

export = config
