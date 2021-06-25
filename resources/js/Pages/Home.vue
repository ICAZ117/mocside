<template>
  <div>
    <!-- Image Carousel -->
    <div id="carousel" class="carousel slide" data-ride="carousel" data-interval="6500">
      <!-- Carousel Content -->
      <div class="carousel-inner h-100">
        <!-- Carousel Item 1 -->
        <div class="carousel-item active">
          <img src="../../img/carousel/1.jpg" alt="Image carousel" class="w-100" />

          <div class="carousel-caption">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-8 bg-custom d-none d-md-block py-3 px-0">
                  <h1>Mocs-IDE</h1>

                  <div class="border-top border-danger w-50 mx-auto my-3"></div>

                  <h4>A modern, free to use online IDE for virtual classrooms</h4>

                  <router-link to="/login" class="btn btn-danger btn-lg mr-2">Login</router-link>

                  <router-link to="/register" class="btn btn-danger btn-lg ml-2">Sign Up</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Item 2 -->
        <div class="carousel-item">
          <img src="../../img/carousel/2.jpg" alt="Image carousel" class="w-100" />

          <div class="carousel-caption">
            <div class="container">
              <div class="row justify-content-end text-right">
                <div class="col-5 bg-custom d-none d-lg-block py-3 px-0 pr-3">
                  <p class="pb-3">
                    Developed by students from Florida Southern College's CS department
                  </p>

                  <router-link to="/about" class="btn btn-danger btn-lg ml-2">About Us</router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Item 3 -->
        <div class="carousel-item">
          <img src="../../img/carousel/3.jpg" alt="Image carousel" class="w-100" />

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
      </div>
      <!-- End Carousel Content -->

      <!-- Previous & Next Buttons -->
      <!-- <a href="" class="carousel-control-prev" role="button" data-slide="prev">
        <span class="fas fa-chevron-left fa-2x"></span>
      </a>

      <a href="" class="carousel-control-next" role="button" data-slide="next">
        <span class="fas fa-chevron-right fa-2x"></span>
      </a> -->
      <!-- End Previous & Next Buttons -->
    </div>
    <!-- End Image Carousel -->
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


// import Modal from "../Components/Modal";
// import FormInput from "../Components/FormInput";
// import BaseBtn from "../Components/BaseBtn";
export default {
  // components: { Modal, FormInput, BaseBtn },
  data() {
    return {
      email: null,
      password: null,
      error: null,
    };
  },
};
</script>

<style></style>
