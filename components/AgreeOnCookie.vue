<template>
  <div>
    <section class="cookie-section">
      <h3 class="cookie_text">
        Продолжая пользоваться сайтом, вы даете согласие на использование файлов cookie. С их помощью мы делаем работу сайта удобнее для вас.
      </h3>
      <ButtonRedOutline @click="emit('close_agree')" class="btn_close">Закрыть</ButtonRedOutline>
    </section>
  </div>
</template>

<script setup>
const emit = defineEmits(['close_agree',]);
</script>

<style scoped>
.cookie-section{
  background-color: #ffffff;
  border: #f53b49 1px solid;
  width: 70%;
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  z-index: 99;
  padding: 1rem 0 .3rem 0;
  left: 15%;
  transition: .3s ease 5s;
  bottom: 0;
  border-radius: 15px 15px 0 0;
}
.cookie_text{
  color: #1A1A25;
  width: 70%;
  font-size: .9rem;
  /*margin-bottom: .5rem;*/
}
.btn_close{
  width: 20%;
  /*margin: 0 auto;*/
}
</style>