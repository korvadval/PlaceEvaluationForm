<template>
  <div class="ef-common-field-container">
    <div class="ef-common-field-caption-name">{{ name }}</div>
    <input v-model="model"
           class="ef-common-field-field"
           :class="{'error':has_error}"
           v-bind="$attrs"
           :tabindex="tabindex"
           @focus="onFocus"
           @blur="onBlur"
           @click="has_error=false"
           ref="input_ref"
    />
    <EfBubbleError v-if="has_error" :text="error_message"/>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import ValidationEngine from "@/core/ValidationEngine";
import {EfBubbleError} from ".";

const props = defineProps({
  name: {type: String, default: ''},
  validation_group: {type: String, default: ''},
  tabindex: {type: Number, default: 0},
  is_autofocus: {type: Boolean, default: false},
})
const model = defineModel({required: true})

const input_ref = ref(null)
const has_error = ref(false)
const error_message = 'Обязательное поле.'

const is_focused = ref(false)

const init = () => {
  registerField()
  // if (props.is_autofocus) setTimeout(() => input_ref.value.focus(), 201)
}

const onFocus = (event) => {
  is_focused.value = true;
  has_error.value = false;
  event.target.select();
};

const onBlur = () => {
  is_focused.value = false
  validateField()
}

const validateField = () => {
  has_error.value = !String(model.value).length
  return has_error.value
}
const registerField = () => new ValidationEngine().registerField(props.validation_group, validateField)

onMounted(init)
</script>

<style lang="scss" scoped>
.ef-common-field {
  &-container {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  &-caption-name {
    margin-bottom: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #333;
  }

  &-field {
    height: 48px;
    width: 100%;
    padding: 12px;
    border: 2px solid #bdbdbd;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    outline: none;
    font-size: 16px;

    &:focus {
      border-color: #4E7942;
    }

    &.error {
      border-color: #e04927;
    }
  }
}
</style>
