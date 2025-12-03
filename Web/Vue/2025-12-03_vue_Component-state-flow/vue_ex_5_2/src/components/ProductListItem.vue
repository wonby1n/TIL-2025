<template>
    <li>
        {{ name }} - {{ price }}원 <button>장바구니에 추가</button>
    </li>
</template>


<script setup>
defineProps({
    name:String,
    price:Number,
})
</script>


<style scoped>

</style>