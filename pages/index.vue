<template>
  <div class="container">
    <div class="index_links" v-if="windowWidth > 576">
      <ul class="index_links_ul">
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/flame.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:120vw md:140vw sm:140vw xs:100vw" alt="fire"/>
            <h3 class="index_link_title">Акции</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/catalog/smartfony" class="index_link">
            <nuxt-img class="index_link_png" src="img/iphone.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:120vw md:140vw sm:140vw xs:100vw" alt="iphone"/>
            <h3 class="index_link_title">Смартфоны</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/ipad.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:120vw md:140vw sm:140vw xs:100vw" alt="ipad" />
            <h3 class="index_link_title">Планшеты</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/catalog/naushniki" class="index_link">
            <nuxt-img class="index_link_png" src="img/headphone2.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:120vw md:140vw sm:140vw xs:100vw" alt="headphone"/>
            <h3 class="index_link_title">Наушники</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/catalog/smart-chasy-i-fitnes-braslety" class="index_link">
            <nuxt-img class="index_link_png" src="img/watch2.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:120vw md:140vw sm:140vw xs:100vw" alt="watch"   />
            <h3 class="index_link_title">Аксессуары</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/modem.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:120vw md:140vw sm:140vw xs:100vw" alt="modem" />
            <h3 class="index_link_title">Умная техника</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/sim-card.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:120vw md:140vw sm:140vw xs:100vw" alt="sim-card" />
            <h3 class="index_link_title">SIM-карты</h3>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="container-fluid">
<!--    TODO подумать над keep-alive-->
    <MainSlider />
    <div class="index_links" v-if="windowWidth <= 576 && windowWidth > 375">
      <ul class="index_links_ul">
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/flame.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:170vw xs:100vw" alt="fire"/>
            <h3 class="index_link_title">Акции</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/catalog/smartfony" class="index_link">
            <nuxt-img class="index_link_png" src="img/iphone.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:170vw xs:100vw" alt="iphone"/>
            <h3 class="index_link_title">Смартфоны</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/ipad.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:170vw xs:100vw" alt="ipad" />
            <h3 class="index_link_title">Планшеты</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/headphone2.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:170vw xs:100vw" alt="headphone"/>
            <h3 class="index_link_title">Наушники</h3>
          </nuxt-link>
        </li>
      </ul>
      <ul class="index_links_ul">
        <li>
          <nuxt-link to="/catalog/smart-chasy-i-fitnes-braslety" class="index_link">
            <nuxt-img class="index_link_png" src="img/watch2.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:170vw xs:100vw" alt="watch"   />
            <h3 class="index_link_title">Аксессуары</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/modem.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:170vw xs:100vw" alt="modem" />
            <h3 class="index_link_title">Умная техника</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/sim-card.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:170vw xs:100vw" alt="sim-card" />
            <h3 class="index_link_title">SIM-карты</h3>
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="index_links" v-if="windowWidth <= 375">
      <ul class="index_links_ul">
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/flame.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:200vw xs:200vw" alt="fire"/>
            <h3 class="index_link_title">Акции</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/catalog/smartfony" class="index_link">
            <nuxt-img class="index_link_png" src="img/iphone.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:200vw xs:200vw" alt="iphone"/>
            <h3 class="index_link_title">Смартфоны</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/ipad.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:200vw xs:200vw" alt="ipad" />
            <h3 class="index_link_title">Планшеты</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/headphone2.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:200vw xs:200vw" alt="headphone"/>
            <h3 class="index_link_title">Наушники</h3>
          </nuxt-link>
        </li>
      </ul>
      <ul class="index_links_ul">
        <li>
          <nuxt-link to="/catalog/smart-chasy-i-fitnes-braslety" class="index_link">
            <nuxt-img class="index_link_png" src="img/watch2.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:200vw xs:200vw" alt="watch"   />
            <h3 class="index_link_title">Аксессуары</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/modem.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:200vw xs:200vw" alt="modem" />
            <h3 class="index_link_title">Умная техника</h3>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/" class="index_link">
            <nuxt-img class="index_link_png" src="img/sim-card.svg" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:120vw sm:200vw xs:200vw" alt="sim-card" />
            <h3 class="index_link_title">SIM-карты</h3>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
  <div class="index-main-wrap">
    <div id="tagSectionNew" class="tag-new-section">
      <component :slug="'new'" :is="showTagSectionNew ? TagSectionNew : 'div'" />
    </div>
    <div class="tag_line line"></div>
    <div id="brandSection" class="container">
      <component :is="showBrandSection ? BrandSection : 'div'" />
    </div>
    <div id="tagSectionRecommend" class="tag-rec-section">
      <component :slug="'rekomenduem'" :is="showTagSectionRecommend ? TagSectionRecommend : 'div'" />
    </div>
    <div class="tag_line line"></div>
    <div id="offerSection">
      <component :is="showOfferSection ? OfferSection : 'div'" />
    </div>
    <div id="salesSection">
      <component :is="showSalesSection ? SalesSection : 'div'" />
    </div>
    <div id="viewedProducts" class="viewed">
      <div class="container">
        <h2 class="viewed_title tag_title title">Вы смотрели</h2>
      </div>
      <div class="container-fluid">
        <component :is="showViewedProducts ? ViewedProducts : 'div'" />
      </div>
    </div>
  </div>
