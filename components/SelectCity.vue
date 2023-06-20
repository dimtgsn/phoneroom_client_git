<template>
  <Teleport to="body" >
    <Transition name="fade" >
      <section v-if="open" class="modal-section" @click="closeModalCity" :style="{'top': props.top+'rem'}">
        <focus-trap @click.stop="open=true" v-model:active="open">
          <modal-dialog>
            <div class="modal">
              <div class="modal-top">
                <div class="modal_titles">
                  <h2 class="city_title">Выберите город</h2>
                </div>
                <div class="modal_close" @click="closeModalCity"></div>
              </div>
              <div class="modal-body">
                <div class="form">
                  <FormSelectCity />
                </div>
              </div>
            </div>
          </modal-dialog>
        </focus-trap>
      </section>
    </Transition>
  </Teleport>
</template>

<script setup>
const open = ref(true);

const props = defineProps({
  top: String
});

const emit = defineEmits(['openCity',]);
// const getCity = () => {
//   open.value = false;
//   emit('openCity');
// };

const closeModalCity = () => {
  open.value = false;
  emit('openCity');
  document.querySelector('body').classList.remove('lock')
  window.scrollTo(0,document.querySelector('body').dataset.scrollY)
};
</script>

<style scoped>
.modal-section{
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 99;
  left: 0;
  top: 8.7rem;
  width: 100%;
  height: 100vh;
  background: rgba(26, 26, 37, 0.5);
}
.modal{
  margin-top: 1.5rem;
  width: 30.75rem;
  height: max-content;
  padding: 1.625rem 2.5rem;
  background-color: #FFFFFF;
  box-shadow: 0 10px 30px rgba(133, 143, 164, 0.1);
  border-radius: 6px;
}
.modal-top{
  display: flex;
  justify-content: space-between;
}
.modal_titles{
  padding-top: 1.5rem;
  margin-bottom: 2.625rem;
  display: inline-block;
}
.city_title{
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 110%;
  color: #1A1A25;
}
.modal_close{
  display: inline-block;
  vertical-align: top;
}
.modal_close:before{
  content: '\2716';
  font-weight: 900;
  font-size: 1.5rem;
  color: #858FA4;
  cursor: pointer;
  opacity: .5;
  transition: all .3s ease;
}




@media (max-width: 768px) {
  .modal-section{
    top: 4.6rem;
  }
}
</style>