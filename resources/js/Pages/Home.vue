<template>
  <Carousel>
    <Slide>
      <div class="carousel__item">1</div>
    </Slide>
    <Slide>
      <div class="carousel__item">2</div>
    </Slide>
    <Slide>
      <div class="carousel__item">3</div>
    </Slide>
    <Slide>
      <div class="carousel__item">4</div>
    </Slide>
    <Slide>
      <div class="carousel__item">5</div>
    </Slide>
    <Slide>
      <div class="carousel__item">6</div>
    </Slide>
    <Slide>
      <div class="carousel__item">7</div>
    </Slide>
    <Slide>
      <div class="carousel__item">8</div>
    </Slide>
    <Slide>
      <div class="carousel__item">9</div>
    </Slide>
    <Slide>
      <div class="carousel__item">10</div>
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Navigation, Pagination, Slide } from 'vue3-carousel';

import 'vue3-carousel/dist/carousel.css';

export default defineComponent({
  name: 'Basic',
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
});
</script>

<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: var(--carousel-color-primary);
  color:  var(--carousel-color-white);
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
  border: 5px solid white;
}
</style>