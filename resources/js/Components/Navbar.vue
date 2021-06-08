<template>
  <div>
    <nav class="navbar bg-light navbar-light navbar-expand-xl">
      <router-link to="/" class="navbar-brand">
        <img src="../../img/logo/brandlight.png" alt="Mocs-IDE" title="Logo"/>
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse nav-items" id="navbarResponsive">
        <div class="navbar-nav">
          <div class="nav-item">
            <router-link @click="update" to="/" class="nav-link">Home</router-link>
            <router-link v-if="isLoggedIn" @click="update" to="/courses" class="nav-link">Courses</router-link>
            <router-link v-if="!isLoggedIn" @click="update" to="/login" class="nav-link">Login</router-link>
            <router-link v-if="!isLoggedIn" @click="update" to="/register" class="nav-link">Sign Up</router-link>
            <router-link v-if="isLoggedIn" @click="update" to="/about" class="move-up"><img class="pfp" src="../../img/DefaultPFP.png" alt="Profile"></router-link>
            <a @click="logout" v-if="isLoggedIn" class="nav-link" >Logout</a>
          </div>
        </div>
      </div>
    </nav>

    <div class="navbar-spacer"></div>
  </div>
</template>

<script>
export default {
  props: ['authUser'],
  data() {
    return {
      dark: "",
    };
  },
  methods: {
    async logout() {
      this.$forceUpdate();
      await this.$store.dispatch("auth/logout");
    },
    update() {
      this.$forceUpdate();
    },
  },
  computed: {
    isLoggedIn: function() {
      if (this.authUser == null) {
        return false;
      }
      else {
        return true;
      }
    }
  },
  mounted() {
    console.log(window.location.pathname);
  },
};
</script>

<style></style>
