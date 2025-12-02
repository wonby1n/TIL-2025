<template>
  <div>
    <header class="sticky-top p-3 d-flex justify-content-center align-items-center bg-success-subtle">
      <h1>My Gallery</h1>
    </header>

    <main class="container p-3">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <div class="col" v-for="article in articles">
        <div class="card">
          <img src="@/assets/sample.png" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text">{{ article.content }}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
      </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
const numberOfItems = 4;

const articles = ref([
  {title : "안녕", content : "하세요"},
  {title : "나루토", content : "개꿀"},
  {title : "주술회전", content : "꿀잼"},
  {title : "냥냥이", content : "멍멍"},
]);
</script>

<style scoped>

</style>
