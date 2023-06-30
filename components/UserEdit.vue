<template>
  <Teleport to="body" >
    <Transition name="fade" >
      <section v-if="open" class="modal-section" @click="closeModalEdit">
        <focus-trap @click.stop="open=true" v-model:active="open">
          <modal-dialog>
            <div class="modal">
              <div class="modal-top">
                <div class="modal_titles">
                  <h2 class="city_title">Редактировать профиль</h2>
                </div>
                <div class="modal_close" @click="closeModalEdit"></div>
              </div>
              <div class="modal-body">
                <div class="form">
                  <FormUserEdit @openFormUserEdit="closeModalEdit" />
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
import {ref} from "vue";

const open = ref(true);

const emit = defineEmits(['openUserEdit',]);

const closeModalEdit = () => {
  open.value = false;
  emit('openUserEdit');
  document.querySelector('body').classList.remove('lock')
  window.scrollTo(0,document.querySelector('body').dataset.scrollY)
};
</script>

<style scoped>
.header_link{
  color: #fff;
  transition: all .3s ease;
}
.header_link:hover{
  color: #BABAC0;
  transition: all .3s ease;
}
.modal-section{
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(26, 26, 37, 0.5);
}
.modal{
  margin-top: 17%;
  width: 55.625rem;
  max-height: 75%;
  height: max-content;
  overflow-y: auto;
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
  margin-bottom: 2rem;
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