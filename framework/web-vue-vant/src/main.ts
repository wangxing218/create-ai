import { createApp } from 'vue'
import '@css/common.scss'
import App from './App.vue'
import router from './router'

// 组件
import { Button, Toast } from 'vant'

const app = createApp(App)
app.use(router).use(Button).use(Toast)
app.mount('#app')
