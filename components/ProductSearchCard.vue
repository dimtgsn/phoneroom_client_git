<template>
  <div class="card">
    <div class="card_body">
      <div class="card_icons">
        <IconsHeartIcon @click="addFavoriteProduct(props.product_variant)" :pressed="pressedFavorite" />
        <IconsCompareIcon @click="addCompareProduct(props.product_variant)" :pressed="pressedCompare" />
      </div>
      <div v-if="windowWidth > 640">
        <nuxt-link :to="`/catalog/products/${props.product_variant.slug}`" prefetch>
          <div class="card-content">
            <div class="card_image">
              <div class="img-wrap scale">
                <nuxt-img class="lazy img-product scale" sizes="xxl:100vw xl:100vw lg:100vw md:100vw sm:80vw xs:50vw" :src="config.public.baseUrl+props.product_variant.image" alt="ProductImage" loading="lazy"/>
              </div>
            </div>
            <div class="card_status">
              <div class="card_status">
                <InStock v-if="parseInt(props.product_variant.units_in_stock) >= 20" />
                <NotMuchLeftInStock v-else-if="parseInt(props.product_variant.units_in_stock) < 20 && parseInt(props.product_variant.units_in_stock) > 0" />
                <NotInStock v-else />
              </div>
            </div>
            <div class="card_name">
              <h2 class="card_product_name">{{ props.product_variant.product_name ? props.product_variant.product_name : props.product_variant.name }}</h2>
            </div>
            <div class="card_rating">
              <h4 class="rating_title">Рейтинг</h4>
              <div class="rating_body" v-if="windowWidth > 1280">
                <ClientOnly>
                  <star-rating :star-size="12"
                               :rating="props.product_variant.rating"
                               :read-only="true"
                               :increment="0.01"
                               :padding="2"
                               :show-rating="false"
                               :round-start-rating="true"
                               :inline="true"
                               :rounded-corners="false"
                               inactive-color="#909CB5"
                               active-color="#F99808"
                               :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                </ClientOnly>
              </div>
              <div class="rating_body" v-if="windowWidth <= 1280 && windowWidth > 1020">
                <ClientOnly>
                  <star-rating :star-size="10"
                               :rating="props.product_variant.rating"
                               :read-only="true"
                               :increment="0.01"
                               :padding="2"
                               :show-rating="false"
                               :round-start-rating="true"
                               :inline="true"
                               :rounded-corners="false"
                               inactive-color="#909CB5"
                               active-color="#F99808"
                               :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                </ClientOnly>
              </div>
              <div class="rating_body" v-if="windowWidth <= 1020">
                <ClientOnly>
                  <star-rating :star-size="8"
                               :rating="props.product_variant.rating"
                               :read-only="true"
                               :increment="0.01"
                               :padding="2"
                               :show-rating="false"
                               :round-start-rating="true"
                               :inline="true"
                               :rounded-corners="false"
                               inactive-color="#909CB5"
                               active-color="#F99808"
                               :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                </ClientOnly>
              </div>
            </div>
          </div>
        </nuxt-link>
        <div class="card-footer">
          <div class="card_price">
            <h2 class="price_title">{{ priceFormat(props.product_variant.price) }} ₽</h2>
            <h2 class="old_price_title" v-if="props.product_variant.old_price !== null">{{ priceFormat(props.product_variant.old_price) }} ₽</h2>
          </div>
          <Transition name="fade" v-if="windowWidth > 1640" mode="out-in" appear>
            <div class="card_btn" v-if="!pressedBasket">
              <Button @click="addProductToBasket(props.product_variant)" :width_btn="7.9375" :disabled_btn="btn_pending_src !== ''" :src_btn="btn_pending_src !== '' ? btn_pending_src : src">В корзину</Button>
            </div>
            <div class="card_btn-outline" v-else>
              <ButtonRedOutline :basket_btn="true" :route_btn="''" :width_btn="6" >
                <nuxt-img class="btn-svg" sizes="xxl:100vw xl:100vw lg:100vw md:100vw sm:150vw xs:50vw" :src="'img/basket-red.svg'" alt="btn-svg" loading="lazy"/>
              </ButtonRedOutline>
            </div>
          </Transition>
          <Transition name="fade" v-if="windowWidth <= 1640" mode="out-in" appear>
            <div class="card_btn" v-if="!pressedBasket">
              <Button @click="addProductToBasket(props.product_variant)" :without_padding="true" :width_btn="6" :disabled_btn="btn_pending_src !== ''" :src_btn="btn_pending_src !== '' ? btn_pending_src : src"></Button>
            </div>
            <div class="card_btn-outline" v-else>
              <ButtonRedOutline :basket_btn="true" :route_btn="''" :width_btn="6" >
                <nuxt-img class="btn-svg" sizes="xxl:200vw xl:230vw lg:250vw md:360vw sm:400vw" :src="'img/basket-red.svg'" alt="btn-svg" loading="lazy"/>
                <!--                <nuxt-img class="btn-svg" sizes="xxl:100vw xl:100vw lg:100vw md:110vw sm:180vw xs:300vw" :src="'img/basket-red.svg'" alt="btn-svg" loading="lazy"/>-->
              </ButtonRedOutline>
            </div>
          </Transition>
        </div>
      </div>
      <div v-else>
        <div class="card-content">
          <nuxt-link :to="`/catalog/products/${props.product_variant.slug}`" prefetch>
            <div class="card_image">
              <div class="img-wrap scale">
                <nuxt-img class="lazy img-product scale" sizes="xxl:100vw xl:100vw lg:100vw md:100vw sm:80vw xs:50vw" :src="config.public.baseUrl+props.product_variant.image" alt="ProductImage" loading="lazy"/>
              </div>
            </div>
          </nuxt-link>
          <div class="mobile-content">
            <div class="card_status">
              <div class="card_status">
                <InStock v-if="parseInt(props.product_variant.units_in_stock) >= 20" />
                <NotMuchLeftInStock v-else-if="parseInt(props.product_variant.units_in_stock) < 20 && parseInt(props.product_variant.units_in_stock) > 0" />
                <NotInStock v-else />
              </div>
            </div>
            <div class="card_name">
              <h2 class="card_product_name">{{ props.product_variant.product_name }}</h2>
            </div>
            <div class="card_rating">
              <h4 class="rating_title">Рейтинг</h4>
              <div class="rating_body" v-if="windowWidth > 1280">
                <ClientOnly>
                  <star-rating :star-size="12"
                               :rating="props.product_variant.rating"
                               :read-only="true"
                               :increment="0.01"
                               :padding="2"
                               :show-rating="false"
                               :round-start-rating="true"
                               :inline="true"
                               :rounded-corners="false"
                               inactive-color="#909CB5"
                               active-color="#F99808"
                               :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                </ClientOnly>
              </div>
              <div class="rating_body" v-if="windowWidth <= 1280 && windowWidth > 1020">
                <ClientOnly>
                  <star-rating :star-size="10"
                               :rating="props.product_variant.rating"
                               :read-only="true"
                               :increment="0.01"
                               :padding="2"
                               :show-rating="false"
                               :round-start-rating="true"
                               :inline="true"
                               :rounded-corners="false"
                               inactive-color="#909CB5"
                               active-color="#F99808"
                               :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                </ClientOnly>
              </div>
              <div class="rating_body" v-if="windowWidth <= 1020">
                <ClientOnly>
                  <star-rating :star-size="8"
                               :rating="props.product_variant.rating"
                               :read-only="true"
                               :increment="0.01"
                               :padding="2"
                               :show-rating="false"
                               :round-start-rating="true"
                               :inline="true"
                               :rounded-corners="false"
                               inactive-color="#909CB5"
                               active-color="#F99808"
                               :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
                </ClientOnly>
              </div>
            </div>
            <div class="card-footer">
              <div class="card_price">
                <h2 class="price_title">{{ priceFormat(props.product_variant.price) }} ₽</h2>
                <h2 class="old_price_title" v-if="props.product_variant.old_price !== null">{{ priceFormat(props.product_variant.old_price) }} ₽</h2>
              </div>
              <Transition name="fade" mode="out-in" appear>
                <div class="card_btn" v-if="!pressedBasket">
                  <Button v-if="windowWidth > 368" @click="addProductToBasket(props.product_variant)" :without_padding="true" :width_btn="6" :disabled_btn="btn_pending_src !== ''" :src_btn="btn_pending_src !== '' ? btn_pending_src : src"></Button>
                  <Button v-if="windowWidth <= 368" @click="addProductToBasket(props.product_variant)" :without_padding="true" :width_btn="12" :disabled_btn="btn_pending_src !== ''" :src_btn="btn_pending_src !== '' ? btn_pending_src : src"></Button>
                </div>
                <div class="card_btn-outline" v-else>
                  <ButtonRedOutline :basket_btn="true" :route_btn="''" :width_btn="6" >
                    <nuxt-img class="btn-svg" sizes="md:0vw sm:250px xs:90vw" :src="'img/basket-red.svg'" alt="btn-svg" loading="lazy"/>
