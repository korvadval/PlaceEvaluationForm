<template>
  <div class="ef-bubble-error-container pos-b-0">
    <div class="ef-bubble-error-message pos-l-0" v-html="text"/>
  </div>
</template>

<script setup>
defineProps({
  text: {type: String, default: ''},
})
</script>

<style lang="scss" scoped>
.ef-bubble-error {
  &-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 3;
  }

  &-message {
    color: #fff;
    position: absolute;
    background: #e04927;
    border-radius: 4px 0 4px 4px;
    font-size: 14px;
    padding: 4px 8px;
    top: 3px;
    right: 24px;
    max-width: calc(100% - 32px);
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);

    &::before {
      content: "";
      position: absolute;
      right: 0;
      top: -5px;
      width: 0;
      height: 0;
      border-right: 6px solid #e04927;
      border-top: 6px solid transparent;
    }
  }
}
</style>
