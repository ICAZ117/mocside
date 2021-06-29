<template>
  <div :class="bg">
    <div class="accordion" @click="toggleItem">
      <h2 class="title">
        <slot name="title"></slot>
      </h2>
    </div>
    <div v-show="show" class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ["isSuccessful"],
  data: function () {
    return {
      show: false,
      bg: "wrapper",
    };
  },
  watch: {
    isSuccessful: function () {
      console.log("here");
      bg +=
        this.isSuccessful == true
          ? " success"
          : this.isSuccessful == false
          ? " failed"
          : "";
    },
  },
  methods: {
    toggleItem: function () {
      this.show = !this.show;
    },
  },
};
</script>
<style scoped>
.wrapper {
  padding: 10px;
}
.accordion {
  display: flex;
  cursor: pointer;

  margin: 0;
}
.title {
  margin: 0;
  color: grey;
}
.content {
  text-align: left;
  width: 100%;
  border-bottom: 1px solid grey;
  padding: 10px;
}
</style>
