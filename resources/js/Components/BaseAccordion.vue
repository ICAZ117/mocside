<template>
  <div :class="bg">
    <div class="accordion" @click="toggleItem">
      <div class="icon">
        <div v-show="!show">
          <div class="fas fa-chevron-right"></div>
        </div>
        <div v-show="show">
          <div class="fas fa-chevron-down"></div>
        </div>
      </div>
      <h6 class="title">
        <slot name="title"></slot>
      </h6>
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
      // tc running
      if (this.isSuccessful === "running") {
        // Grey bg
        this.bg = "wrapper";
      }
      // tc passed
      else if (this.isSuccessful === true) {
        // Green bg
        this.bg = "wrapper success";
      }
      // tc failed
      else if (this.isSuccessful === false) {
        // Red bg
        this.bg = "wrapper failed";
      }
    },
  },
  methods: {
    toggleItem: function () {
      this.show = !this.show;
    },
  },
  mounted() {
    if (this.isSuccessful === true) {
      this.bg += " success";
    } else if (this.isSuccessful === false) {
      this.bg += " failed";
    } else {
      // Do nothing
      this.bg += "";
    }
  },
};
</script>
<style scoped>
.wrapper {
  padding: 10px;
  margin: 20px 0px !important;
  background-color: #efefef;
}
.accordion {
  display: flex;
  cursor: pointer;

  margin: 0;
}
.title {
  margin: 0;
  width: 100%;
  padding: 0 0 0 5px !important;
}
.icon {
  margin: 0;
  padding-top: 2px;
}
.content {
  text-align: left;
  width: 100%;
  border-bottom: 1px solid grey;
  padding: 10px;
  word-break: break-word;
}
</style>
