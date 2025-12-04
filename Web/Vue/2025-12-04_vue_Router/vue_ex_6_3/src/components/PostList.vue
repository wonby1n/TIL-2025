<template>
    <div>
        <h3>{{ $route.params.username }}이 작성한 게시글</h3>
        <ol>
            <PostListItem v-for="post in posts" :key="post.id" :post="post"/>
        </ol>
        <hr>
        <RouterView />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import PostListItem from './PostListItem.vue';

const posts = ref([
    {id:1, title:'Post 1', content: 'Content 1'},
    {id:2, title:'Post 2', content: 'Content 2'},
    {id:3, title:'Post 3', content: 'Content 3'},
])
</script>

<style scoped>

</style>