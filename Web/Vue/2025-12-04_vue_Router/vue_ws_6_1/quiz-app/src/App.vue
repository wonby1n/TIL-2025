<template>
  <header>
    <h1>Quiz 퀴즈</h1>
  </header>
    <p>여기는 퀴즈의 나라! 놀라운 퀴즈들이 기다리고 있어요. 지금 바로 도전해보세요!</p>
<nav>
  <RouterLink :to="{name:'home'}">Home</RouterLink> |
</nav>
  <RouterView />
</template>


<script setup>
import { RouterLink } from 'vue-router';
import HomeView from './views/HomeView.vue';
</script>


<style scoped>
</style>
