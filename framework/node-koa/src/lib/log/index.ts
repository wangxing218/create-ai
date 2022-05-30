import log4js from 'log4js'
import config from '@/config'

const layout = {
  type: 'pattern',
  pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] - %m',
}

log4js.configure({
  appenders: {
    console: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%[[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p]% - %m',
      },
    },
    file: {
      type: 'dateFile',
      filename: config.log.filename,
      pattern: 'yyyy-MM-dd',
      keepFileExt: true,
      layout: {
        type: 'pattern',
        pattern: '[%d{yyyy-MM-dd hh:mm:ss.SSS}] [%p] - %m',
      },
    },
  },
  categories: {
    default: { appenders: config.log.type.split(','), level: config.log.level },
  },
})

export const log = log4js.getLogger()
