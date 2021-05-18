<template>
  <div class="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./Components/Header";

export default {
  components: { Header },
};
</script>

<style>
@font-face {
  font-family: "Montserrat";
  src: local("Montserrat"),
    url("../assets/fonts/Montserrat/Montserrat-Black.ttf") format("truetype"),
    url("../assets/fonts/Montserrat/Montserrat-Blackitalic.ttf") format("truetype"),
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
}
</style>
