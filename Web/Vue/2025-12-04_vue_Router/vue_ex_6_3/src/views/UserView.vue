<template>
  <div>
    <h2>User Profile</h2>
    <p>Username: {{ username }}</p>
    <RouterLink :to="{name:'profile'}">Porfile</RouterLink>
    <span> | </span>
    <RouterLink :to="{name: 'posts'}">작성한 게시글</RouterLink>
    <hr>
    <RouterView/>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const username = ref(route.params.username)
</script>
