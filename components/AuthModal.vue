<template>
  <button :style="{color: props.link_color}" class="header_link" @click="openModal">
    <slot />
  </button>
  <Teleport to="body">
    <Transition name="fade">
      <section v-if="open" class="modal-section" @click="closeModal" :style="{top: props.top+'rem'}" >
        <focus-trap @click.stop="open=true" v-model:active="open">
          <modal-dialog>
            <div class="modal">
              <div class="modal-top">
                <div class="modal_titles">
                  <h2 class="log_in " :class="{'active': logIn}" @click="changeOnLogIn">Войти</h2>
                  <h2 class="register" :class="{'active': register}" @click="changeOnRegister">Регистрация</h2>
                </div>
                <div class="modal_close" @click.stop="closeModal"></div>
              </div>
              <div class="modal-body">
                <div class="form">
                  <keep-alive>
                    <FormLogIn @login="closeModal" v-if="logIn"/>
                  </keep-alive>
                  <keep-alive>
                    <FormRegistration @login="closeModal" v-if="register"/>
                  </keep-alive>
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
// import FormRegistration from "./Form/FormRegistration";
// import FormLogIn from "./Form/FormLogIn";

const open = ref(false);
const register = ref(false);
const logIn = ref(true);

const props = defineProps({
  link_color: String,
  top: String,
});

const changeOnRegister = () => {
  register.value = true;
  logIn.value = false;
};
const changeOnLogIn = () => {
  register.value = false;
  logIn.value = true;
};

const getBodyScrollTop = () => {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
}

const openModal = () => {
  document.querySelector('body').dataset.scrollY = getBodyScrollTop()

  open.value = true;

  document.querySelector('body').classList.add('lock')
  document.querySelector('body').style.top = `-${document.querySelector('body').dataset.scrollY}px`
};

const closeModal = () => {
  open.value = false;
  document.querySelector('body').classList.remove('lock');
  window.scrollTo(0, document.querySelector('body').dataset.scrollY);
};
</script>

<style scoped>
.header_link{
  color: #fff;
  transition: all .3s ease;
  vertical-align: middle;
}
.header_link:hover{
  color: #BABAC0;
  transition: all .3s ease;
}
.modal-section{
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 9999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background: rgba(26, 26, 37, 0.5);
}
.modal{
  margin-top: 10%;
  width: 40.75rem;
  max-height: 90%;
  padding: 1.625rem 2.5rem;
  background-color: #FFFFFF;
  overflow-y: auto;
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
.register,
.log_in{
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 110%;
  text-decoration-line: none;
  color: #1A1A25;
  cursor: pointer;
  opacity: 1;
  transition: all .3s ease;
}

.register:hover,
.log_in:hover{
  color: #1A1A25;
  opacity: .8;
  transition: all .3s ease;
}
.register{
  margin-left: 2rem;
}
.active{
  text-decoration-line: underline;
  color: #E31235;
}
.active:hover{
  color: #E31235;
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
    top: 5.6rem;
  }
  .header_link{
    display: block;
  }
}

@media (max-width: 600px) {
  .modal{
    width: max-content;
  }
}

@media (max-width: 485px) {
  .modal{
    width: 34rem;
  }
}

@media (max-width: 470px) {
  .modal{
    width: 32rem;
  }
}

@media (max-width: 450px) {
  .modal{
    width: 30rem;
  }
}

@media (max-width: 450px) {
  .modal{
    width: 28rem;
    padding: 1.625rem;
  }
}

@media (max-width: 390px) {
  .modal{
    width: 26rem;
  }
  .register{
    margin-left: 1.5rem;
  }
}

@media (max-width: 375px) {
  .modal{
    width: 25rem;
  }
  .modal_titles{
    padding-top: 2rem;
  }
}

@media (max-width: 340px) {
  .modal{
    width: 24rem;
  }
  .register {
    margin-left: 1rem;
  }
}
</style>