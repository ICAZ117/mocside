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
  data() {
    return {
      authUser: await this.$store.dispatch("auth/getAuthUser"),
    }
  },
  computed: {
    authUser: async function() {
      return await this.$store.dispatch("auth/getAuthUser");
    },
  }
};
</script>

<style>

</style>
