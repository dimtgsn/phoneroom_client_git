<template>
  <section class="sales-section" ref="lazy">
    <div class="container">
      <h2 class="title tag_title sales_title">Акции</h2>
    </div>
    <div v-if="pending">
      <div class="container">
        <section class="wrapper-pen">
          <article class="article">
            <div class="bg">
              <div class="icons">
                <div class="icon-1"></div>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>

    <div v-else class="container-fluid">
      <div class="sales_swiper">
        <Swiper v-if="windowWidth > 800" class="swiper-wrapp-sales"
                :modules="[SwiperAutoplay, SwiperEffectFade, SwiperLazy, SwiperKeyboard, SwiperNavigation]"
                :slides-per-view="1.3"
                :spaceBetween="20"
                :preloadImages="false"
                :lazy="true"
                :loop="false"
                :keyboard="{
            enabled: true,
          }"
                :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }">
          <SwiperSlide v-for="img in (!pending ? promotionImages.data:[])">
            <div class="sales-slide">
              <div class="img-slide-wrap">
                <nuxt-img class="swiper-lazy img-slide sales-img" :src="config.public.baseUrl+img.path" loading="lazy"/>
              </div>
            </div>
          </SwiperSlide>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </Swiper>
        <Swiper v-if="windowWidth <= 800 && windowWidth > 700" class="swiper-wrapp-sales"
                :modules="[SwiperAutoplay, SwiperEffectFade, SwiperLazy, SwiperKeyboard, SwiperNavigation]"
                :slides-per-view="1.1"
                :spaceBetween="20"
                :preloadImages="false"
                :lazy="true"
                :loop="false"
                :keyboard="{
            enabled: true,
          }"
                :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }">
          <SwiperSlide v-for="img in (!pending ? promotionImages.data:[])">
            <div class="sales-slide">
              <div class="img-slide-wrap">
                <nuxt-img class="swiper-lazy img-slide sales-img" :src="config.public.baseUrl+img.path" loading="lazy"/>
              </div>
            </div>
          </SwiperSlide>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </Swiper>
        <Swiper v-if="windowWidth <= 700 && windowWidth > 500" class="swiper-wrapp-sales"
                :modules="[SwiperAutoplay, SwiperEffectFade, SwiperLazy, SwiperKeyboard, SwiperNavigation]"
                :slides-per-view="1"
                :spaceBetween="20"
                :preloadImages="false"
                :lazy="true"
                :loop="false"
                :keyboard="{
            enabled: true,
          }"
                :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }">
          <SwiperSlide v-for="img in (!pending ? promotionImages.data:[])">
            <div class="sales-slide">
              <div class="img-slide-wrap">
                <nuxt-img class="swiper-lazy img-slide sales-img" :src="config.public.baseUrl+img.path" loading="lazy"/>
              </div>
            </div>
          </SwiperSlide>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </Swiper>
        <Swiper v-if="windowWidth <= 500 && windowWidth > 425" class="swiper-wrapp-sales"
                :modules="[SwiperAutoplay, SwiperEffectFade, SwiperLazy, SwiperKeyboard, SwiperNavigation]"
                :slides-per-view="1.1"
                :spaceBetween="15"
                :preloadImages="false"
                :lazy="true"
                :loop="true"
                :keyboard="{
            enabled: true,
          }"
                :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }">
          <SwiperSlide v-for="img in (!pending ? promotionImages.data:[])">
            <div class="sales-slide">
              <div class="img-slide-wrap">
                <nuxt-img class="swiper-lazy img-slide sales-img" :src="config.public.baseUrl+img.path" loading="lazy"/>
              </div>
            </div>
          </SwiperSlide>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </Swiper>
        <Swiper v-if="windowWidth <= 425" class="swiper-wrapp-sales"
                :modules="[SwiperAutoplay, SwiperEffectFade, SwiperLazy, SwiperKeyboard, SwiperNavigation]"
                :slides-per-view="1"
                :spaceBetween="20"
                :preloadImages="false"
                :lazy="true"
                :loop="true"
                :keyboard="{
            enabled: true,
          }"
                :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }">
          <SwiperSlide v-for="img in (!pending ? promotionImages.data:[])">
            <div class="sales-slide">
              <div class="img-slide-wrap">
                <nuxt-img class="swiper-lazy img-slide sales-img" :src="config.public.baseUrl+img.path" loading="lazy"/>
              </div>
            </div>
          </SwiperSlide>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import {onMounted} from "vue";
// TODO разобраться со всеми фетчами

const config = useRuntimeConfig();
const urlPromotionImages = config.public.apiBaseUrl + "promotion_images/";
// const {pending, data: promotionImages} = await useLazyAsyncData("promotionImages", () => $fetch(urlPromotionImages));
const {pending, data: promotionImages} = useFetch(urlPromotionImages);


