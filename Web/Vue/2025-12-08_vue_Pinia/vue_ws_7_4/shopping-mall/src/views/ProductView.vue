<template>
    <h1>상품 목록 페이지</h1>
    <div class="product-list">
        <ProductDetail
        v-for="product in store.productList"
        :key="product.name"
        :product="product"/>
    </div>
</template>

<script setup>
import ProductDetail from '@/components/ProductDetail.vue';
import { useProductStore } from '@/stores/products';

const store = useProductStore()
</script>

<style scoped>
.product-list {
  /* ✅ 한 줄에 3개 */
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  max-width: 1024px;
  margin: 32px auto;
}
</style>