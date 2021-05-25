<template>
  <div class="app">
    <Navbar />
    <router-view></router-view>
  </div>
  <p>{{ authUser }}</p>
</template>

<script>
import Navbar from "./Components/Navbar";


export default {
  components: { Navbar },
  async data() {
    return {
      authUser: await this.$store.dispatch("auth/getAuthUser"),
    }
  },
  methods: {
  },
};
</script>

<style>

</style>
