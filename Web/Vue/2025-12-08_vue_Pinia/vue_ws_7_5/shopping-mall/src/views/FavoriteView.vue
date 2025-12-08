<template>
  <div>
    <h2>찜한 상품</h2>

    <ProductDetail
      v-for="product in favoriteProducts"
      :key="product.name"
      :product="product"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '@/stores/products'
import ProductDetail from '@/components/ProductDetail.vue'

const store = useProductStore()

const favoriteProducts = computed(() => store.favoriteProducts)

</script>

<style scoped>

</style>