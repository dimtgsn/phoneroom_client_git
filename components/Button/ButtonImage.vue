<template>
  <div :id="$props.without_padding !== true ? 'btn-img' : 'btn-img_without_padding'">
    <nuxt-img v-if="windowWidth > 500" class="btn-svg" sizes="xxl:200vw xl:230vw lg:250vw md:360vw sm:400vw" :src="$props.src_img" alt="btn-svg" loading="lazy"/>
    <nuxt-img v-if="windowWidth <= 500" class="btn-svg" sizes="md:0vw sm:250px xs:90vw" :src="$props.src_img" alt="btn-svg" loading="lazy"/>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";

const props = defineProps({
  src_img: String,
  without_padding: Boolean,
});

const windowWidth = ref(0);
const updateWidth = () => {
  windowWidth.value = window.innerWidth;
};
onMounted(()=>{
  updateWidth();
  window.addEventListener('resize', updateWidth);
});
</script>

<style scoped>
#btn-img{
  padding-right: .4375rem;
  display: flex;
}
#btn-img_without_padding{
  display: flex;
}

@media (max-width: 640px) {
  #btn-img {
    padding-right: 0;
  }
}
</style>