<template>
  {{ token }}
</template>

<script>
export default {
	data() {
    return {
      token: null,
    };
  },
  mounted() {
	  this.token = this.$route.query.token;
  }
}
</script>

<style>

</style>