<template>
  <section class="purchase-section">
    <div class="container">
      <div class="title_wrapp">
        <h1 class="title">Оформление заказа</h1>
      </div>
    </div>
    <div class="line max_line"></div>
    <div class="container container-purchase">
      <div class="left-purchase">
        <div class="data-section">
          <div class="delivery-section delivery">
            <h2 class="data_title">Доставка</h2>
            <div class="delivery_body data_body" @click="chose_1" :class="{ 'data_chose': delivery_chose_1 }">
              <h3 class="data_subtitle">Доставка</h3>
              <div class="data_text">Курьером до двери, <span>Бесплатно</span></div>
              <div class="data_images">
                <nuxt-img style="margin: .625rem 0 0 0" src="img/pochta_ru.svg" loading="lazy" sizes="lg:20vw md:200vw sm:230vw xs:200vw" alt="pochta-ru"/>
                <nuxt-img style="margin: 3rem 0 0 1rem" src="img/logo-boxberry.png" loading="lazy" sizes="xxl:100vw xl:100vw lg:100vw md:200vw sm:230vw xs:200vw" alt="boxberry"/>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <div class="payment-section payment">
            <h2 class="data_title">Способ оплаты</h2>
            <div class="payment_body data_body" @click="chose_payment_1" :class="{ 'data_chose': payment_chose_1 }">
              <h3 class="data_subtitle">Оплата картой онлайн</h3>
              <div class="data_text">Предоплата <span>100%</span></div>
              <div class="data_images">
                <nuxt-img src="img/payment.png" loading="lazy" sizes="xxl:200vw xl:200vw lg:200vw md:300vw sm:300vw xs:300vw" alt="payment"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="windowWidth <= 768">
        <div class="line"></div>
        <div class="user-section user">
          <h2 class="data_title">Ваши данные</h2>
          <div class="user-container data_body">
            <div class="left-user">
              <div v-if="pending">....</div>
              <div v-else class="form-section">
                <form action="" >
                  <div class="form-group">
                    <h2 class="form_label">Имя <span style="color: #f53b49;">*</span></h2>
                    <div class="form-input_wrapp"
                         :class="{
                          'input-error': v$.name.$error,
                          'input-invalid': !v$.name.$invalid,
                         }">
                      <input class="form_input"
                             id="name"
                             name="name"
                             type="text"
                             v-model.trim="formData.name"
                             @change="v$.name.$touch">
                    </div>
                    <div v-if="v$.name.$error" class="error_message">
                      {{ v$.name.$errors[0].$message }}
                    </div>
                  </div>
                  <div class="form-group">
                    <h2 class="form_label">Фамилия <span style="color: #f53b49;">*</span></h2>
                    <div class="form-input_wrapp" :class="{
                          'input-error': v$.last_name.$error,
                          'input-invalid': !v$.last_name.$invalid,
                         }">
                      <input class="form_input"
                             id="last_name"
                             name="last_name"
                             type="text"
                             v-model.trim="formData.last_name"
                             @change="v$.last_name.$touch">
                    </div>
                    <div v-if="v$.last_name.$error" class="error_message">
                      {{ v$.last_name.$errors[0].$message }}
                    </div>
                  </div>
                  <div class="form-group">
                    <h2 class="form_label">Отчество <span style="color: #f53b49;">*</span></h2>
                    <div class="form-input_wrapp" :class="{
                          'input-error': v$.middle_name.$error,
                          'input-invalid': !v$.middle_name.$invalid,
                         }">
                      <input class="form_input"
                             id="middle_name"
                             name="middle_name"
                             type="text"
                             v-model.trim="formData.middle_name"
                             @change="v$.middle_name.$touch">
                    </div>
                    <div v-if="v$.middle_name.$error" class="error_message">
                      {{ v$.middle_name.$errors[0].$message }}
                    </div>
                  </div>
                  <div class="form-group">
                    <h2 class="form_label">Email</h2>
                    <div class="form-input_wrapp"
                         :class="{
                          'input-error': v$.email.$error,
                          'input-invalid': !v$.email.$invalid,
                         }">
                      <input class="form_input"
                             id="email"
                             name="email"
                             type="email"
                             v-model.trim="formData.email"
                             @change="v$.email.$touch">
                    </div>
                    <div v-if="v$.email.$error" class="error_message">
                      {{ v$.email.$errors[0].$message }}
                    </div>
                  </div>
                  <div class="form-group">
                    <h2 class="form_label">Адрес доставки <span style="color: #f53b49;">*</span></h2>
                    <div class="form-input_wrapp form-input_wrapp__address" :class="{
                          'input-error': v$.address.$error || zipCheck===false,
                          'input-invalid': !v$.address.$invalid,
                         }">
                      <vue-dadata class="form_input"
                                  style="padding: 0"
                                  id="fullAddress"
                                  name="fullAddress"
                                  type="text"
                                  v-model.trim="formData.address"
                                  @change="v$.address.$touch; changeAddress()"
                                  :token="token"
                                  v-model:suggestion="formData.suggestion"
                      />
                    </div>
                    <div v-if="v$.address.$error" class="error_message">
                      {{ v$.address.$errors[0].$message }}
                    </div>
                    <div v-if="zipCheck===false" class="error_message">
                      <span>К сожаленью, <span style="font-weight: 700">курьерская доставка</span> по данному адресу невозможна.</span>
                    </div>
                    <div v-if="formData.suggestion.data" class="full_address">
                      <div class="full_address_item">
                        <h2 class="form_label" style="display: inline-block">Регион</h2>
                        <input v-model="formData.suggestion.data.region_with_type" class="address_city full_address_input" disabled type="text">
                      </div>
                      <div class="full_address_item" v-if="formData.suggestion.data.city">
                        <h2 class="form_label" style="display: inline-block">Город</h2>
                        <input v-model="formData.suggestion.data.city" class="address_city full_address_input" disabled type="text">
                      </div>
                      <div class="full_address_item" v-if="formData.suggestion.data.settlement">
                        <h2 class="form_label" style="display: inline-block">
                          {{ formData.suggestion.data.settlement_type_full.slice(0, 1).toUpperCase() + formData.suggestion.data.settlement_type_full.slice(1) }}
                        </h2>
                        <input v-model="formData.suggestion.data.settlement" class="address_city full_address_input" disabled type="text">
                      </div>
                      <div class="full_address_item" v-if="formData.suggestion.data.street">
                        <h2 class="form_label" style="display: inline-block">
                          {{ formData.suggestion.data.street_type_full.slice(0, 1).toUpperCase() + formData.suggestion.data.street_type_full.slice(1) }}
                        </h2>
                        <input v-model="formData.suggestion.data.street" class="address_city full_address_input" disabled type="text">
                      </div>
                      <div class="full_address_item">
                        <h2 class="form_label" style="display: inline-block">Дом</h2>
                        <input v-model="formData.suggestion.data.house" class="address_city full_address_input" disabled type="text">
                      </div>
                      <div class="full_address_item" v-if="formData.suggestion.data.block">
                        <h2 class="form_label" style="display: inline-block">Корпус/Строение</h2>
                        <input v-model="formData.suggestion.data.block" class="address_city full_address_input" disabled type="text">
                      </div>
                      <div class="full_address_item" v-if="formData.suggestion.data.flat" >
                        <h2 class="form_label" style="display: inline-block">Квартира</h2>
                        <input v-model="formData.suggestion.data.flat" class="address_city full_address_input" disabled type="text">
                      </div>
                      <div class="full_address_item">
                        <h2 class="form_label" style="display: inline-block">Индекс</h2>
                        <input v-model="formData.suggestion.data.postal_code" class="address_city full_address_input" disabled type="text">
                      </div>
                    </div>

                  </div>
                  <div class="tel">
                    <vue-tel-input class="form_input form_input_tel"
                                   :class="{
                        'input-error': v$.phone.$error,
                        'input-invalid': !v$.phone.$invalid,
                       }"
                                   v-model.trim="formData.phone"
                                   v-bind="bindProps"
                                   @input="v$.phone.$touch"/>
                    <div v-if="v$.phone.$error" class="error_message">
                      {{ v$.phone.$errors[0].$message }}
                    </div>
                  </div>
                  <div class="form-input_wrapp code-wrapp" v-if="!v$.name.$error && !v$.phone.$error && formData.phone!=='' && formData.name!==''">
                    <input class="form_input"
                           :class="{
                        'input-error': v$.code.$error,
                        'input-invalid': !v$.code.$invalid,
                       }"
                           type="number"
                           id="code"
                           name="code"
                           placeholder="Код из смс"
                           v-model.trim="formData.code"
                           @change="v$.code.$touch">
                    <div v-if="v$.code.$error" class="error_message">
                      {{ v$.code.$errors[0].$message }}
                    </div>
                  </div>

                  <div class="btn-form">
                    <div v-if="disabled_send_count >= 1 && currentTime > 0">
                      <Button  @click.prevent="phoneAuth(disabled_send)"
                               :width_btn="14"
                               :route_btn="''"
                               :disabled_btn="disabled_send=true" >
                        Получить код</Button>
                      <span class="timeout-message" v-if="disabled_send_count >= 6">Кажется использовано слишком много попыток, попробуйте снова позже.</span>
                      <span class="timeout-message" v-if="disabled_send_count >= 1 && disabled_send_count !== 6">До получения нового кода {{ currentTime }}с</span>
                    </div>
                    <div v-else>
                      <Button  @click.prevent="phoneAuth(disabled_send)"
                               :width_btn="14"
                               :route_btn="''"
                               :disabled_btn="disabled_send=(v$.name.$error ||
                                              v$.phone.$error ||
                                              v$.email.$error ||
                                              v$.middle_name.$error ||
                                              v$.last_name.$error ||
                                              formData.phone==='' ||
                                              formData.name==='' ||
                                              zipCheck === false ||
                                              formData.middle_name==='' ||
                                              formData.last_name==='' ||
                                              formData.address==='' ||
                                              delivery_chose_1==='' ||
                                              payment_chose_1==='' ||
                                              formData.suggestion.data===null ||
                                              formData.suggestion.data.postal_code===null ||
                                              formData.suggestion.data.region===null ||
                                              formData.suggestion.data.street===null ||
                                              formData.suggestion.data.house===null ||
                                              (formData.suggestion.data.city==='' && formData.suggestion.data.settlement===''))">
                        Получить код</Button>
                    </div>
                  </div>
                  <div class="error_message" v-if="paymentError">{{ paymentError }}</div>
                </form>
              </div>
            </div>
            <div v-if="!user" class="right-user">
              <h3 class="login_title">
                У вас уже есть личный кабинет?<br>
                <h4 class="login_title-link"><AuthModal :top="'6.26'" :link_color="'#E31235'">Авторизируйтесь</AuthModal></h4> <span>для отслеживания статуса заказа</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div v-else style="display: none"></div>
      <div class="right-purchase">
        <div class="total-section">
          <div class="basket-total">
            <div class="basket-total_title">Итого</div>
            <div class="total">{{ priceFormat(useBasketProductsStore().getTotalBasket().value.totalPrice) }}&nbsp;₽</div>
          </div>
          <div class="line basket-line"></div>
          <div class="basket-total_products">
            <div class="basket-total_products_title">Товары, {{ useBasketProductsStore().getTotalBasket().value.totalQuantity }}&nbsp;шт.</div>
            <div class="total total_products">{{ priceFormat(useBasketProductsStore().getTotalBasket().value.totalPrice) }}&nbsp;₽</div>
          </div>
          <div class="basket-total_sales">
            <div class="basket-total_products_title basket-total_sales">Скидка</div>
            <div class="total total_products total_sales">{{ priceFormat(useBasketProductsStore().getTotalBasket().value.totalSalePrice) }}&nbsp;₽</div>
          </div>
          <div class="delivery_total">
            <div class="chose_title">Доставка</div>
            <div class="chose_title" style="flex: 40% 0 1">{{ delivery_chose_1 ? delivery_chose_1 : "Не выбрано" }}</div>
          </div>
          <div class="payment_total">
            <div class="chose_title">Оплата</div>
            <div class="chose_title" style="flex: 40% 0 1">{{ payment_chose_1 ? payment_chose_1 : "Не выбрано" }}</div>
          </div>
          <div v-if="windowWidth <= 768" class="line basket-line"></div>
          <div class="total-buttons">
            <Button v-if="windowWidth <= 768" :disabled_btn="disabled_payment=(v$.name.$error ||
                               v$.phone.$error ||
                               v$.code.$error ||
                               v$.email.$error ||
                               v$.middle_name.$error ||
                               v$.last_name.$error ||
                               formData.phone==='' ||
                               formData.name==='' ||
                               formData.code==='' ||
                               formData.address==='' ||
                               formData.middle_name==='' ||
                               zipCheck === false ||
                               formData.last_name==='' ||
                               delivery_chose_1==='' ||
                               payment_chose_1==='' ||
                               formData.suggestion.data===null ||
                               formData.suggestion.data.postal_code===null ||
                               formData.suggestion.data.region===null ||
                               formData.suggestion.data.street===null ||
                               formData.suggestion.data.house===null ||
                               (formData.suggestion.data.city==='' && formData.suggestion.data.settlement===''))">Оплатить картой</Button>
          </div>
        </div>

        <div class="detail-section">
          <h2 class="detail_title">Детали заказа</h2>
          <div class="line basket-line"></div>
          <div class="detail_subtitles" style="display: flex; justify-content: space-between; width: 100%">
            <div class="detail_product_name chose_title">Наименование</div>
            <div class="detail_product_quantity chose_title">Количество</div>
          </div>
          <div class="products">
            <div class="detail_product" v-for="product in useBasketProductsStore().getTotalBasket().value.detailProducts">
              <img class="detail_image" :src="config.public.baseUrl+product.image" alt="Product">
              <h2 class="detail_name" v-if="product.product_name.length < 31">{{ product.product_name }}</h2>
              <h2 class="detail_name" v-else-if="product.product_name.split(' ').slice(0, 4).join(' ').length >= 31">{{ product.product_name.split(" ").slice(0, 3).join(" ") }}...</h2>
              <h2 class="detail_name" v-else>{{ product.product_name.split(" ").slice(0, 4).join(" ") }}...</h2>
              <h2 class="detail_quantity">{{ product.quantity }}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="line"></div>

    <div v-if="windowWidth > 768" class="container">
      <div class="user-section user">
        <h2 class="data_title">Ваши данные</h2>
        <div class="user-container data_body">
          <div class="left-user">
            <div id="not_access_block" style="display: none" :class="{not_access_block: btn_pending}">
              <img src="/img/295.svg" alt="">
            </div>
            <div v-if="pending">....</div>
            <div v-else class="form-section">
              <form action="" >
                <div class="form-group">
                  <h2 class="form_label">Имя <span style="color: #f53b49;">*</span></h2>
                  <div class="form-input_wrapp"
                       :class="{
                          'input-error': v$.name.$error,
                          'input-invalid': !v$.name.$invalid,
                         }">
                    <input class="form_input"
                           id="name"
                           name="name"
                           type="text"
                           v-model.trim="formData.name"
                           @change="v$.name.$touch">
                  </div>
                  <div v-if="v$.name.$error" class="error_message">
                    {{ v$.name.$errors[0].$message }}
                  </div>
                </div>
                <div class="form-group">
                  <h2 class="form_label">Фамилия <span style="color: #f53b49;">*</span></h2>
                  <div class="form-input_wrapp" :class="{
                          'input-error': v$.last_name.$error,
                          'input-invalid': !v$.last_name.$invalid,
                         }">
                    <input class="form_input"
                           id="last_name"
                           name="last_name"
                           type="text"
                           v-model.trim="formData.last_name"
                           @change="v$.last_name.$touch">
                  </div>
                  <div v-if="v$.last_name.$error" class="error_message">
                    {{ v$.last_name.$errors[0].$message }}
                  </div>
                </div>
                <div class="form-group">
                  <h2 class="form_label">Отчество <span style="color: #f53b49;">*</span></h2>
                  <div class="form-input_wrapp" :class="{
                          'input-error': v$.middle_name.$error,
                          'input-invalid': !v$.middle_name.$invalid,
                         }">
                    <input class="form_input"
                           id="middle_name"
                           name="middle_name"
                           type="text"
                           v-model.trim="formData.middle_name"
                           @change="v$.middle_name.$touch">
                  </div>
                  <div v-if="v$.middle_name.$error" class="error_message">
                    {{ v$.middle_name.$errors[0].$message }}
                  </div>
                </div>
                <div class="form-group">
                  <h2 class="form_label">Email</h2>
                  <div class="form-input_wrapp"
                       :class="{
                          'input-error': v$.email.$error,
                          'input-invalid': !v$.email.$invalid,
                         }">
                    <input class="form_input"
                           id="email"
                           name="email"
                           type="email"
                           v-model.trim="formData.email"
                           @change="v$.email.$touch">
                  </div>
                  <div v-if="v$.email.$error" class="error_message">
                    {{ v$.email.$errors[0].$message }}
                  </div>
                </div>
                <div class="form-group">
                  <h2 class="form_label">Адрес доставки <span style="color: #f53b49;">*</span></h2>
                  <div class="form-input_wrapp form-input_wrapp__address" :class="{
                          'input-error': v$.address.$error || zipCheck===false,
                          'input-invalid': !v$.address.$invalid,
                         }">
                    <vue-dadata class="form_input"
                                style="padding: 0"
                                id="fullAddress"
                                name="fullAddress"
                                type="text"
                                v-model.trim="formData.address"
                                @change="v$.address.$touch; changeAddress()"
                                :token="token"
                                v-model:suggestion="formData.suggestion"
                    />
                  </div>
                  <div v-if="v$.address.$error" class="error_message">
                    {{ v$.address.$errors[0].$message }}
                  </div>
                  <div v-if="zipCheck===false" class="error_message">
                    <span>К сожаленью, <span style="font-weight: 700">курьерская доставка</span> по данному адресу невозможна.</span>
                  </div>
                  <div v-if="formData.suggestion.data" class="full_address">
                    <div class="full_address_item">
                      <h2 class="form_label" style="display: inline-block">Регион</h2>
                      <input v-model="formData.suggestion.data.region_with_type" class="address_city full_address_input" disabled type="text">
                    </div>
                    <div class="full_address_item" v-if="formData.suggestion.data.city">
                      <h2 class="form_label" style="display: inline-block">Город</h2>
                      <input v-model="formData.suggestion.data.city" class="address_city full_address_input" disabled type="text">
                    </div>
                    <div class="full_address_item" v-if="formData.suggestion.data.settlement">
                      <h2 class="form_label" style="display: inline-block">
                        {{ formData.suggestion.data.settlement_type_full.slice(0, 1).toUpperCase() + formData.suggestion.data.settlement_type_full.slice(1) }}
                      </h2>
                      <input v-model="formData.suggestion.data.settlement" class="address_city full_address_input" disabled type="text">
                    </div>
                    <div class="full_address_item" v-if="formData.suggestion.data.street">
                      <h2 class="form_label" style="display: inline-block">
                        {{ formData.suggestion.data.street_type_full.slice(0, 1).toUpperCase() + formData.suggestion.data.street_type_full.slice(1) }}
                      </h2>
                      <input v-model="formData.suggestion.data.street" class="address_city full_address_input" disabled type="text">
                    </div>
                    <div class="full_address_item">
                      <h2 class="form_label" style="display: inline-block">Дом</h2>
                      <input v-model="formData.suggestion.data.house" class="address_city full_address_input" disabled type="text">
                    </div>
                    <div class="full_address_item" v-if="formData.suggestion.data.block">
                      <h2 class="form_label" style="display: inline-block">Корпус/Строение</h2>
                      <input v-model="formData.suggestion.data.block" class="address_city full_address_input" disabled type="text">
                    </div>
                    <div class="full_address_item" v-if="formData.suggestion.data.flat" >
                      <h2 class="form_label" style="display: inline-block">Квартира</h2>
                      <input v-model="formData.suggestion.data.flat" class="address_city full_address_input" disabled type="text">
                    </div>
                    <div class="full_address_item">
                      <h2 class="form_label" style="display: inline-block">Индекс</h2>
                      <input v-model="formData.suggestion.data.postal_code" class="address_city full_address_input" disabled type="text">
                    </div>
                  </div>
                </div>
                <div class="tel">
                  <vue-tel-input class="form_input form_input_tel"
                                 :class="{
                            'input-error': v$.phone.$error,
                            'input-invalid': !v$.phone.$invalid,
                           }"
                                 v-model.trim="formData.phone"
                                 v-bind="bindProps"
                                 @input="v$.phone.$touch"/>
                  <div v-if="v$.phone.$error" class="error_message">
                    {{ v$.phone.$errors[0].$message }}
                  </div>
                </div>
                <div class="form-input_wrapp code-wrapp" v-if="!v$.name.$error && !v$.phone.$error && formData.phone!=='' && formData.name!==''">
                  <input class="form_input"
                         :class="{
                        'input-error': v$.code.$error,
                        'input-invalid': !v$.code.$invalid,
                       }"
                         type="number"
                         id="code"
                         name="code"
                         placeholder="Код из смс"
                         v-model.trim="formData.code"
                         @change="v$.code.$touch">
                  <div v-if="v$.code.$error" class="error_message">
                    {{ v$.code.$errors[0].$message }}
                  </div>
                </div>

                <div class="btn-form">
                  <div v-if="disabled_send_count >= 1 && currentTime > 0">
                    <Button  @click.prevent="phoneAuth(disabled_send)"
                             :width_btn="14"
                             :route_btn="''"
                             :disabled_btn="disabled_send=true">
                      Получить код</Button>
                    <span class="timeout-message" v-if="disabled_send_count >= 6">Кажется использовано слишком много попыток, попробуйте снова позже.</span>
                    <span class="timeout-message" v-if="disabled_send_count >= 1 && disabled_send_count !== 6">До получения нового кода {{ currentTime }}с</span>
                  </div>
                  <div v-else>
                    <Button  @click.prevent="phoneAuth(disabled_send)"
                             :width_btn="14"
                             :route_btn="''"
                             :disabled_btn="disabled_send=(v$.name.$error ||
                                              v$.phone.$error ||
                                              v$.email.$error ||
                                              v$.middle_name.$error ||
                                              v$.last_name.$error ||
                                              formData.phone==='' ||
                                              formData.name==='' ||
                                              formData.middle_name==='' ||
                                              formData.last_name==='' ||
                                              formData.address==='' ||
                                              zipCheck === false ||
                                              delivery_chose_1==='' ||
                                              payment_chose_1==='' ||
                                              formData.suggestion.data===null ||
                                              formData.suggestion.data.postal_code===null ||
                                              formData.suggestion.data.region===null ||
                                              formData.suggestion.data.street===null ||
                                              formData.suggestion.data.house===null ||
                                              (formData.suggestion.data.city==='' && formData.suggestion.data.settlement===''))">
                      Получить код</Button>
                  </div>
                </div>
                <div class="error_message" v-if="paymentError">{{ paymentError }}</div>
                <div class="login-form" >
