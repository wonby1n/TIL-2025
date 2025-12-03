<template>
    <div>
        <h3>이름 : {{ card.name }}</h3>
        <p>직함 : {{ card.title }}</p>
        <button @click="deleteCardFunc(card)">명함 삭제</button>
    </div>
</template>


<script setup>
defineProps({
    card:Object,
})

const emit = defineEmits(["deleteCardEvent"])

const deleteCardFunc = function (card) {
    emit("deleteCardEvent", card)
}
</script>


<style scoped>
div {
    padding: 3px;
    border: 1px solid black;
    background-color: rgb(226, 236, 255);
}
</style>