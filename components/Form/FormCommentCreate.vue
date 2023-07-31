<template>
  <div id="not_access_block" style="display: none" :class="{not_access_block: btn_pending}">
    <img src="/img/295.svg" alt="">
  </div>
  <div class="form-section">
    <form id="form" action="" method="POST">
      <h3 class="common_title">Общий рейтинг<span style="color: #f53b49;">*</span></h3>
      <div class="write_rating">
        <ClientOnly>
          <star-rating :star-size="15"
                       :increment="1"
                       :padding="2"
                       :show-rating="true"
                       :round-start-rating="true"
                       :inline="true"
                       :rounded-corners="false"
                       inactive-color="#909CB5"
                       active-color="#F99808"
                       v-model:rating="rating"
                       :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
        </ClientOnly>
      </div>
      <div class="form-group">
        <h2 class="form_label">Достоинства</h2>
          <textarea class="form-textarea-sm form-input_wrapp form_input form-message"
                    id="advantages"
                    name="advantages"
                    :disabled="props.isDisabled"
                    placeholder="Достоинства"
                    v-model.trim="formData.advantages"></textarea>
      </div>
      <div class="form-group">
        <h2 class="form_label">Недостатки</h2>
          <textarea class="form-textarea-sm form-input_wrapp form_input form-message"
                    id="disadvantages"
                    name="disadvantages"
                    :disabled="props.isDisabled"
                    placeholder="Недостатки"
                    v-model.trim="formData.disadvantages"></textarea>
      </div>
      <div class="form-group">
        <h2 class="form_label">Отзыв<span style="color: #f53b49;">*</span></h2>
        <div :class="{
          'input-error': v$.comment.$error,
         }">
            <textarea class="form-textarea form-input_wrapp form_input form-message"
                      id="comment"
                      name="comment"
                      :disabled="props.isDisabled"
                      placeholder="Отзыв"
                      v-model.trim="formData.comment"
                      @change="v$.comment.$touch"></textarea>
        </div>
        <div v-if="v$.comment.$error" class="error_message">
          {{ v$.comment.$errors[0].$message }}
        </div>
      </div>
      <div class="message_error" v-if="createCommentError">{{ createCommentError }}</div>
      <div class="login-form" >
        <Button @click.prevent="createComment"
                :width_btn="20"
                :route_btn="''"
                :src_btn="btn_pending_src"
                :disabled_btn="disabled_reg=(
                    v$.comment.$error ||
                    formData.comment === '' ||
                    rating === '' ||
                    btn_pending ||
                    props.isDisabled)">
          {{ !btn_pending ? 'Отправить отзыв' : '' }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, sameAs, email } from '@vuelidate/validators'
import {useUserStore} from "../../stores/UserStore.js";
import {computed, reactive, ref} from "vue";

const disabled_reg = ref(true);
const props = defineProps({
  product_id: Number,
  isDisabled: Boolean,
});

const emit = defineEmits(['addComment',]);
const btn_pending = ref(false);
const btn_pending_src = ref('');
// const emit = defineEmits(['newMessage',]);
const rating = ref();
const config = useRuntimeConfig();
const formData = reactive({
  advantages: '',
  disadvantages: '',
  comment: '',
})

const rules = computed(() => {
  return {
    comment: {
      required: helpers.withMessage('Введите ваше сообщение', required),
    },
  }
});
const v$ = useVuelidate(rules, formData);
const createCommentError = ref('');

// const urlCreateComment = computed(() => config.public.apiBaseUrl + `comments/${useUserStore().getUser().value.id}/create`);
const urlCreateComment = computed(() => config.public.apiBaseUrl + `comments/create`);

