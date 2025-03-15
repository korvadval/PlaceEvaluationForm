<template>
  <div class="ef-page-container">
    <div class="ef-page-wrapper">
      <transition :name="transition_name">
        <div :key="page_key" class="ef-page-content">
          <div class="ef-page-title">
            <slot name="title"/>
          </div>
          <div class="ef-page-fields">
            <slot name="fields"/>
          </div>
        </div>
      </transition>
    </div>

    <div class="ef-page-actions">
      <slot name="actions"/>
    </div>
  </div>
</template>

<script setup>
import {defineProps} from "vue";

defineProps({
  transition_name: String,
  page_key: String,
});
</script>

<style scoped lang="scss">
.ef-page {
  &-container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  &-wrapper {
    position: relative;
    flex-grow: 1;
    overflow: hidden; /* Исключаем скачки */
  }

  &-content {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: white; /* Фикс мерцания */
  }

  &-title {
    max-height: 72px;
    height: 72px;
    min-height: 48px;
    border-bottom: 3px solid #4E7942;
  }

  &-fields {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 12px 16px 0 16px;
  }

  &-actions {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    max-height: 48px;
    height: 48px;
    min-height: 48px;
    margin-bottom: 16px;
    padding: 0 16px;
  }
}

/* --- Анимация смены страниц --- */
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 200ms ease-in-out, opacity 200ms;
}

/* Вход слева */
.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

/* Выход влево */
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

/* Вход справа */
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

/* Выход вправо */
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