<!--                  <Button @click.prevent="payment(disabled_payment)"-->
<!--                          :route_btn="''"-->
<!--                          :disabled_btn="disabled_payment=(v$.name.$error ||-->
<!--                               v$.phone.$error ||-->
<!--                               v$.code.$error ||-->
<!--                               v$.email.$error ||-->
<!--                               v$.middle_name.$error ||-->
<!--                               v$.last_name.$error ||-->
<!--                               formData.phone==='' ||-->
<!--                               formData.code==='' ||-->
<!--                               formData.name==='' ||-->
<!--                               formData.address==='' ||-->
<!--                               formData.middle_name==='' ||-->
<!--                               formData.last_name==='' ||-->
<!--                               delivery_chose_1==='' ||-->
<!--                               payment_chose_1==='' ||-->
<!--                               zipCheck === false ||-->
<!--                               formData.suggestion.data===null ||-->
<!--                               formData.suggestion.data.postal_code===null ||-->
<!--                               formData.suggestion.data.region===null ||-->
<!--                               formData.suggestion.data.street===null ||-->
<!--                               formData.suggestion.data.house===null ||-->
<!--                               (formData.suggestion.data.city==='' && formData.suggestion.data.settlement===''))">-->
<!--                    Оплатить картой</Button>-->
                  <Button @click.prevent="payment(false)" :route_btn="''" :src_btn="btn_pending_src" :disabled_btn="btn_pending===true" :without_padding="btn_pending!==true">
                    {{ !btn_pending ? 'Оплатить картой' : '' }}
                  </Button>
                </div>
              </form>
            </div>
          </div>
          <div v-if="!user" class="right-user">