<!--                    <nuxt-img class="btn-svg" sizes="xxl:100vw xl:100vw lg:100vw md:110vw sm:180vw xs:300vw" :src="'img/basket-red.svg'" alt="btn-svg" loading="lazy"/>-->
                  </ButtonRedOutline>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
import {useFavoriteProductStore} from "../stores/FavoriteProductStore";
import {useCompareProductStore} from "../stores/CompareProductStore";
import {useBasketProductsStore} from "../stores/BasketProductsStore";
import {useUserStore} from "../stores/UserStore";

import {computed, ref, onMounted} from "vue";

const user = computed(() => useUserStore().getUser().value);
const config = useRuntimeConfig();

const emit = defineEmits(['deleteUserProduct', ]);

const btn_pending_src = ref('');
const src = ref('img/basket.svg');
const srcMobile = ref('img/basket-white.svg');
const props = defineProps({
  product_variant: Object
});


const pressedFavorite = computed(() => useFavoriteProductStore().checkProduct(props.product_variant.id))
const pressedCompare = computed(() => useCompareProductStore().checkProduct(props.product_variant.id));
const pressedBasket = computed(() => useBasketProductsStore().checkProduct(props.product_variant.id));

const addFavoriteProduct = (product) => {
  if  (user.value){
    if (pressedFavorite.value === false) {
      useFavoriteProductStore().pushProduct(product);
      useFavoriteProductStore().needUpdate = true;
      favoriteCreateFormRequest(product.id).then((res) => {
        console.log(res);
      }).catch((err) => {
        if(err.status === 401){
          useUserStore().removeUser();
        }
        useFavoriteProductStore().removeProduct(product);
        console.error('Contact form could not be send', err)
      });
    }
    else{
      useFavoriteProductStore().removeProduct(product);
      favoriteDeleteFormRequest(product.id).then((res) => {
        console.log(res);
        emit('deleteUserProduct');
      }).catch((err) => {
        if(err.status === 401){
          useUserStore().removeUser();
        }
        useFavoriteProductStore().pushProduct(product);
        console.error('Contact form could not be send', err);
      });
    }
  }
  else{
    if (pressedFavorite.value === false) {
      useFavoriteProductStore().pushProduct(product);
    }
    else{
      useFavoriteProductStore().removeProduct(product);
    }
    useFavoriteProductStore().needUpdate = true;
  }
};

