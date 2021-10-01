<template>
  <div>
      <Carousel >
        <Slide v-for="slide in 10" :key="slide">
          <div class="carousel_item">{{ slide }}</div>
        </Slide>

        <template #addons>
          <Navigation />
          <Pagination />
        </template>
      </Carousel>
    <!-- Start Footer -->
    <footer>
      <div class="container">
        <div class="row text-light text-center py-4 justify-content-center">
          <p>Stuff can go here</p>
        </div>
      </div>
    </footer>
    <!-- End Footer -->

    <!-- Start Socket -->
    <div class="socket text-light text-center py-3">
      <p><a href="#" target="_blank">and here</a></p>
    </div>
    <!-- End Socket -->
  </div>
</template>

<script> 
import Modal from "../Components/Modal";
import FormInput from "../Components/FormInput";
import BaseBtn from "../Components/BaseBtn";
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
export default {
  components: { Modal, FormInput, BaseBtn, Carousel, Slide, Pagination, Navigation },
  data() {
    return {
      email: null,
      password: null,
      error: null,
      // props: ["isLoginOpen"],
    };
  },
  methods: {

  },
};
</script>

<style>

</style>
