<template>
    <div>
    <li>
        <RouterLink :to="{name:'postDetail', params: {id:post.id}}">
            제목 : {{ post.title }}
        </RouterLink>
    </li>
    </div>
</template>

<script setup>
defineProps({
    post:Object,
})
</script>

<style scoped>

</style>