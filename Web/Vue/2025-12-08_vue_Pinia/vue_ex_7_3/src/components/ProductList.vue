<!-- ProductList.vue -->
<template>
  <div>
    <h2>Product List</h2>
    <ul>
      <ProductListItem 
        v-for="product in store.products" 
        :key="product.id" 
        :product="product" 
      />
    </ul>
  </div>
</template>

<script setup>
import ProductListItem from '@/components/ProductListItem.vue'
import { useProductStore } from '@/stores/product'
import { onMounted } from 'vue'

const store = useProductStore()

// 상품정보 받아오기
// dom 요소가(template 부분 컴파일) 생성된 후에
onMounted(() => {
  store.fetchProducts();
});
</script>
