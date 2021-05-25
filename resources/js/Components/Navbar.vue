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
            <button @click="logout" v-if="isLoggedIn" class="link-btn nav-link" >Logout</button>
            <router-link v-if="isLoggedIn" to="/about" class="nav-link"><img class="pfp" src="../../img/DefaultPFP.png" alt="Profile"></router-link>
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
    logout() {
      console.log("attempting log out");
    }
  },
  computed: {
    isLoggedIn: async function() {


      //this will be changed to the above function once its working
      return false;
    }
  },
};
</script>

<style></style>
