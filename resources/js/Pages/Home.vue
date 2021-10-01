<template>
  <div>
      <Carousel class="carousel" :wrap-around="true" :autoplay="6000" :transition="600" :pauseAutoplayOnHover="true">
        <!-- <Slide v-for="slide in 10" :key="slide">
          <div class="carousel__item">{{ slide }}</div>
        </Slide> -->
        <Slide :key="0"><div class="carousel__item">Hello</div></Slide>
        <Slide :key="1"><div class="carousel__item">Bye</div></Slide>
        <Slide :key="2"><div class="carousel__item">Senor</div></Slide>
        <Slide :key="3"><div class="carousel__item">Faster</div></Slide>
        <Slide :key="4"><div class="carousel__item">Ibraheem</div></Slide>

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

.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: blue;
  color:  red;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid green;
}

</style>
