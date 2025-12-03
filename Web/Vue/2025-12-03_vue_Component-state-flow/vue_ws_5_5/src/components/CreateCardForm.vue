<template>
    <div>
        <form @submit.prevent="createCardFunc">
            <p>이름 :</p> <input type="text" v-model="name">
            <p>직함 :</p> <input type="text" v-model="title">
            <button type="submit">명함 추가</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('')
const title = ref('')

const emit = defineEmits(['createCardEvent'])

// 3) 폼 submit 시 실행될 함수
const createCardFunc = () => {
  // (1) 객체로 묶기
  const cardInfo = {
    name: name.value,
    title: title.value,
  }

  // (2) 이벤트로 부모에게 알리기
  emit('createCardEvent', cardInfo)

  // (3) 입력창 비우기
  name.value = ''
  title.value = ''
}
</script>

<style scoped>

</style>