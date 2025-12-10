<template>
  <div>
    <h1>회원가입</h1>

    <form @submit.prevent="onSubmit">
      <div>
        <label>아이디</label>
        <input v-model="username" type="text" />
      </div>

      <div>
        <label>이메일</label>
        <input v-model="email" type="email" />
      </div>

      <div>
        <label>비밀번호</label>
        <input v-model="password1" type="password" />
      </div>

      <div>
        <label>비밀번호 확인</label>
        <input v-model="password2" type="password" />
      </div>

      <button type="submit">회원가입</button>
    </form>

    <p v-if="errorMessage" style="color:red;">{{ errorMessage }}</p>
    <p v-if="successMessage" style="color:green;">{{ successMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// 폼 데이터들
const username = ref('')
const email = ref('')
const password1 = ref('')
const password2 = ref('')

// 메시지
const errorMessage = ref('')
const successMessage = ref('')

// Django 회원가입 요청
const onSubmit = async () => {
  // 간단 유효성 체크 (선택)
  if (password1.value !== password2.value) {
    console.log('비밀번호가 다릅니다')
    return
  }

  try {
    const res = await axios.post('http://127.0.0.1:8000/accounts/signup/', {
      username: username.value,
      email: email.value,
      password1: password1.value,
      password2: password2.value,
    })

    // xii. 응답 결과 콘솔 출력
    console.log('회원가입 성공 응답 ✅', res.data)
  } catch (err) {
    console.log('회원가입 실패 응답 ❌')
    console.log(err.response?.data)
  }
}
</script>
