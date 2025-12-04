<template>

<nav>
  <RouterLink :to="{name:'home'}">Home</RouterLink> | 
  <RouterLink :to="{name:'about'}">About</RouterLink>
</nav>

  <RouterView />
</template>


<script setup>
import { RouterLink } from 'vue-router';
import AboutView from './views/AboutView.vue';
import HomeView from './views/HomeView.vue';
</script>


<style scoped>

</style>
