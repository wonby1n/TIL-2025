<template>
    <div>
        <h1>할일 생성 페이지</h1>
        <form @submit.prevent="createTodo">
            <div>
                <label for="work">제목 : </label>
                <input type="text" id="work" name="work" v-model="work">
            </div>
            <div>
                <label for="content">내용 : </label>
                <textarea id="content" name="content" v-model="content"></textarea>
            </div>
            <button>제출</button>
        </form>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useTodoStore } from '@/stores/todoStore';
import { useRouter } from 'vue-router';

const router = useRouter()
const store = useTodoStore()
const work = ref('')
const content = ref('')

const createTodo = function () {
    axios({
        method:'post',
        url:`${store.BASE_URL}/api/v1/todos/`,
        data: {
            work:work.value,
            content:content.value,
            is_completed:false,
        }
    }).then((response) => {
        console.log(response.data)
        router.push({name:"TodoView"})
    }).catch((error) => {
        console.log(error)
    })
}
</script>

<style scoped>

</style>