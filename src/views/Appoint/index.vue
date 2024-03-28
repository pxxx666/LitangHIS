<script setup>
import MyCard from '@/components/MyCard.vue'
</script>
<template lang="">
  <h1>预约医生</h1>

  <div class="appoint">
      <my-card v-for="i in 9"></my-card>

  </div>
</template>
<style>
.appoint {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  /* overflow: scroll; */
}
</style>