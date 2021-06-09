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
import * as API from "../services/API";

export default {
  props: ['overview', "problemID"],
  setup() {
    const state = reactive({ content: "aestjasertjsztrejgzsrdej" });

    return { state };
  },
  data() {
    return {
      description: "",
      assignmentID: this.problemID,
    };
  },
  watch: {
    description: function(val) {
      this.timeout(this.assignmentID);
    }
  },
  methods: {
    timeout: _.debounce(async function(assignmentID) {
      var payload = {
        "description": this.text,
      }
      const res = await API.apiClient.put(`/problems/${assignmentID}`, payload);
    }, 500),
  },
  computed: {
    text() {
      this.description = this.state.content;
      return this.state.content;
    }
  },
  mounted() {
    this.state.content = this.overview;
  }
};
</script>

<style></style>
