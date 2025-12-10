<template>
    <div>
        <h1>할 일 상세</h1>
        <div v-if="todo">
            <p>할 일 번호 : {{ todo.id }}</p>
            <p>할 일 제목 : {{ todo.work }}</p>
            <p>할 일 내용 : {{ todo.content }}</p>
            <p>할 일 상태 : {{ todo.is_completed }}</p>
            <p>할 일 생성일 : {{ todo.created_at }}</p>
        </div>
        <hr>
        <button @click="deleteTodo">할 일 삭제</button>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useTodoStore } from '@/stores/todoStore';

const store = useTodoStore()
const route = useRoute()
const router = useRouter()
const todo = ref(null)

const deleteTodo = function() {
    axios({
        method:'delete',
        url:`${store.BASE_URL}/api/v1/todos/${todo.value.id}/`
    }).then((response) =>{
        router.push({name:'TodoView'})
    }).catch((error)=>{
        console.log(error)
    })
}

onMounted(() => {
    axios({
        method:"get",
        url:`${store.BASE_URL}/api/v1/todos/${route.params.id}`
    }).then((response) => {
        console.log(response.data)
        todo.value = response.data
    }).catch((error) => {
        console.log(error)
    })
})
</script>

<style scoped>

</style>