<!--            <div style="display: none" :class="{not_access_block: btn_pending}"></div>-->
            <h3 class="login_title">
              У вас уже есть личный кабинет?<br>
              <h4 class="login_title-link"><AuthModal :top="'6.26'" :link_color="'#E31235'">Авторизируйтесь</AuthModal></h4> <span>для отслеживания статуса заказа</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div v-else style="display: none"></div>

    <a href="#" @click="payment(false)">тест</a><br>
  </section>
</template>

<script setup>
import { useUserStore } from "../stores/UserStore.js";
import { useBasketProductsStore } from "../stores/BasketProductsStore.js";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, helpers, sameAs, email } from '@vuelidate/validators'
import { VueTelInput } from 'vue-tel-input';
import { computed, onBeforeUpdate, onMounted, reactive, ref } from "vue";

definePageMeta({
  layout: "purchase",
});

const btn_pending = ref(false);
const btn_pending_src = ref('');

const userStore = useUserStore();
const config = useRuntimeConfig();
const token = config.public.dadataToken;

const disabled_send = ref(true);
const disabled_send_count = ref(userStore.getDis());
const user = computed(() => useUserStore().getUser().value);
const urlUserInfo = computed(() => config.public.apiBaseUrl + `users/user/${useUserStore().getUser().value.id}`);

