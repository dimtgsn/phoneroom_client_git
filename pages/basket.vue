<template>
  <div class="basket-section">
    <div class="container">
      <Breadcrumbs :name="{title: 'Корзина', to: 'basket'}"/>
      <div class="title_wrapp">
        <h1 class="title">Корзина</h1>
      </div>
    </div>
    <div class="line"></div>
    <div class="index-main-wrap">
      <section class="section-basket ">
        <div class="container container-basket">
          <div class="left-basket">
            <div class="buttons">
              <nuxt-link to="/basket">
                <Button :width_btn="12.125" :height_btn="2.5">Товары в корзине</Button>
              </nuxt-link>
              <nuxt-link v-if="favoritiesProducts" to="/favorites">
                <div class="basket_to_favorites">Избранное</div>
              </nuxt-link>
            </div>
            <div class="cards-section">
              <div v-if="hasUser">
                <div v-if="pending">
                  <section class="wrapper-pen">
                    <article class="article">
                      <div class="bg">
                        <div class="icons">
                          <div class="icon-2 icon-2-2"></div>
                          <div class="mask"></div>
                        </div>
                      </div>
                    </article>
                  </section>
                </div>
                <div v-else-if="!products || products == 0">
                  <h2 class="no_basket_products">Корзина пуста</h2>
                </div>
                <div v-else-if="products && products!=0" class="cards" v-for="(product, quantity) in products">
                  <div v-if="productsIsUpdated">
                    <div v-if="product.published === true">
                      <ProductBasketCard @deleteUserProduct="updateUserProducts" @editQuantity="editQuantity" :product_variant="product" :product_quantity="parseInt(product.quantity)" ></ProductBasketCard>
                    </div>
                  </div>
                  <div v-else>
                    <div v-if="product.published === true">
                      <ProductBasketCard @deleteUserProduct="updateUserProducts" @editQuantity="editQuantity" :product_variant="product" :product_quantity="parseInt(product.quantity)" ></ProductBasketCard>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div v-if="pending">
                  <section class="wrapper-pen">
                    <article class="article">
                      <div class="bg">
                        <div class="icons">
                          <div class="icon-2 icon-2-2"></div>
                          <div class="mask"></div>
                        </div>
                      </div>
                    </article>
                  </section>
                </div>
                <div v-else>
                  <div v-if="!products || products==0" class="no_basket">
                    <h2 class="no_basket_products">Корзина пуста</h2>
                    <div class="no_products_text">
                      Возможно вы наполняли корзину в прошлом, <AuthModal :link_color="'#E31235'">авторизируйтесь</AuthModal>, чтобы увидеть выбранные товары.
                    </div>
                    <Button :width_btn="15" :route_btn="'/'">Вернуться на главную</Button>
                  </div>
                  <div v-else-if="products && products!=0" class="cards" v-for="(product, quantity) in products">
                    <div v-if="productsIsUpdated">
                      <div v-if="product.published === true">
                        <ProductBasketCard @delete="updateProducts" :product_variant="product" :product_quantity="parseInt(products_ids[quantity][1])" ></ProductBasketCard>
                      </div>
                    </div>
                    <div v-else>
                      <div v-if="product.published === true">
                        <ProductBasketCard @delete="updateProducts" :product_variant="product" :product_quantity="parseInt(products_ids[quantity][1])" ></ProductBasketCard>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="right-basket">
            <div class="basket-total">
              <div class="basket-total_title">Итого</div>
              <div class="total">{{priceFormat(isNaN(totalPrice) ? 0 : totalPrice)}}&nbsp;₽</div>
            </div>
            <div class="line basket-line"></div>
            <div class="basket-total_products">
              <div class="basket-total_products_title">Товары, {{ isNaN(totalQuantity) ? 0 : totalQuantity }}&nbsp;шт.</div>
              <div class="total total_products">{{ priceFormat(isNaN(totalPrice) ? 0 : totalPrice) }}&nbsp;₽</div>
            </div>
            <div class="basket-total_sales">
              <div class="basket-total_products_title basket-total_sales">Скидка</div>
              <div class="total total_products total_sales">{{priceFormat(isNaN(totalSalePrice) ? 0 : totalSalePrice)}}&nbsp;₽</div>
            </div>
            <div class="line basket-line"></div>
            <div class="total-buttons">
              <Button :route_btn="'../purchase'" :disabled_btn="products==0">Перейти к оформлению</Button>
