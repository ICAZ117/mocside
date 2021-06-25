<template>
  <div>
    <Carousel
      class="carousel-inner"
      :itemsToShow="1"
      :snapAlign="center"
      :wrapAround="true"
    >
      <!-- Carousel Item 1 -->
      <Slide style="background-image: url('../../img/carousel/1.jpg')">
        <div class="carousel__item">
          <div class="carousel-caption">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-8 bg-custom d-none d-md-block py-3 px-0">
                  <h1>Mocs-IDE</h1>

                  <div class="border-top border-danger w-50 mx-auto my-3"></div>

                  <h4>A modern, free to use online IDE for virtual classrooms</h4>

                  <router-link to="/login" class="btn btn-danger btn-lg mr-2"
                    >Login</router-link
                  >

                  <router-link to="/register" class="btn btn-danger btn-lg ml-2"
                    >Sign Up</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <!-- Carousel Item 2
        <Slide style="background-image: url('../../img/carousel/2.jpg')">
          <div class="carousel__item">

            <div class="carousel-caption">
              <div class="container">
                <div class="row justify-content-end text-right">
                  <div class="col-5 bg-custom d-none d-lg-block py-3 px-0 pr-3">
                    <p class="pb-3">
                      Developed by students from Florida Southern College's CS department
                    </p>

                    <router-link to="/about" class="btn btn-danger btn-lg ml-2"
                      >About Us</router-link
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>

      Carousel Item 3
      <Slide style="background-image: url('../../img/carousel/3.jpg')">
        <div class="carousel__item">
          <div class="carousel-caption">
            <div class="container">
              <div class="row justify-content-start text-left">
                <div class="col-7 bg-custom d-none d-lg-block py-3 px-0 pl-3">
                  <p class="lead">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, nulla?
                  </p>

                  <a href="" class="btn btn-primary btn-lg">Button</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slide>
      -->

      <template #addons>
        <navigation />
        <pagination />
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
      <p><a href="" target="_blank">and here</a></p>
    </div>
    <!-- End Socket -->
  </div>
</template>

<script>
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";

export default {
  data() {
    return {};
  },
  components: {
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
};
</script>

<style>
.carousel__item {
  width: 100%;
  color: var(--carousel-color-white);
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
  margin: 0 20px;
  background-color: transparent!important;
}
</style>
