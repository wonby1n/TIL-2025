<template>
    <div>
        <li>{{ product.id }} - {{ product.title }} - {{ product.body }} 
            <button @click="deleteProduct(product.id)">Delete</button>
        </li>
    </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product';

const store = useProductStore()

defineProps({
    product:Object,
})

const deleteProduct = function (productId) {
    store.deleteProduct(productId)
}


</script>

<style scoped>

</style>