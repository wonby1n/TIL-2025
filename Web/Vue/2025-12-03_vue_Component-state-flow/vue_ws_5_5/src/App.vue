<template>
<div class="page">

  <header class="header">
    <h1>명함 관리 페이지</h1>
  </header>
  
  <main class="main">
    <article class="description">
      <p>명함을 관리하는 페이지입니다. 여기에 명함 목록이 표시됩니다.</p>
      <CreateCardForm @create-card-event="updateCard"/>
      <BusinessCard :new-card="newcard"/>
    </article>
  </main>  
  
  <footer class="footer">
    © 2023 My Business Cards
  </footer>
</div>
</template>


<script setup>
import { ref } from 'vue';
import BusinessCard from './components/BusinessCard.vue';
import CreateCardForm from './components/CreateCardForm.vue';

const newcard = ref(null)

const updateCard = function (cardInfo) {
    newcard.value = cardInfo
}

</script>


<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}

/* 전체 레이아웃: 위-아래로 배치 + footer를 맨 아래로 */
.page {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 상단 파란 배너 */
.header {
  margin-top: 40px;
  background-color: #51a5ff;
  color: #ffffff;
  width: 60%;
  text-align: center;
  padding: 40px 0;
  font-size: 32px;
  font-weight: 700;
}

/* 본문 */
.main {
  margin-top: 40px;
  text-align: center;
}

.description {
  font-size: 16px;
  color: #555555;
}

/* footer를 맨 아래로 밀기 */
.footer {
  margin-top: auto;      /* 이게 핵심! */
  width: 100%;
  text-align: center;
  padding: 16px 0;
  border-top: 1px solid #dddddd;
  color: #777777;
  font-size: 14px;
}
</style>