const windowWidth = ref(0);
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(()=>{
  updateWidth();
  window.addEventListener('resize', updateWidth);
  console.log('SaleSection');
});
</script>

<style scoped>
.img-slide{
  border-radius: 10px;
  position: absolute;
  /*object-fit: cover;*/
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  /*max-height: 31.875rem;*/
  padding: 0 1.5625rem;
  padding-bottom: 1.875rem;
}

.swiper-button-prev{
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  background-color: #FFFFFF;
  writing-mode: vertical-lr;
  color: #E31235;
  left: 0;
  border: .1px solid rgba(208, 51, 77, .3);
}
.swiper-button-prev::after{
  content: url("../img/arrow-prev.svg");
}
.swiper-button-next{
  width: 3.125rem;
  height: 3.125rem;
  border-radius: 50%;
  background-color: #FFFFFF;
  writing-mode: vertical-lr;
  color: #E31235;
  right: 0;
  border: .1px solid rgba(208, 51, 77, .3);
}
.swiper-button-next::after{
  content: url("../img/arrow-next.svg");
}

.sales-section{
  padding-top: 6.4375rem;
}
.sales_swiper{
  height: 18.9375rem;
}
.swiper-wrapp-sales{
  height: 100%;
  width: 100%;
  padding: 0 1.5625rem;
  text-align: center;
}
.sales-slide{
  width: 100%;
  height: 100%;
  /*background-color: #FFFFFF;*/
}
.sales_title{
  padding-bottom: 2.5rem;
}
.sales-img{
  padding: 0;
  border-radius: 10px;
  height: 18.5rem;
  object-fit: cover;
}

.article {
  width: 100%;
  background: #F7F7F7;
  padding: 0;
  margin-right: 0;
}
.mask{
  background: #fff;
}
.icons{
  /*border-top: solid 6.4375rem #F7F7F7;*/
}
.icon-1{
  width: 100%;
  height: 18.9375rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #F7F7F7, .625rem -.625rem .3125rem #F7F7F7, -.625rem .625rem .3125rem #F7F7F7, -.625rem -.625rem .3125rem #F7F7F7;
}

@media (max-width: 1279px) {
  .swiper-button-next::after{
    content: url("../img/arrow-next-sm.svg");
  }
  .swiper-button-prev::after{
    content: url("../img/arrow-prev-sm.svg");
  }
}

@media (max-width: 768px) {
  .img-slide {
    padding: 0;
  }

  .swiper-button-next,
  .swiper-button-prev {
    display: none;
  }

  .swiper-wrapp-sales > .swiper-button-next {
    display: flex;
  }

  .swiper-wrapp-sales > .swiper-button-prev {
    display: flex;
  }
}

@media (max-width: 590px) {
  .sales-img{
    height: 17.5rem;
  }
  .sales_swiper,
  .icon-1{
    height: 17.9375rem;
  }
}

@media (max-width: 550px){
  .sales-img{
    height: 16.5rem;
  }
  .sales_swiper,
  .icon-1{
    height: 16.9375rem;
  }
}

@media (max-width: 530px) {
  .sales-img{
    height: 15.5rem;
  }
  .sales_swiper,
  .icon-1{
    height: 15.9375rem;
  }
}

@media (max-width: 500px) {
  .swiper-wrapp-sales{
    padding: 0;
  }
  .swiper-wrapp-sales>.swiper-button-next{
    display: none;
  }
  .swiper-wrapp-sales>.swiper-button-prev{
    display: none;
  }
  .sales-img{
    height: 14.5rem;
  }
  .sales_swiper,
  .icon-1{
    height: 14.9375rem;
  }
}

@media (max-width: 475px) {
  .sales-img{
    height: 13.3rem;
  }
  .sales_swiper,
  .icon-1{
    height: 13.7375rem;
  }
}

@media (max-width: 440px) {
  .sales-img{
    height: 12.5rem;
  }
  .sales_swiper,
  .icon-1{
    height: 12.9375rem;
  }
}

@media (max-width: 425px) {
  .sales-img{
    height: 13.5rem;
  }
  .sales_swiper,
  .icon-1{
    height: 13.9375rem;
  }
}

@media (max-width: 410px) {
  .sales-img{
    height: 12.5rem;
  }
  .sales_swiper,
  .icon-1{
    height: 12.9375rem;
  }
}

@media (max-width: 380px) {
  .sales-img{
    height: 11.5rem;
  }
  .sales_swiper,
  .icon-1{
    height: 11.9375rem;
  }
}

@media (max-width: 355px) {
  .sales-img{
    height: 10.5rem;
  }
  .sales_swiper,
  .icon-1{
    height: 10.9375rem;
  }
}

@media (max-width: 330px) {
  .sales-img{
    height: 10rem;
  }
  .sales_swiper,
  .icon-1{
    height: 10.4375rem;
  }
}

</style>