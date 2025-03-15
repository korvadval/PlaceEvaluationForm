<template>
  <div class="ef-evaluation-header-container">
    <div class="ef-evaluation-header-title">{{ title }}</div>
    <div v-if="impact" class="ef-evaluation-header-impact">{{ impact }}%</div>
  </div>
</template>

<script setup>
defineProps({
  title: {type: String, default: ''},
  impact: {type: Number, default: 0}
})
</script>

<style scoped lang="scss">
.ef-evaluation-header {
  &-container {
    display: flex;
    align-items: stretch;
    font-weight: 700;
    font-size: 18px;
    height: 100%;
  }

  &-title {
    display: flex;
    align-items: center;
    padding-left: 16px;
    margin-right: 8px;
    width: 100%;
  }

  &-impact {
    display: flex;
    align-items: center;
    justify-content: center;
    border-left: 2px solid #4E7942;
    min-width: 80px;
  }
}
</style>