import MainView from '@/views/MainView.vue'
import PostListView from '@/views/PostListView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainView,
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostListView,
    },
  ],
})

export default router
