<template>
  <div class="product-card">
    <h3 class="product-name">{{ product.name }}</h3>
    <img :src="product.imagePath" alt="" class="product-image"/>

    <button @click="toggleFavorite">
      <span v-if="product.isFavorite">❤️ 찜 취소</span>
      <span v-else>🤍 찜하기</span>
    </button>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/products';

const props = defineProps({
    product:Object
})

const store = useProductStore()

const toggleFavorite = () => {
  store.toggleFavoriteByName(props.product.name)
}
</script>

<style scoped>
.product-card {
  width: 260px;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px 20px;
  margin: 16px auto;

  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.product-name {
  margin-bottom: 12px;
  font-size: 1.1rem;
  font-weight: 700;
}

.product-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin-bottom: 12px;
}

.product-price {
  margin: 4px 0 10px;
  font-size: 0.95rem;
}

.favorite-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 24px;
  line-height: 1;
  padding: 4px;
}
</style>
