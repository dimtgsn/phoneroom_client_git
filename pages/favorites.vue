<template>
  <div class="favorites-section">
    <div class="container">
      <Breadcrumbs :name="{title: 'Избранное', to: '/favorites'}"/>
      <div class="title_wrapp">
        <h1 class="title">Избранное</h1>
      </div>
    </div>
    <div class="line"></div>
    <div class="index-main-wrap">
      <section class="section-favorites">
        <div class="container container-favorities">
          <div class="buttons">
            <nuxt-link to="/favorites">
              <Button :width_btn="7" :height_btn="2.5">Избранное</Button>
            </nuxt-link>
            <nuxt-link to="/basket">
              <div class="basket_to_favorites">Товары в корзине</div>
            </nuxt-link>
          </div>
          <div class="cards-section">
            <div v-if="pending">
              <section class="wrapper-pen">
                <article class="article">
                  <div class="bg">
                    <div class="icons">
                      <div class="icon-2 icon-2-2"></div>
                    </div>
                  </div>
                </article>
              </section>
            </div>
            <div v-else-if="products.length !== 0" class="cards" v-for="product in products">
              <div v-if="product.published === true">
                <ProductCard @deleteFavoriteProduct="deleteFavoriteProduct" @deleteUserProduct="updateUserProducts" :product_variant="product" ></ProductCard>
              </div>
            </div>
            <div v-else style="height: 100vh;">
              <h2 class="no_compares_products">В избранном нет товаров</h2>
              <div class="no_products_text" style="width: 100%">
                Добавьте интересующие вас товары
              </div>
              <Button :width_btn="15" :route_btn="'/'">Вернуться на главную</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/UserStore";
import {useFavoriteProductStore} from "../stores/FavoriteProductStore";
import {useBasketProductsStore} from "../stores/BasketProductsStore";
import {computed, onMounted, ref, onBeforeUpdate} from "vue";
import {useCompareProductStore} from "../stores/CompareProductStore.js";

const config = useRuntimeConfig();

const user = computed(() => useUserStore().getUser().value);
const products_ids = computed(() => useFavoriteProductStore().getFavoriteProducts().value);

const products = ref([]);
const urlFavorite = computed(() => config.public.apiBaseUrl + `favorites/${useUserStore().getUser().value.id}`);
const urlProductsFavorite = computed(() => config.public.apiBaseUrl + `products/products`);

const pending = ref(true);

onBeforeUpdate(() => {
  if (user.value){
    if (useFavoriteProductStore().needUpdate){
      pending.value = true;
      favoriteGetFormRequest().then((res) => {
        pending.value = false;
        products.value = res;
      }).catch((err) => {
        console.error('Contact form could not be send', err);
      });
      useFavoriteProductStore().needUpdate = false;
    }
  }
  else{
    if (useFavoriteProductStore().needUpdate){
      console.log(12);
      pending.value = true;
      productsFavoriteGetFormRequest().then((res) => {
        products.value = res;
        pending.value = false;
        useFavoriteProductStore().needUpdate = false;
      }).catch((err) => {
        console.error('Contact form could not be send', err);
      });
    }
  }
});

onMounted(() => {
  if (user.value){
    pending.value = true;
    favoriteGetFormRequest().then((res) => {
      pending.value = false;
      products.value = res;
    }).catch((err) => {
      console.error('Contact form could not be send', err);
    });
  }
  else{
    // if (useFavoriteProductStore().needUpdate){
      console.log(14)
      pending.value = true;
      productsFavoriteGetFormRequest().then((res) => {
        products.value = res;
        pending.value = false;
        useFavoriteProductStore().needUpdate = false;
      }).catch((err) => {
        console.error('Contact form could not be send', err);
      });
    // }
  }
});

