import cluster from 'cluster'
import Koa from 'koa'
import body from 'koa-body'

import { system } from '@/config'
import { log } from '@/lib/log'
import { errorsHandler } from '@/middleware/errors'
import router from '@/router'
import { start } from '@/lib/register'

const app = new Koa()
app.use(errorsHandler())
app.use(
  body({
    multipart: true,
  }),
)
app.use(router.routes())

app.listen(system.port, system.host, () => {
  const url = new URL(`http://${system.host}:${system.port}`)
  url.hostname = url.hostname === '0.0.0.0' ? '127.0.0.1' : url.hostname
  log.debug(`${cluster.isWorker ? 'Worker进程' : 'Master进程'} [PID = ${process.pid}] `)
  log.info(`Server is running at: ${url}`)
  // start()
})
