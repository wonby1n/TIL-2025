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
import {useUserStore} from "@/stores/userStore.js";

const userStore = useUserStore();
const username = ref('');
const password = ref('');

const logIn = () => {
  const payload = {
    username: username.value,
    password: password.value
  }
  userStore.logIn(payload);
}

</script>

<style scoped>

</style>