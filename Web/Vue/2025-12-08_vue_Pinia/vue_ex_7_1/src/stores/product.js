import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
    let id = 0

    const products = ([
        {id:id++, title:'상품1',body:'상품1의 내용입니다'},
        {id:id++, title:'상품2',body:'상품2의 내용입니다'},
        {id:id++, title:'상품3',body:'상품3의 내용입니다'},
    ])

    return { products }
})
