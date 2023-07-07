<template>
  <section class="section-orders">
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
      <div v-if="orders.length === 0">
        <h2 class="section-no-orders-title">Нет заказов</h2>
        <div class="no_orders_text">
          К сожалению, на данные момент история заказов пуста. <br> Перейдите в каталог и выберите нужные товары. <br> Акции и горячие предложения на главной старнице помогут вам в выборе.
        </div>
        <Button :width_btn="15" :route_btn="'/'">Вернуться на главную</Button>
      </div>
      <div v-else>
        <div :id="order.id" @click="openOrder(order.id)" class="order" v-for="order in orders">
          <div class="line order_line"></div>
          <div class="order_data">
            <div class="order_left">
              <div class="order_date">{{ order.created_at }}</div>
              <div v-if="windowWidth >= 700" class="order_id">№&nbsp;{{ order.id }}</div>
              <div v-if="windowWidth >= 430" class="order_status">{{ order.status }}</div>
            </div>
            <div class="order_right">
              <div class="order_total">{{ priceFormat(order.total) }}&nbsp;₽</div>
              <div class="block-arrow">
                <svg id="arrow" class="arrow" width="2rem" height="0.875rem" viewBox="0 0 32 14" fill="none">
                  <path d="M1.5 12.5L16 1.5L30.5 12.5" stroke="#858FA4" stroke-width="2"/>
                </svg>
              </div>
            </div>
          </div>
          <div id="order" class="order_content">
              <div class="order_details">
                <div class="order_delivery">
                  <h3 class="delivery_title" v-if="windowWidth < 430">Статус заказа: <span style="color: #4B7EE8; font-weight: 400;">{{ order.status }}</span></h3>
                  <h3 class="delivery_title">Доставка: <span style="color: #4B7EE8; font-weight: 400;">{{ order.delivery && order.delivery_date ? order.delivery + ', ' + order.delivery_date : 'В обработке' }}</span></h3>
                  <!--                <h3 class="delivery_title" style="margin-left: 2.5rem;">Дата доставки: <span style="color: #4B7EE8">{{ order.delivery_date ?? 'В обработке' }}</span></h3>-->
                </div>
                <div class="order_products">
                  <div class="product" v-for="orderProduct in order.products">
                    <nuxt-img :src="config.public.baseUrl+orderProduct.product.image" alt="ProductImage" class="product_image" />
                    <div class="product_data">
                      <h5 class="product_txt" style="font-weight: 500;">{{ orderProduct.product.name }}</h5><span></span>
                      <h5 class="product_txt">Цена покупки <span style="color: #4B7EE8">{{ priceFormat(orderProduct.price) }}&nbsp;₽</span></h5>
                      <h5 class="product_txt">Количество <span style="color: #4B7EE8">{{ orderProduct.quantity }}&nbsp;шт</span></h5>
                    </div>
                  </div>
                  <div class="product" v-for="orderProduct in order.products">
                    <nuxt-img :src="config.public.baseUrl+orderProduct.product.image" alt="ProductImage" class="product_image" />
                    <div class="product_data">
                      <h5 class="product_txt" style="font-weight: 500;">{{ orderProduct.product.name }}</h5><span></span>
                      <h5 class="product_txt">Цена покупки <span style="color: #4B7EE8">{{ priceFormat(orderProduct.price) }}&nbsp;₽</span></h5>
                      <h5 class="product_txt">Количество <span style="color: #4B7EE8">{{ orderProduct.quantity }}&nbsp;шт</span></h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {computed, onMounted} from "vue";
import {useUserStore} from "../stores/UserStore.js";

const config = useRuntimeConfig();
const pending = ref(false);
const windowWidth = ref(0);
const orders = ref([]);
const urlOrders = computed(() => config.public.apiBaseUrl + `orders/${useUserStore().getUser().value.id}`);

const openOrder = (order_id) => {
  const order = document.getElementById(String(order_id));
  const arrow = order.querySelector("#arrow");
  arrow.classList.toggle("showItem");
  const orderBody = order.querySelector("#order");
  const orderHeader = order.querySelector(".order");
  console.log(order);
  orderBody.classList.toggle("order_active");
  order.classList.toggle("order-active");
};

onMounted(() => {
  console.log(12131);
  updateWidth();
  window.addEventListener('resize', updateWidth);
  pending.value = true;
  ordersGetFormRequest().then((res) => {
    orders.value = res;
    pending.value = false;
  }).catch((err) => {
    pending.value = false;
    console.error('Contact form could not be send', err)
  });
});

const ordersGetFormRequest = async () => {
  return await $fetch(urlOrders.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'GET',
    withCredentials: true,
    credentials: 'include'
  });
}

const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};

