<template>
  <div class="post-list-page">
    <h1>게시글 목록 페이지</h1>

    <RouterLink to="/post" class="create-link">게시글 생성</RouterLink>

    <ul class="post-list" v-if="posts.length">
      <li
        v-for="post in posts"
        :key="post.id"
        class="post-item"
      >
        <!-- 제목 클릭 시 상세로 이동 -->
        <RouterLink :to="`/detail/${post.id}`">
          {{ post.title }}
        </RouterLink>
        <span class="meta">
          (카테고리: {{ post.category_name ?? post.category }})
        </span>
      </li>
    </ul>

    <p v-else>등록된 게시글이 없습니다.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api' // 🔁 수정 필요할 수 있음

const posts = ref([])

const fetchPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/posts/`)
    posts.value = res.data
  } catch (error) {
    console.log('게시글 목록 조회 실패', error)
  }
}

onMounted(fetchPosts)
</script>

<style scoped>
.post-list-page {
  max-width: 900px;
  margin: 24px auto;
}
.create-link {
  display: inline-block;
  margin-bottom: 16px;
}
.post-list {
  list-style: none;
  padding: 0;
}
.post-item {
  padding: 8px 0;
}
.post-item a {
  font-weight: bold;
  margin-right: 8px;
}
.meta {
  color: #777;
}
</style>
