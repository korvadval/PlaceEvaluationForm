<template>
  <div class="ef-button"
       :class="{'text':text,'disabled':disabled}"
       v-bind="$attrs"
  >
    <slot/>
  </div>
</template>

<script setup>
defineProps({text: Boolean, disabled: Boolean})
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

  &:not(.text):not(.disabled) {
    color: white;
    background-color: #4E7942;

    &:active {
      background-color: darken(#4E7942, 8%);
    }
  }

  &.text:not(.disabled) {
    color: #4E7942;
    background-color: transparent;

    &:active {
      color: #828282;
      background-color: #f2f2f2;
    }
  }

  &.disabled {
    pointer-events: none;
    background-color: #f2f2f2;
    color: #828282;
  }

}
</style>