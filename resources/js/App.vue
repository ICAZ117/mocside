<template>
  <div class="app">
    <Navbar @open-login="toggleLogin"/>
    <router-view ></router-view>
    <!-- name="home" :isLoginOpen="isLoginOpen" -->
  </div>
</template>

<script>
import Navbar from "./Components/Navbar";


export default {
  components: { Navbar },
  data() {
    return {
      isLoginOpen: false,
    }
  },
  methods: {
    toggleLogin() {
      this.isLoginOpen = !this.isLoginOpen;
    }
  },
};
</script>

<style>
/* @font-face {
  font-family: "Montserrat";
  src: local("Montserrat"),
    url("../assets/fonts/Montserrat/Montserrat-Black.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-BlackItalic.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-Bold.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-BoldItalic.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-ExtraBold.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-ExtraBoldItalic.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-ExtraLight.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-ExtraLightItalic.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-Italic.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-Light.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-LightItalic.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-Medium.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-MediumItalic.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-Regular.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-SemiBold.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-SemiBoldItalic.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-Thin.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-ThinItalic.ttf") format("truetype");
} */
</style>
