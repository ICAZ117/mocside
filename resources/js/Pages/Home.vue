<template>
  <body>
    <!-- Image Carousel -->
    <div
      id="carousel"
      class="carousel slide"
      data-ride="carousel"
      data-interval="6500"
    >
      <!-- Carousel Content -->
      <div class="carousel-inner h-100">
        <!-- Carousel Item 1 -->
        <div class="carousel-item active">
          <img
            src="../../img/carousel/1.jpg"
            alt="Image carousel"
            class="w-100"
          />

          <div class="carousel-caption">
            <div class="container">
              <div class="row justify-content-center">
                <div class="col-8 bg-custom d-none d-md-block py-3 px-0">
                  <h1>Mocs-IDE</h1>

                  <div class="border-top border-danger w-50 mx-auto my-3"></div>

                  <h4>
                    A modern, free to use online IDE for virtual classrooms
                  </h4>

                  <a href="login.php" class="btn btn-danger btn-lg mr-2"
                    >Login</a
                  >

                  <a href="#" class="btn btn-danger btn-lg ml-2">Sign Up</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Item 2 -->
        <div class="carousel-item">
          <img
            src="../../img/carousel/2.jpg"
            alt="Image carousel"
            class="w-100"
          />

          <div class="carousel-caption">
            <div class="container">
              <div class="row justify-content-end text-right">
                <div class="col-5 bg-custom d-none d-lg-block py-3 px-0 pr-3">
                  <p class="pb-3">
                    Developed by students from Florida Southern College's CS
                    department
                  </p>

                  <a href="#" class="btn btn-danger btn-lg">Button</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Item 3 -->
        <div class="carousel-item">
          <img
            src="../../img/carousel/3.jpg"
            alt="Image carousel"
            class="w-100"
          />

          <div class="carousel-caption">
            <div class="container">
              <div class="row justify-content-start text-left">
                <div class="col-7 bg-custom d-none d-lg-block py-3 px-0 pl-3">
                  <p class="lead">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Odit, nulla?
                  </p>

                  <a href="#" class="btn btn-primary btn-lg">Button</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Carousel Content -->

      <!-- Previous & Next Buttons -->
      <a
        href="#carousel"
        class="carousel-control-prev"
        role="button"
        data-slide="prev"
      >
        <span class="fas fa-chevron-left fa-2x"></span>
      </a>

      <a
        href="#carousel"
        class="carousel-control-next"
        role="button"
        data-slide="next"
      >
        <span class="fas fa-chevron-right fa-2x"></span>
      </a>
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
      <p><a href="#" target="_blank">and here</a></p>
    </div>
    <!-- End Socket -->
  </body>
  <Modal>
    <template v-slot:title> Login </template>
    <template v-slot:body>
      <!-- Login Form -->
      <div class="login">
        <form @submit.prevent="login">
          <!-- change from email to username later -->
          <FormInput
            type="email"
            label="Email"
            name="email"
            v-model="email"
            autocomplete="email"
            placeholder="Luke@jedi.com"
            class="mb-2"
          />
          <FormInput
            type="password"
            label="Password"
            name="password"
            v-model="password"
            class="mb-4"
          />
          <div class="flex justify-between">
            <BaseBtn type="submit" text="Login" />
            <!-- <router-link to="/forgot-password" class="text-sm base-link">
              Forgot your password?
            </router-link> -->
          </div>
        </form>
      </div>

      <!-- <div class="login">
        <form action="" class="needs-validation" novalidate>
            <div class="form-group">
                <label for="uname">Username:</label>
                <input type="text" class="form-control" id="uname" placeholder="Enter username" name="uname" required>
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">Please enter your username</div>
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" required>
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">Please enter your password</div>
            </div>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" name="remember">Remember Me
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Check this checkbox to continue.</div>
                </label>
            </div>
            <button type="submit" class="btn btn-danger">Log In</button>
        </form>
        </div> -->
        <script>
            methods: {
                async login() {
                    console.log("log in");
                }
            }
        </script>
    </template>
  </Modal>
</template>

<script>
import Modal from "../Components/Modal";
import FormInput from "../Components/FormInput";
import BaseBtn from "../Components/BaseBtn";
export default {
    components: { Modal, FormInput, BaseBtn },
};
</script>

<style>
</style>