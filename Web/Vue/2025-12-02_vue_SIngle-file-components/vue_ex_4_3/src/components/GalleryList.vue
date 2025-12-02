<template>
  <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
    <GalleryListItem v-for="_ in 4" />
  </div>
</template>

<script setup>
import GalleryListItem from "./GalleryListItem.vue";
</script>

<style scoped></style>
