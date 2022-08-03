<template>
  <div class="app">
    <!-- <div @click="key = !key">
      <Navbar :authUser="authUser" :key="key" @forceReload="reload" />
    </div> -->
    <Navbar :authUser="authUser" :key="forceReload" @forceReload="reload" />
    <router-view></router-view>
    <notifications position="bottom left"/>
  </div>
</template>

<script>
import Navbar from "./Components/Navbar";
import store from "./Store/index";

export default {
  components: { Navbar },
  data() {
    return {
      forceReload: 0,
    };
  },
  methods: {
    async getAuthUser() {
      return await this.$store.dispatch("auth/getAuthUser");
    },
    reload() {
      this.forceReload++;
    }
  },
  async mounted() {
    await this.$store.dispatch("auth/getAuthUser");
  },
  computed: {
    authUser: function () {
      var flag = store.getters["auth/isGuest"];
      if (flag || flag == null) {
        return null;
      } else {
        return this.getAuthUser();
      }
    },
  },
};
</script>

<style></style>
