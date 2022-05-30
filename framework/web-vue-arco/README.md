# 移动端 h5 开发框架

## 框架简介

利用目前最新的 vite2 搭建的 vue3 前端开发框架，兼容 safari,chrome 等主流浏览器；  
集成 mock 数据模拟服务，可以实现无任何其他依赖的前端开发；  
使用最少的 package 依赖，实现最快的编译速度和最稳定高效的代码产出。依赖包大小仅 50M；集成
Typescript，更好的类型推断和智能提示，助力大型应用开发

## 技术栈组合

- vite @2.x
- vue @3.x
- pinia @2.x
- vue-router @4.x
- axios @0.27.x
- arco-design @2.x

## 环境要求

- 系统： win10/7、macOS
- 工具: VSCode 最新版
- NODE: > v12.0

## 快速开始

由于国内网络原因，在正式开发项目之前，建议设置 npm 淘宝源；

```bash
npm config set registry https://registry.npmmirror.com/
```

安装依赖并运行

```bash
npm install
npm run dev
```

按控制台提示点击打开 http://localhost:9000  
 _您还可以打开在线文档和数据模拟模拟服务： http://localhost:9000/api/_  
 命令说明:

```bash
npm run dev   # 开发环境会启动本地server
npm run build  # 生产环境打包
```

## 目录规范

_注：所有目录名都采用小写加横线间隔，所有组件的文件名以首字母大写的驼峰命令_

| 目录                | 说明                                 |
| ------------------- | ------------------------------------ |
| .vscode             | 编辑器配置文件                       |
| dist                | 打包目录                             |
| mock                | 模拟数据服务                         |
| public              | 静态文件目录，最终与打包后的目录合并 |
| src                 | 业务代码目录                         |
| ├─ asset            | 资源                                 |
| ├─ ├─ css           | 模块样式                             |
| ├─ ├─ font          | 图标字体                             |
| ├─ ├─ image         | 模块图片                             |
| ├─ component        | 业务组件                             |
| ├─ page             | 页面                                 |
| ├─ router           | 页面路由                             |
| ├─ service          | 业务逻辑                             |
| ├─ store            | 全局状态                             |
| ├─ .env             | 全局环境变量                         |
| ├─ .env.development | 开发环境变量，覆盖.env               |
| ├─ App.vue          | 页面根组件                           |
| ├─ env.d.ts         | 全局 ts 申明                         |
| ├─ index.html       | 入口 html                            |
| ├─ main.ts          | 主入口                               |
| -.editorconfig      | 编辑器规范配置                       |
| -.gitignore         | git 文件排除                         |
| -.prettierrc.js     | 格式化规则，需要安装 prettier 插件   |
| -package.json       | 依赖包和启动脚本                     |
| -README.md          | 说明文档                             |
| -vite.config.js     | vite 配置文件                        |
