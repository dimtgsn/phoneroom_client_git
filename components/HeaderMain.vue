<template>
  <div class="header-main">
<!--    <div v-if="pending">-->
<!--      <div class="container" style="display: flex">-->
<!--        <div class="header-main_logo logo">-->
<!--          <LogoImage/>-->
<!--          <LogoTitle/>-->
<!--        </div>-->
<!--        <section v-if="windowWidth > 768" class="wrapper-pen"-->
<!--                 style="display: flex; width: 100%; justify-content: space-between">-->
<!--          <article class="article" style="flex: 15% 0 1">-->
<!--            <div class="bg">-->
<!--              <div class="icons icons_1">-->
<!--                <div class="icon-1"></div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </article>-->
<!--          <article class="article" style="flex: 45% 0 1">-->
<!--            <div class="bg bg-2">-->
<!--              <div class="icons icons_2">-->
<!--                <div class="icon-2"></div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </article>-->
<!--          <article class="article" style="flex: 35% 0 1">-->
<!--            <div class="bg bg-2">-->
<!--              <div class="icons icons_3">-->
<!--                <div class="icon-3"></div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </article>-->
<!--        </section>-->
<!--        <section v-else class="wrapper-pen" style="display: flex; width: 100%; justify-content: end">-->
<!--          <article v-if="windowWidth <= 768 && windowWidth > 600" class="article" style="flex: 50% 0 1">-->
<!--            <div class="bg">-->
<!--              <div class="icons icons_1">-->
<!--                <div class="icon-1"></div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </article>-->
<!--          <article v-if="windowWidth <= 600 && windowWidth > 500" class="article" style="flex: 60% 0 1">-->
<!--            <div class="bg">-->
<!--              <div class="icons icons_1">-->
<!--                <div class="icon-1"></div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </article>-->
<!--          <article v-if="windowWidth <= 500 && windowWidth > 425" class="article" style="flex: 80% 0 1">-->
<!--            <div class="bg">-->
<!--              <div class="icons icons_1">-->
<!--                <div class="icon-1"></div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </article>-->
<!--          <article v-if="windowWidth <= 425" class="article" style="flex: 100% 0 1">-->
<!--            <div class="bg">-->
<!--              <div class="icons icons_1">-->
<!--                <div class="icon-1"></div>-->
<!--              </div>-->
<!--            </div>-->
<!--          </article>-->
<!--        </section>-->
<!--      </div>-->
<!--    </div>-->
    <div class="container header-main_container">
      <div class="header-main_logo logo">
        <LogoImage/>
        <LogoTitle/>
      </div>
      <div v-if="windowWidth > 768" class="header-main_city city">
        <h2 class="city_title" v-if="userCity" @click="openModalCity">{{ userCity }}</h2>
        <h2 class="city_title" v-else-if="ipInfoCity && ipInfoCity !== ' ' && !userCity" @click="openModalCity">{{ ipInfoCity }}</h2>
        <h2 class="city_title" v-else @click="openModalCity">Выбрать город</h2>
        <Transition name="fade">
          <component @openCity="isOpenCity" :is="choiceCity ? SelectCity : 'div'"/>
        </Transition>
        <nuxt-img class="city_icon" src="img/city_icon.svg" alt="city_icon" loading="lazy"/>
      </div>
      <div v-if="windowWidth > 768" class="header-main_btn btn-catalog">
        <Button @click="toggleShowCategories" :width_btn="7.9375" :src_btn="src_path">Каталог</Button>
        <Transition name="fade" mode="out-in" appear>
          <component @open="isOpen" :is="hydrated ? Catalog : 'div'"/>
        </Transition>
      </div>
      <div v-if="windowWidth > 768" class="header-main_search">
        <Search/>
      </div>
      <div v-if="windowWidth > 768" class="header_icons-wrapp">
        <div class="header-icons">
          <nuxt-link v-if="compareProducts && compareProducts.length !== 0" to="/comparison/" class="icons_put">
            <div class="icons compare">
              <div class="icons_count" v-if="compareProducts && compareProducts.length !== 0">
                <HeaderIconsCount>{{ compareProducts.length }}</HeaderIconsCount>
              </div>
              <div class="icons_icon">
                <HeaderIconsCompareIcon/>
              </div>
              <div class="icons_title">
                <HeaderIconsTitle>Сравнение</HeaderIconsTitle>
              </div>
            </div>
          </nuxt-link>
          <nuxt-link v-else to="" class="cursor_hidden">
            <div class="icons compare">
              <div class="icons_count" v-if="compareProducts && compareProducts.length !== 0">
                <HeaderIconsCount>{{ compareProducts.length }}</HeaderIconsCount>
              </div>
              <div class="icons_icon">
                <HeaderIconsCompareIcon/>
              </div>
              <div class="icons_title">
                <HeaderIconsTitle>Сравнение</HeaderIconsTitle>
              </div>
            </div>
          </nuxt-link>

          <nuxt-link v-if="(favoriteProducts && favoriteProducts.length !== 0) || (favoriteProducts2 && favoriteProducts2.length !== 0)" to="/favorites/" class="icons_put">
            <div class="icons heart">
              <div class="icons_count" v-if="(favoriteProducts && favoriteProducts.length !== 0) || (favoriteProducts2 && favoriteProducts2.length !== 0)">
                <HeaderIconsCount>{{ favoriteProducts.length !== 0 ? favoriteProducts.length : favoriteProducts2.length }}</HeaderIconsCount>
              </div>
              <div class="icons_icon">
                <HeaderIconsHeartIcon/>
              </div>
              <div class="icons_title">
                <HeaderIconsTitle>Избранное</HeaderIconsTitle>
              </div>
            </div>
          </nuxt-link>
          <nuxt-link v-else to="" class="cursor_hidden">
            <div class="icons heart">
              <div class="icons_count" v-if="(favoriteProducts && favoriteProducts.length !== 0) || (favoriteProducts2 && favoriteProducts2.length !== 0)">
                <HeaderIconsCount>{{ favoriteProducts.length !== 0 ? favoriteProducts.length : favoriteProducts2.length }}</HeaderIconsCount>
              </div>
              <div class="icons_icon">
                <HeaderIconsHeartIcon/>
              </div>
              <div class="icons_title">
                <HeaderIconsTitle>Избранное</HeaderIconsTitle>
              </div>
            </div>
          </nuxt-link>
          <nuxt-link to="/basket/" prefetch class="cursor_hidden icons_put">
            <div class="icons basket">
              <div class="icons_count" v-if="basketProducts && basketProducts.length !== 0">
                <HeaderIconsCount>{{ basketProducts.length }}</HeaderIconsCount>
              </div>
              <div class="icons_icon">
                <HeaderIconsBasketIcon/>
              </div>
              <div class="icons_title">
                <HeaderIconsTitle>Корзина</HeaderIconsTitle>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
      <div v-if="windowWidth <= 768" class="header-main_right">

        <nuxt-link to="/basket/" prefetch class="cursor_hidden2"
                   :class="{'icons_put': basketProducts && basketProducts.length !== 0}">
          <div class="icons basket">
            <div class="icons_count" v-if="basketProducts && basketProducts.length !== 0">
              <HeaderIconsCount>{{ basketProducts.length }}</HeaderIconsCount>
            </div>
            <div class="icons_icon">
              <HeaderIconsBasketIcon/>
            </div>
            <div class="icons_title">
              <HeaderIconsTitle>Корзина</HeaderIconsTitle>
            </div>
          </div>
        </nuxt-link>

        <div class="delimiter"></div>
        <nuxt-img class="search-mob" v-if="windowWidth > 640" src="img/search.svg" loading="lazy"
                  sizes="md:0vw sm:1vw xs:0vw" alt="search"/>
        <nuxt-img class="search-mob" v-if="windowWidth <= 640 && windowWidth > 500" src="img/search.svg" loading="lazy"
                  sizes="md:0vw sm:100vw xs:0vw" alt="search"/>
        <nuxt-img class="search-mob" v-if="windowWidth <= 500 && windowWidth > 440" src="img/search.svg" loading="lazy"
                  sizes="md:65vw sm:100vw xs:150vw" alt="search"/>
        <nuxt-img class="search-mob" v-if="windowWidth <= 440 && windowWidth > 360" src="img/search.svg" loading="lazy"
                  sizes="md:100vw sm:150vw xs:110vw" alt="search"/>
        <nuxt-img class="search-mob" v-if="windowWidth <= 360" src="img/search.svg" loading="lazy"
                  sizes="md:0vw sm:100vw xs:0vw" alt="search"/>
        <div @click="showCategoriesMobile" class="menu__icon_wrapper">
          <div class="menu__icon">
            <span></span>
          </div>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <component @closeMobileCatalog="closeCategoriesMobile" :is="hydratedMobile ? MobileCatalog : 'span'"/>
    </transition>

  </div>
