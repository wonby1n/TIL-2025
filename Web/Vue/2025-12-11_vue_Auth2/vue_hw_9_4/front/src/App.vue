<template>
  <header>
    <nav>
      <div v-if="accountStore.isLogin">
        <RouterLink :to="{ name: 'home' }">Home</RouterLink> |
        <RouterLink :to="{ name: 'create' }">글쓰기</RouterLink> |
        <button @click.prevent="accountStore.logOut">로그아웃</button>
      </div>

      <div v-else>
        <RouterLink :to="{ name: 'SignUpView' }">회원가입</RouterLink> |
        <RouterLink :to="{ name: 'LogInView' }">로그인</RouterLink>
      </div>
    </nav>
  </header>
  <RouterView />
</template>

<script setup>
import { useAccountStore } from '@/stores/accounts'
const accountStore = useAccountStore()
</script>


<style scoped>
</style>
