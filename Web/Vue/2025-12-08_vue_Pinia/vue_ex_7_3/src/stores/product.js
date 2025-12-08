import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useProductStore = defineStore('product', () => {
  const products = ref([])

  // axios로 서버로 요청을 보내서 상품 데이터 받아 채우기
  // 상품정보를 서버에 요청해서 받아오는 기능(action)
  const fetchProducts = function () {
    axios({
      method:"get",
      url:"https://jsonplaceholder.typicode.com/posts",
    }).then((response) => {
      products.value = response.data;
    })
  }

  const productCount = computed(() => products.value.length)

  const deleteProduct = function (productId) {
    // 요소를 직접 수정하는 대신에 splice 메서드를 사용하여 새로운 배열을 생성하여 상태를 업데이트
    const index = products.value.findIndex(product => product.id === productId)
    if (index !== -1) {
      products.value.splice(index, 1)
    }
  }

  return { products, productCount, deleteProduct, fetchProducts }
})
