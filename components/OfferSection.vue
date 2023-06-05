<template>
  <section class="offer-section">
    <div class="container container-offer">
      <div v-if="pending">
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
      <div v-else class="offer-slider">
        <Swiper class="swiper-wrapp-offer"
                :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination, SwiperLazy, SwiperKeyboard]"
                :slides-per-view="1"
                :loop="true"
                :preloadImages="false"
                :lazy="true"
                :keyboard="{
            enabled: true,
          }"
                :pagination="{
            clickable: true,
            el: '.swiper-pagination',
          }"
                :effect="'fade'"
                :autoplay="{
            delay: 5000,
            disableOnInteraction: true,
          }">
          <SwiperSlide v-for="img in (!pending ? bannerImages.data:[])">
            <div class="img-slide-wrap">
              <nuxt-img class="swiper-lazy img-slide offer-slide" :src="config.public.baseUrl+img.path" loading="lazy"/>
            </div>
          </SwiperSlide>
          <div class="swiper-pagination">
          </div>
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import {onMounted} from "vue";

const config = useRuntimeConfig();
const urlOfferImages = config.public.apiBaseUrl + "banner_images/";
const {pending, data: bannerImages} = await useLazyAsyncData("bannerImages", () => $fetch(urlOfferImages));

const windowWidth = ref(0);
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(()=>{
  updateWidth();
  window.addEventListener('resize', updateWidth);
});
</script>

<style scoped>
.offer-section{
  margin-top: 2.8125rem;
  background-color: #FFFFFF;
  width: 100%;
  height: 24.375rem;
}
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
.offer-slider{
  padding-top: 3.25rem;
  padding-bottom: 1.3125rem;
  width: 100%;
}
.swiper-wrapp-offer{
  height: 20.75rem;
}
.offer-slide{
  padding: 0;
  object-fit: cover;
  height: 17.6875rem;
}

.swiper-pagination{
  bottom: 0;
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
  border-top: solid 3.25rem #fff;
  border-bottom: solid 1.3125rem #fff;
}
.icon-1{
  width: 100%;
  height: 17.6875rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #fff, .625rem -.625rem .3125rem #fff, -.625rem .625rem .3125rem #fff, -.625rem -.625rem .3125rem #fff;
}


@media (max-width: 768px) {
  .offer-slide,
  .icon-1{
    height: 15rem;
  }
  .offer-section{
    height: 22rem;
  }
  .img-slide{
    padding: 0;
  }
  .swiper-pagination{
    display: none;
  }
  .offer-section>.swiper-pagination{
    display: flex;
  }
}
@media (max-width: 740px) {
  .offer-slide,
  .icon-1{
    height: 12.9rem;
  }
  .swiper-wrapp-offer{
    height: 13.75rem;
  }
  .offer-section{
    height: 19.5rem;
  }
}
@media (max-width: 630px) {
  .offer-slide,
  .icon-1{
    height: 12rem;
  }
  .offer-section{
    height: 19rem;
  }
}
@media (max-width: 590px) {
  .offer-slide,
  .icon-1{
    height: 11.6875rem;
  }
  .swiper-wrapp-offer{
    height: 11.75rem;
  }
  .offer-section{
    height: 18.375rem;
  }
}
@media (max-width: 576px) {
  .offer-slide,
  .icon-1{
    height: 10.9rem;
  }
  .offer-section{
    height: 18rem;
  }
  .swiper-wrapp-offer{
    height: 11rem;
  }
}
@media (max-width: 530px) {
  .offer-slide,
  .icon-1{
    height: 10.225rem;
  }
  .offer-section{
    height: 17rem;
  }
}

@media (max-width: 500px) {
  .offer-slide,
  .icon-1{
    height: 10rem;
  }
  .swiper-wrapp-offer{
    height: 11.75rem;
  }
  .offer-section{
    height: 17.375rem;
  }
  .container-offer{
    padding: 0 8px;
  }
}

@media (max-width: 475px) {
  .offer-slide,
  .icon-1{
    height: 9.225rem;
  }
  .swiper-wrapp-offer{
    height: 10.8rem;
  }
  .offer-section{
    height: 16.375rem;
  }
}
@media (max-width: 440px) {
  .offer-slide,
  .icon-1{
    height: 8.8rem;
  }
  .swiper-wrapp-offer{
    height: 10.4rem;
  }
  .offer-section{
    height: 15.5rem;
  }
}
@media (max-width: 425px) {
  .offer-slide,
  .icon-1{
    height: 8.225rem;
  }
  .swiper-wrapp-offer{
    height: 10.5rem;
  }
  .offer-section{
    height: 15rem;
  }
}
@media (max-width: 410px) {
  .offer-slide,
  .icon-1{
    height: 8rem;
  }
  .offer-section{
    height: 14.5rem;
  }
}
@media (max-width: 390px) {
  .offer-slide,
  .icon-1{
    height: 7.625rem;
  }
  .swiper-wrapp-offer{
    height: 10.1rem;
  }
  .offer-section{
    height: 14rem;
  }
}
@media (max-width: 375px) {
  .offer-slide,
  .icon-1{
    height: 7.4rem;
  }
  .swiper-wrapp-offer{
    height: 9rem;
  }
  .offer-section{
    height: 14rem;
  }
  .container-offer{
    padding: 0 4px;
  }
}
@media (max-width: 355px) {
  .offer-slide,
  .icon-1{
    height: 6.9rem;
  }
  .swiper-wrapp-offer{
    height: 9rem;
  }
  .offer-section{
    height: 13.5rem;
  }
}
@media (max-width: 330px) {
  .offer-slide,
  .icon-1{
    height: 6.7rem;
  }
  .swiper-wrapp-offer{
    height: 8.7rem;
  }
  .offer-section{
    height: 13rem;
  }
}
</style>