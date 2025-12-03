<template>
<div>
    <h2>장바구니</h2>
    <template v-if="cart.length > 0">
        <ul>
            <li v-for="item in cart" :key="item.id">
                {{  item.name }} - {{ item.price }}원
                <button @click="removeItem(item)">삭제</button>
            </li>
        </ul>
    </template>
<h3 v-else>장바구니가 비었습니다.</h3>
</div>
</template>

<script setup>
defineProps({
    cart:Array,
});

const emit = defineEmits(["removeItem"]);

const removeItem = function(item) {
    emit("removeItem", item)
}
</script>

<style scoped>

</style>