</template>
<script setup>
import {onMounted, onUnmounted, ref, resolveComponent} from "vue";

definePageMeta({
  title: 'Телефон.Рум',
  breadcrumb: 'Главная'
})
const route = useRoute();
const windowWidth = ref(0);
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};
const TagSectionNew = resolveComponent('TagSectionNew');
const BrandSection = resolveComponent('BrandSection');
const TagSectionRecommend = resolveComponent('TagSectionRecommend');
const ViewedProducts = resolveComponent('ViewedProducts');
const OfferSection = resolveComponent('OfferSection');
const SalesSection = resolveComponent('SalesSection');

const showTagSectionNew = ref(false);
const showBrandSection = ref(false);
const showTagSectionRecommend = ref(false);
const showOfferSection = ref(false);
const showSalesSection = ref(false);
const showViewedProducts = ref(false);

// onBeforeMount(() => {
//
// });

// TODO разобраться с обсервером

onMounted(()=>{
  updateWidth();
  window.addEventListener('resize', updateWidth);

  const observerNew = new IntersectionObserver((entries) => {
    showTagSectionNew.value = true;
  },{
    rootMargin: '5px',
  });

  const observerBrand = new IntersectionObserver((entries) => {
    showBrandSection.value = true;
  },{
    rootMargin: '25px',
  });

  const observerRec = new IntersectionObserver((entries) => {
    showTagSectionRecommend.value = true;
  },{
    rootMargin: '25px',
  });

  const observerOffer = new IntersectionObserver((entries) => {
    showOfferSection.value = true;
  },{
    rootMargin: '25px',
  });

  const observerSales = new IntersectionObserver((entries) => {
    showSalesSection.value = true;
  },{
    rootMargin: '25px',
  });

  const observerViewed = new IntersectionObserver((entries) => {
    showViewedProducts.value = true;
  },{
    rootMargin: '25px',
  });

  const idTagSectionNew = document.querySelector('#tagSectionNew');
  const idBrandSection = document.querySelector('#brandSection');
  const idTagSectionRecommend = document.querySelector('#tagSectionRecommend');
  const idOfferSection = document.querySelector('#offerSection');
  const idSalesSection = document.querySelector('#salesSection');
  const idViewedProducts = document.querySelector('#viewedProducts');

  observerNew.observe(idTagSectionNew);
  observerBrand.observe(idBrandSection);
  observerRec.observe(idTagSectionRecommend);
  observerOffer.observe(idOfferSection);
  observerSales.observe(idSalesSection);
  observerViewed.observe(idViewedProducts);

});

// onUnmounted(() => {
//   observerNew.value.disconnect();
//   observerBrand.value.disconnect();
//   observerRec.value.disconnect();
//   observerOffer.value.disconnect();
//   observerSales.value.disconnect();
//   observerViewed.value.disconnect();
// });


</script>

<style scoped>
.index_links {
  padding: 1rem 0 1.5rem 0;
}
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
.index_links_ul {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.index_link{
  opacity: .75;
  transition: all .3s ease;
}
.index_link:hover {
  opacity: .9;
  transition: all .3s ease;
}
.index_link:hover > .index_link_title {
  color: #234a9d;
  opacity: 1;
  transition: all .3s ease;
}
.index_link_title {
  font-weight: 600;
  font-size: 1rem;
  color: #1A1A25;
  transition: all .3s ease;
  text-align: center;
  opacity: 1;
}
.index_link_png {
  display: block;
  padding: 1rem 0;
  margin: 0 auto;
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
.index-main-wrap{
  width: 100%;
  background: #F7F7F7;
  border-radius: 25px 25px 0px 0px;
}

.tag-new-section{
  padding: 3.25rem 0 1.875rem 0;
}

.tag-rec-section{
    margin-bottom: 1.875rem;
}

.viewed{
  padding: 7.5rem 0 15rem 0;
}

@media (max-width: 768px) {
  .offer-section>.swiper-pagination{
    display: flex;
  }
  .tag-new-section {
    padding: 2.25rem 0 1.875rem 0;
  }
}

@media (max-width: 576px) {
  .index_links {
    padding: 0 0 3rem 0;
  }
  .index_links_ul{
    justify-content: space-evenly;
    margin-top: 1.5rem;
  }
}

@media (max-width: 510px) {
  .index_slider{
    margin-bottom: 1rem;
  }
  .index_links_ul{
    margin-top: 1rem;
  }
}

@media (max-width: 375px) {
  .index_links_ul {
    justify-content: space-around;
  }
}
</style>
