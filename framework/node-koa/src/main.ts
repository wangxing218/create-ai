import { log } from '@/lib/log'
import cluster from 'cluster'
import { system } from '@/config'
import os from 'os'

const nums = system.cluster
const cpus = os.cpus().length

if (nums < 1) {
  require('./app')
} else if (cpus < 2) {
  // 判断当前环境是否支持多进程
  log.warn('当前CPU核心数不支持启用多进程')
  require('./app')
} else if (cluster.isWorker) {
  // 当前为Worker进程
  require('./app')
} else {
  // 当前为主进程
  const appNums = nums === 1 ? cpus : nums
  log.debug(`当前为主进程：[PID=${process.pid}]`)
  log.debug(`启动多进程： ${appNums} 个`)
  for (let i = 0; i < appNums; i++) {
    cluster.fork()
  }
}
