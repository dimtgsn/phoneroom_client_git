<template>
  <div class="form_title">Введите ваши данные</div>
  <div class="form-section">
    <form action="" method="post">
      <div class="tel">
        <vue-tel-input class="form_input form_input_tel"
                       :class="{
                        'input-error': v$.phone.$error,
                        'input-invalid': !v$.phone.$invalid,
                       }"
                       v-model.trim="formData.phone"
                       v-bind="bindProps"
                       @input="v$.phone.$touch"/>
        <div v-if="v$.phone.$error" class="error_message">
          {{ v$.phone.$errors[0].$message }}
        </div>
      </div>
      <div class="form-input_wrapp code-wrapp" v-if="!v$.phone.$error && formData.phone!==''">
        <input class="form_input"
               :class="{
                'input-error': v$.code.$error,
                'input-invalid': !v$.code.$invalid,
               }"
               type="number"
               id="code"
               name="code"
               placeholder="Код из смс"
               v-model.trim="formData.code"
               @change="v$.code.$touch">
        <div v-if="v$.code.$error" class="error_message">
          {{ v$.code.$errors[0].$message }}
        </div>
      </div>

      <div class="btn-form">
        <div v-if="disabled_send_count >= 1 && currentTime > 0">
          <Button  @click.prevent="phoneAuth(disabled_send)"
                   :width_btn="18"
                   :src_btn="btn_code_pending_src"
                   :route_btn="''"
                   :without_padding="true"
                   :disabled_btn="disabled_send=true" >
            {{ !btn_code_pending_src ? 'Получить код' : '' }}
          </Button>
          <span class="timeout-message" v-if="disabled_send_count >= 6">Кажется использовано слишком много попыток, попробуйте снова позже.</span>
          <span class="timeout-message" v-if="disabled_send_count >= 1 && disabled_send_count < 6">До получения нового кода {{ currentTime }}с</span>
        </div>
        <div v-else>
          <Button  @click.prevent="phoneAuth(disabled_send)"
                   :width_btn="18"
                   :src_btn="btn_code_pending_src"
                   :route_btn="''"
                   :without_padding="true"
                   :disabled_btn="disabled_send=(v$.phone.$error ||
                                              formData.phone==='')" >
            {{ !btn_code_pending_src ? 'Получить код' : '' }}
          </Button>
        </div>
      </div>
      <div class="login_error" v-if="loginError">{{ loginError }}</div>
      <div class="login_error" v-else>{{ phoneAuthError }}</div>
      <div class="login-form" >
        <Button @click.prevent="login(disabled_reg)"
                :src_btn="btn_pending_src"
                :without_padding="true"
                :route_btn="''"
                :disabled_btn="disabled_reg=(v$.phone.$error ||
                               v$.code.$error ||
                               formData.phone==='' ||
                               // formData.code==='' ||
                               btn_pending_src!=='')">
          {{ !btn_pending_src ? 'Войти' : '' }}
        </Button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, sameAs, integer } from '@vuelidate/validators'
import { VueTelInput } from 'vue-tel-input';

import {useUserStore} from "../../stores/UserStore";
import {computed, reactive, ref} from "vue";

const userStore = useUserStore();

const btn_pending_src = ref('');
const btn_code_pending_src = ref('');

const emit = defineEmits(['login,']);

const loginError = ref('');
const phoneAuthError = ref('');

const config = useRuntimeConfig();

const disabled_send = ref(true);
const disabled_send_count = ref(userStore.getDis());

const disabled_reg = ref(true);
const smsCode = ref("_");
const user = ref();
const formData = reactive({
  phone: '',
  code: '',
})

const rules = computed(() => {
  return {
    phone: {
      required: helpers.withMessage('Номер телефона обязателен для заполнения', required),
      minLength: helpers.withMessage('Неверный формат номера телефона', minLength(10)),
      // integer: helpers.withMessage('Введите только положительные целые числа', integer),
    },
    code: {
      required: helpers.withMessage('Код обязателен для заполнения', required),
      minLength: helpers.withMessage('Неверный формат кода', minLength(6)),
      maxLength: helpers.withMessage('Неверный формат кода', maxLength(6)),
      sameAs: helpers.withMessage('Неверный код', sameAs(smsCode.value)),
    },
  }
});
const v$ = useVuelidate(rules, formData);

const urlPhoneAuth = computed(() => config.public.apiBaseUrl + 'users/phone_auth');

