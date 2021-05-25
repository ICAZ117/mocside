<template>
  <div class="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./Components/Navbar";


export default {
  components: { Navbar },
  data() {
    return {
    }
  },
  methods: {
  },
};
</script>

<style>

</style>
