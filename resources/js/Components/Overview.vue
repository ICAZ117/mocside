<template>
  <div class="create-assignment">
    <div class="container">
      <h4>Description:</h4>
      <QuillEditor
        theme="snow"
        toolbar="full"
        class="assignment-description"
        v-model:content="state.content"
      />
      <hr />
      <h5>Proceed with caution!</h5>
      <button class="btn btn-danger btn-lg">DELETE ASSIGNMENT</button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

export default {
  props: ["overview"],
  setup() {
    const state = reactive({ content: "" });

    return { state };
  },
  data() {
    return {
      description: "",
    };
  },
  computed: {
    description: {
      get() {
        return this.overview;
      },
      set(v) {
        this.$emit("update", v);
      },
    },
    text: function() {
      console.log("change in state text?");
      return state.content;
    }
  }
};
</script>

<style></style>
