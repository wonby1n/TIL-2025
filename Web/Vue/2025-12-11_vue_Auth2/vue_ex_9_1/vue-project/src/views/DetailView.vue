<template>
  <main>
    <h1>할 일 상세</h1>
    <div v-if="todo">
      <p>할 일 번호: {{ todo.id }}</p>
      <p>할 일 제목 : {{ todo?.work }}</p>
      <p>할 일 내용 : {{ todo?.content }}</p>
      <p>할 일 상태 : {{ todo?.is_completed }}</p>
      <p>할 일 생성일 : {{ todo?.created_at }}</p>
    </div>
  </main>
</template>
<script setup>
import axios from "axios";
import {ref, onMounted} from "vue";
import {useRoute} from "vue-router";
import {useTodoStore} from "@/stores/todoStore.js";

const store = useTodoStore()
const route = useRoute()
const todo = ref(null)

onMounted(() => {
  axios({
    method: 'get',
    url: `${store.BASE_URL}/api/v1/todos/${route.params.id}/`,
  }).then(response => {
    console.log(response.data)
    todo.value = response.data
  }).catch(error => {
    console.log(error)

  })

})

</script>
<style scoped>

</style>