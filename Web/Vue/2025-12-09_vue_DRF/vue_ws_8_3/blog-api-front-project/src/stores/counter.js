import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostStore = defineStore('post', () => {
  const posts = ref([])

  const BASE_URL = 'http://127.0.0.1:8000/api/v1'

  const getPosts = function () {
    axios({
      method:'get',
      url: `${BASE_URL}/posts/`,
    })
      .then((res) => {
        console.log('목록 응답:', res.data)
        posts.value = res.data      
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return { posts, BASE_URL, getPosts }
})
