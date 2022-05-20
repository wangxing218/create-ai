#!/usr/bin/env node
const prompts = require('prompts')
const { red, green } = require('kolorist')

;(async function () {
  // 终端数据
  const info = {
    // 项目
    project: '',
    // 模板
    template: '',
  }

  let result = {}
  try {
    result = await prompts(
      [
        {
          type: 'text',
          name: 'project',
          message: '请输入项目名称:',
          initial: 'ai-demo',
        },
        {
          type: 'select',
          name: 'template',
          message: '请选择框架',
          choices: [
            {
              value: 'web-vue-vant',
              title: 'Web-H5: vite + vue + vant 【移动端h5开发框架】',
              selected: true,
            },
            {
              value: 'web-vue-arco',
              title: 'Web-PC: vite + vue + acro-design 【企业级PC端后台】',
            },
            {
              value: 'node-koa',
              title: 'Node-koa: koa + ts + sequelize 【轻量级nodejs后台】',
            },
            {
              value: 'java-springboot',
              title: 'Java-srpingboot: springboot + vue 【企业级Java后端】',
            },
          ],
        },
      ],
      {
        onCancel: () => {
          throw new Error(`${red('×')} 操作被终止`)
        },
      },
    )
  } catch (error) {
    console.log(error.message)
    return
  }

  // 结果
  console.log('info :>> ', result)
})()
