<template>
  <div class="ef-success-sent-container">
    <div class="ef-success-sent-text">Отчет успешно отправлен</div>
    <EfButton @click="emit('restartForm')">Вернуться в начало</EfButton>
  </div>
</template>

<script setup>
import {EfButton} from "@/components/ui";

const emit = defineEmits(['restartForm'])
</script>

<style scoped lang="scss">
.ef-success-sent {
  &-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
  }

  &-text {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 24px;
  }
}
</style>