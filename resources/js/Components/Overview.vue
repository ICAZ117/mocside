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

import _ from "lodash";

export default {
  props: ["overview", "problemID"],
  setup() {
    const state = reactive({ content: "" });

    return { state };
  },
  data() {
    return {
      description: "",
    };
  },
  methods: {
    async save() {
      var payload = {
        "description": this.text,
      }
      const res = await API.apiClient.put(`/problems/${this.problemID}`, payload);
    },
  },
  computed: {
    text: function() {

      //choice 1
      var timeout = _.debounce(function() {
        //save overview to problem in database
        save();
      }, 3000);
      timeout();


      //choice 2
      //send data to parent and let parent send upon clicking save button
      // this.$emit("update", this.state.content);

      return this.state.content;
    }
  },
  mounted() {
    this.state.content = this.overview;
  }
};
</script>

<style></style>
