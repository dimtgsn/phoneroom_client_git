<template>
  <div v-if="pending" class="preloader-wrap">
    <div class="preloader">
      <svg class="cart" role="img" aria-label="Shopping cart line animation" viewBox="0 0 128 128" width="128px" height="128px" xmlns="http://www.w3.org/2000/svg">
        <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
          <g class="cart__track" stroke="hsla(0,10%,10%,0.1)">
            <polyline points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" />
            <circle cx="43" cy="111" r="13" />
            <circle cx="102" cy="111" r="13" />
          </g>
          <g class="cart__lines" stroke="currentColor">
            <polyline class="cart__top" points="4,4 21,4 26,22 124,22 112,64 35,64 39,80 106,80" stroke-dasharray="338 338" stroke-dashoffset="-338" />
            <g class="cart__wheel1" transform="rotate(-90,43,111)">
              <circle class="cart__wheel-stroke" cx="43" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
            </g>
            <g class="cart__wheel2" transform="rotate(90,102,111)">
              <circle class="cart__wheel-stroke" cx="102" cy="111" r="13" stroke-dasharray="81.68 81.68" stroke-dashoffset="81.68" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  </div>
  <div v-else class="wrapper">
    <header class="header">
      <component :is="windowWidth > 768 ? HeaderTop : 'div'" />
      <HeaderMain v-if="windowWidth > 0" />
      <transition name="slide-fade">
        <component @closeMobileCatalog="closeCategoriesMobile" :is="hydratedMobile ? MobileCatalog : 'span'" />
      </transition>
    </header>
    <main class="main">
      <Transition v-if="!agree_on_cookie" name="fade" mode="out-in" appear>
        <AgreeOnCookie @close_agree="useUserStore().SetAgreeOnCookie()" />
      </Transition>
<!--      <Transition name="fade" mode="out-in" appear>-->
<!--     TODO разобраться с keepalive я его убрал сейчас-->
        <NuxtPage />
<!--      </Transition>-->
      <div class="multibtn">
        <a class="float-btn" id="menu-share">
          <i class="fa fa-comments my-float"></i>
        </a>
        <ul>
          <li><a data-fancybox data-src="#hidden_form__callback" href="tel:+79009999999" id="menu-callme">
            <i class="fas fa-phone"></i>
          </a><div class="call-line">Заказать&nbsp;звонок</div></li>
          <li><a href="https://t.me/" target="_blank" id="menu-telegram">
            <i class="fab fa-telegram-plane"></i>
          </a><div class="call-line">Написать&nbsp;в&nbsp;Telegram</div></li>
          <li><a href="https://vk.me/phoneroom" class="show_widget" id="menu-vk">
            <i class="fab fa-vk"></i>
          </a><div class="call-line">Написать&nbsp;в&nbsp;VK</div></li>
          <li><a href="https://api.whatsapp.com/send?phone=79009999999" target="_blank" id="menu-wa">
            <i class="fab fa-whatsapp"></i>
          </a><div class="call-line">Написать&nbsp;в&nbsp;WhatsApp</div></li>
        </ul>
      </div>
    </main>

    <footer class="footer">

      <div class="container">
        <component :is="windowWidth <= 768 ? MobileFooter : 'div'" />
        <component :is="windowWidth > 768 ? Footer : 'div'" />
      </div>

    </footer>
    <div v-if="windowWidth <= 768" class="mobile-menu">
      <div class="container">
      <div class="menu-icons-wrapp">
        <div class="item profile" >
          <MenuProfileUserIcon />
          <div v-if="user">
            <nuxt-link :to="`/profile`" class="item_title">
              {{ user.first_name }}
            </nuxt-link>
          </div>
          <AuthModal v-else ><h2 class="item_title">Войти</h2></AuthModal>
<!--          <h2 v-else class="item_title">Профиль</h2>-->
        </div>
        <div @click="showCategoriesMobile" class="item catalog">
          <MenuCatalogIcon :pressedMenuCatalog="hydratedMobile" />
          <h2 class="item_title">Каталог</h2>
        </div>
        <div class="item favorite">
          <nuxt-link to="/favorites/" v-if="favoriteProducts && favoriteProducts.length !== 0">
            <div class="icons_count">
              <MenuHeaderIconsCount>{{ favoriteProducts.length }}</MenuHeaderIconsCount>
            </div>
            <MenuHeartIcon />
            <h2 class="item_title">Избранное</h2>
          </nuxt-link>
          <nuxt-link to="" v-else class="cursor_hidden">
            <div class="icons_count" v-if="favoriteProducts && favoriteProducts.length !== 0">
              <MenuHeaderIconsCount>{{ favoriteProducts.length }}</MenuHeaderIconsCount>
            </div>
            <MenuHeartIcon />
            <h2 class="item_title">Избранное</h2>
          </nuxt-link>
        </div>
        <div class="item compare">
          <nuxt-link to="/comparison/" v-if="compareProducts && compareProducts.length !== 0">
            <div class="icons_count" v-if="compareProducts && compareProducts.length !== 0">
              <MenuHeaderIconsCount>{{ compareProducts.length }}</MenuHeaderIconsCount>
            </div>
            <MenuCompareIcon />
            <h2 class="item_title">Сравнение</h2>
          </nuxt-link>
          <nuxt-link to="" v-else class="cursor_hidden">
            <div class="icons_count"  v-if="compareProducts && compareProducts.length !== 0">
              <MenuHeaderIconsCount>{{ compareProducts.length }}</MenuHeaderIconsCount>
            </div>
            <MenuCompareIcon />
            <h2 class="item_title">Сравнение</h2>
          </nuxt-link>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import {useCompareProductStore} from "../stores/CompareProductStore";