const {pending, data: userInfo} = await useLazyAsyncData(
    "userInfo",
    () => $fetch(urlUserInfo.value, {
          headers: {
            'Authorization': `Bearer ${useUserStore().getToken().value}`,
            "Accept": "application/json",
            'Content-Type': 'application/json',
          },
          method: 'GET',
          withCredentials: true,
          credentials: 'include',
        }
    ).then((res) => {
      formData.email = res.email;
      formData.middle_name = res.middle_name;
      formData.last_name = res.last_name;
      formData.address = res.address;
      formData.phone =  res.phone;
    }).catch((err) => {
        console.error('Contact form could not be send', err);
    })
 );

const disabled_payment = ref(true);
const smsCode = ref("_");
const formData = reactive({
  name: user.value ? useUserStore().getUser().value.first_name:'',
  email: '',
  middle_name: '',
  last_name: '',
  suggestion: '',
  address: '',
  phone:  '',
  code: '',
})
const windowWidth = ref(0);
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(()=>{
  updateWidth();
  window.addEventListener('resize', updateWidth);
});
updateWidth();

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage('Имя обязательно для заполнения', required),
    },
    middle_name: {
      required: helpers.withMessage('Отчество обязательно для заполнения', required),
    },
    last_name: {
      required: helpers.withMessage('Фамилия обязательна для заполнения', required),
    },
    email: {
      email: helpers.withMessage('Email неверного формата', email),
    },
    address: {
      required: helpers.withMessage('Адрес обязателен для заполнения', required),
    },
    phone: {
      required: helpers.withMessage('Номер телефона обязателен для заполнения', required),
      minLength: helpers.withMessage('Неверный формат номера телефона', minLength(10)),
    },
    code: {
      required: helpers.withMessage('Код обязателен для заполнения', required),
      minLength: helpers.withMessage('Неверный формат кода', minLength(6)),
      maxLength: helpers.withMessage('Неверный формат кода', maxLength(6)),
      sameAs: helpers.withMessage('Неверный код', sameAs(smsCode.value)),
    },
  }
});
const v$ = useVuelidate(rules, formData);

