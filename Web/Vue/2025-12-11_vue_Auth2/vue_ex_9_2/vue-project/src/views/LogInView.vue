<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="logIn">
      <div>
        <label for="id">username</label>
        <input type="text" id="id" v-model.trim="username" />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password" />
      </div>
      <button type="submit">Log In</button>
    </form>
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore';
const username = ref('');
const password = ref('');
const store = useUserStore();

const logIn = function () {
  const user = {
    username: username.value,
    password: password.value
  }
  store.logIn(user);
}

</script>

<style scoped>

</style>