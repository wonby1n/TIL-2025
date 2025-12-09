<template>
  <div class="home">
    <!-- 중앙 메인 영역 -->
    <main class="hero">
      <h1 class="hero-title">하원이의 블로그</h1>
      <p class="hero-subtitle">Welcome to my personal blog!</p>
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #f5f5f5;
}


/* 중앙 영역 */
.hero {
  min-height: calc(100vh - 60px); /* 상단바 높이만큼 빼기 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #777;
}
</style>
