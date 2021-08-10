<template>
  <!-- <div v-if="!isDark"> -->
  <div>
    <div v-if="!isDark">
      <nav class="navbar bg-light navbar-light navbar-expand-xl">
        <router-link to="/" class="navbar-brand">
          <img src="../../img/logo/brandlight.png" alt="Mocs-IDE" title="Logo" />
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
              <router-link
                v-if="isLoggedIn"
                @click="update"
                to="/courses"
                class="nav-link"
                >Courses</router-link
              > 
              <router-link v-if="!isLoggedIn" @click="update" to="/login" class="nav-link"
                >Login</router-link
              >
              <router-link
                v-if="!isLoggedIn"
                @click="update"
                to="/register"
                class="nav-link"
                >Sign Up</router-link
              > 
              <router-link v-if="isLoggedIn" @click="update" to="/about" class="move-up"
                ><img class="pfp" id="lnavpfp" src="../../img/DefaultPFP.png" alt="Profile"
              /></router-link>
              <a @click="logout" v-if="isLoggedIn" class="nav-link">Logout</a>
            </div>
          </div>
        </div>
      </nav>

      <div class="navbar-spacer"></div>
    </div>

    <!-- DARK NAVBAR -->
    <div v-if="isDark">
      <nav class="dark-navbar navbar navbar-expand-xl">
        <router-link to="/" class="navbar-brand">
          <img src="../../img/logo/branddark.png" alt="Mocs-IDE" title="Logo" />
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
              <router-link @click="update" to="/" class="dark-nav-link nav-link"
                >Home</router-link
              >
              <router-link
                v-if="isLoggedIn"
                @click="update"
                to="/courses"
                class="dark-nav-link nav-link"
                >Courses</router-link
              >
              <router-link
                v-if="!isLoggedIn"
                @click="update"
                to="/login"
                class="dark-nav-link nav-link"
                >Login</router-link
              >
              <router-link
                v-if="!isLoggedIn"
                @click="update"
                to="/register"
                class="dark-nav-link nav-link"
                >Sign Up</router-link
              >
              <router-link
                v-if="isLoggedIn"
                @click="update"
                to="/about"
                class="dark-move-up"
                ><img class="pfp" id="navpfp" src="../../img/DefaultPFP.png" alt="Profile"
              /></router-link>
              <a @click="logout" v-if="isLoggedIn" class="dark-nav-link nav-link"
                >Logout</a
              >
            </div>
          </div>
        </div>
      </nav>

      <div class="navbar-spacer"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["authUser"],
  data() {
    return {
      isDark: false,
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
    updatePFP() {
      if(this.authUser != null) {
        var user_pfp = this.authUser.pfp_path;
        if(user_pfp == undefined || user_pfp == null) {
          user_pfp = "images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69=";
        }
        document.getElementById("navpfp").src = user_pfp;
      }
    },
  },
  mounted() {
    this.updatePFP();
  },
  computed: {
    isLoggedIn: function () {
      this.updatePFP();
      if (this.authUser == null) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    $route(to) {
      if (to.fullPath != "/") {
        this.isDark = true;
      } else {
        this.isDark = false;
      }
      this.$emit("forceReload");
    },
  },
};
</script>

<style></style>
