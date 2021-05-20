<template>
  <div>
    <nav class="navbar bg-light navbar-light navbar-expand-xl">
      <a href="index.php" class="navbar-brand"
        ><img src="img/logo/brandlight.png" alt="Mocs-IDE" title="Logo"
      /></a>

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
            <router-link
              v-for="item in list"
              :key="item.title"
              :to="item.to"
              class="nav-link"
              >{{ item.title }}</router-link
            >
            <!-- <a class="nav-link" @click="toggleLoginModal" href="">Login</a> -->
            <a class="nav-link" href="#">Sign Up</a>
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
      ],
      // isLoginOpen: false,
    };
  },
  // methods: {
  //   toggleLoginModal() {
  //     this.$emit("open-login");
  //   }
  // },
};
</script>

<style></style>
