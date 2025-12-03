<template>
  <ul>
    <ProductListItem 
    v-for="product in products"
    :key="product.id"
    :name="product.name"
    :price="product.price"
    />
  </ul>

</template>

<script setup>
import ProductListItem from './ProductListItem.vue';

defineProps({
  products: Array
})
</script>
