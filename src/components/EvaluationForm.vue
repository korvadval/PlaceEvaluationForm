<template>
  <EfPage :page_key="display_state.id"
          :transition_name="transition_name"
  >
    <template #title>
      <EfEvaluationHeader v-if="display_state.title"
                          :title="display_state.title"
                          :impact="display_state.impact"
      />
    </template>
    <template #fields>
      <template v-if="display_state.id!=='success_sent'">
        <EfSendForm v-if="display_state.id==='send_form'"
                    v-model:address="common_info.address"
                    v-model:user_name="common_info.user_name"
                    v-model:comment="common_info.comment"
                    :disabled="is_sending"
        />
        <EfEvaluationForm v-else
                          v-model="display_state.fields"
                          :validation_group="display_state.id"
        />
      </template>
      <EfSuccessSent v-else @restart-form="onRestartForm"/>
    </template>
    <template #actions v-if="display_state.id!=='success_sent'">
      <EfButton v-if="current_state_index > 0"
                @click="prevState"
                style="min-width: 120px"
                text
                :disabled="is_sending"
      >
        Назад
      </EfButton>
      <div v-else/>
      <EfButton v-if="display_state.id==='send_form'"
                @click="sendForm"
                style="min-width: 180px"
                :disabled="is_sending"
      >
        Отправить
      </EfButton>
      <EfButton v-else
                @click="nextState"
                style="min-width: 120px"
                :disabled="is_sending"
      >
        Далее
      </EfButton>
    </template>
  </EfPage>
</template>

<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import ValidationEngine from "@/core/ValidationEngine";
import {EfButton, EfPage, EfEvaluationHeader} from "./ui";
import {EfSendForm, EfEvaluationForm} from "./form-parts";
import TGWorker from "@/core/TGWorker";
import {EfSuccessSent} from "@/components/form-parts";

const tg_worker = new TGWorker()
const validation_engine = new ValidationEngine()

const common_info = reactive({
  address: '',
  user_name: '',
  comment: '',
})
const state_variants = [
  {
    id: 'map_point', impact: 20, title: 'Местоположение', fields: [
      {name: 'Доступность', description: 'лестницы, подъемы, удобство входа', input_value: ref('')},
      {name: 'Проходимость', description: 'общее количество пешеходного и автотрафика', input_value: ref('')},
      {name: 'Видимость с улицы', description: 'наличие преград, яркость фасада', input_value: ref('')},
      {name: 'Наличие парковки', description: 'ближайшие парковочные места и их загруженность', input_value: ref('')},
    ]
  },
  {
    id: 'size', impact: 10, title: 'Размер и соответствие помещения концепции', fields: [
      {name: 'Площадь соответствует формату', description: '6–55 м²', input_value: ref('')},
    ]
  },
  {
    id: 'infrastructure', impact: 10, title: 'Инфраструктура', fields: [
      {name: 'Электроснабжение', description: 'мощность, стабильность', input_value: ref('')},
      {name: 'Водоснабжение и канализация', description: 'наличие и удобство подключения', input_value: ref('')},
      {name: 'Вентиляция и кондиционирование', description: 'подходящие для кофейни', input_value: ref('')},
    ]
  },
  {
    id: 'repair', impact: 10, title: 'Ремонт и состояние помещения', fields: [
      {name: 'Общий ремонт', description: 'уровень и требуемые доработки', input_value: ref('')},
      {
        name: 'Чистота и гигиенические условия',
        description: 'отсутствие мусора, неприятных запахов',
        input_value: ref('')
      },
    ]
  },
  {
    id: 'rent', impact: 15, title: 'Арендная плата и условия', fields: [
      {name: 'Размер арендной платы', description: 'адекватность рынку', input_value: ref('')},
      {name: 'Длительность аренды', description: 'долгосрочность', input_value: ref('')},
      {name: 'Гибкость условий', description: 'каникулы, возможность переговоров', input_value: ref('')},
      {name: 'Адекватность арендодателя', description: 'готовность к сотрудничеству', input_value: ref('')},
    ]
  },
  {
    id: 'location', impact: 15, title: 'Оценка локации', fields: [
      {name: 'Наличие партнеров/точек притяжения', description: 'офисы, ТРЦ, фитнес-клубы и т.д.', input_value: ref('')},
      {name: 'Наличие заинтересованных потребителей', description: 'поток целевой аудитории', input_value: ref('')},
    ]
  },
  {
    id: 'clients', impact: 15, title: 'Потенциальные клиенты', fields: [
      {name: 'Количество потенциальных клиентов', description: 'оценка по трафику', input_value: ref('')},
      {name: 'Средний доход населения', description: 'уровень платежеспособности', input_value: ref('')},
      {name: 'Привлекательность для целевой аудитории', description: 'соответствие концепту', input_value: ref('')},
    ]
  },
  {
    id: 'marketing', impact: 10, title: 'Маркетинговые возможности', fields: [
      {name: 'Размещение наружной рекламы', description: 'баннеры, витрины', input_value: ref('')},
      {name: 'Возможность проведения промо-акций', description: 'зоны для активности', input_value: ref('')},
    ]
  },
  {
    id: 'logistics', impact: 5, title: 'Логистика и поставки', fields: [
      {name: 'Удобство доставки товаров', description: 'въезд, разгрузка', input_value: ref('')},
      {name: 'Наличие мест для хранения', description: 'подсобка, складские зоны', input_value: ref('')},
    ]
  },
  {
    id: 'impressions', impact: 10, title: 'Общие впечатления', fields: [
      {name: 'Общая субъективная оценка локации', description: 'перспективность', input_value: ref('')},
    ]
  },
];
const current_state_index = ref(0);
const display_state = computed(() => {
  const next_state = state_variants[current_state_index.value]
  if (next_state) return next_state
  if (display_state.value.id === 'send_form') return {id: 'success_sent'}
  return {id: 'send_form', title: 'Отправка формы'}
});
const transition_name = ref('slide-left');

