import { createRouter, createWebHistory } from 'vue-router'
import { useAccountStore } from '@/stores/accounts'
import SignUpView from '@/views/SignUpView.vue'
import LogInView from '@/views/LogInView.vue'
import HomeView from '../views/HomeView.vue'
import ArticleCreateView from '../views/ArticleCreateView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create',
      name: 'create',
      component: ArticleCreateView
    },
    {
      path: '/signup',
      name: 'SignUpView',
      component: SignUpView,

    },
    {
      path: '/login',
      name: 'LogInView',
      component: LogInView
    }
  ]
})

router.beforeEach((to, from) => {
  const accountStore = useAccountStore()

  // 1. 로그인이 되어있지 않은데, 로그인/회원가입 페이지가 아니라면 -> 로그인 페이지로 (요구사항 1.a)
  if (!accountStore.isLogin && (to.name !== 'LogInView' && to.name !== 'SignUpView')) {
    window.alert('로그인이 필요합니다.')
    return { name: 'LogInView' }
  }

  // 2. 로그인이 되어있는데, 로그인/회원가입 페이지로 가려 한다면 -> 홈(게시글 목록)으로 (요구사항 1.b)
  if (accountStore.isLogin && (to.name === 'LogInView' || to.name === 'SignUpView')) {
    window.alert('이미 로그인 되어 있습니다.')
    return { name: 'home' }
  }
})

export default router
