<template>
  <template v-for="(field,index) of model">
    <EfEvaluationField v-model="field.input_value.value"
                       :is_autofocus="index===0"
                       :validation_group="validation_group"
                       :name="field.name"
                       :description="field.description"
                       :tabindex="model.length>1?index+1:0"
    />
    <EfDivider/>
  </template>
</template>

<script setup>
import {EfEvaluationField, EfDivider} from "../ui";

defineProps({
  validation_group: {type: String, default: ''},
})

const model = defineModel({required: true})
</script>