<!--                <ButtonRedOutline class="total_credit_btn" :width_btn="15">Кредит или рассрочка</ButtonRedOutline>-->
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import {useBasketProductsStore} from "../stores/BasketProductsStore";
import {useUserStore} from "../stores/UserStore";
import {useFavoriteProductStore} from "../stores/FavoriteProductStore";
import {computed, onMounted, ref, onBeforeUpdate, onBeforeMount} from "vue";
import {useRouter} from "nuxt/app";

const config = useRuntimeConfig();
const router = useRoute();
const productsIsUpdated = ref(false)

const user = computed(() => useUserStore().getUser().value);
const hasUser = ref();
// const basketProducts = computed(() => useBasketProductsStore().basketProducts);
const favoritiesProducts = computed(() => useFavoriteProductStore().getFavoriteProducts().value);

onBeforeMount(() => {
  hasUser.value = useUserStore().getUser().value;
});

// const products_ids = computed(() => useBasketProductsStore().getBasketProducts().value);
const products_ids = computed(() => useBasketProductsStore().basketProducts);
const products = ref([]);

const urlBasket = computed(() => config.public.apiBaseUrl + `baskets/${useUserStore().getUser().value.id}`);
const urlProducts = computed(() => config.public.apiBaseUrl + `products/products`);
const pending = ref(true);

const totalPrice = ref(0);
const totalSalePrice = ref(0);
const totalQuantity = ref(0);

onBeforeUpdate(() => {
  if (user.value){
    if (useBasketProductsStore().needUpdate){
      console.log(132);
      pending.value = true;
      basketGetFormRequest().then((res) => {
        pending.value = false;
        products.value = res;
      }).catch((err) => {
        console.error('Contact form could not be send', err);
      });
      useBasketProductsStore().needUpdate = false;
    }
    totalPrice.value = 0;
    totalSalePrice.value = 0;
    totalQuantity.value = 0;
    let detailProducts = [];
    if (products.value && products.value.length){
      for (const product of products.value) {
        if(parseInt(product.units_in_stock) > 0){
          totalPrice.value = totalPrice.value + parseInt(product.price);
          totalPrice.value = totalPrice.value * parseInt(product.quantity);
          totalQuantity.value = totalQuantity.value + parseInt(product.quantity);
          detailProducts.push({
            id: product.id,
            product_name: product.product_name ? product.product_name : product.name,
            image: product.image,
            quantity: product.quantity,
          });
          if (product.old_price){
            totalSalePrice.value = totalSalePrice.value + (parseInt(product.price)-parseInt(product.old_price));
            totalSalePrice.value = totalSalePrice.value * parseInt(product.quantity);
          }
        }
      }
    }
    let item = {
      totalPrice: totalPrice.value,
      totalSalePrice: totalSalePrice.value,
      totalQuantity: totalQuantity.value,
      detailProducts: detailProducts,
    };
    useBasketProductsStore().createTotalBasket(item);
  }
  else{
    if (useBasketProductsStore().needUpdate){
      pending.value = true;
      productsGetFormRequest().then((res) => {
        console.log(res);
        products.value = res;
        pending.value = false;
      }).catch((err) => {
        console.error('Contact form could not be send', err);
      });
      useBasketProductsStore().needUpdate = false;
    }
    totalPrice.value = 0;
    totalSalePrice.value = 0;
    totalQuantity.value = 0;
    let detailProducts = [];
    if (products.value && products.value.length){
      for (const product of products.value) {
        if(parseInt(product.units_in_stock) > 0){
          totalPrice.value = totalPrice.value + parseInt(product.price);
          totalQuantity.value = totalQuantity.value + parseInt(useBasketProductsStore().checkProduct(product.id)[1]);
          totalPrice.value = totalPrice.value * parseInt(totalQuantity.value);
          detailProducts.push({
            id: product.id,
            product_name: product.product_name ? product.product_name : product.name,
            image: product.image,
            quantity: product.quantity,
          });
          if (product.old_price){
            totalSalePrice.value = totalSalePrice.value + (parseInt(product.price)-parseInt(product.old_price));
            totalSalePrice.value = totalSalePrice.value * parseInt(totalQuantity.value);
          }
        }
      }
    }
    let item = {
      totalPrice: totalPrice.value,
      totalSalePrice: totalSalePrice.value,
      totalQuantity: totalQuantity.value,
      detailProducts: detailProducts,
    };
    useBasketProductsStore().createTotalBasket(item);
  }
});

