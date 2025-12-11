<template>
  <div>
    <h1>로그인</h1>

    <form @submit.prevent="logIn">
      <div>
        <label>아이디</label>
        <input v-model.trim="username" type="text" />
      </div>

      <div>
        <label>비밀번호</label>
        <input v-model.trim="password" type="password" />
      </div>

      <button type="submit">로그인</button>
    </form>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')

const logIn = function () {
  axios({
    method: 'post',
    url: `${storeToRefs.BASE_URL}/accounts/login/`,
    data: {
      username: username.value,
      password: password.value,
    },
  }).then((response) => {
    console.log(response)
    alert('로그인에 성공했습니다!')
  }).catch((error) => {
    console.log(error)
    alert('로그인에 실패했습니다.')
  })
}
</script>
