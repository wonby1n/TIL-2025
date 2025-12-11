<template>
  <div>
    <h1>회원가입</h1>

    <form @submit.prevent="signUp">
      <div>
        <label>아이디</label>
        <input v-model.trim="username" type="text" />
      </div>

      <div>
        <label>비밀번호</label>
        <input v-model.trim="password1" type="password" />
      </div>

      <div>
        <label>비밀번호 확인</label>
        <input v-model.trim="password2" type="password" />
      </div>

      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// 폼 데이터들
const username = ref('')
const password1 = ref('')
const password2 = ref('')


// Django 회원가입 요청
const signUp = function() {
  axios({
    url: `${storeToRefs.BASE_URL}/accounts/signup/`,
    method: 'post',
    data : {
      username: username.value,
      password1: password1.value,
      password2: password2.value,
      },
    }).then((response) => {
      console.log(response)
      
      alert('회원가입이 완료되었습니다!')
    }).catch((error) => {
      console.log(error)
      alert('회원가입에 실패했습니다.')
    })
}
</script>
