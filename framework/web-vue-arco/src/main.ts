import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@css/common.scss'
import App from './App.vue'
import router from './router'

import '@arco-design/web-vue/dist/arco.css'

// 组件
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(ArcoVue)
app.use(ArcoVueIcon)
app.mount('#app')