import {useFavoriteProductStore} from "../stores/FavoriteProductStore";
import {useUserStore} from "../stores/UserStore";

const favoriteProducts = computed(() => useFavoriteProductStore().favoriteProducts);
const compareProducts = computed(() => useCompareProductStore().compareProducts);
const agree_on_cookie = computed(() => useUserStore().agree_on_cookie);
const user = computed(() => useUserStore().user);

const MobileCatalog = resolveComponent('MobileCatalog');
const pending = ref(true);

useHead({
  title: 'Телефон.Рум - интернет-магазин с широким ассортиментом новинок и' +
      ' хитов продаж смартфонов, планшетов, смарт-часов, и другой электроники',
  meta: [
    { name: 'charset', content: 'UTF-8' },
    { name: 'description', content: 'Телефон.Рум - интернет-магазин с широким ассортиментом новинок и' +
          ' хитов продаж смартфонов, планшетов, смарт-часов, и другой электроники' },
    { name: 'msapplication-TileColor', content: '#da532c"' },
    { name: 'theme-color', content: '#ffffff' }
  ],
  link: [
    { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.6/css/all.css'},
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/public/apple-touch-icon.png'},
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png'},
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png'},
    { rel: 'manifest', href: '/manifest.json'},
    { rel: 'mask-icon', href: '/public/safari-pinned-tab.svg', color: '#e31235'},
  ],
})
const HeaderTop = resolveComponent('HeaderTop');
const Footer = resolveComponent('Footer');

const hydratedMobile = ref(false);
const MobileFooter = resolveComponent('MobileFooter');

const windowWidth = ref(0);
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(()=>{
  pending.value = false;
  updateWidth();
  window.addEventListener('resize', updateWidth);
});

const showCategoriesMobile = () => {
  hydratedMobile.value = true;
}

const closeCategoriesMobile = () => {
  hydratedMobile.value = false;
}

</script>

<style scoped>

.preloader-wrap{
  height: 100vh;
  display: grid;
  place-items: center;
  transition:
      background-color var(--trans-dur),
      color var(--trans-dur);
  background-color: #1a1a25;
}
.preloader {
  text-align: center;
  max-width: 20em;
  width: 100%;
}
.cart {
  display: block;
  margin: 0 auto;
  width: 7em;
  height: 7em;
}
.cart__lines,
.cart__top,
.cart__wheel1,
.cart__wheel2,
.cart__wheel-stroke {
  animation: cartLines 2s ease-in-out infinite;
}
.cart__lines {
  /*stroke: var(--primary);*/
  stroke: #fff;
}
.cart__top {
  animation-name: cartTop;
}
.cart__wheel1 {
  animation-name: cartWheel1;
  transform: rotate(-0.25turn);
  transform-origin: 43px 111px;
}
.cart__wheel2 {
  animation-name: cartWheel2;
  transform: rotate(0.25turn);
  transform-origin: 102px 111px;
}
.cart__wheel-stroke {
  animation-name: cartWheelStroke
}
.cart__track {
  stroke: hsla(var(--hue),10%,10%,0.1);
  transition: stroke var(--trans-dur);
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: hsl(var(--hue),10%,10%);
    --fg: hsl(var(--hue),10%,90%);
  }
  .cart__track {
    stroke: hsla(var(--hue),10%,90%,0.1);
  }
}

