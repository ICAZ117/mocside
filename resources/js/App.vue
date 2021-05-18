<template>
  <div class="app">
      <Header />
      <router-view></router-view>
  </div>
</template>

<script>
import Header from "./Components/Header";

export default {
    components: { Header }
}
</script>

<style>
  @font-face {
    font-family: "Montserrat";
    src: local('Montserrat'), url('../assets/fonts/Montserrat/Montserrat-Black.ttf') format('truetype'),
  }
</style>