const urlPhoneAuth = computed(() => config.public.apiBaseUrl + 'users/phone_auth');
const urlRegister = computed(() => config.public.apiBaseUrl + 'users/register');
const urlPayment = computed(() => config.public.apiBaseUrl + 'orders/create');
const urlZipCheck = computed(() => config.public.apiBaseUrl + 'orders/zip_check');

const paymentError = ref('');
const authToken = ref('');

const currentTime = ref(0);
let timer = null;
// const phoneAuth = (disabled) => {
//   if (!disabled){
//     userStore.addDis();
//     timer = null;
//     currentTime.value = 45 * disabled_send_count.value;
//     if (disabled_send_count.value >= 1 && disabled_send_count.value <= 5){
//       if (timer !== 0){
//         timer = setInterval(() => {
//           currentTime.value--;
//         }, 1000);
//       }
//       else if (timer === 0){
//         clearTimeout(timer)
//       }
//     }
//     if (disabled_send_count.value <= 5){
//       formData.phone = formData.phone.replace(/[^\d]/g, '');
//       phoneAuthFormRequest().then((res) => {
//         res = JSON.parse(res);
//         if (res.success === true){
//           smsCode.value = parseInt(res.data.text.replace(/[^\d]/g, ''));
//         }
//         else {
//           console.error('Sms code could not be send')
//         }
//       }).catch((err) => {
//         console.error('Contact form could not be send', err)
//       });
//
//     }
//   }
// };

