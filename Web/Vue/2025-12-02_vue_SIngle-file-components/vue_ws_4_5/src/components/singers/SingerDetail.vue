<template>
    <div class="singer-box" v-for="singer in singers">
        <h1>{{ singer.name }}</h1>
        <img src="@/assets/singer.jpg" alt="" height="200" width="200">
        <p>가수 소개글</p>
        <SingerAlbum/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import SingerAlbum from './SingerAlbum.vue';
const singers = ref([
  {name:'adele'},{name:'marron 5'},{name:'Dua Lipa'},
]) 
</script>

<style scoped>
.singer-box {
  border: 1px solid;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  display: inline-block;
  width: 40%;
  margin: 20px;
}
</style>