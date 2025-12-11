
<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'home'}">Home</RouterLink> | 
        <RouterLink :to="{ name: 'SignUpView' }">SignUpPage</RouterLink> |
        <RouterLink :to="{ name: 'LogInView' }">LogInPage</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>


  <script setup>
  import { RouterLink, RouterView } from 'vue-router'
  </script>


<style scoped>
</style>