</template>

<script setup>
import {useFavoriteProductStore} from "../stores/FavoriteProductStore";
import {useCompareProductStore} from "../stores/CompareProductStore";
import {useBasketProductsStore} from "../stores/BasketProductsStore";
import {useUserStore} from "../stores/UserStore";
import {computed, onMounted, resolveComponent, onBeforeMount} from "vue";
import HeaderIconsCompareIcon from "./HeaderIcons/HeaderIconsCompareIcon/HeaderIconsCompareIcon.vue";
import HeaderIconsBasketIcon from "./HeaderIcons/HeaderIconsBasketIcon/HeaderIconsBasketIcon.vue";
import HeaderIconsHeartIcon from "./HeaderIcons/HeaderIconsHeartIcon/HeaderIconsHeartIcon.vue";

const favoriteProducts = computed(() => useFavoriteProductStore().favoriteProducts);
const favoriteProducts2 = computed(() => useFavoriteProductStore().getFavoriteProducts().value);
// const compareProducts = computed(() => useCompareProductStore().сompareProducts);
const compareProducts = computed(() => useCompareProductStore().getCompareProducts().value);
const basketProducts = computed(() => useBasketProductsStore().getBasketProducts().value);
const userCity = computed(() => useUserStore().getUserCity().value);
// const userCountBasketProducts = computed(() => useUserStore().userCountBasketProducts);
const urlBasket = computed(() => config.public.apiBaseUrl + `baskets/${useUserStore().getUser().value.id}`);
const urlFavorite = computed(() => config.public.apiBaseUrl + `favorites/${useUserStore().getUser().value.id}`);
const urlCompare = computed(() => config.public.apiBaseUrl + `compares/${useUserStore().getUser().value.id}`);
// TODO разобраться со всеми фетчами

