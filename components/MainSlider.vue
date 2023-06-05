<template>
  <div v-if="pending">
    <div class="container-fluid">
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
  <div v-else class="index_slider">
    <Swiper class="swiper-wrapp"
            :modules="[SwiperAutoplay, SwiperEffectFade, SwiperPagination, SwiperLazy, SwiperKeyboard, SwiperNavigation]"
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
            :navigation="{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }"
            :effect="'creative'">
      <SwiperSlide v-for="img in (!pending ? mainImages.data:[])">
        <div class="img-slide-wrap">
          <nuxt-img class="swiper-lazy img-slide" :src="config.public.baseUrl+img.path" loading="lazy"/>
        </div>

      </SwiperSlide>
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
      <div class="swiper-pagination">
      </div>
    </Swiper>
  </div>
</template>

<script setup>
import {onMounted} from "vue";

const config = useRuntimeConfig();
const urlMainImages = config.public.apiBaseUrl + "main_images/";
const {pending, data: mainImages} = await useLazyAsyncData("mainImages", () => $fetch(urlMainImages));

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
.img-slide-wrap{
  position: relative;
  width: 100%;
  height: 100%;
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
.index_slider {
  width: 100%;
  max-height: 35.625rem;
  overflow: hidden;
  margin-bottom: 3.875rem;
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

.swiper-pagination{
  bottom: 0;
}
.swiper-wrapp{
  height: 35.3125rem;
  width: 100%;
  text-align: center;
}

.article {
  width: 100%;
  background: #fff;
  padding: 0;
  /*margin-top: 1rem;*/
  margin-right: 0;
}
.mask{
  background: #fff;
}
.icons{
  border-bottom: solid 3.875rem #fff;
}
.icon-1{
  width: 100%;
  height: 35.3125rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #fff, .625rem -.625rem .3125rem #fff, -.625rem .625rem .3125rem #fff, -.625rem -.625rem .3125rem #fff;
}



@media (max-width: 1279px) {
  .swiper-button-next::after{
    content: url("../img/arrow-next-sm.svg");
  }
  .swiper-button-prev::after{
    content: url("../img/arrow-prev-sm.svg");
  }
}
@media (max-width: 830px) {
  .swiper-wrapp,
  .icon-1{
    height: 33.3125rem;
  }
}

@media (max-width: 768px) {
  .swiper-wrapp,
  .icon-1{
    height: 25rem;
  }
  .img-slide{
    padding: 0;
  }
  .swiper-button-next,
  .swiper-button-prev{
    display: none;
  }
  .swiper-pagination{
    display: none;
  }
}
@media (max-width: 690px) {
  .swiper-wrapp,
  .icon-1{
    height: 22rem;
  }
}
@media (max-width: 670px) {
  .swiper-wrapp,
  .icon-1{
    height: 21rem;
  }
}
@media (max-width: 630px) {
  .swiper-wrapp,
  .icon-1{
    height: 19rem;
  }
}
@media (max-width: 576px) {
  .swiper-wrapp{
    margin-top: 2rem;
    height: 18rem;
  }
  .icon-1{
    height: 18rem;
  }
  .icons{
    border-top: solid 2rem #fff;
    border-bottom: solid 1.5rem #fff;
  }
  .index_slider{
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 530px) {
  .swiper-wrapp,
  .icon-1{
    height: 17rem;
  }
}

@media (max-width: 500px) {
  .swiper-wrapp,
  .icon-1{
    height: 16rem;
  }
}

@media (max-width: 475px) {
  .swiper-wrapp,
  .icon-1{
    height: 15rem;
  }
}

@media (max-width: 440px) {
  .swiper-wrapp,
  .icon-1{
    height: 14rem;
  }
}

@media (max-width: 410px) {
  .swiper-wrapp,
  .icon-1{
    height: 13.5rem;
  }
}
@media (max-width: 380px) {
  .swiper-wrapp,
  .icon-1{
    height: 13rem;
  }
}
@media (max-width: 375px) {
  .swiper-wrapp,
  .icon-1{
    height: 12.5rem;
  }
}

@media (max-width: 355px) {
  .swiper-wrapp,
  .icon-1{
    height: 12rem;
  }
}

@media (max-width: 340px) {
  .swiper-wrapp,
  .icon-1{
    height: 11.5rem;
  }
}

@media (max-width: 330px) {
  .swiper-wrapp,
  .icon-1{
    height: 11rem;
  }
}
</style>