<template>
  <nav>
      <router-link v-for="item in list" :key="item.title" :to="item.to">{{ item.title }}</router-link>
  </nav>
</template>

<script>
export default {
    data() {
        return {
            list: [
                { title: "Login", to: "/login" }
            ],
        };
    },
};
</script>

<style>

</style>