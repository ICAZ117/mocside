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
  async setup() {
    authUser = async function() {
      var flag = await this.$store.dispatch("auth/guest");
      console.log(flag);

      if(flag) {
        console.log("true user is a guest")
      }
      else {
        console.log("false user is not a guest, user is logged in?");
      }

      return null;
    };
  },
  async data() {
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
