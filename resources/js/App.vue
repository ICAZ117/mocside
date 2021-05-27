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

    };
  },
  methods: {
    async getAuthUser() {
      return await this.$store.dispatch("auth/getAuthUser");
    },
  },
  async mounted() {
    await this.$store.dispatch("auth/getAuthUser");
  },
  computed: {
    authUser: function() {
      var flag = store.getters["auth/isGuest"];
      if(flag || flag == null) {
        return null;
      }
      else {
        return this.getAuthUser();
      }
    }  
  }
};
</script>

<style>
</style>