const addCompareProduct = (product) => {
  if  (user.value){
    if (pressedCompare.value === false) {
      useCompareProductStore().pushProduct(product);
      useCompareProductStore().needUpdate = true;
      compareCreateFormRequest(product.id, product.category_id).then((res) => {
        console.log(res)
      }).catch((err) => {
        if(err.status === 401){
          useUserStore().removeUser();
        }
        useCompareProductStore().removeProduct(product);
        console.error('Contact form could not be send', err)
      });
    }
    else{
      useCompareProductStore().removeProduct(product);
      compareDeleteFormRequest(product.id, product.category_id).then((res) => {
        console.log(res);
        emit('deleteUserProduct');
      }).catch((err) => {
        if(err.status === 401){
          useUserStore().removeUser();
        }
        useCompareProductStore().pushProduct(product);
        console.error('Contact form could not be send', err);
      });
    }
  }
  else{
    if (pressedCompare.value === false) {
      useCompareProductStore().pushProduct(product);
    }
    else{
      useCompareProductStore().removeProduct(product);
    }
    useCompareProductStore().needUpdate = true;
  }

};

const addProductToBasket = (product) => {
  if (src.value === 'img/basket.svg'){
    if  (user.value){
      if (pressedBasket.value === false) {
        btn_pending_src.value = '/img/835.svg';
        basketCreateFormRequest(product.id).then((res) => {
          useBasketProductsStore().pushProduct(product);
          useBasketProductsStore().needUpdate = true;
          btn_pending_src.value = '';
        }).catch((err) => {
          btn_pending_src.value = '';
          if(err.status === 401){
            useUserStore().removeUser();
          }
          console.error('Contact form could not be send', err)
        });
      }
    }
    else{
      if (pressedBasket.value === false) {
        useBasketProductsStore().pushProduct(product);
        useBasketProductsStore().needUpdate = true;
      }
    }
  }
};

