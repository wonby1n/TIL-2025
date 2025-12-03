<template>
  <article class="card">
    <h3>이름 : {{ card.name }}</h3>
    <p>직함 : {{ card.title }}</p>
    <button @click="deleteCardFunc(card)">명함 삭제</button>
  </article>
</template>


<script setup>
defineProps({
    card:Object,
})

const emit = defineEmits(["deleteCardEvent"])

const deleteCardFunc = function (card) {
  emit("deleteCardEvent", card);
};
</script>


<style scoped>
.card {
  padding: 5px;
  border: 1px solid;
  background-color: rgb(240, 240, 240);
}
</style>
