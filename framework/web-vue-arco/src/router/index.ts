import { createRouter, createWebHistory } from 'vue-router'

// page
import BaseLogin from '../page/base/Login.vue'
import BaseLayout from '../page/base/Layout.vue'
import BaseHome from '../page/base/Home.vue'

// router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      component: BaseLogin,
      name: 'BaseLogin',
    },
    {
      path: '/',
      component: BaseLayout,
      children: [
        {
          path: '/',
          component: BaseHome,
          name: 'BaseHome',
        },
      ],
    },
  ],
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
