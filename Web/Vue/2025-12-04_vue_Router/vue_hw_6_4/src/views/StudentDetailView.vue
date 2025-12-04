<template>
    <div>
        <h3>학생 상세 정보 페이지입니다</h3>
        <p>이름 : {{ studentName }}</p>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()

const studentName = route.params.name
</script>

<style scoped>

</style>