/* Animations */
@keyframes cartLines {
  from,
  to {
    opacity: 0;
  }
  8%,
  92% {
    opacity: 1;
  }
}
@keyframes cartTop {
  from {
    stroke-dashoffset: -338;
  }
  50% {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 338;
  }
}
@keyframes cartWheel1 {
  from {
    transform: rotate(-0.25turn);
  }
  to {
    transform: rotate(2.75turn);
  }
}
@keyframes cartWheel2 {
  from {
    transform: rotate(0.25turn);
  }
  to {
    transform: rotate(3.25turn);
  }
}
@keyframes cartWheelStroke {
  from,
  to {
    stroke-dashoffset: 81.68;
  }
  50% {
    stroke-dashoffset: 40.84;
  }
}
.main{
  background-color: #FFFFFF;
  margin-top: 8.75rem;
}
@media (max-width: 768px) {
  .main{
    margin-top: 6.2rem;
  }
}
.cursor_hidden{
  opacity: .6;
  cursor: default;
}
.item{
  cursor: pointer;
}
/* multibtn */

i.fa.fa-share.my-float {
  margin-top: 1.125rem;
}
.call-line {
  display: inline-block;
  float: right;
  margin: .6875rem .875rem 0;
  padding: .5625rem 1.25rem;
  background: rgba(0, 0, 0, 0.78);
  color: #fff;
  border-radius: 20px;
  /*right: 6px;*/
  position: relative;
}


.multibtn .float-btn{
  position:fixed;
  width: 3.75rem;
  cursor: pointer;
  height: 3.75rem;
  bottom: 2.5rem;
  right: 3.75rem;
  background-color:#F33;
  color:#FFF;
  border-radius: 50px;
  text-align:center;
  z-index:998;
  animation: bot-to-top 2s ease-out;
  animation: effect 3s infinite ease-in;
}

@keyframes effect {
  20%, 100% {
    width: 3.75rem;
    height: 3.75rem;
    font-size: 1.875rem;
  }
  0%, 10%{
    width: 4.0625rem;
    height: 4.0625rem;
    font-size: 2.1875rem;
  }
  5%{
    width: 3.75rem;
    height: 3.75rem;
    font-size: 1.875rem;
  }
}

.multibtn ul{
  position: fixed;
  right: 3.75rem;
  bottom: 5rem;
  z-index: 100;
  margin: 0;
  padding: 0 0 1.25rem 0;
}

.multibtn ul li{
  list-style: none;
  margin-bottom: 0.625rem;
}

.multibtn ul li a{
  background-color:#F33;
  color:#FFF;
  border-radius:50px;
  text-align:center;
  width:3.75rem;
  height:3.75rem;
  display: inline-block;
}

.multibtn ul:hover{
  visibility:visible!important;
  opacity:1!important;
}


.my-float{
  font-size: 1.5rem;
  margin-top: 1.125rem  ;
}

.multibtn a#menu-share + ul{
  visibility: hidden;
}

.multibtn a#menu-share:hover + ul{
  visibility: visible;
  animation: scale-in 0.5s;
}

.multibtn a#menu-share i{
  animation: rotate-in 0.5s;
}

.multibtn a#menu-share:hover > i{
  animation: rotate-out 0.5s;
}

.multibtn i.fab.fa-whatsapp {
  font-size: 2.5rem;
  margin-top: .5625rem;
}
.multibtn i.fab.fa-telegram-plane {
  font-size: 2.1875rem;
  margin-top: .875rem;
}
.multibtn i.fab.fa-vk {
  font-size: 2.0625rem;
  margin-top: 1rem;
}
.multibtn i.fas.fa-phone {
  font-size: 1.8125rem;
  margin-top: 1rem;
}
a#menu-wa {
  background: #21df7e;
}

a#menu-vk {
  background: #4a76a8;
}

a#menu-telegram {
  background: #0088cc;
}
a#menu-callme {
  background: #fa700e;
}
a#menu-share {
  background: #E31235;
}

@keyframes bot-to-top {
  0%   {bottom:-2.5rem}
  50%  {bottom:2.5rem}
}

@keyframes scale-in {
  from {transform: scale(0);opacity: 0;}
  to {transform: scale(1);opacity: 1;}
}

@keyframes rotate-in {
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}

@keyframes rotate-out {
  from {transform: rotate(360deg);}
  to {transform: rotate(0deg);}
}

/* end multibtn */


@media (max-width: 768px) {
  .multibtn .float-btn{
    bottom: 11vh;
    right: 1.75rem;
  }
  .multibtn ul{
    bottom: 13vh;
  }
  .mobile-menu{
    width: 100%;
    position: fixed;
    z-index: 99;
    background-color: #FFFFFF;
    height: 9vh;
    display: flex;
    top: 91vh;
    border-top: 0.5px solid rgba(133, 143, 164, 0.5);
  }
  .menu-icons-wrapp{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .item_title{
    font-weight: 500;
    font-size: 1rem;
    line-height: 140%;
    display: block;
    color: #BABAC0;
  }
  .item{
    /*display: flex;*/
    /*flex-direction: column;*/
    text-align: center;
  }
  .icons_count{
    z-index: 2;
    position: absolute;
    top: 10%;
    padding-left: 2.8rem;
  }
}
</style>