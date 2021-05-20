<template>
  <div @click="handleClose" class="modal-section"></div>
  <!-- <div class="absolute inset-0"> -->
  <div class="modal-wrapper-1">
    <div class="modal-wrapper-2">
      <div class="modal-wrapper-3">
        <div class="modal-wrapper-4">
          <h3>
            <slot name="title"></slot>
          </h3>
          <main>
            <slot name="body"></slot>
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(_, { emit }) {
    function close() {
      emit("close");
    }
    return { close };
  },
  methods: {
    handleClose() {
      this.$emit("close");
    }
  },
};
</script>

<style></style>
