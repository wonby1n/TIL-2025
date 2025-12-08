<template>
  <div class="child-card">
    <h3>자식</h3>
    <p class="child-name">{{ child.name }}</p>
  </div>
</template>

<script setup>
defineProps({
    child:Object
})
</script>

<style scoped>
.child-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px 14px;

  background-color: #ffffff;
}

.child-name {
  margin-top: 4px;
  font-weight: 500;
}
</style>