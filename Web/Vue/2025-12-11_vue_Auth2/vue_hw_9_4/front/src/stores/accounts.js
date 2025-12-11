import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000'
axios.defaults.baseURL = API_URL
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN'

export const useAccountStore = defineStore('account', () => {
  const token = ref(null)
  const router = useRouter()

  const signUp = function (payload) {
    const username = payload.username
    const password1 = payload.password1
    const password2 = payload.password2
    const age = payload.age

    axios({
      method: 'post',
      url: '/accounts/signup/',
      data: {
        username, password1, password2,
        age,
      }
    })
      .then(res => {
        console.log('회원 가입이 완료되었습니다.')
        console.log(res)
        router.push({ name: 'LogInView' })
      })
      .catch(err => {
        console.error('회원가입 에러:', err.response?.data || err.message)
        alert('회원가입에 실패했습니다: ' + (err.response?.data?.username?.[0] || err.message))
      })
  }

  const logIn = function (payload) {
    const { username, password } = payload
    axios({
      method: 'post',
      url: '/accounts/login/',
      data: {
        username, password
      }
    })
      .then(res => {
        console.log('로그인이 완료되었습니다.')
        console.log(res.data)
        token.value = res.data.key
        axios.defaults.headers.common['Authorization'] = `Token ${res.data.key}`
        router.push({ name: 'home' })
      })
      .catch(err => {
        console.error('로그인 에러:', err.response?.data || err.message)
        alert('로그인에 실패했습니다: ' + err.message)
      })
  }

  const isLogin = computed(() => {
    return token.value ? true : false
  })

  const logOut = function () {
    axios({
      method: 'post',
      url: '/accounts/logout/'
    })
      .then(res => {
        token.value = null
        delete axios.defaults.headers.common['Authorization']
        router.push({ name: 'LogInView' })
      })
      .catch(err => {
        console.error('로그아웃 에러:', err.response?.data || err.message)
      })
  }

  return {
    signUp,
    logIn,
    logOut,
    token,
    isLogin,
  }
}, { persist: true })