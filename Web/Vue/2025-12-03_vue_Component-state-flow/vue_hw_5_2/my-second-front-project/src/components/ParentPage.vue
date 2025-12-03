<template>
    <div>
        <h1>부모 페이지입니다.</h1>
        <ChildPage :my-children="children"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildPage from './ChildPage.vue';

const children = ref([
    {name:'김하나', age:30},
    {name:'김두리', age:20},
    {name:'김서이', age:10},
])
</script>

<style scoped>

</style>