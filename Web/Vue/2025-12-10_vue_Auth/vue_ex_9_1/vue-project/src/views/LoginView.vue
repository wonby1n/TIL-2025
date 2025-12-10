<template>
  <div>
    <h1>로그인</h1>

    <form @submit.prevent="onSubmit">
      <div>
        <label>아이디</label>
        <input v-model="username" type="text" />
      </div>

      <div>
        <label>비밀번호</label>
        <input v-model="password" type="password" />
      </div>

      <button type="submit">로그인</button>
    </form>

    <p v-if="errorMessage" style="color:red;">{{ errorMessage }}</p>
    <p v-if="successMessage" style="color:green;">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')

const errorMessage = ref('')
const successMessage = ref('')

const onSubmit = async () => {
  try {
    const res = await axios.post('http://127.0.0.1:8000/accounts/login/', {
      username: username.value,
      password: password.value,
    })

    // xiv. 응답 결과 콘솔 출력
    console.log('로그인 성공 응답 ✅', res.data)
  } catch (err) {
    console.log('로그인 실패 응답 ❌')
    console.log(err.response?.data)
  }
}
</script>