onMounted(() => {
  if (user.value){
    pending.value = true;
    basketGetFormRequest().then((res) => {
      console.log(res);
      pending.value = false;
      products.value = res;
      console.log(products.value);
    }).catch((err) => {
      if(err.status === 401){
        useUserStore().removeUser();
      }
      console.error('Contact form could not be send', err);
    });
    totalPrice.value = 0;
    totalSalePrice.value = 0;
    totalQuantity.value = 0;
    let detailProducts = [];
    if (products.value && products.value.length){
      for (const product of products.value) {
        if(parseInt(product.units_in_stock) > 0){
          totalPrice.value = totalPrice.value + parseInt(product.price);
          totalPrice.value = totalPrice.value * parseInt(product.quantity);
          totalQuantity.value = totalQuantity.value + parseInt(product.quantity);
          detailProducts.push({
            id: product.id,
            product_name: product.product_name ? product.product_name : product.name,
            image: product.image,
            quantity: product.quantity,
          });
          if (product.old_price){
            totalSalePrice.value = totalSalePrice.value + (parseInt(product.price)-parseInt(product.old_price));
            totalSalePrice.value = totalSalePrice.value * parseInt(product.quantity);
          }
        }
      }
    }
    let item = {
      totalPrice: totalPrice.value,
      totalSalePrice: totalSalePrice.value,
      totalQuantity: totalQuantity.value,
      detailProducts: detailProducts,
    };
    useBasketProductsStore().createTotalBasket(item);
  }
  else{
    pending.value = true;
    productsGetFormRequest().then((res) => {
      console.log(res);
      products.value = res;
      pending.value = false;
    }).catch((err) => {
      console.error('Contact form could not be send', err);
    });
    totalPrice.value = 0;
    totalSalePrice.value = 0;
    let detailProducts = [];
    if (products.value && products.value.length){
      for (const product of products.value) {
        if(parseInt(product.units_in_stock) > 0){
          totalPrice.value = totalPrice.value + parseInt(product.price);
          totalQuantity.value = totalQuantity.value + parseInt(useBasketProductsStore().checkProduct(product.id)[1]);
          totalPrice.value = totalPrice.value * parseInt(totalQuantity.value);
          detailProducts.push({
            id: product.id,
            product_name: product.product_name ? product.product_name : product.name,
            image: product.image,
            quantity: product.quantity,
          });
          if (product.old_price){
            totalSalePrice.value = totalSalePrice.value + (parseInt(product.price)-parseInt(product.old_price));
            totalSalePrice.value = totalSalePrice.value * parseInt(totalQuantity.value);
          }
        }
      }
    }
    let item = {
      totalPrice: totalPrice.value,
      totalSalePrice: totalSalePrice.value,
      totalQuantity: totalQuantity.value,
      detailProducts: detailProducts,
    };
    useBasketProductsStore().createTotalBasket(item);
  }
});

