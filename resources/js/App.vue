<template>
  <div class="app">
    <Navbar :authUser="authUser" />
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
  methods: {
    async getAuthUser() {
      return await this.$store.dispatch("auth/getAuthUser");
    },
  },
  mounted: {
    initCheck() {
      this.authUser = await this.$store.dispatch("auth/getAuthUser");
    },
  },
  computed: {
    authUser: function() {
      var flag = store.getters["auth/isGuest"];
      var flag2 = store.getters["auth/guest"];
      console.log("flag(auth/iGuest): " + flag);
      console.log("flag2(auth/guest): " + flag2);
      if(flag || flag == null) {
        // this.authUser = null;
        console.log("authUser null");
        return null;
      }
      else {
        console.log("authUser set to User");
        return this.getAuthUser();
      }
    }  
  }
};
</script>

<style>
</style>
