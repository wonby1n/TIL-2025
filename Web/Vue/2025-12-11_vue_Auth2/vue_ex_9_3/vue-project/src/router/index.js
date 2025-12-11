import { createRouter, createWebHistory } from "vue-router";
import TodoView from "@/views/TodoView.vue";
import DetailView from "@/views/DetailView.vue";
import LogInView from "@/views/LogInView.vue";
import SignUpView from "@/views/SignUpView.vue";
import CreateView from "@/views/CreateView.vue";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "TodoView",
      component: TodoView,
    },
    {
      path: "/todo/:id",
      name: "DetailView",
      component: DetailView,
    },
    {
      path: "/login",
      name: "LogInView",
      component: LogInView,
    },
    {
      path: "/signup",
      name: "SignUpView",
      component: SignUpView,
    },
    {
      path: "/todo/create",
      name: "CreateView",
      component: CreateView,
    },
  ],
});

// 전역 네비게이션 가드 : 로그인 상태가 아니라면 createview 접근 금지, 로그인페이지로 이동
router.beforeEach((to, from) => {
  const store = useUserStore();

  if (
    (to.name === "CreateView" || to.name === "DetailView") &&
    !store.isLogin
  ) {
    window.alert("로그인이 필요한 페이지입니다.");
    return { name: "LogInView" };
  }
});

export default router;