const urlBasket = computed(() => config.public.apiBaseUrl + `baskets/${useUserStore().getUser().value.id}`);
const urlFavorite = computed(() => config.public.apiBaseUrl + `favorites/${useUserStore().getUser().value.id}`);
const urlCompare = computed(() => config.public.apiBaseUrl + `compares/${useUserStore().getUser().value.id}`);

const favoriteCreateFormRequest = async (product_id) => {
  return await $fetch(urlFavorite.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    withCredentials: true,
    credentials: 'include',
    params: {
      product_id: product_id,
    },
  });
}

const favoriteDeleteFormRequest = async (product_id) => {
  return await $fetch(urlFavorite.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    withCredentials: true,
    credentials: 'include',
    params: {
      product_id: product_id,
    },
  });
}

const compareCreateFormRequest = async (product_id, category_id) => {
  return await $fetch(urlCompare.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    withCredentials: true,
    credentials: 'include',
    params: {
      category_id: category_id,
      product_id: product_id,
    },
  });
}

const compareDeleteFormRequest = async (product_id, category_id) => {
  return await $fetch(urlCompare.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'DELETE',
    withCredentials: true,
    credentials: 'include',
    params: {
      product_id: product_id,
      category_id: category_id,
    },
  });
}

const basketCreateFormRequest = async (product_id) => {
  return await $fetch(urlBasket.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    withCredentials: true,
    credentials: 'include',
    params: {
      product_id: product_id,
    },
  });
}


const priceFormat = (value) => {
  let res;
  value = String(value);

  (value.indexOf(',') != -1) ? res = new Intl.NumberFormat('ru-RU').format(value.replace(',', '.')).replace('.', ',') : res = new Intl.NumberFormat('ru-RU').format(value).replace(',', '.');

  return res;
};

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
.img-wrap{
  position: relative;
  height: 15.6rem;
  width: 15.6rem;
}
.img-product{
  /*border-radius: 10px;*/
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  /*padding: 0 1.5625rem;*/
}
.card{
  width: 18.1rem;
  /*height: 31.25rem;*/
  background: #FFFFFF;
  /*border: 2px solid rgba(133, 143, 164, 0.2);*/
  border-radius: 10px;
  transition: all .3s ease;
}
.card-content{
  cursor: pointer;
}

