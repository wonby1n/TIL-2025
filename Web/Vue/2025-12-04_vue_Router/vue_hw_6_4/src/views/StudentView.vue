<template>
    <div>
        <h3>학생 상세 정보 목록 입니다</h3>
        <ul>
            <li v-for="student in students" :key="student.name">
                {{ student.name }} 학생
            <button @click="goDetail(student.name)">상세 정보 보기</button>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const students = ref([
    {name:'김하나'},
    {name:'김두리'},
    {name:'김서이'},
])

const goDetail = function (name) {
    router.push({
        name:'studentDetail',
        params: {name},
    })
}
</script>

<style scoped>

</style>