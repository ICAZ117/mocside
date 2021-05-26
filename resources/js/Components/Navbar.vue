<template>
  <div>
    <nav class="navbar bg-light navbar-light navbar-expand-xl">
      <router-link to="/" class=navbar-brand>
        <img src="img/logo/brandlight.png" alt="Mocs-IDE" title="Logo"/>
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
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link v-if="isLoggedIn" to="/courses" class="nav-link">Courses</router-link>
            <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
            <router-link v-if="!isLoggedIn" to="/register" class="nav-link">Sign Up</router-link>
            <router-link v-if="isLoggedIn" to="/about" class="nav-link"><img class="pfp" src="../../img/DefaultPFP.png" alt="Profile"></router-link>
            <a @click="logout" v-if="isLoggedIn" class="link-btn nav-link" >Logout</a>
          </div>
        </div>
      </div>
    </nav>

    <div class="navbar-spacer"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    async logout() {
      console.log("attempting log out");
      await this.$store.dispatch("auth/logout");
      console.log("successful?");
    }
  },
  computed: {
    isLoggedIn: async function() {


      //this will be changed to check the store to see if a user is logged in
      return false;
    }
  },
};
</script>

<style></style>