const priceFormat = (value) => {
  let res;
  value = String(value);

  (value.indexOf(',') != -1) ? res = new Intl.NumberFormat('ru-RU').format(value.replace(',', '.')).replace('.', ',') : res = new Intl.NumberFormat('ru-RU').format(value).replace(',', '.');

  return res;
};
</script>

<style scoped>
.section-no-orders-title{
  color: #384255;
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 120%;
  margin-top: 3.125rem;
  margin-bottom: 2rem;
}
.no_orders_text{
  color: #1A1A25;
  width: 90%;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 150%;
  margin-bottom: 5rem;
}
.order{
  max-width: 66rem;
  margin-bottom: 2rem;
  transition: all .5s ease;
}
.order:last-child{
  margin-bottom: 0;
}
.order_data{
  display: flex;
  height: 2rem;
  margin-top: .7rem;
  padding-bottom: .5rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  color: #384255;
  cursor: pointer;
}
.order-active{
  transition: all .5s ease;
  background-color: rgba(255, 255, 255, 1);
}
.order:hover{
  transition: all .5s ease;
  /*background-color: rgba(75, 126, 232, 0.04);*/
  background-color: rgba(255, 255, 255, 1);
}
.order_content{
  background-color: #f7f7f7;
}
.order_left{
  display: flex;
  flex: 70% 0 1;
  padding-left: 1rem;
}
.order_right{
  display: flex;
  justify-content: space-between;
}
.order_date{
  font-size: 1rem;
  line-height: 150%;
}
.order_id,
.delivery_title{
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 150%;
  /*margin-left: 25%;*/
}
.order_id{
  flex: 35% 0 1;
  text-align: end;
}
.order_status{
  color: #4B7EE8;
  font-size: 1rem;
  line-height: 150%;
  flex: 35% 0 1;
  text-align: end;
  margin-left: 1rem;
}
.delivery_title{
  margin-left: 0;
  color: #384255;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: .5rem;
}
.order_delivery{
  display: flex;
  flex-direction: column;
}
.order_total{
  font-size: 1.0625rem;
  font-weight: 700;
  line-height: 135.938%;
}
.order_line{
  width: 100%;
  height: 2px;
}
.block-arrow{
  margin-left: 1.5rem;
  padding-right: 1rem;
  cursor: pointer;
}
.arrow{
  transition: all .3s ease;
}
.showItem{
  opacity: 1;
  transition: all .3s ease;
  transform: rotate(180deg);
}
.order_active{
  transition: all 5s ease .3s;
  display: block !important;
  color: #1A1A25;
}
.order_content{
  transition: all 5s ease .3s;
  display: none;
  padding: 1rem;
}
.order_details{
  display: flex;
  flex-direction: column;
}
.product{
  background-color: #FFFFFF;
  min-width: 30rem;
  border-radius: 10px;
  margin-top: 1rem;
  padding: 1rem;
  margin-right: 1rem;
  display: flex;
}
.product:last-child{
  margin-right: 0;
}
.product_image{
  width: 8rem;
  height: 8rem;
}
.product_data{
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  align-self: center;
}
.product_txt{
  font-weight: 400;
  margin-bottom: .3rem;
}
.product_txt:last-child{
  margin-bottom: 0;
}
.order_products{
  display: flex;
  overflow-x: auto;
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
.icon-2{
  width: 24.25rem;
  height: 37.625rem;
  border-radius: .625rem;
  box-shadow: .3125rem .625rem .3125rem .9375rem #F7F7F7, .625rem -.625rem .3125rem #F7F7F7, -.625rem .625rem .3125rem #F7F7F7, -.625rem -.625rem .3125rem #F7F7F7;
}
.icon-2-2{
  width: 80%;
  height: 50vh;
  box-shadow: .3125rem 2rem .3125rem .9375rem #F7F7F7, .625rem -.625rem .3125rem #F7F7F7, -.625rem 1.625rem .3125rem #F7F7F7, -.625rem -.625rem .3125rem #F7F7F7;
}

@media (max-width: 730px) {
  .icon-2-2{
    width: 100%;
  }
}

@media (max-width: 700px) {
  .order_status{
    flex: 60% 0 1;
    margin-left: 0;
  }
  .product{
    min-width: 25rem;
  }
}

@media (max-width: 550px) {
  .order_status{
    flex: 55% 0 1;
  }
  .product{
    min-width: 25rem;
  }
}

@media (max-width: 500px) {
  .order_status{
    flex: 65% 0 1;
  }
  .product{
    min-width: 23rem;
  }
  .block-arrow{
    margin-left: 1rem;
  }
}

@media (max-width: 360px) {
  .block-arrow{
    margin-left: .5rem;
  }
  .product{
    margin-top: .5rem;
  }
}
</style>