const config = useRuntimeConfig();
const urlIp = computed(() => config.public.apiBaseUrl + 'users/userIpInfo');
const ipInfoCity = ref('');
// // const { pending, data: ip } = await useLazyAsyncData("ip", () => $fetch(urlIp));
// const { pending, data: ipInfoCityNull } = await useLazyAsyncData("ipInfoCity", () => $fetch(urlIp.value));
// const pending = ref(true);
let ipGetted = false;
// TODO SetTimeout
if (!ipGetted){
  setTimeout( () => {
    const {data: ipInfoCityNull} = useFetch(urlIp.value).then((res) => {
      ipInfoCity.value = res.data.value;
      useUserStore().ipInfoCity = ipInfoCity.value;
      // pending.value = false
    });
    ipGetted = true;
  },7000);
}

onMounted(() => {
  if (useUserStore().getUser().value) {
    basketGetFormRequest().then((res) => {
      for (const r of res) {
        useBasketProductsStore().pushProduct(r, 1, true);
      }
    }).catch((err) => {
      if(err.status === 401){
        useUserStore().removeUser();
      }
      console.error('Contact form could not be send', err);
    });

    favoriteGetFormRequest().then((res) => {
      if (useUserStore().getUser().value) {
        for (const r of res) {
          useFavoriteProductStore().pushProduct(r);
        }
      }
    }).catch((err) => {
      console.error('Contact form could not be send', err);
    });

    compareGetFormRequest().then((res) => {
      if (useUserStore().getUser().value) {
        for (const r of res) {
          useCompareProductStore().pushProduct(r);
        }
      }
    }).catch((err) => {
      console.error('Contact form could not be send', err);
    });
  }
  updateWidth();
  window.addEventListener('resize', updateWidth);
});

