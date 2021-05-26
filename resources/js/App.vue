<template>
  <div class="app">
    <Navbar :authUser="authUser2" />
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
      this.authUser = null;
    } else {
      this.authUser = await this.$store.dispatch("auth/getAuthUser");
    }
  },
  computed: {
    authUser2: async function() {
      var flag = store.getters["auth/guest"];
      if(flag || flag == null) {
        // this.authUser = null;
        console.log("authUser null");
      }
      else {
        // this.authUser = await this.$store.dispatch("auth/getAuthUser");
        console.log("authUser set to User");
      }
      return null;
    }  
  }
};
</script>

<style>
</style>
