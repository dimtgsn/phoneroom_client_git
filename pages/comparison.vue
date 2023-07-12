<template>
  <div class="compare-section">
   <div class="container">
      <Breadcrumbs :name="{title: 'Сравнение', to: '/comparison'}"/>
      <div class="title_wrapp">
        <h1 class="title">Сравнение</h1>
      </div>
    </div>
    <div class="line"></div>
    <div class="index-main-wrap">
      <section class="section-compare">
        <div class="container container-comparison">
          <div v-if="products.length !== 0" class="buttons">
            <div v-for="category in categories">
              <div @click="addOpenCategory(category)">
                <div class="category_btn"
                     :class="{'category_btn-max': category.length > 20, 'active': openCategory === category}">{{ category }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cards-section-wrapp">
          <div v-if="pending" class="container">
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
          <div v-else-if="products.length !== 0" class="cards-section-wrapp_white container">
            <div class="cards" v-for="product in products">
              <div v-if="hasUser">
                <div v-if="product.published === true && openCategory === product.category">
                  <ProductCompareCard @deleteUserProduct="updateUserProducts" :product_variant="product" ></ProductCompareCard>
                </div>
              </div>
              <div v-else>
                <div v-if="product.published === true && (openCategory === product.category_name || openCategory === product.category)">
                  <ProductCompareCard @updateComparison="updateComparison" @deleteUserProduct="updateUserProducts" :product_variant="product" ></ProductCompareCard>
                </div>
              </div>
            </div>
          </div>
          <div v-else style="width: 100%; height: 120vh" class="container">
            <h2 class="no_compares_products">В сравнении нет товаров</h2>
            <div class="no_products_text">
              Добавьте интересующие вас товары для сравнения
            </div>
            <Button :width_btn="15" :route_btn="'/'">Вернуться на главную</Button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import {useUserStore} from "../stores/UserStore";
import {useCompareProductStore} from "../stores/CompareProductStore";
import ProductCompareCard from "../components/ProductCompareCard";
import {computed, ref, onBeforeUpdate, onBeforeMount, onMounted} from "vue";
import {useFavoriteProductStore} from "../stores/FavoriteProductStore";
import {useBasketProductsStore} from "../stores/BasketProductsStore.js";

const config = useRuntimeConfig();

const user = computed(() => useUserStore().getUser().value);
const hasUser = ref();
onBeforeMount(() => {
  hasUser.value = useUserStore().getUser().value;
});
const products_ids = computed(() => useCompareProductStore().getCompareProducts().value);
const products = ref([]);
const urlProductsComparison = computed(() => config.public.apiBaseUrl + `products/products`);
const openCategory = ref();

const pending = ref(true);

const addOpenCategory = (category) => {
  openCategory.value = category
  if (user.value){
    compareGetCategoryFormRequest(openCategory.value).then((res) => {
      products.value = res;
      // checkCategory();
    }).catch((err) => {
      console.error('Contact form could not be send', err);
    });
  }
};

const categories = ref([]);

onBeforeUpdate(() => {
  if (user.value){
    if (useCompareProductStore().needUpdate){
      pending.value = true;
      compareGetFormRequest().then((res) => {
        pending.value = false;
        products.value = res;
        checkCategoryUser();
        addOpenCategory(openCategory.value);
      }).catch((err) => {
        console.error('Contact form could not be send', err);
      });
      useCompareProductStore().needUpdate = false;
    }
  }
  else{
    if (useCompareProductStore().needUpdate){
      pending.value = true;
      updateComparison();
    }
  }
});
const updateComparison = () => {
  openCategory.value = categories.value[0] ? categories.value[0]:'';
  pending.value = true;
  productsCompareGetFormRequest().then((res) => {
    products.value = res;
    for (const product of products.value) {
      if (product.category_name){
        if (categories.value.indexOf(product.category_name) === -1){
          categories.value.push(product.category_name);
        }
      }
      else{
        if (categories.value.indexOf(product.category) === -1){
          categories.value.push(product.category);
        }
      }
    }
    pending.value = false;
  }).catch((err) => {
    console.error('Contact form could not be send', err);
  });
  useCompareProductStore().needUpdate = false;
};
onMounted(() => {
  openCategory.value = '';
  if (user.value){
    pending.value = true;
    compareGetFormRequest().then((res) => {
      products.value = res;
      pending.value = false;
      checkCategoryUser();
      addOpenCategory(openCategory.value);
    }).catch((err) => {
      if(err.status === 401){
        useUserStore().removeUser();
      }
      console.error('Contact form could not be send', err);
    });
  }
  else{
    pending.value = true;
    productsCompareGetFormRequest().then((res) => {
      products.value = res;
      checkCategory();
      pending.value = false;
    }).catch((err) => {
      console.error('Contact form could not be send', err);
    });
  }
});

const checkCategory = () => {
  for (const product of products.value) {
    if (product.category_name){
      if (categories.value.indexOf(product.category_name) === -1){
        categories.value.push(product.category_name);
      }
    }
    else{
      if (categories.value.indexOf(product.category) === -1){
        categories.value.push(product.category);
      }
    }
  }
  openCategory.value = categories.value[0] ? categories.value[0]:'';
};

const checkCategoryUser = () => {
  for (const product of products.value) {
    if (categories.value.indexOf(product.category) === -1){
      categories.value.push(product.category);
    }
  }
  openCategory.value = categories.value[0] ? categories.value[0]:'';
};

const updateUserProducts = () => {
  pending.value = true;
  openCategory.value = '';
  compareGetFormRequest().then((res) => {
    products.value = res;
    pending.value = false;
    checkCategoryUser();
    addOpenCategory(openCategory.value);
  }).catch((err) => {
    console.error('Contact form could not be send', err);
  });
};

const urlCompare = computed(() => config.public.apiBaseUrl + `compares/${useUserStore().getUser().value.id}`);
const urlCompareCategory = computed(() => config.public.apiBaseUrl + `compares/category/${useUserStore().getUser().value.id}`);

const compareGetFormRequest = async () => {
  return await $fetch(urlCompare.value , {
    headers: {
      'Authorization': `Bearer ${useUserStore().getToken().value}`,
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'GET'
  });
}

const compareGetCategoryFormRequest = async (category_id) => {
  return await $fetch(urlCompareCategory.value , {
    headers: {
      'Authorization': `Bearer ${useUserStore().getToken().value}`,
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'GET',
    params: {
      category_id: category_id,
    },
  });
}

const productsCompareGetFormRequest = async () => {
  return await $fetch(urlProductsComparison.value , {
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
.section-compare{
  display: flex;
  margin-top: 3.5rem;
  padding-top: 2rem;
  /*height: 100vh;*/
  flex-direction: column;
  background: #F7F7F7;
  border-radius: 25px 25px 0px 0px;
}
.buttons{
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.container-comparison{
  display: flex;
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
  flex-direction: column;
  margin-bottom: 38rem;
  background-color: #FFFFFF;
  /*padding: 3.125rem 0;*/
  overflow: auto;
}
.category_btn{
  display: flex;
  width: 10rem;
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
  margin-bottom: 1rem;
  opacity: 0.8;
  margin-right: 1.5rem;
}
.category_btn:hover{
  transition: all .3s ease;
  opacity: 1;
  cursor: pointer;
}
.category_btn.active{
  background-color: #E31235;
  transition: all .3s ease;
  border: none;
  opacity: 1;
  color: #FFFFFF;
}
.category_btn-max{
  display: flex;
  width: 18rem;
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
  margin-right: 1.5rem;
}
.category_btn-max:hover{
  transition: all .3s ease;
  opacity: 1;
  cursor: pointer;
}
.category_btn-max.active{
  background-color: #E31235;
  opacity: 1;
  transition: all .3s ease;
  border: none;
  color: #FFFFFF;
}
.cards-section-wrapp{
  display: flex;
}
.cards-section-wrapp_white{
  background-color: #FFFFFF;
  display: flex;
  height: 120vh;
}
.cards{
  margin-right: 1.875rem;
  border: none;
}
.cards:last-child{
  margin-right: 0;
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
  height: 100vh;
  box-shadow: .3125rem 2rem .3125rem .9375rem #F7F7F7, .625rem -.625rem .3125rem #F7F7F7, -.625rem 1.625rem .3125rem #F7F7F7, -.625rem -.625rem .3125rem #F7F7F7;
}
</style>