const basketGetFormRequest = async () => {
  return await $fetch(urlBasket.value, {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'GET',
    withCredentials: true,
    credentials: 'include'
  })
};

const favoriteGetFormRequest = async () => {
  return await $fetch(urlFavorite.value, {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'GET',
    withCredentials: true,
    credentials: 'include'
  })
};

const compareGetFormRequest = async () => {
  return await $fetch(urlCompare.value, {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'GET',
    withCredentials: true,
    credentials: 'include'
  });
}

const hydrated = ref(false);
const hydratedMobile = ref(false);
const Catalog = resolveComponent('Catalog');
const SelectCity = resolveComponent('SelectCity');
const MobileCatalog = resolveComponent('MobileCatalog');

const src = ref('catalog.svg');
const src_path = computed(() => `img/${src.value}`);

const toggleShowCategories = () => {
  if (src.value === 'catalog.svg') {
    src.value = 'close.svg';
    hydrated.value = true;
  } else {
    src.value = 'catalog.svg';
    hydrated.value = false;
  }
}

const showCategoriesMobile = () => {
  hydratedMobile.value = true;
}

const closeCategoriesMobile = () => {
  hydratedMobile.value = false;
}

const isOpen = () => {
  src.value = 'catalog.svg';
  hydrated.value = false;
}

const windowWidth = ref(0);
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

const choiceCity = ref(false);


// const toggleShowChoiceCity = () => {
//   choiceCity.value = true;
// }

const getBodyScrollTop = () => {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
}

const openModalCity = () => {
  document.querySelector('body').dataset.scrollY = getBodyScrollTop()

  choiceCity.value = true;

  document.querySelector('body').classList.add('lock')
  document.querySelector('body').style.top = `-${document.querySelector('body').dataset.scrollY}px`
};

const isOpenCity = () => {
  choiceCity.value = !choiceCity.value;
}
</script>

<style scoped>

.header-main {
  height: 6.25rem;
  color: #fff;
  font-family: 'Inter', sans-serif;
}

