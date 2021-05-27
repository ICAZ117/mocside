<template>
  <div class="app">
    <Navbar :authUser="test" />
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
      test = "true",
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
