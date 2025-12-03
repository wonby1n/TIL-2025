<template>
  <div>
    <h1>쇼핑 애플리케이션</h1>
    <ProductList @add-cart="addCart" :products="products" />
    <p>총 가격 : {{ totalPrice }}원</p>
    
    <Cart @remove-item="removeItem" :cart="cart"/>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductList from '@/components/ProductList.vue'
import Cart from './components/Cart.vue'

let id = 0

const products = ref([
  { id: id++, name: '사과', price: 1000 },
  { id: id++, name: '바나나', price: 1500 },
  { id: id++, name: '딸기', price: 2000 },
  { id: id++, name: '포도', price: 3000 },
  { id: id++, name: '복숭아', price: 2000 },
  { id: id++, name: '수박', price: 5000 }
])

// 장바구니 목록
const cart = ref([]);

const totalPrice = computed(() => {
  return cart.value.reduce((total, product) => {
    return total + product.price
  },0);
});

const addCart = function (product) {
  cart.value.push(product);
}

const removeItem = function (item) {
  // 배열에서 삭제 => 삭제할 원소의 인덱스를 찾아서 splice
  const idx = cart.value.findIndex((product) => {
    return product.id === item.id;
  });
  if (idx !== -1) {
    // idx 1에서부터 삭제
    cart.value.splice(idx, 1);
  }
};

</script>
