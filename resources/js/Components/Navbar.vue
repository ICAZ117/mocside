<template>
  <div>
    <div v-show="!isDark">
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
                v-show="isLoggedIn"
                @click="update"
                to="/courses"
                class="nav-link"
                >Courses</router-link
              > 
              <router-link v-show="!isLoggedIn" @click="update" to="/login" class="nav-link"
                >Login</router-link
              >
              <router-link
                v-show="!isLoggedIn"
                @click="update"
                to="/register"
                class="nav-link"
                >Sign Up</router-link
              > 
              <router-link v-show="isLoggedIn" @click="update" to="/profile" class="move-up"
                ><img class="pfp" id="l_navpfp" src="" alt="Profile"
              /></router-link>
              <a @click="logout" v-show="isLoggedIn" class="nav-link">Logout</a>
            </div>
          </div>
        </div>
      </nav>

      <div class="navbar-spacer"></div>
    </div>

    <!-- DARK NAVBAR -->
    <div v-show="isDark">
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
                v-show="isLoggedIn"
                @click="update"
                to="/courses"
                class="dark-nav-link nav-link"
                >Courses</router-link
              >
              <router-link
                v-show="!isLoggedIn"
                @click="update"
                to="/login"
                class="dark-nav-link nav-link"
                >Login</router-link
              >
              <router-link
                v-show="!isLoggedIn"
                @click="update"
                to="/register"
                class="dark-nav-link nav-link"
                >Sign Up</router-link
              >
              <router-link
                v-show="isLoggedIn"
                @click="update"
                to="/profile"
                class="dark-move-up"
                ><img class="pfp" id="d_navpfp" src="" alt="Profile"
              /></router-link>
              <a @click="logout" v-show="isLoggedIn" class="dark-nav-link nav-link"
                >Logout</a
              >
            </div>
          </div>
        </div>
      </nav>

      <div class="navbar-spacer"></div>
    </div>
  </div>
  <img id="l_navpfp" src="" alt="" style="display: none;">
  <img id="d_navpfp" src="" alt="" style="display: none;">
</template>

<script>
export default {
  props: ["authUser"],
  emits: ["forceReload"],
  data() {
    return {
      isDark: false,
      pfp: "../../images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69=",
    };
  },
  methods: {
    async logout() {
      await this.$router.push({name: "Home"}).then(() => {
        this.$store.dispatch("auth/logout");
      });
      // await this.$store.dispatch("auth/logout").then(() => {
      //   this.$router.push({name: "Home"});
      // });
    },
    update() {
      this.$forceUpdate();
    },
    async updatePFP() {
      var au = await this.$store.dispatch("auth/getAuthUser");
      // this.authUser = au;
      if(this.authUser != null) {
        this.pfp = au.pfp_path;
        if(this.pfp == undefined || this.pfp == null || this.pfp == "") {
          this.pfp = "../../images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69=";
        }
        document.getElementById("d_navpfp").src = this.pfp;
        document.getElementById("l_navpfp").src = this.pfp;
      }
    },
  },
  mounted() {
    this.updatePFP();
  },
  unmounted() {
  },
  computed: {
    isLoggedIn: function () {
      if (this.authUser == null) {
        return false;
      } else {
        this.updatePFP();
        return true;
      }
    },
  },
  watch: {
    $route(to) {
      if (to.fullPath == "/") {
        this.isDark = false;
      } else {
        this.isDark = true;
      }
      this.updatePFP();
    },
  },
};
</script>

<style></style>
