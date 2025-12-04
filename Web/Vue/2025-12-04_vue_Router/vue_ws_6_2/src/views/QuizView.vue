<template>
    <div>
    <QuizDetail v-for="quiz in quizzes" :key="quiz.pk" :quiz="quiz"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import QuizDetail from '@/components/QuizDetail.vue'

const quizzes = ref([
    {pk:1, question:'세상에서 제일 재밌는 만화는?', answer:'나루토'},
    {pk:2, question:'나루토 등장인물 중 내가 제일 좋아하는 캐릭터는?', answer:'나루토'},
    {pk:3, question:'사스케가 부르는 나루토의 별명(애칭)은?', answer:'천둥벌거숭이'},
    {pk:4, question:'나루토의 부모같은 스승은?', answer:'지라이야'},
    {pk:5, question:'나루토에게 봉인된 마물은?', answer:'구미(쿠라마)'},
])
</script>

<style scoped>

</style>