.card_price{
  cursor: default;
}
/*.card_body:hover{*/
/*  box-shadow: 0 0 5px 7px rgba(51, 51, 51, 0.12);*/
/*  transition: all .3s ease;*/
/*}*/
.card_body{
  transition: all .3s ease;
  padding: 0.75rem 1.25rem 1.5rem 1.25rem;
  border-radius: 10px;
}
.card_image{
  margin: 5px 0 1.25rem 0;
  text-align: center;
}
.card_icons{
  text-align: right;
}
.card_name{
  margin-top: 0.625rem;
  cursor: pointer;
}
.card_product_name{
  color: #1A1A25;
  font-weight: 400;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.1875rem;
}
.card_rating{
  cursor: default;
  margin: .125rem 0 .5rem 0;
  /*margin-bottom: 0;*/
}
.rating_title{
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: .75rem;
  line-height: .9375rem;
  color: #858FA4;
  display: inline-block;
  vertical-align: text-top;
}
.rating_body{
  display: inline-block;
  vertical-align: text-bottom;
  margin-left: .625rem;
}
.card-footer{
  display: flex;
  flex-direction: row;
}
.card_price{
  flex: 50%;
}
.price_title{
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.375rem;
  color: #1A1A25;
  padding-top: 5px;
}
.old_price_title{
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.0625rem;
  line-height: 1.3125rem;
  color: #858FA4;
  text-decoration: line-through;
}
.card_btn-outline{
  cursor: default;
}
.scale {
  display: inline-block;
  overflow: hidden;
}
.scale img {
  transition: 1s;
  display: block;
}
.scale img:hover {
  transform: scale(1.03);
}

@media (max-width: 1510px) {
  .card{
    width: 17.34rem;
  }
}
@media (max-width: 1140px) {
  .card{
    width: 16.9rem;
  }
}
@media (max-width: 1055px) {
  .card{
    width: 16.7rem;
  }
}
@media (max-width: 1024px) {
  .card{
    width: 17rem;
  }
}
@media (max-width: 950px) {
  .card{
    width: 16rem;
  }
}
@media (max-width: 910px) {
  .card{
    width: 19rem;
  }
}
@media (max-width: 865px) {
  .card{
    width: 18rem;
  }
}
@media (max-width: 805px) {
  .card{
    width: 16.88rem;
  }
}
@media (max-width: 768px) {
  .card{
    width: 18rem;
  }
}
@media (max-width: 751px) {
  .card{
    width: 17rem;
  }
  .img-wrap{
    width: 14.6rem;
    height: 14.6rem;
  }
}
@media (max-width: 715px) {
  .card{
    width: 16rem;
  }
  .img-wrap{
    width: 13.6rem;
    height: 13.6rem;
  }
}
@media (max-width: 675px) {
  .card{
    width: 15rem;
  }
  .img-wrap{
    width: 12.6rem;
    height: 12.6rem;
  }
}
@media (max-width: 640px) {
  .card{
    width: 100%;
    text-align: left;
  }
  .card_image{
    display: inline-block;
    text-align: left;
    margin: 0;
  }
  .card-content{
    display: flex;
    align-items: flex-start;
  }
  .mobile-content{
    display: inline-flex;
    flex-direction: column;
  }
  .card-footer{
    padding-top: 1rem;
  }
  .card_body{
    padding-left: 0;
    padding-top: 0;
  }
  .price_title{
    /*padding-top: 0;*/
  }
}
@media (max-width: 460px) {
  .img-wrap{
    width: 10.6rem;
    height: 10.6rem;
  }
  /*.card-footer{*/
  /*  padding-top: 0;*/
  /*}*/

}
@media (max-width: 368px) {
  .card_rating{
    margin: 0;
  }
  .price_title,
  .old_price_title{
    display: inline-block;
    padding-bottom: 1rem;
  }
  .old_price_title{
    padding-left: 8px;
  }
  .card-footer{
    flex-direction: column;
    padding-top: 0;
    padding-bottom: 1rem;
  }
  /*.card_body{*/
  /*  padding-right: 0;*/
  /*}*/
}
@media (max-width: 340px) {
  .img-wrap{
    width: 8.6rem;
    height: 8.6rem;
  }
}
</style>