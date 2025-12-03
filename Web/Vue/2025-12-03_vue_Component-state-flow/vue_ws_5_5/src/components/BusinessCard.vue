<template>
    <div>
        <h2>보유 명함 목록</h2>
        <template v-if="hasCard">
            <p>현재 보유중인 명함 수 : {{ cardCount }}</p>
            <BusinessCardDetail
            @delete-card-event="deleteCard"
            v-for="card in businessCards"
            :key="card.name"
            :card="card"/>
        </template>
        <p v-else>명함이 없습니다. 새로운 명함을 추가해주세요.</p>
    </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue';
import BusinessCardDetail from './BusinessCardDetail.vue';

const props = defineProps({
  newCard: Object,
})

const businessCards = ref([
    {name : '일론 머스크', title:'테슬라 테크노킹'},
    {name : '래리 엘리슨', title:'오라클 창업주'},
    {name : '빌 게이츠', title:'마이크로소프트 공동창업주'},
    {name : '래리 페이지', title:'구글 공동창업주'},
    {name : '세르게이 브린', title:'구글 공동창업주'},
])

const cardCount = computed(() => businessCards.value.length)
const hasCard = computed(() => cardCount.value > 0)

const deleteCard = (targetCard) => {
    const idx = businessCards.value.findIndex((c) => {
        return c.name === targetCard.name && c.title === targetCard.title
    })
    if (idx !== -1) {
        businessCards.value.splice(idx, 1)
  }
}

// 5) newCard가 바뀔 때마다 명함 배열에 추가
watch(
  () => props.newCard,
  (card) => {
    if (card) {
      businessCards.value.push(card)
    }
  }
)
</script>


<style scoped>

</style>