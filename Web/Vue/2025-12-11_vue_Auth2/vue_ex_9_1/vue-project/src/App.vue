<template>
  <header>
    <nav>
      <RouterLink :to="{name:'TodoView'}">할 일 목록</RouterLink> |
      <RouterLink :to="{name:'LoginView'}">로그인</RouterLink> |
      <RouterLink :to="{name:'SignUpView'}">회원가입</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
</style>