.header-main_container {
  height: 100%;
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.city {
  display: flex;
  align-items: center;
  cursor: pointer;
  /*visibility: hidden;*/
}

.city_title {
  font-weight: 400;
  font-size: 0.875rem;
  color: #858FA4;
  text-decoration-line: underline;
  margin: 0 5px 0 .625rem;
  line-height: 1.25rem;
  padding-bottom: 1px;
  cursor: pointer;
}

.btn-catalog {
  margin-left: 1.875rem;
}

.header-main_search {
  margin-left: 1.25rem;
}

.header-icons {
  display: flex;
  align-items: baseline;
  justify-content: end;
  position: relative;
}

.cursor_hidden {
  opacity: .6;
  cursor: default;
}

.cursor_hidden2 {
  cursor: default;
  opacity: .9;
}

.icons {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*cursor: pointer;*/
}

.icons_put {
  opacity: 1;
  cursor: pointer;
  transition: all .3s ease;
}

.icons_put:hover {
  opacity: .8;
  transition: all .3s ease;
}

.icons_count {
  z-index: 2;
  position: absolute;
  top: 0;
  padding-left: 7%;
}

.heart {
  padding: 0 1.25rem;
}

.header_icons-wrapp {
  width: 100%;
}


.article {
  width: 100%;
  background: #fff;
  padding: 0;
  /*margin-top: 1rem;*/
  margin-right: 0;
}

.icons_1,
.icons_2,
.icons_3 {
  border-top: solid 1.625rem #1A1A25;
  border-bottom: solid 1.625rem #1A1A25;
}

.icons_1 {
  border-left: solid 1.875rem #1A1A25;
}

.icon-1 {
  width: 100%;
  height: 3rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #1A1A25, .625rem -.625rem .3125rem #1A1A25, -.625rem .625rem .3125rem #1A1A25, -.625rem -.625rem .3125rem #1A1A25;
}

.icons_2 {
  /*border-left: solid 1.25rem #1A1A25;*/
}

.icon-2 {
  width: 100%;
  height: 3rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #1A1A25, .625rem -.625rem .3125rem #1A1A25, -.625rem .625rem .3125rem #1A1A25, -.625rem -.625rem .3125rem #1A1A25;
}

.icons_3 {
  border-left: solid 3.25rem #1A1A25;
}

.icon-3 {
  width: 100%;
  height: 3rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #1A1A25, .625rem -.625rem .3125rem #1A1A25, -.625rem .625rem .3125rem #1A1A25, -.625rem -.625rem .3125rem #1A1A25;
}

.bg {
  animation-duration: 11s;
  min-height: auto;
}

.bg-2 {
  animation-duration: 5s;
  min-height: auto;
}


@media (max-width: 1024px) {

  .icons.heart {
    padding: 0 3.25rem;
  }
}

@media (max-width: 900px) {

  .icons.heart {
    padding: 0 2rem;
  }
}

@media (max-width: 768px) {

  .menu__icon {
    text-align: center;
    z-index: 6;
    display: block;
    position: relative;
    width: 2.5rem;
    height: 1.5rem;
    cursor: pointer;
    transition: all 0.3s ease 0s;
  }

  .menu__icon::before, .menu__icon::after {
    content: "";
  }

  .menu__icon::before {
    top: 0;
    transition: all 0.3s ease 0s;
    cursor: pointer;

  }

  .menu__icon::after {
    bottom: 0;
    transition: all 0.3s ease 0s;
    cursor: pointer;

  }

  .menu__icon span, .menu__icon::before, .menu__icon::after {
    left: 100%;
    position: absolute;
    height: 10%;
    width: 100%;
    transition: all 0.3s ease 0s;
    background-color: #fff;
  }

  .menu__icon span {
    top: 50%;
    transform: scale(1) translate(0px, -50%);
    transition: all 0.3s ease 0s;
    cursor: pointer;

  }

  .header-main_container {
    justify-content: space-between;
    padding-right: 3.833rem;
  }

  .delimiter {
    width: .5px;
    height: 2.6825rem;
    background: rgba(133, 143, 164, 0.15);
    border-radius: 1px;
    margin: 0 1.0625rem;
    /*margin-right: -10px;*/
  }

  .header-main_right {
    display: flex;
    align-items: center;
    justify-content: end;
  }

  .search-mob {
    margin-right: -10px;
  }

  .icons_count {
    top: 31%;
    padding-left: 2%;
  }
}

@media (max-width: 400px) {
  .delimiter {
    margin: 0 .875rem;
  }

  .search-mob {
    margin-right: -15px;;
  }

  .menu__icon {
    width: 2.25rem;
    height: 1.25rem;
  }
}

@media (max-width: 340px) {
  .delimiter {
    margin: 0 .5rem;
  }

  .search-mob {
    margin-right: -18px;;
  }
}
</style>