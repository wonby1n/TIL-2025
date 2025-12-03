<template>
  <article class="card">
    <h3>이름 : {{ name }}</h3>
    <p>직함 : {{ title }}</p>
  </article>
</template>


<script setup>
defineProps({
    name : String,
    title : String,
})
</script>


<style scoped>
.card {
  padding: 5px;
  border: 1px solid;
  background-color: rgb(230, 230, 230);
}
</style>
