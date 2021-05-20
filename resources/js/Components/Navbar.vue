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
        { title: "Login", to: "/" },
        { title: "Sign Up", to: "/" },
      ],
    };
  },
};
</script>

<style></style>
