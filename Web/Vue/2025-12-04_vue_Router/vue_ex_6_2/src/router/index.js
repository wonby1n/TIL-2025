import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import UserView from '@/views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/user/:username',
      name:'user',
      component: UserView,
      beforeEnter: (to, from) => {
        // username이 admin이 아니면 접근 금지
        const username = to.params.username;
        if (username !== "admin") {
          window.alert("관리자만 접근 가능");
          // 관리자가 아니면 홈페이지로 리다이렉트
          return {name: "home"};
        }
      }
    }
  ]
})



export default router