const payment = (disabled) => {
  if (!disabled){
    // if (smsCode.value === formData.code && formData.code !== ''){
    //   registerFormRequest().then((res) => {
    //     console.log(res);
    //     addUser(res);
    //     getUser();
    //     userStore.removeDis();
    //   }).catch((err) => {
    //     paymentError.value = `Проверьте корректноcть введенных данных`;
    //     console.error('Contact form could not be send', err)
    //   });
    openButtonPending();
    paymentFormRequest().then((res) => {
      console.log(res);
      if (res){
        useBasketProductsStore().destroyBasketProducts();
        useBasketProductsStore().destroyTotalBasket();
        navigateTo(`/success-page/${res}`);
      }
    }).catch((err) => {
      setTimeout(() => {
        closeButtonPending();
        paymentError.value = `Проверьте корректноcть введенных данных`;
      }, 5000);
      console.error('Contact form could not be send', err)
    });
    // }
  }
};
const phoneAuthFormRequest = async () => {
  return await $fetch(urlPhoneAuth.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'POST',
    params: {
      first_name: formData.name,
      phone: formData.phone,
    },
  });
}

const registerFormRequest = async () => {
  return await $fetch(urlRegister.value , {
    headers: {
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'POST',
    params: {
      first_name: formData.name,
      phone: formData.phone,
      last_name: formData.last_name,
      middle_name: formData.middle_name,
      email: formData.email ? formData.email:'',
    },
  });
}
const paymentFormRequest = async () => {
  return await $fetch(urlPayment.value , {
    headers: {
      // 'Authorization': `Bearer ${useUserStore().getToken().value}`,
      "Accept": "application/json",
      'Content-Type': 'application/json',
    },
    method: 'POST',
    params: {
      user_id:  2,
      total:  parseInt(useBasketProductsStore().getTotalBasket().value.totalPrice),
      details: JSON.stringify(useBasketProductsStore().getTotalBasket().value.detailProducts),
      ship_address: {
        'address': formData.address,
        'zip': formData.suggestion.data.postal_code,
      },
    },
  });
}

const addUser = (user) => {
  userStore.addUser(user.data);
  userStore.addToken(user.token);
};

const getUser = () => {
  user.value =  userStore.getUser().value;
  authToken.value = userStore.getToken().value;
};

const bindProps = computed(() => {
  return {
    autoFormat: true,
    inputOptions: {
      maxlength: 14,
      type: "tel",
      placeholder: "Номер телефона",
      showDialCode: false,
    },
    dropdownOptions: {
      showFlags: true,
      // showDialCodeInSelection: true,
      disabled: true,
    },
    validCharactersOnly: true,
  }
});

const delivery_chose_1 = ref('');
const payment_chose_1 = ref('');

const priceFormat = (value) => {
  let res;
  value = String(value);
  (value.indexOf(',') != -1) ? res = new Intl.NumberFormat('ru-RU').format(value.replace(',', '.')).replace('.', ',') : res = new Intl.NumberFormat('ru-RU').format(value).replace(',', '.');

  return res;
};

const chose_1 = () => {
  if (delivery_chose_1.value){
    delivery_chose_1.value = ''
  }
  else{
    delivery_chose_1.value = 'Курьером до двери';
  }
}
const chose_payment_1 = () => {
  if (payment_chose_1.value){
    payment_chose_1.value = ''
  }
  else{
    payment_chose_1.value = 'Картой онлайн';
  }
}

const zipCheck = ref(true);

const changeAddress = () => {
  if(delivery_chose_1.value !== '' && formData.suggestion !== '' && formData.suggestion.data && formData.suggestion.data.postal_code !== null){
    zipCheck.value = true;
    zipCheckFormRequest().then((res) => {
      if (res == 0){
          zipCheck.value = false;
      }
    }).catch((err) => {
      console.error('Contact form could not be send', err);
      zipCheck.value = false;
    });
  }
}

const zipCheckFormRequest = async () => {
  return await $fetch(urlZipCheck.value , {
    method: 'GET',
    params: {
      Zip: parseInt(formData.suggestion.data.postal_code),
    },
  });
}

const getBodyScrollTop = () => {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
}

const openButtonPending = () => {
  btn_pending.value = true;
  btn_pending_src.value = '/img/835.svg';

  document.querySelector('body').dataset.scrollY = getBodyScrollTop()

  // modal.classList.add('modal--open')
  document.querySelector('body').classList.add('lock')
  document.querySelector('body').style.top = `-${document.querySelector('body').dataset.scrollY}px`
};

const closeButtonPending = () => {
  btn_pending.value = false;
  btn_pending_src.value = '';

  // modal.classList.remove('modal--open')
  document.querySelector('body').classList.remove('lock')
  window.scrollTo(0,document.querySelector('body').dataset.scrollY)
};
</script>

<style scoped>
.container-purchase{
  display: flex;
  justify-content: space-between;
}
.not_access_block{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex !important;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  background-color: transparent;
  backdrop-filter: blur(1px);
}

.purchase-section {
  margin-top: 3rem;
}
.left-purchase{
  flex: 60% 0 1;
}
.right-purchase{
  display: flex;
  flex: 30% 0 1;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 6px;
  height: max-content;
  /*left: 67%;*/
  width: 30%;
  margin-top: 3.125rem;
  /*position: fixed;*/
}
.basket-total,
.basket-total_products,
.basket-total_sales,
.delivery_total,
.payment_total{
  display: flex;
  width: 100%;
}
.basket-total_title,
.total,
.detail_title{
  font-weight: 800;
  font-size: 1.25rem;
  line-height: 120%;
  color: #F53B49;
}
.basket-total_title{
  flex: 60% 0 1;
}
.basket-line{
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
.basket-total_products_title,
.chose_title{
  flex: 60% 0 1;
}
.chose_title{
  font-weight: 700;
  font-size: 1rem;
  line-height: 150%;
  display: flex;
  color: #384255;
}
.delivery_total{
  margin: 1.25rem 0 .3125rem 0;
}
.total{
  flex: 40% 0 1;
}
.total-buttons{
  width: 100%;
}
.data_title{
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 140%;
  margin-top: 3.125rem;
  color: #384255;
}
.data_body{
  margin: 3.125rem 0;
}
.delivery_body,
.payment_body,
.user-container{
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  width: 80%;
  padding: 1.875rem;
  transition: all .3s ease;
}
.delivery_body{
  width: 80%;
}
.user-container{
  display: flex;
  justify-content: space-between;
  cursor: auto;
  width: 100%;
}
.data_body:hover{
  box-shadow: 0 4px 15px rgba(51, 51, 51, 0.25);
  transition: all .3s ease;
}
.user-container:hover{
  box-shadow: none;
}
.data_chose{
  outline: .1rem #2FC509 solid;
  transition: all .3s ease;
}
.data_subtitle{
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 150%;
  color: #1A1A25;
}
.data_text{
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 150%;
  color: #1A1A25;
  margin: .625rem 0;
}
.data_text span{
  font-weight: 700;
}
.user-section{
  margin-bottom: 17rem;
}
.left-user,
.right-user{
  flex: 40% 0 1;
}
.login_title{
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 150%;
  color: #384255;
}
.login_title span{
  font-weight: 400;
  font-size: 1rem;
}
.login_title-link{
  font-size: 1.025rem;
  font-weight: 500;
  display: inline-block;
}
.form-section{
  position: relative;
  z-index: 99;
}
.form-input_wrapp{
  width: 100%;
  height: 3rem;
  background: #fff;
  border: 1px solid rgba(133, 143, 164, 0.5);
  /*border: 1px solid #bbb;*/
  border-radius: 5px;
  justify-content: space-between;
  display: flex;
  align-items: center;
}
.form-group{
  margin-top: 2rem;
}
.form-group:first-child{
  margin-top: 0;
}
.tel{
  width: 100%;
  margin-top: 3rem;
  height: auto;
  margin-bottom: 1rem;
}
.form-input_wrapp:focus-within{
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(102, 175, 233, 0.6);
  border-color: #66afe9;
  background: #FFFFFF;
}
.form-input_wrapp:hover {
  border: 1px solid rgba(133, 143, 164, 1);
}

.form_input{
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 140%;
  color: #858FA4;
  padding: 0 1rem;
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.form_input:disabled{
  opacity: 0.5;
}
.form_input::placeholder {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 140%;
  color: #858FA4;
}
.vue-tel-input{
  border-radius: 5px;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 140%;
  color: #858FA4;
  width: 100%;
  height: 3rem;
}

.tel{
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
}
.vue-tel-input:hover{
  border: 1px solid rgba(133, 143, 164, 1);
}
.form_input_tel{
  padding: 0;
}
.code-wrapp{
  margin-bottom: 2rem;
}
.login-form{
  margin-top: 3.125rem;
}
.login-form_disbled{
  opacity: 0.5;
}
.error_message{
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: .975rem;
  line-height: 110%;
  color: #E31235;
  margin-top: 5px;
  /*margin-bottom: 2rem;*/
}
.input-error{
  border: 1px solid #E31235;
  background: #fff;
}
.input-invalid{
  /*border: 1px solid #66afe9;*/
  background: #FFFFFF;
}
.timeout-message{
  display: block;
  color: #BABAC0;
  font-size: 1rem;
  margin-top: .625rem;
}
.pen_img{
  /*vertical-align: sub;*/
  /*display: inline-block;*/
  /*margin-left: 4rem;*/
  height: 70%;
  opacity: .7;
  transition: all .3s ease;
  cursor: pointer;
}
.pen_img:hover{
  opacity: 1;
  transition: all .3s ease;
}
.pen_active{
  opacity: 1;
}
.form_label{
  padding-bottom: .3175rem;
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  color: #384255;
}
.multiply-group{
  display: flex;
}
.group-1{
  margin-right: 3rem;
}
.form-input_wrapp__address{
  width: 100%;
}
.edit_error{
  color: #E31235;
  font-size: 1rem;
  margin-top: 1rem;
}
.total-section{
  padding: 1.875rem;
  background: #FFFFFF;
  width: 100%;
}
.detail-section{
  margin-top: 1.875rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.875rem;
  background: #FFFFFF;
  border-radius: 6px;
  height: max-content;
  width: 100%;
}
.detail_title{
  color: #1A1A25;
}
.detail_product{
  display: flex;
  margin-top: 1rem;
}
.detail_image{
  width: 45px;
  height: 45px;
  margin-right: .5rem;
}
.detail_name,
.detail_quantity{
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
}
.detail_name{
  width: 40%;
}
.detail_quantity{
  width: 50%;
  text-align: center;
}
.detail_product_quantity{
  justify-content: center;
}
.products{
  width: 100%;
}

.full_address_input{
  border-bottom: 1px solid rgba(133, 143, 164, 0.5);
  color: #858FA4;
  display: inline-block;
}

.full_address{
  display: flex;
  flex-wrap: wrap;
}

.full_address_item{
  margin-right: 2rem;
  margin-top: 1rem;
}
.full_address_item h2, .full_address_item input{
  display: block;
  /*padding-right: .5rem;*/
}

@media(max-width: 768px){
  .delivery_body,
  .data_body{
    width: 100%;
  }
  .user-container{
    width: 100%;
    flex-direction: column;
  }
  .user-section{
    margin-bottom: 0;
    flex-direction: column;
  }
  .right-user{
    order: 1;
    margin-bottom: 1rem;
  }
  .container-purchase{
    flex-direction: column;
  }
  .left-user{
    order: 2;
  }
  .right-purchase{
    width: 100%;
    margin-bottom: 12rem;
    margin-top: 0;
  }
}
</style>

