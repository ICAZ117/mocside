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
  props: {
    overview: String, 
    problemID: Number,
  },
  setup(props) {
    const state = reactive({
      // content: "{
      //   "ops": [
      //     {
      //       "insert": "Gandalf the Grey\n",
      //     },
      //   ],
      // }",
      content: JSON.parse(props.overview),
    });
    console.log("overview" + this.overview);
    console.log(this.overview);
    console.log("parse" + JSON.parse(props.overview));
    console.log(JSON.parse(props.overview));
    return { state };
  },
  data() {
    return {
      description: this.overview,
      assignmentID: this.problemID,
    };
  },
  watch: {
    description: function (val) {
      this.timeout(this.assignmentID);
    },
    state: function(val) {
      this.description = this.state.content;
    }
  },
  methods: {
    timeout: _.debounce(async function (assignmentID) {
      var payload = {
        description: this.description,
      };
      const res = await API.apiClient.put(`/problems/${assignmentID}`, payload);
    }, 3000),
  },
  computed: {
    text() {
      this.description = this.state.content;
      return this.state.content;
    },
    propChange() {
      return this.overview;
    }
  },
};
</script>

<style></style>
