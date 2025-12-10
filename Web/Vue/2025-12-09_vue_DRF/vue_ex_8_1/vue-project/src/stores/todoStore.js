import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from "axios"

export const useTodoStore = defineStore('todo', () => {
  // 할 일 목록 데이터는 여러개의 컴포넌트가 공유할 데이터이므로 중앙저장소에 둔다.
  const todos = ref([]);

  const BASE_URL = "http://127.0.0.1:8000/"

  const getTodos = function () {
    axios ({
      method:"get",
      url: `${BASE_URL}/api/v1/todos/`
    }).then((response) => {
      // 응답이 성공적으로 왔다. (이 시점에 todos 데이터가 생김)
      todos.value = response.data
    })
    // 응답 실패시 에러 디버깅
    .catch((error) => {
      console.log(error)
    })
    
  }

  return { todos, BASE_URL, getTodos}
}, { persist: true })
