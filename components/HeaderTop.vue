<template>
  <div class="header-top">
    <div v-if="pending">
      <div class="header-top container">
        <section class="wrapper-pen" style="display: flex; justify-content: space-between">
          <article class="article" style="flex: 50% 0 1">
            <div class="bg bg-2">
              <div class="icons icons_top_1">
                <div class="icon-top-1"></div>
              </div>
            </div>
          </article>
          <article class="article" style="flex: 20% 0 1">
            <div class="bg bg-2">
              <div class="icons icons_top_2">
                <div class="icon-top-2"></div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
    <div v-else class="container header-top_container">
      <nav class="header_nav">
        <ul class="header_ul">
          <li>
            <nuxt-link to="/" class="header_link">Доставка</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="header_link">Оплата</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="header_link">О компании</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="header_link">Гарантия</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="header_link">Магазины</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="header_link">Контакты</nuxt-link>
          </li>
        </ul>
      </nav>
      <div class="header_right">
        <div class="dropdown" v-if="user">
          <button @mouseenter="showDropDown" class="dropbtn">{{ user.first_name }}</button>
          <div id="myDropdown" @mouseleave="unShowDropDown" class="dropdown-content" :class="{'show': show}">
            <div class="content_rec"></div>
            <span>
              <nuxt-link :to="`/profile`" class="link_profile">Личный кабинет</nuxt-link>
            </span>
            <span v-if="!btn_pending" @click.prevent="logout">Выйти</span>
            <span v-else style="text-align: center"><img src="/img/834.svg" alt=""></span>
          </div>
<!--          <nuxt-img class="header_right_profile" sizes="xxl:100vw xl:100vw lg:110vw md:100vw sm:100vw xs:100vw" src="img/profile-user.svg" alt="user-profile" loading="lazy" />-->
        </div>
        <div v-else>
          <AuthModal>Войти</AuthModal>
          <AuthModal>
<!--            <nuxt-img class="header_right_profile" sizes="xxl:100vw xl:100vw lg:120vw md:100vw sm:100vw xs:100vw" src="img/profile-user.svg" alt="user-profile" loading="lazy" />-->
          </AuthModal>
        </div>
<!--        <nuxt-link to="/" class="header_link">Войти</nuxt-link>-->
        <div class="delimiter"></div>
        <a class="phone-wrapp" href="tel:+78000000000">
          <nuxt-img class="header_right_phone" sizes="xxl:100vw xl:100vw lg:120vw md:100vw sm:100vw xs:100vw" src="img/phone.svg" alt="phone" loading="lazy" />
          <div class="phone_number">+7 (800) 000-00-00</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/UserStore";
import {computed, onMounted, ref} from "vue";

const config = useRuntimeConfig();

const user = computed(() => useUserStore().getUser().value);
const pending = ref(true);

const btn_pending = ref(false);

onMounted(() => {
  // user.value = useUserStore().getUser();
  pending.value = false;
})

const show = ref(false);
const showDropDown = () => {
  show.value = true;
};

const unShowDropDown = () => {
  show.value = false;
};

// const urlLogout = computed(() => config.public.apiBaseUrl + `users/logout/${useUserStore().getUser().value.id}`);
const urlLogout = computed(() => config.public.baseUrl + `users/logout`);

const logout = () => {
  btn_pending.value = true;
  logoutFormRequest().then((res) => {
    removeUser();
    btn_pending.value = false;
    console.log(res);
  }).catch((err) => {
    btn_pending.value = false;
    console.error('Contact form could not be send', err)
  });
};


const logoutFormRequest = async () => {
  return await $fetch(urlLogout.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'POST',
    withCredentials: true,
    credentials: 'include',
  });
};

const removeUser = () => {
  useUserStore().removeUser();
};

</script>

<style scoped>
.header-top{
  height: 2.5rem;
  background-color: #2A2C38;
  color: #fff;
  font-size: 0.875rem;
  font-family: 'Inter', sans-serif;
  font-weight: 600;

}
.header-top_container{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header_nav{
  display: flex;
}
.header_ul{
  display: flex;
}
.header_ul li{
  padding-left: 1.875rem;
  align-items: center;
}
.header_ul li:first-child{
  padding-left: 0;
}
.header_right{
  font-weight: 500;
  display: flex;
  align-items: center;
}
.header_link{
  color: #fff;
  transition: all .3s ease;
}
.header_link:hover{
  color: #BABAC0;
  transition: all .3s ease;
}
.header_right_profile{
  display: flex;
  padding-left: 0.875rem;
  cursor: pointer;
}
.header_right_phone{
  padding-right: 5px;
  cursor: pointer;
}
.delimiter{
  width: 1px;
  height: 1.6825rem;
  background: rgba(133, 143, 164, 0.15);
  border-radius: 1px;
  margin: 0 1.0625rem;
}
.phone-wrapp{
  display: flex;
  align-items: center;
}

.dropbtn {
  color: #fff;
  transition: all .3s ease;
  cursor: pointer;
}

.dropbtn:hover{
  color: #BABAC0;
  transition: all .3s ease;
}

.dropdown {
  position: relative;
  display: inline-block;
  transition: all .3s ease;
}

.dropdown-content {
  display: none;
  position: absolute;
  min-width: 11.25rem;
  margin-top: 5px;
  overflow: auto;
  background: #FFFFFF;
  box-shadow: 0 .625rem 1.875rem rgba(133, 143, 164, 0.1);
  border-radius: 5px;
  z-index: 999;
}
.content_rec{
  width: 0.84375rem;
  position: absolute;
  top: -9px;
  height: 9px;
  z-index: 9999;
  background: #FFFFFF;
  box-shadow: 0 1.625rem 1.875rem rgba(133, 143, 164, 0.1);
}
.dropdown-content span {
  color: #1A1A25;
  padding: 1rem;
  text-decoration: none;
  display: block;
  cursor: pointer;
}

.dropdown span:hover {background-color: #f7f7f7;}

.show {
  display: block;
  transition: all .3s ease;
}
.link_profile{
  color: #E31235;
}
.header_right_phone,
.phone_number{
  display: inline-block;
}
.phone_number{
  font-weight: 500;
  font-size: .875rem;
  line-height: 1.0625rem;
  color: #FFFFFF;
}
.article {
  width: 100%;
  background: #fff;
  padding: 0;
  /*margin-top: 1rem;*/
  margin-right: 0;
}

.icons_top_1,
.icons_top_2{
  border-top: solid 0.5rem #2A2C38;
  border-bottom: solid 0.5rem #2A2C38;
}

.icon-top-1{
  width: 100%;
  height: 1.5rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #2A2C38, .625rem -.625rem .3125rem #2A2C38, -.625rem .625rem .3125rem #2A2C38, -.625rem -.625rem .3125rem #2A2C38;
}

.icon-top-2{
  width: 100%;
  height: 1.5rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #2A2C38, .625rem -.625rem .3125rem #2A2C38, -.625rem .625rem .3125rem #2A2C38, -.625rem -.625rem .3125rem #2A2C38;
}

.bg {
  animation-duration: 11s;
  min-height: auto;
}

.bg-2 {
  animation-duration: 5s;
  min-height: auto;
}
</style>
