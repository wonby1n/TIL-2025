import FavoriteView from '@/views/FavoriteView.vue'
import ProductView from '@/views/ProductView.vue'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/products',
      name: 'products',
      component: ProductView
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: FavoriteView
    },
  ],
})

export default router
