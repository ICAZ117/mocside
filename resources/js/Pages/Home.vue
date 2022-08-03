<template>
  <div>
      <Carousel class="carousel" :wrap-around="true" :autoplay="6000" :transition="600" :pauseAutoplayOnHover="true">
        <Slide :key="0">
          <div class="carousel__item">
            <img src="../../img/carousel/1.jpg" alt="Image carousel" class="w-100" />

            <div class="carousel-caption">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-8 bg-custom d-none d-md-block py-3 px-0">
                    <h1>Mocs-IDE</h1>

                    <div class="border-top border-danger w-50 mx-auto my-3"></div>

                    <h4>A modern, freeee to use online IDE for virtual classrooms</h4>

                    <router-link to="/login" class="btn btn-danger btn-lg mr-2">Login</router-link>

                    <router-link to="/register" class="btn btn-danger btn-lg ml-2">Sign Up</router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        <Slide :key="1">
          <div class="carousel__item">
            <img src="../../img/carousel/2.jpg" alt="Image carousel" class="w-100" />

            <div class="carousel-caption">
              <div class="container">
                <div class="row justify-content-end text-right">
                  <div class="col-5 bg-custom d-none d-lg-block py-3 px-0 pr-3">
                    <p class="pb-3">
                      Developed by students from Florida Southern College's CS department
                    </p>

                    <a href="#" class="btn btn-danger btn-lg">Button</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        <Slide :key="2">
          <div class="carousel__item">
            <img src="../../img/carousel/3.jpg" alt="Image carousel" class="w-100" />

            <div class="carousel-caption">
              <div class="container">
                <div class="row justify-content-start text-left">
                  <div class="col-7 bg-custom d-none d-lg-block py-3 px-0 pl-3">
                    <p class="lead">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, nulla?
                    </p>

                    <a href="#" class="btn btn-primary btn-lg">Button</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
export default {
  components: {Carousel, Slide, Pagination, Navigation },
  data() {
    return {

    }
  },
  methods: {
    setUpButtons() {
      let buttonsNext = document.getElementsByClassName('carousel__next');
      if(buttonsNext.length > 0) {
        buttonsNext.item(0).click();
      }
    },
  },
  mounted() {
    this.setUpButtons();
  },
}
</script>

<style>

</style>