const updateProducts = () => {
  if (!user.value){
    pending.value = true;
    productsGetFormRequest().then((res) => {
      console.log(res);
      products.value = res;
      pending.value = false;
    }).catch((err) => {
      console.error('Contact form could not be send', err);
    });
  }
  productsIsUpdated.value = !productsIsUpdated.value;
};

const updateUserProducts = () => {
  pending.value = true;
  basketGetFormRequest().then((res) => {
    pending.value = false;
    products.value = res;
  }).catch((err) => {
    console.error('Contact form could not be send', err);
  });
  totalPrice.value = 0;
  totalSalePrice.value = 0;
  if (products.value && products.value.length){
    for (const product of products.value) {
      if(parseInt(product.units_in_stock) > 0){
        totalPrice.value = totalPrice.value + parseInt(product.price);
        totalPrice.value = totalPrice.value * parseInt(product.quantity);
        if (product.old_price){
          totalSalePrice.value = totalSalePrice.value + (parseInt(product.price)-parseInt(product.old_price));
          totalSalePrice.value = totalSalePrice.value * parseInt(product.quantity);
        }
      }
    }
  }
};
const editQuantity = () => {
  // pending.value = true;
  if (user.value){
    basketGetFormRequest().then((res) => {
      // pending.value = false;
      products.value = res;
    }).catch((err) => {
      console.error('Contact form could not be send', err);
    });
    totalPrice.value = 0;
    totalSalePrice.value = 0;
    let detailProducts = [];
    if (products.value && products.value.length){
      for (const product of products.value) {
        if(parseInt(product.units_in_stock) > 0){
          totalPrice.value = totalPrice.value + parseInt(product.price);
          totalPrice.value = totalPrice.value * parseInt(product.quantity);
          detailProducts.push({
            id: product.id,
            product_name: product.product_name ? product.product_name : product.name,
            image: product.image,
            quantity: product.quantity,
          });
          if (product.old_price){
            totalSalePrice.value = totalSalePrice.value + (parseInt(product.price)-parseInt(product.old_price));
            totalSalePrice.value = totalSalePrice.value * parseInt(product.quantity);
          }
        }
      }
    }
    let item = {
      totalPrice: totalPrice.value,
      totalSalePrice: totalSalePrice.value,
      totalQuantity: totalQuantity.value,
      detailProducts: detailProducts,
    };
    useBasketProductsStore().createTotalBasket(item);
  }
  else {
    pending.value = false;
    productsIsUpdated.value = !productsIsUpdated.value;
    totalPrice.value = 0;
    totalSalePrice.value = 0;
    let detailProducts = [];
    if (products.value && products.value.length){
      for (const product of products.value) {
        if(parseInt(product.units_in_stock) > 0){
          totalPrice.value = totalPrice.value + parseInt(product.price);
          totalQuantity.value = totalQuantity.value + parseInt(useBasketProductsStore().checkProduct(product.id)[1]);
          totalPrice.value = totalPrice.value * parseInt(totalQuantity.value);
          detailProducts.push({
            id: product.id,
            product_name: product.product_name ? product.product_name : product.name,
            image: product.image,
            quantity: product.quantity,
          });
          if (product.old_price){
            totalSalePrice.value = totalSalePrice.value + (parseInt(product.price)-parseInt(product.old_price));
            totalSalePrice.value = totalSalePrice.value * parseInt(totalQuantity.value);
          }
        }
      }
    }
    let item = {
      totalPrice: totalPrice.value,
      totalSalePrice: totalSalePrice.value,
      totalQuantity: totalQuantity.value,
      detailProducts: detailProducts,
    };
    useBasketProductsStore().createTotalBasket(item);
  }
};
const basketGetFormRequest = async () => {
  return await $fetch(urlBasket.value , {
      headers: {
        "Accept": "application/json",
        'Content-Type': 'application/json',
      },
      method: 'GET',
      withCredentials: true,
      credentials: 'include',
    }
  )
};
const productsGetFormRequest = async () => {
  return await $fetch(urlProducts.value , {
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

const priceFormat = (value) => {
  let res;
  value = String(value);
  (value.indexOf(',') != -1) ? res = new Intl.NumberFormat('ru-RU').format(value.replace(',', '.')).replace('.', ',') : res = new Intl.NumberFormat('ru-RU').format(value).replace(',', '.');
  return res;
};
</script>

<style scoped>
.section-basket{
  /*display: flex;*/
  margin-top: 3.5rem;
  background: #F7F7F7;
  border-radius: 25px 25px 0 0;
  padding-top: 2rem;
  /*height: 100vh;*/
}
.left-basket{
  flex: 60% 0 1;
}
.container-basket{
  display: flex;
  justify-content: space-between;
}
.cards-section{
  display: flex;
  flex-direction: column;
  margin-bottom: 25rem;
}
/*.right-basket{*/
/*  flex: 60% 0 1;*/
/*}*/
.buttons{
  display: flex;
  margin-bottom: 3rem;
}
.basket_to_favorites{
  display: flex;
  width: 7rem;
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
.no_basket_products{
  color: #384255;
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 120%;
  margin-top: 1rem;
  margin-bottom: 2rem;
}
.no_basket{
  margin-bottom: 2rem;
}
.no_products_text{
  color: #1A1A25;
  width: 60%;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 150%;
  margin-bottom: 5rem;
}

.right-basket{
  display: flex;
  flex: 30% 0 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.875rem;
  background: #FFFFFF;
  border-radius: 6px;
  height: max-content;
}
.basket-total,
.basket-total_products,
.basket-total_sales{
  display: flex;
  width: 100%;
}
.basket-total_title,
.total{
  font-weight: 800;
  font-size: 1.25rem;
  line-height: 120%;
  color: #F53B49;
}
.basket-total_title{
  flex: 60% 0 1;
}
.basket-line{
  height: 1px;
  margin: 1rem 0;
}
.basket-total_products_title,
.total_products{
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  color: #384255;
}
.basket-total_products{
  margin-bottom: .3125rem;
}
.basket-total_products_title{
  flex: 60% 0 1;
}

.total{
  flex: 40% 0 1;
}
.total-buttons{
  width: 100%;
}
.total_credit_btn{
  margin-top: 1rem;
}


.article {
  width: 100%;
  background: #F7F7F7;
  padding: 0;
  margin-right: 0;
}
.mask{
  background: #F7F7F7;
}
.icons{
  border-bottom: solid 10.3125rem #F7F7F7;
}
.icon-2{
  width: 24.25rem;
  height: 37.625rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #F7F7F7, .625rem -.625rem .3125rem #F7F7F7, -.625rem .625rem .3125rem #F7F7F7, -.625rem -.625rem .3125rem #F7F7F7;
}
.icon-2-2{
  width: 100%;
  height: 40.625rem;
  box-shadow: .3125rem 2rem .3125rem .9375rem #F7F7F7, .625rem -.625rem .3125rem #F7F7F7, -.625rem 1.625rem .3125rem #F7F7F7, -.625rem -.625rem .3125rem #F7F7F7;
}

@media (max-width: 768px) {
  .container-basket{
    flex-direction: column;
  }
  .cards-section{
    margin-bottom: 0;
  }
  .right-basket{
    margin-bottom: 25rem;
  }
  .basket-total_title{
    font-size: 1.5rem;
  }
  .total_products,
  .basket-total_products_title{
    font-size: 1.25rem;
  }
}
@media (max-width: 425px) {
  /*.basket-total_title{*/
  /*  font-size: 1.25rem;*/
  /*}*/
  /*.total_products,*/
  /*.basket-total_products_title{*/
  /*  font-size: 1rem;*/
  /*}*/
}
</style>