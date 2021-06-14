<template>
  <button
    class="menu-item"
    :class="{ 'is-active': isActive ? isActive() : null }"
    @click="action"
    :title="title"
    style="padding: 2px 4px 4px 3px !important"
  >
    <span
      v-if="!isText"
      style="margin: 2px 0 0 1px !important"
      :class="'fas fa-' + icon"
    ></span>
    <div v-if="isText">
      <h5 style="font-weight: 1000; margin: auto !important; font-family: monospace">
        {{ icon }}
      </h5>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    action: {
      type: Function,
      required: true,
    },

    isActive: {
      type: Function,
      default: null,
    },

    isText: {
      type: Boolean,
    },
  },
};
</script>

<style scoped>
.menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;
}
.menu-item svg {
  width: 100%;
  height: 100%;
  fill: currentColor;
}
.menu-item.is-active,
.menu-item:hover {
  color: #fff;
  background-color: #0d0d0d;
}
</style>
