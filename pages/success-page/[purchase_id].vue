<template>
  <div class="container">
    <div class="error">
      <section class="error-section">
        <div class="error-body">
          <h1 class="title_success">Заказ успешно оформлен!</h1>
          <h2 class="subtext_success">Номер заказа <span style="color: #f53b49">{{ purchase_id + 1234 }}</span></h2>
          <h3 class="explain_success">
            Ваша заявка
            <span style="color: #f53b49">№{{ purchase_id + 1234 }}</span> от <span style="color: #f53b49">
              {{ new Date().getDate() }}.{{ new Date().getMonth() }}.{{ new Date().getFullYear() }}
            </span>
            оформлена.
            <br>
            Всю актуальную информацию о статусе исполнения заказа можете посмотреть в личном кабинете.
            Или в указанной для этого почте.
          </h3>
          <div class="error-btn">
            <Button :route_btn="'/'" :width_btn="14">Вернуться на главную</Button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";

const route = useRoute();
const purchase_id = computed(() => route.params.purchase_id);
</script>

<style scoped>
.error{
  display: flex;
  width: 100%;
  justify-content: center;
}
.error-body{
  padding: 6rem 4rem;
}
.error-section{
  width: 48rem;
  height: 28rem;
  text-align: center;
  margin: 4.25rem 0 11.25rem 0;
  box-shadow: 0 0 30px rgba(133, 143, 164, 0.5);
  border-radius: 6px;
}
.title_success{
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 110%;
  text-align: center;
  color: #1A1A25;
  padding-bottom: 1.875rem;
}
.subtext_success{
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 110%;
  text-align: center;
  color: #1A1A25;
  padding-bottom: 1.875rem;
}
.explain_success{
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  text-align: center;
  color: #384255;
  margin-bottom: 1.875rem;
}
.error-btn{
  display: flex;
  justify-content: center;
}
</style>