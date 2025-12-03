<template>
    <div>
        <h1>부모 페이지입니다.</h1>
        <ChildPage 
        @give-me-allowance="updateBalance"
        :my-children="children"/>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ChildPage from './ChildPage.vue';

const children = ref([
    {name:'김하나', age:30, balance:100000},
    {name:'김두리', age:20, balance:10000},
    {name:'김서이', age:10, balance:1000},
])

const updateBalance = function (child) {
    const target = children.value.find((c) => c.name === child.name)
    if (target) {
        target.balance += 1000
    }
};

</script>

<style scoped>

</style>