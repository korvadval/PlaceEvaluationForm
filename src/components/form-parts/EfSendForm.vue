<template>
  <div class="ef-send-form-container">
    <EfCommonField v-model="address"
                   :validation_group="validation_group"
                   name="Адрес"
                   :tabindex="1"
                   is_autofocus
    />
    <EfDivider/>
    <EfCommonField v-model="user_name"
                   :validation_group="validation_group"
                   name="Ответственный"
                   :tabindex="2"
    />
    <EfDivider/>

    <div v-if="disabled"
         class="ef-send-form-disabled"
    />
  </div>
</template>

<script setup>
import {EfCommonField, EfDivider} from "../ui";

defineProps({
  validation_group: {type: String, default: ''},
  disabled: {type: Boolean, default: false}
})

const address = defineModel('address', {required: true})
const user_name = defineModel('user_name', {required: true})
</script>

<style lang="scss" scoped>
.ef-send-form {
  &-container {
    position: relative;
  }

  &-disabled {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 4;

    background-color: rgba(255, 255, 255, .7);
  }
}
</style>