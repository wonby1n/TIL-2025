<template>
  <div class="quiz-app">
    <!-- 상단 헤더 -->
    <header class="app-header">
      <p class="app-title">Quiz 퀴즈</p>
    </header>

    <!-- 설명 카드 -->
    <section class="app-description">
      <p>
        여기는 퀴즈의 나라! 놀라운 퀴즈들이 기다리고 있어요. 지금 바로 도전해보세요!
      </p>
    </section>

    <!-- 네비게이션 바 -->
    <nav class="app-nav">
      <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
      <span class="divider">|</span>
      <RouterLink :to="{ name: 'quiz' }" class="nav-link">Quiz</RouterLink>
    </nav>
  </div>

  <!-- 페이지 내용 -->
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.quiz-app {
  max-width: 900px;
  margin: 0 auto;
  font-family: 'Noto Sans KR', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
}

/* 상단 주황색 헤더 */
.app-header {
  background-color: #ff9933;
  border-radius: 16px 16px 0 0;
  padding: 18px 24px;
  text-align: center;
  color: #ffffff;
}

.app-title {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

/* 설명 카드 */
.app-description {
  background-color: #ffffff;
  padding: 24px 32px;
  border-radius: 0 0 16px 16px;
  margin-bottom: 24px;
  text-align: center;
  font-size: 15px;
  line-height: 1.6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* 네비게이션 바 */
.app-nav {
  background-color: #333333;
  color: #ffffff;
  padding: 10px 0;
  text-align: center;
  margin-bottom: 24px;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  padding: 0 10px;
}

.nav-link:hover {
  text-decoration: underline;
}

.divider {
  color: #bbbbbb;
  padding: 0 6px;
}
</style>
