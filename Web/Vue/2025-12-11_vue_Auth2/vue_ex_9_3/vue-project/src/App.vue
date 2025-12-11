<template>
  <header>
    <nav v-if="store.isLogin">
      <RouterLink to="/">할 일 목록</RouterLink>
      <RouterLink to="/todo/create">할 일 생성</RouterLink>
      <form @submit.prevent="store.logOut">
        <input type="submit" value="로그 아웃" />
      </form>
    </nav>
    <nav v-else>
      <RouterLink to="/">할 일 목록</RouterLink>
      <RouterLink to="/signup">회원가입</RouterLink>
      <RouterLink to="/login">로그인</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterView } from "vue-router";
import { useUserStore } from "./stores/userStore";

const store = useUserStore();
</script>

<style scoped>
nav a {
  margin-right: 10px;
}
</style>
