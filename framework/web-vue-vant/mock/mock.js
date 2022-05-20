/**
 * 接口文档
 */
const { api, resp, mock } = require('apite')

/**
 * data
 */
api.get('/data', (ctx) =>
  resp.mock({
    id: 1,
    name: '@cname',
    query: ctx.query,
    post: ctx.post,
  }),
)

// mock list
api.get('/list', () =>
  resp.mock({
    'data|10': [
      {
        id: '@id',
        name: '@cname',
        createTime: '@dateTime',
      },
    ],
    total: 393,
  }),
)
