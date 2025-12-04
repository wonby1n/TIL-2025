<template>
  <div class="quiz-card">
    <h4 class="quiz-question">
      {{ quiz.pk }}번 문제. {{ quiz.question }}
    </h4>
    <p class="quiz-label">정답 입력</p>
    <input
      type="text"
      :id="'quiz-' + quiz.pk"
      class="quiz-input"
    >
  </div>
</template>

<script setup>
defineProps({
  quiz: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.quiz-card {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 16px 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

.quiz-question {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
}

.quiz-label {
  margin: 0 0 6px;
  font-size: 14px;
  color: #555555;
}

.quiz-input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #dddddd;
  font-size: 14px;
  box-sizing: border-box;
}

.quiz-input:focus {
  outline: none;
  border-color: #ff9933;
  box-shadow: 0 0 0 2px rgba(255, 153, 51, 0.2);
}
</style>
