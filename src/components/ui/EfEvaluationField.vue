<template>
  <div class="ef-evaluation-field-container">
    <div class="ef-evaluation-field-caption">
      <div class="ef-evaluation-field-caption-name">{{ name }}</div>
      <div class="ef-evaluation-field-caption-description">{{ description }}</div>
    </div>
    <input v-model="local_value"
           class="ef-evaluation-field-field"
           :class="{'error':has_error}"
           v-bind="$attrs"
           :min="MIN"
           :max="MAX"
           :tabindex="tabindex"
           type="number"
           @focus="onFocus"
           @blur="onBlur"
           @keydown="onKeyDown"
           @input="onInput"
           ref="input_ref"
    />
    <EfBubbleError v-if="has_error" :text="error_message"/>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import ValidationEngine from "@/core/ValidationEngine";
import {EfBubbleError} from ".";

const MIN = 0
const MAX = 10

const props = defineProps({
  name: {type: String, default: ''},
  description: {type: String, default: ''},
  validation_group: {type: String, default: ''},
  tabindex: {type: Number, default: 0},
  is_autofocus: {type: Boolean, default: false},
})
const model = defineModel({required: true})

const input_ref = ref(null)
const has_error = ref(false)
const error_message = 'Обязательное поле.'

const local_value = ref(model.value)
const is_focused = ref(false)

const init = () => {
  registerField()
  if (props.is_autofocus) setTimeout(() => input_ref.value.focus(), 201)
}

const onFocus = (event) => {
  is_focused.value = true
  has_error.value = false
  event.target.select()
}
const onBlur = () => {
  is_focused.value = false
  validateField()
}

const onInput = (event) => {
  let value = event.target.value

  if (value < MIN) value = MIN
  else if (value > MAX) value = MAX
  local_value.value = value
  model.value = value
}
const onKeyDown = (event) => {
  if (event.key === 'Enter') input_ref.value.blur()
  const isDigit = /^[0-9]$/.test(event.key)
  const isSystem = ['e', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'].includes(event.key)
  if (!isDigit && !isSystem) event.preventDefault()
}

const validateField = () => {
  has_error.value = !String(model.value).length
  return has_error.value
}
const registerField = () => new ValidationEngine().registerField(props.validation_group, validateField)

onMounted(init)
</script>

<style lang="scss" scoped>
.ef-evaluation-field {
  &-container {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &-caption {
    margin-right: 8px;
    width: 100%;

    &-name {
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }

    &-description {
      font-size: 14px;
      color: #828282;
    }
  }

  &-field {
    height: 48px;
    width: 48px;
    padding: 12px;
    border: 2px solid #bdbdbd;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    outline: none;
    font-size: 16px;
    text-align: center;

    &:focus {
      border-color: #4E7942;
    }

    &.error {
      border-color: #e04927;
    }
  }
}
</style>
