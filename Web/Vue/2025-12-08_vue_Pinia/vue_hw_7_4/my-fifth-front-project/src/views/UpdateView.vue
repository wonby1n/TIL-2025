<template>
    <div>
        <h1>데이터 수정 페이지</h1>
      <p>이름: {{ target.name }}</p>
      <p>잔고: {{ target.balance }}</p>
      <button @click="increaseBalance">+</button>
    </div>
</template>

<script setup>

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBalanceStore } from '@/stores/balance'

const route = useRoute()
const store = useBalanceStore()

const name = computed(() => route.params.name)

const target = computed(() => store.getBalanceByName(name.value))

const increaseBalance = () => {
  store.increaseBalance(name.value)
}
</script>

<style scoped>

</style>