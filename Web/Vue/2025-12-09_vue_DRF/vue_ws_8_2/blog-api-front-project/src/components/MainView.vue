<template>
  <div class="home">
    <!-- 상단 네비게이션 바 -->
    <header class="navbar">
      <div class="navbar-title">Home</div>
    </header>

    <!-- 중앙 메인 영역 -->
    <main class="hero">
      <h1 class="hero-title">OOO의 블로그</h1>
      <p class="hero-subtitle">Welcome to my personal blog!</p>
    </main>
  </div>
</template>

<script setup>
// 지금은 별도 로직 없어서 비워둬도 됨
// 추후에 이름을 props나 store에서 받아오고 싶으면 여기서 처리하면 돼.
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #f5f5f5;
}

/* 상단 바 */
.navbar {
  background-color: #333;
  color: #fff;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navbar-title {
  font-size: 1.2rem;
  font-weight: 600;
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