const createComment = () => {
  if (!disabled_reg.value){
    createCommentError.value = '';
    openButtonPending();
    commentCreateFormRequest().then((res) => {
      if (res == false){
        closeButtonPending();
        createCommentError.value = `Для написания отзыва необходимо приобрести данный товар.`;
      }
      else{
        closeButtonPending();
        emit('addComment');
        navigateTo('#content_header');
      }
    }).catch((err) => {
      closeButtonPending();
      createCommentError.value = `Отправка отзыва не удалась. Проверьте корректность данных.`;
      console.error('Contact form could not be send', err)
    });
  }
};

const commentCreateFormRequest = async () => {
  return await $fetch(urlCreateComment.value , {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
    params: {
      advantages: formData.advantages,
      disadvantages: formData.disadvantages,
      comment: formData.comment,
      rating: parseInt(rating.value),
      user_id: useUserStore().getUser().value.id,
      // user_id: 68,
      product_id: props.product_id,
    },
  });
}


const getBodyScrollTop = () => {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
}

const openButtonPending = () => {
  btn_pending.value = true;
  btn_pending_src.value = '/img/835.svg';

  document.querySelector('body').dataset.scrollY = getBodyScrollTop()

  // modal.classList.add('modal--open')
  document.querySelector('body').classList.add('lock')
  document.querySelector('body').style.top = `-${document.querySelector('body').dataset.scrollY}px`
};

const closeButtonPending = () => {
  btn_pending.value = false;
  btn_pending_src.value = '';

  // modal.classList.remove('modal--open')
  rating.value = '';
  formData.advantages = '';
  formData.disadvantages = '';
  formData.comment = '';
  document.querySelector('body').classList.remove('lock')
  window.scrollTo(0,document.querySelector('body').dataset.scrollY)
};
</script>

<style scoped>
.form_title{
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 110%;
  color: #1A1A25;
  margin-bottom: 1.5rem;
}
.form-input_wrapp{
  width: 22rem;
  height: 3rem;
  background: #ffffff;
  /*border: 1px solid rgba(133, 143, 164, 1);*/
  /*border: 1px solid #bbb;*/
  border-radius: 5px;
  justify-content: space-between;
  display: flex;
  align-items: center;
  transition: all .3s ease;
}
.form-group{
  margin-top: 2rem;
}
.form-group:first-child{
  margin-top: 0;
}
.form-input_wrapp:focus-within{
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  border-color: #66afe9;
  background: #FFFFFF;
}

.form_input{
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 140%;
  width: 100%;
  height: 100%;
  padding: 0 1rem;
  color: #858FA4;
  /*width: 100%;*/
  border-radius: 5px;
}
.form_input:disabled{
  opacity: 0.5;
}
.form_input::placeholder {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 140%;
  color: #858FA4;
}

.login-form{
  margin: 5.25rem 0;
}
.login-form_disbled{
  opacity: 0.5;
}
.error_message{
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: .875rem;
  line-height: 110%;
  color: #E31235;
  margin-top: 5px;
}
.input-error{
  border: 1px solid #E31235;
  background: #FFFFFF;
  transition: all .3s ease;
  border-radius: 5px;
}
.input-invalid{
  border: 1px solid #66afe9;
  background: #FFFFFF;
  transition: all .3s ease;
  border-radius: 5px;
}
.form_label{
  padding-bottom: .3175rem;
  font-weight: 700;
  font-size: 1rem;
  line-height: 150%;
  color: #384255;
}
.form-message {
  min-height: 100%;
  padding-top: 3%;
  transition: all .3s ease;
  border: 1px solid rgba(133, 143, 164, .5);
}
.form-message:hover {
  border: 1px solid rgba(133, 143, 164, 1);
}
.form-message:focus-within{
  transition: all .3s ease;
  outline: none;
}
.form-textarea{
  min-height: 10rem;
}
.form-textarea-sm{
  min-height: 5rem;
}
.message_error{
  color: #E31235;
  font-size: 1rem;
  margin-top: 1rem;
}

.common_title{
  display: inline-block;
}
.write_rating{
  display: inline-block;
  margin-left: .625rem;
}
</style>