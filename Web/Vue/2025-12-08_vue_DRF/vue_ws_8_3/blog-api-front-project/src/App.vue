<template>
  <div>
    <!-- 상단 네비게이션 바 -->
    <nav>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink>
      <RouterLink :to="{ name: 'posts' }">PostList</RouterLink>
    </nav>

    <RouterView />
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
nav {
  display: flex;
  gap: 12px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
a {
  text-decoration: none;
}
</style>
