#!/usr/bin/env node
const prompts = require('prompts')
const fs = require('fs')
const path = require('path')
const { red, green } = require('kolorist')
const argv = require('minimist')(process.argv.slice(2))
const { version } = require('./package.json')

;(async function () {
  // 版本
  const ver = argv.version || argv.v
  if (ver) {
    console.log(green(`v${version}`))
    return
  }

  // 终端数据
  let info = {
    // 项目名称
    projectName: '',
    // 选择模板
    template: '',
    // 覆盖方式, 0退出, 1覆盖, 2清空后再覆盖
    overwrite: 0,
  }

  // 选择结果
  let result = {}
  try {
    result = await prompts(
      [
        // 项目名称
        {
          type: 'text',
          name: 'projectName',
          message: '请输入项目名称:',
          initial: 'ai-demo',
          onState: (state) => (info.projectName = state.value.trim().replace(/\/+$/g, '') || 'ai-demo'),
        },
        // 判断是否存在且覆盖
        {
          type: () => (isEmpty(cwdDir(info.projectName)) ? null : 'select'),
          name: 'overwrite',
          message: () => (info.projectName === '.' ? '当前文件夹' : `文件夹"${info.projectName}"`) + ` 不为空, 是否覆盖?`,
          choices: [
            {
              value: 0,
              title: '退出',
            },
            {
              value: 1,
              title: '覆盖',
            },
            {
              value: 2,
              title: '清空后再覆盖',
            },
          ],
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === 0) stopAction()
            return null
          },
          name: 'overwriteChecker',
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
              value: 'web-vue-element',
              title: 'Web-PC: vite + vue + element-plus 【企业级PC端后台】',
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
        onCancel: stopAction,
      },
    )
  } catch (error) {
    console.log(error.message)
    return
  }

  // 结果
  info = { ...result }
  const targetDir = cwdDir(info.projectName)
  const sourceDir = rootDir('framework', info.template)
  if (info.overwrite === 2) {
    emptyDir(targetDir)
  }
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir)
  }
  try {
    copy(sourceDir, targetDir, ['node_modules', 'dist'])
    console.log(
      green(`
  项目初始化成功，请按以下命令执行：
  cd ${info.projectName}
  npm install
  npm run dev`),
    )
  } catch (error) {
    console.log(red('文件复制失败：'), error)
  }
})()

// 操作终止
function stopAction() {
  throw new Error(`${red('×')} 操作被终止`)
}

// 当前命令行所在文件夹位置
function cwdDir(...dir) {
  return path.resolve(process.cwd(), ...dir)
}

// 当前项目位置
function rootDir(...dir) {
  return path.resolve(__dirname, ...dir)
}

// 判断文件夹是否为空
function isEmpty(path) {
  if (!fs.existsSync(path)) return true
  const files = fs.readdirSync(path)
  return files.length === 0 || (files.length === 1 && files[0] === '.git')
}

// 清空文件夹
function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file)
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs)
      fs.rmdirSync(abs)
    } else {
      fs.unlinkSync(abs)
    }
  }
}

// 复制文件夹
function copy(src, dest, excludes) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    if (excludes && excludes.includes(path.basename(src))) return
    fs.mkdirSync(dest, { recursive: true })
    for (const file of fs.readdirSync(src)) {
      const srcFile = path.resolve(src, file)
      const destFile = path.resolve(dest, file)
      copy(srcFile, destFile, excludes)
    }
  } else {
    fs.copyFileSync(src, dest)
  }
}
