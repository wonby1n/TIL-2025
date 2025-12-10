<template>
  <header>
    <nav>
      <RouterLink :to="{name:'TodoView'}">할 일 목록</RouterLink> | 
      <RouterLink :to="{name:'TodoCreateView'}">할 일 만들기</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>

<style scoped>
</style>
