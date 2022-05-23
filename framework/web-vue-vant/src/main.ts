import { createApp } from 'vue'
import { createPinia } from 'pinia'

import '@css/common.scss'
import App from './App.vue'
import router from './router'

// 组件
import { Button, Toast } from 'vant'

const app = createApp(App)
app.use(router).use(Button).use(Toast).use(createPinia())
app.mount('#app')
