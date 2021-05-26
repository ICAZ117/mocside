<template>
  <div class="app">
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./Components/Navbar";
import store from "./Store/index";

export default {
  components: { Navbar },
  data() {
    return {
      authUser: null,
    };
  },
  async mounted() {
    var flag = store.getters["auth/guest"];

    if (flag || flag == null) {
      authUser = null;
    } else {
      authUser = await this.$store.dispatch("auth/getAuthUser");
    }
  },
  computed: {
    authUser: async function () {
      var flag = store.getters["auth/guest"];
      if (flag || flag == null) {
        return null;
      }
      else {
        return await this.$store.dispatch("auth/getAuthUser");
      }
    },
  },
};
</script>

<style>
</style>
