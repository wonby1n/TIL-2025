<template>
    <div>
        <h3>상세 프로필</h3>
        <!-- profile.vue는 userview.vue의 중첩된 컴포넌트가 될테니 userview.vue의 라우트 정보에 접근 가능하다 -->
        <p>반갑스빈다. {{ $route.params.username }}입니다.</p>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>