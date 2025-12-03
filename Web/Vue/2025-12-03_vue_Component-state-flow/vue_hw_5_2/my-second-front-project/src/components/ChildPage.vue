<template>
    <div v-for="child in myChildren" :key="child.name">
        <h3>자식 페이지입니다.</h3>
        <p>이름 : {{ child.name }}</p>
        <p>나이 : {{ child.age }}</p>

    </div>
</template>

<script setup>
defineProps({
    myChildren: Object,
})
</script>

<style scoped>
div {
    margin: 5px;
    padding: 3px;
    border: 2px solid;
}
</style>