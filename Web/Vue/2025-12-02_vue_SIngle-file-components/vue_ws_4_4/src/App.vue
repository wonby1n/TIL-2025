<template>
  <MainPage />
  <h1>가수 목록</h1>
  <SingerDetail />
</template>

<script setup>
import MainPage from '@/components/MainPage.vue';
import SingerDetail from '@/components/singers/SingerDetail.vue';
</script>

<style scoped>
h1 {
  text-align: center;
  color: orangered;
}
</style>