const is_sending = ref(false);

const user_info = {
  id: null,
  first_name: '',
  last_name: '',
  full_name: ''
}

const sumFieldsValue = (array) => array.reduce((acc, item) => acc += Number(item.input_value.value), 0)
const getDate = () => {
  const now = new Date();
  const options = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  return new Intl.DateTimeFormat('ru-RU', options).format(now);
};

const calculateEvaluate = () => {
  const map_point_group = state_variants.find(s => s.id === 'map_point')
  const map_point_score = sumFieldsValue(map_point_group.fields) / 4

  const size_group = state_variants.find(s => s.id === 'size')
  const size_score = sumFieldsValue(size_group.fields) / 1

  const infrastructure_group = state_variants.find(s => s.id === 'infrastructure')
  const infrastructure_score = sumFieldsValue(infrastructure_group.fields) / 2

  const repair_group = state_variants.find(s => s.id === 'repair')
  const repair_score = sumFieldsValue(repair_group.fields) / 2

  const rent_group = state_variants.find(s => s.id === 'rent')
  const rent_score = sumFieldsValue(rent_group.fields) / 2

  const location_group = state_variants.find(s => s.id === 'location')
  const location_score = sumFieldsValue(location_group.fields) / 2

  const clients_group = state_variants.find(s => s.id === 'clients')
  const clients_score = sumFieldsValue(clients_group.fields) / 2

  const marketing_group = state_variants.find(s => s.id === 'marketing')
  const marketing_score = sumFieldsValue(marketing_group.fields) / 2

  const logistics_group = state_variants.find(s => s.id === 'logistics')
  const logistics_score = sumFieldsValue(logistics_group.fields) / 2

  const impressions_group = state_variants.find(s => s.id === 'impressions')
  const impressions_score = sumFieldsValue(impressions_group.fields) / 1

  return map_point_score + size_score + infrastructure_score
      + repair_score + rent_score + location_score + clients_score
      + marketing_score + logistics_score + impressions_score
}

const nextState = (is_need_validate = true) => {
  if (is_need_validate) {
    const current_group = state_variants[current_state_index.value]
    const validate_result = validation_engine.validateGroup(current_group.id)
    if (!validate_result) return
  }
  transition_name.value = 'slide-left';
  current_state_index.value++
};
const prevState = () => {
  transition_name.value = 'slide-right';
  current_state_index.value--;
};
const sendForm = async () => {
  const message = `
${getDate()}

${common_info.user_name} поставил оценку \`${calculateEvaluate()}\`
помещению по адресу: \`${common_info.address}\`

Комментарий: ${common_info.comment}
`
  is_sending.value = true
  await tg_worker.sendMessage(message)
  is_sending.value = false
  nextState(false)
}
const clearForm = () => {
  common_info.user_name = user_info.full_name || ''
  common_info.address = ''
  state_variants.forEach(variant => {
    variant.fields.forEach(field => {
      field.input_value.value = '';
    });
  });
}

const onKeyDown = (event) => {
  if (event.key === 'Enter') nextState()
}
const onRestartForm = () => {
  clearForm()
  current_state_index.value = 0
}
const addEnterListener = () => window.addEventListener('keydown', onKeyDown)

const init = () => {
  addEnterListener()
  const user = tg_worker.getUserInfo()
  if (user) {
    user_info.id = user.id
    user_info.first_name = user.first_name
    user_info.last_name = user.last_name
    user_info.full_name = user.full_name
    common_info.user_name = user.full_name || ''
  }
}
onMounted(init)
</script>
