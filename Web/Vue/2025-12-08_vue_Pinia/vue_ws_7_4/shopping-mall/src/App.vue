<template>
  <nav class="nav-bar">
    <RouterLink :to="{name: 'home'}">Home</RouterLink> |
    <RouterLink :to="{name: 'products'}">Products</RouterLink> |
    <RouterLink :to="{ name: 'favorite' }">
      Favorite
      <span v-if="store.favoriteCount > 0">
        ({{ store.favoriteCount }})
      </span>
    </RouterLink>
  </nav>

  <main class="view-container">
    <RouterView />
  </main>
</template>


<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useProductStore } from './stores/products';

const store = useProductStore()
</script>


<style scoped>
.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;

  background: linear-gradient(90deg, #7f7fd5, #86a8e7, #91eae4);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

/* 공통 링크 스타일 */
.nav-link {
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;

  padding: 0.5rem 1rem;
  border-radius: 999px;

  color: #f5f5f5;
  background-color: rgba(255, 255, 255, 0.08);

  transition: background-color 0.2s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

/* hover 시 */
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

/* ✅ 현재 라우트일 때 자동으로 붙는 클래스 */
.nav-link.router-link-exact-active {
  background-color: #ffffff;
  color: #4b6cb7;
  box-shadow: 0 4px 12px rgba(75, 108, 183, 0.35);
}

/* 아래는 내용 영역 */
.view-container {
  max-width: 900px;
  margin: 2rem auto 0;
  padding: 1rem;
}
</style>