const currentTime = ref(0);
let timer = null;
const phoneAuth = (disabled) => {
  if (!disabled){
    btn_code_pending_src.value = 'img/835.svg';
    phoneAuthError.value = '';
    loginError.value = '';
    userStore.addDis();
    timer = null;
    currentTime.value = 45 * disabled_send_count.value;
    if (disabled_send_count.value >= 1 && disabled_send_count.value <= 5){
      if (timer !== 0){
        timer = setInterval(() => {
          currentTime.value--;
        }, 1000);
      }
      else if (timer === 0){
        clearTimeout(timer);
        btn_code_pending_src.value = '';
      }
    }
    if (disabled_send_count.value <= 5){
      formData.phone = formData.phone.replace(/[^\d]/g, '');
      console.log(formData.phone);
      phoneAuthFormRequest().then((res) => {
        res = JSON.parse(res);
        console.log(res)
        if (res.success === true){
          btn_code_pending_src.value = '';
          smsCode.value = parseInt(res.data.text.replace(/[^\d]/g, ''));
        }
        else {
          btn_code_pending_src.value = '';
          phoneAuthError.value = `Отпрака сообщения не удалась. Проверьте формат номера телефона`;
          console.error('Sms code could not be send')
        }
      }).catch((err) => {
        btn_code_pending_src.value = '';
        phoneAuthError.value = `Отпрака сообщения не удалась. Проверьте формат номера телефона`;
        console.error('Contact form could not be send', err)
      });

    }
  }
};
// TODO убрать закоментированные строки входа
const login = (disabled) => {
  if (!disabled){
    btn_pending_src.value = 'img/835.svg';
    loginError.value = '';
    phoneAuthError.value = '';
    formData.phone = formData.phone.replace(/[^\d]/g, '');
    // if (smsCode.value === formData.code && formData.code !== ''){
      sanctumCookies().then(() => {
        loginFormRequest().then((res) => {
          addUser(res);
          getUser();
          btn_pending_src.value = '';
          userStore.removeDis();
          emit('login');
        }).catch((err) => {
          btn_pending_src.value = '';
          loginError.value = `Авторизация не удалась, проверьте корректность введённых данных.`;
          console.error('Login not be send', err)
        });
      }).catch((err) => {
        btn_pending_src.value = '';
        console.error('Sanctum not be send', err)
      });
    // }
  }
};

const sanctumUrl = computed(() => config.public.baseUrl + 'sanctum/csrf-cookie');
const urlLogin = computed(() => config.public.baseUrl + 'users/login');

const loginFormRequest = async () => {
  return await $fetch(urlLogin.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    method: 'POST',
    params: {
      // first_name: formData.name[0].toUpperCase()
      //     + formData.name.slice(1),
      password: '$$spa_client$$'
          + formData.phone.slice(formData.phone.length/2+1)
          + '$$'
          + formData.phone.slice(1, formData.phone.length/2+1)
          + '$$',
      phone: formData.phone,
    }
  });
}

const sanctumCookies = async () => {
  return await $fetch(sanctumUrl.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    credentials: 'include',
    method: 'GET',
  });
}

const phoneAuthFormRequest = async () => {
  return await $fetch(urlPhoneAuth.value , {
    headers: {
    // "Content-Type": "multipart/form-data; boundary=something",
    "Accept": "application/json",
    'Content-Type': 'application/json',
    },
    method: 'POST',
    params: {
      phone: formData.phone,
    },
  });
}

const addUser = (user) => {
  userStore.addUser(user.data);
};

const getUser = () => {
  user.value =  userStore.getUser().value;
};

const bindProps = computed(() => {
  return {
    autoFormat: true,
    inputOptions: {
      maxlength: 14,
      placeholder: "Номер телефона*",
      type: "tel",
      showDialCode: false,
    },
    dropdownOptions: {
      // showDialCodeInSelection: true,
      showFlags: true,
      disabled: true,
    },
    validCharactersOnly: true,
    mode: 'international',
  }
});
</script>

<style scoped>
.form-section{
  position: relative;
  z-index: 99;
}
.form_title{
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 110%;
  color: #1A1A25;
  margin-bottom: 1.5rem;
}
.form-input_wrapp{
  width: 30rem;
  height: 3rem;
  background: #F7F7F7;
  border: 1px solid rgba(133, 143, 164, 0.5);
  /*border: 1px solid #bbb;*/
  border-radius: 5px;
  margin-bottom: 2rem;
}
.form-input_wrapp:focus-within{
   box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
   border-color: #66afe9;
   background: #FFFFFF;
 }
.form-input_wrapp:hover {
  border: 1px solid rgba(133, 143, 164, 1);
}
.form_input{
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 140%;
  color: #858FA4;
  width: 100%;
  border-radius: 5px;
  padding: .75rem 1rem;
  margin-bottom: 5px;
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
.vue-tel-input{
  border-radius: 5px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 140%;
  color: #858FA4;
  width: 100%;
  height: 3rem;
}
.tel{
  width: 30rem;
  height: auto;
  margin-bottom: 2rem;
}
.vue-tel-input:hover{
  border: 1px solid rgba(133, 143, 164, 1);
}
.form_input_tel{
  padding: 0;
}
.code-wrapp{
  margin-bottom: 2rem;
}
.login-form{
  margin-top: 2rem;
  margin-bottom: .5rem;
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
}
.input-error{
  border: 1px solid #E31235;
  background: #FFFFFF;
}
.input-invalid{
  border: 1px solid #66afe9;
  background: #FFFFFF;
}
.timeout-message{
  display: block;
  color: #BABAC0;
  font-size: 1rem;
  margin-top: .625rem;
}
.login_error{
  color: #E31235;
  font-size: 1rem;
  margin-top: 1rem;
}

@media (max-width: 485px) {
  .tel{
    width: auto;
  }
}
</style>