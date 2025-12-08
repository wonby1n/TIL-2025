import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {

  const productList = ref([
    {
      name:'상품1',
      imagePath: 'src/assets/product1.png',
      price: 10000,
      isFavorite: false
    },
    {
      name:'상품2',
      imagePath: 'src/assets/product2.png',
      price: 20000,
      isFavorite: false
    },
    {
      name:'상품3',
      imagePath: 'src/assets/product3.png',
      price: 30000,
      isFavorite: false
    },
    {
      name:'상품4',
      imagePath: 'src/assets/product4.png',
      price: 40000,
      isFavorite: false
    },
  ])
  return { productList }
})
