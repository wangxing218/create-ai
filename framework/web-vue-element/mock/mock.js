/**
 * 接口文档
 */
const { api, resp, mock } = require('apite')

/**
 * data
 */
api.get('/login', (ctx) =>
  resp.mock({
    id: 1,
    name: '@cname',
    query: ctx.query,
    post: ctx.post,
  }),
)

/**
 * verify
 */
api.get('/verify', (ctx) => {
  ctx.captcha()
})

// mock list
api.get('/list', () =>
  resp.mock({
    'data|20': [
      {
        id: '@id',
        name: '@cname',
        createTime: '@dateTime',
      },
    ],
    total: 393,
  }),
)
