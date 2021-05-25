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
            <router-link :key="Home" :to="/" class="nav-link">Home</router-link>
            <router-link v-if="isLoggedIn" :key="Courses" :to="/courses" class="nav-link">Courses</router-link>
            <router-link v-if="!isLoggedIn" :key="Login" :to="/login" class="nav-link">Login</router-link>
            <router-link v-if="!isLoggedIn" :key="Sign/ Up" :to="/register" class="nav-link">Sign Up</router-link>
            <a v-if="isLoggedIn" class="nav-link" href="">Logout</a>
            <router-link v-if="isLoggedIn" :key="Profile" :to="item.to" class="nav-link"><img class="pfp" src="img/DefaultPFP.png" alt="Profile"></router-link>
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
      list: [
        { title: "Home", to: "/" },
        { title: "Courses", to: "/courses" },
        { title: "Login", to: "/login" },
        { title: "Sign Up", to: "/register" },
      ],
    };
  },
  computed: {
    isLoggedIn: function() {
      return true;
    }
  },
};
</script>

<style></style>
