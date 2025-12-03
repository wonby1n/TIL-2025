<template>
  <ul>
    <ProductListItem @add-cart="addCart" v-for="product in products" :key="product.id" :product="product" />
  </ul>
</template>

<script setup>
import ProductListItem from '@/components/ProductListItem.vue'

defineProps({
  products: Array
})

const emit = defineEmits(["addCart"])

const addCart = function(product) {
  emit("addCart", product);
}
</script>