const deleteFavoriteProduct = () => {
  pending.value = true;
  productsFavoriteGetFormRequest().then((res) => {
    products.value = res;
    pending.value = false;
  }).catch((err) => {
    console.error('Contact form could not be send', err);
  });
};
const updateUserProducts = () => {
  pending.value = true;
  favoriteGetFormRequest().then((res) => {
    pending.value = false;
    products.value = res;
  }).catch((err) => {
    console.error('Contact form could not be send', err);
  });
};

const favoriteGetFormRequest = async () => {
  return await $fetch(urlFavorite.value , {
      headers: {
        'Authorization': `Bearer ${useUserStore().getToken().value}`,
        "Accept": "application/json",
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
  )
};

const productsFavoriteGetFormRequest = async () => {
  return await $fetch(urlProductsFavorite.value , {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
      },
      method: 'GET',
      params: {
        'products': JSON.stringify(products_ids.value)
      },
    }
  )
};

</script>

<style scoped>
.section-favorites{
  /*height: 100vh;*/
  margin-top: 3.5rem;
  padding-top: 2rem;
  background: #F7F7F7;
  border-radius: 25px 25px 0px 0px;
}
.buttons{
  display: flex;
  margin-bottom: 3rem;
}
.container-favorities{
  display: flex;
  flex-direction: column;
}
.basket_to_favorites{
  display: flex;
  width: 12.125rem;
  height: 2.5rem;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  align-items: center;
  transition: all .3s ease;
  background-color: #FFFFFF;
  border: 1px solid #384255;
  border-radius: 4px;
  color: #384255;
  opacity: 0.8;
  margin-left: 1.5rem;
}
.basket_to_favorites:hover{
  transition: all .3s ease;
  opacity: 1;
  cursor: pointer;
}
.cards-section{
  display: flex;
  flex-direction: row;
  margin-bottom: 25rem;
  flex-wrap: wrap;
}
.cards{
  margin-bottom: 1.25rem;
  margin-right: 1.625rem;
}

.no_products_text{
  color: #1A1A25;
  width: 60%;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 150%;
  margin-bottom: 5rem;
}
.no_compares_products{
  color: #384255;
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 120%;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.wrapper-pen{
  width: 100vh;
}
.article {
  width: 100%;
  background: white;
  padding: 0;
  margin-right: 0;
}
.icon-2{
  width: 14.25rem;
  height: 27.625rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #F7F7F7, .625rem -.625rem .3125rem #F7F7F7, -.625rem .625rem .3125rem #F7F7F7, -.625rem -.625rem .3125rem #F7F7F7;
}
.icon-2-2{
  width: 100%;
  height: 100vh;
  box-shadow: .3125rem 2rem .3125rem .9375rem #F7F7F7, .625rem -.625rem .3125rem #F7F7F7, -.625rem 1.625rem .3125rem #F7F7F7, -.625rem -.625rem .3125rem #F7F7F7;
}


@media (max-width: 690px) {
  .cards{
    margin-right: 0.875rem;
  }
}
@media (max-width: 660px) {
  .cards{
    margin-right: 0.225rem;
  }
}
@media (max-width: 640px) {
  .cards{
    margin-right: 4.625rem;
  }
}

@media (max-width: 540px) {
  .cards{
    margin-right: 2.625rem;
  }
  .cards-section{
    justify-content: space-between;
  }
}

@media (max-width: 500px) {
  .cards{
    margin-right: 2rem;
  }
}

@media (max-width: 475px) {
  .cards{
    margin-right: 0rem;
    margin-bottom: 2.25rem;
  }
}
@media (max-width: 440px) {
  .cards{
    margin-right: -1rem;
    margin-bottom: 1.25rem;
  }
}
@media (max-width: 424px) {
  .cards{
    margin-right: 0rem;
  }
}
@media (max-width: 400px) {
  .cards{
    margin-right: -1.125rem;
  }
}
@media (max-width: 390px) {
  .cards{
    margin-right: 1rem;
  }
  .cards-section{
    flex-wrap: nowrap;
    overflow: auto;
  }
}
</style>