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

</style>