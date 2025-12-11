<template>
  <header>
    <nav>
      <RouterLink to="/">할 일 목록</RouterLink>
      <RouterLink :to="{name:'SignUpView'}">회원가입</RouterLink>
      <RouterLink :to="{name:'LogInView'}">로그인</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
nav a {
  margin-right: 10px;
}
</style>
