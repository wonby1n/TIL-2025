<template>
<MainPage />
<nav>
  <RouterLink :to="{ name : 'some'}">Some</RouterLink> |
  <RouterLink :to="{ name : 'other'}">Other</RouterLink> |
  <RouterLink :to="{ name : 'students'}">Students</RouterLink>
</nav>
<RouterView/>
</template>


<script setup>
import MainPage from './components/MainPage.vue';
</script>


<style scoped>
</style>
