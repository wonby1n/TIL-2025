<template>
  <div class="parent-card">
    <h2>부모 컴포넌트</h2>
    <p class="family-name">{{ family.familyName }}</p>

    <div class="children-wrapper">
      <ChildPage
        v-for="child in family.children"
        :key="child.name"
        :child="child"
      />
    </div>
  </div>
</template>

<script setup>
import ChildPage from './ChildPage.vue';

defineProps({
    family:Object,
})
</script>

<style scoped>
.parent-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px 20px;
  margin: 16px 0;

  background-color: #f9fafb;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.family-name {
  font-weight: 600;
  margin-bottom: 12px;
}

.children-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>