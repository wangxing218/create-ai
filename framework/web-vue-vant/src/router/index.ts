import { createRouter, createWebHistory } from 'vue-router'

// page
import Index from '../page/Index.vue'
import Info from '../page/Info.vue'

// router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Index,
      name: 'Index',
    },
    {
      path: '/info',
      component: Info,
      name: 'Info',
    },
    {
      path: '/msg',
      component: () => import('../page/Msg.vue'),
      name: 'Msg',
    },
  ],
})

export default router
