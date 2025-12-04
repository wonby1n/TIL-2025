<template>
  <div class="quiz-create-card">
    <h3 class="quiz-create-title">퀴즈 생성</h3>

    <form class="quiz-create-form" @submit.prevent="createQuiz">
      <label class="field-label">문제</label>
      <textarea
        v-model="question"
        class="field-textarea"
      ></textarea>

      <label class="field-label">답안</label>
      <input
        type="text"
        v-model="answer"
        class="field-input"
      >

      <button type="submit" class="submit-btn">
        퀴즈 생성
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const question = ref('')
const answer = ref('')

const emit = defineEmits(['createQuiz'])

const createQuiz = () => {
    const newQuiz = {
        question : question.value,
        answer : answer.value
    }

    emit('createQuiz', newQuiz)
    
    question.value = ''
    answer.value = ''
}


</script>

<style scoped>
.quiz-create-card {
  max-width: 700px;
  margin: 0 auto 24px;
  padding: 24px 28px;
  background-color: #f7f7f7;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
}

.quiz-create-title {
  margin: 0 0 16px;
  font-size: 22px;
  font-weight: 700;
}

.quiz-create-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.field-label {
  font-size: 14px;
  margin-bottom: 4px;
}

.field-textarea {
  min-height: 90px;
  resize: none;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #d4d4d4;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #ffffff;
}

.field-input {
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #d4d4d4;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #ffffff;
}

.field-textarea:focus,
.field-input:focus {
  outline: none;
  border-color: #0d6efd;
  box-shadow: 0 0 0 2px rgba(13, 110, 253, 0.15);
}

.submit-btn {
  margin-top: 12px;
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: none;
  background-color: #0d6efd;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0b5ed7;
}
</style>