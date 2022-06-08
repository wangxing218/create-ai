import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { ElScrollbar, ElLoading } from 'element-plus'

// 组件
const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ElScrollbar)
app.use(ElLoading)
app.mount('#app')
import '@css/common.scss'
