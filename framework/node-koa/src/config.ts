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
    service: 'http://eureka.com/eureka',
    registry: true,
    fetch: true,
    proxy: '', // 访问微服务的代理
  },
  nacos: {
    service: '',
    namespace: 'public',
    group: 'DEFAULT_GROUP',
    registry: true,
    proxy: '', // 访问微服务的代理
  },
  sso: {
    clientId: 'client',
    clientSecret: '123456',
    uri: 'http://sso.abc.com',
  },
  log: {
    type: 'file,console',
    level: 'info',
    filename: 'logs/app.log',
  },
  redis: {
    uri: 'redis://127.0.0.1:36379',
    password: '123456',
    nodes: '',
    name: 'mymaster',
    database: 0,
  },
  database: {
    uri: 'mysql://127.0.0.1:3306/test',
    username: 'root',
    password: '123456',
  },
  mongo: {
    uri: 'mongodb://127.0.0.1:27017/admin',
    username: 'admin',
    password: '123456',
  },
}

// 不同环境覆盖
try {
  merge(config, require(process.cwd() + '/config'), true)
} catch {}

export = config
