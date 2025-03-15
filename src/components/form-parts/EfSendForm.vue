<template>
  <EfCommonField v-model="address"
                 :validation_group="validation_group"
                 name="Адрес"
                 :tabindex="1"
                 is_autofocus
  />
  <EfDivider/>
  <!--  <EfCommonField v-model="date"-->
  <!--                 :validation_group="validation_group"-->
  <!--                 name="Дата оценки"-->
  <!--                 type="date"-->
  <!--                 :tabindex="2"-->
  <!--  />-->
  <!--  <EfDivider/>-->
  <EfCommonField v-model="user_name"
                 :validation_group="validation_group"
                 name="Ответственный"
                 :tabindex="2"
  />
  <EfDivider/>
</template>

<script setup>
import {EfCommonField, EfDivider} from "../ui";

defineProps({
  validation_group: {type: String, default: ''},
})

const address = defineModel('address', {required: true})
const date = defineModel('date', {required: true})
const user_name = defineModel('user_name', {required: true})
</script>
