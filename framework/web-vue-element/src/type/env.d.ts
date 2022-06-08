/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// 环境变量
interface ImportMetaEnv {
  /**
   * api请求前辍
   */
  readonly VITE_BASE_API: string
  readonly VITE_APP_TITLE: string
  // 更多环境变量...
}
