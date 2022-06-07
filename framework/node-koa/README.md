# nodejs 后端开发框架

## 简介

轻量级 nodejs 后端开发框架，利用最少的依赖（依赖包大小仅 30M+），集成路由、验证、关系数据库
、redis、eureka、日志等常用功能。使用 typescript 开发，完善的类型校验与代理智能提示，毫秒级热加载，
丝滑般的开发体验。

## 技术栈组合

- 开发：nodemon + esbuild
- 框架：koa + koa-router + validator
- 组件：redis + mysql + sequelize + log4js

## 快速开始

- 环境建议： nodejs >= 14.0
- 开发环境：

  ```bash
  npm install
  npm run dev
  ```

  **_按控制台提示，打开 http://localhost:3000/_**

- 生产环境:

  ```bash
  # 打包: 项目根目录执行命令
  npm run build
  # dist文件夹下会产生 main.js config.js package.json package-lock.json四个文件
  ```

  ```bash
  # 部署：复制dist目录里的文件到生产环境
  # 安装生产依赖
  npm install --production
  # 启动
  npm start
  # 或 node main.js
  # 或 pm2 start main.js --name node-koa
  ```

## 目录结构

| 目录              | 说明                            |
| ----------------- | ------------------------------- |
| .vscode           | 编辑器配置文件                  |
| dist              | 编译后的件，用于生成环境部署    |
| scripts           | 构建脚本                        |
| src               | 业务代码                        |
| ├─lib             | 第三方类库                      |
| ├─middleware      | 中间件                          |
| ├─model           | 模型                            |
| ├─router          | 路由                            |
| ├─service         | 逻辑层                          |
| ├─type            | 类型申明                        |
| ├─util            | 工具类                          |
| ├─app.ts          | 应用实例                        |
| ├─config.ts       | 默认配置                        |
| ├─main.ts         | 主入口                          |
| .editorconfig     | 编辑器配置                      |
| .gitignore        | 排除文件                        |
| .prettierrc.js    | 排除文件                        |
| config.js         | 系统配置文件,覆盖 src/config.ts |
| package.json      | 依赖                            |
| package-lock.json | 依赖锁定                        |
| tsconfig.json     | ts 配置                         |
