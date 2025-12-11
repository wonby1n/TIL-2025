import axios from 'axios'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useAccountStore } from './accounts'

const API_URL = 'http://127.0.0.1:8000'
axios.defaults.baseURL = API_URL

export const useArticleStore = defineStore('article', () => {
  const articles = ref([])
  const router = useRouter()
  const accountStore = useAccountStore()

  const getArticles = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/articles/`,
      headers: {
        Authorization: `Token ${accountStore.token}`
      }
    })
    .then(res => articles.value = res.data)
    .catch(err => console.error('게시글 조회 에러:', err.response?.data || err.message))
  }

  const createArticle = function ({ title, content}) {
    axios({
      method: 'post',
      url: `${API_URL}/api/v1/articles/`,
      data: { title, content },
      headers: {
        Authorization: `Token ${accountStore.token}`
      }
    })
    .then(res => {
      console.log('게시글 작성 완료')
      router.push({ name: 'home' })
    })
    .catch(err => {
      console.error('게시글 작성 에러:', err.response?.data || err.message)
      alert('게시글 작성에 실패했습니다: ' + err.message)
    })
  }

  return { articles, getArticles, createArticle }
})
