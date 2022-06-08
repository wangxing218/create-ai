import { App } from 'vue'
import Main from './HelloWorld.vue'

export default {
  ...Main,
  install: (app: App) => {
    app.component(Main.name, Main)
  },
}
