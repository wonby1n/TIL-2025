<template>
    <div>
    <QuizCreate @create-quiz="updateQuiz"/>
    <QuizDetail v-for="quiz in quizzes" :key="quiz.pk" :quiz="quiz"/>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import QuizDetail from '@/components/QuizDetail.vue'
import QuizCreate from '../components/QuizCreate.vue';

const quizzes = ref([
    {pk:1, question:'세상에서 제일 재밌는 만화는?', answer:'나루토'},
    {pk:2, question:'나루토 등장인물 중 내가 제일 좋아하는 캐릭터는?', answer:'나루토'},
    {pk:3, question:'사스케가 부르는 나루토의 별명(애칭)은?', answer:'천둥벌거숭이'},
    {pk:4, question:'나루토의 부모같은 스승은?', answer:'지라이야'},
    {pk:5, question:'나루토에게 봉인된 마물은?', answer:'구미(쿠라마)'},
])

// 1) 자식에서 넘어온 newQuiz에 pk 붙이고 quizzes에 추가
const updateQuiz = (newQuiz) => {
  // quizzes 배열이 비어있지 않다면 마지막 pk + 1, 비어있으면 1
  const lastPk = quizzes.value.length
    ? quizzes.value[quizzes.value.length - 1].pk
    : 0

  const quizWithPk = {
    pk: lastPk + 1,
    ...newQuiz,
  }

  quizzes.value.push(quizWithPk)
}

// 2) computed로 내림차순 정렬된 배열 생성 (원본은 그대로 유지)
const sortedQuizzes = computed(() => {
  // 원본을 건드리지 않기 위해 복사본을 만들어 정렬
  return [...quizzes.value].sort((a, b) => b.pk - a.pk)
})
</script>

<style scoped>

</style>