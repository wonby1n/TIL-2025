import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '@/views/TodoView.vue'
import DetailView from '@/views/DetailView.vue'
import LoginView from '@/views/LoginView.vue'
import SignUpView from '@/views/SignUpView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TodoView',
      component: TodoView
    },
    {
      path: '/todo/:id',
      name: 'DetailView',
      component: DetailView
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'SignUpView',
      component: SignUpView
    },
  ]
})

export default router
