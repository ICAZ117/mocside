<template>
  <div>
    <nav :class="dark + 'navbar bg-light navbar-light navbar-expand-xl'">
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
            <router-link to="/" :class="dark + 'nav-link'">Home</router-link>
            <router-link v-if="isLoggedIn" to="/courses" :class="dark + 'nav-link'">Courses</router-link>
            <router-link v-if="!isLoggedIn" to="/login" :class="dark + 'nav-link'">Login</router-link>
            <router-link v-if="!isLoggedIn" to="/register" :class="dark + 'nav-link'">Sign Up</router-link>
            <router-link v-if="isLoggedIn" to="/about" :class="dark + 'move-up'"><img class="pfp" src="../../img/DefaultPFP.png" alt="Profile"></router-link>
            <a @click="logout" v-if="isLoggedIn" :class="dark + 'nav-link'" >Logout</a>
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
      dark: navbarColor,
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch("auth/logout");
    }
  },
  computed: {
    isLoggedIn: function() {
      if (this.authUser == null) {
        return false;
      }
      else {
        return true;
      }
    },
    navbarColor: function() {
      console.log("HERE");
      console.log(this.$route.path);
      console.log("\n\n");
      if (this.$route.path !== "/") {
        console.log("DARK");
        this.dark = "dark-";
      }
      else {
        console.log("LIGHT");
        this.dark = "";
      }

      return this.dark;
    }
  },
  mounted() {
    // console.log("beforeCall");
    // this.navbarColor();
    // console.log("afterCall");
  },
};
</script>

<style></style>
