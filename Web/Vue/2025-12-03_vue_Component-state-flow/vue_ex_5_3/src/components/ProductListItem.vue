<template>
  <li>
    {{ product.name }} - {{ product.price }}원
    <button @click="addCart(product)">장바구니에 추가</button>
  </li>
</template>

<script setup>
defineProps({
  product: Object
})

const emit = defineEmits(['addCart'])

const addCart = (product) => {
  emit("addCart", product);
  console.log(product);
};
</script>

<style scoped>

</style>
