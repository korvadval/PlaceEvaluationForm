<template>
  <div class="ef-button"
       :class="{'text':text}"
       v-bind="$attrs"
  >
    <slot/>
  </div>
</template>

<script setup>
defineProps({text: Boolean})
</script>

<style scoped lang="scss">
.ef-button {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  border-radius: 4px;
  transition: all 200ms;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 16px;
  height: 48px;
  max-height: 48px;
  min-height: 48px;
  font-weight: 500;

  &:not(.text) {
    color: white;
    background-color: #4E7942;

    &:active {
      background-color: darken(#4E7942, 8%);
    }
  }

  &.text {
    color: #4E7942;
    background-color: transparent;

    &:active {
      color: #828282;
      background-color: #f2f2f2;
    }
  }

}
</style>