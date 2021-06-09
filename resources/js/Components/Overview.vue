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
  props: ["overview", "problemID"],
  setup() {
    const state = reactive({
      // content: "{
      //   "ops": [
      //     {
      //       "insert": "Gandalf the Grey\n",
      //     },
      //   ],
      // }",
      content: JSON.parse(this.overview),
    });

    return { state };
  },
  data() {
    return {
      description: "",
      assignmentID: this.problemID,
    };
  },
  watch: {
    description: function (val) {
      this.timeout(this.assignmentID);
    },
  },
  methods: {
    timeout: _.debounce(async function (assignmentID) {
      var payload = {
        description: this.description,
      };
      const res = await API.apiClient.put(`/problems/${assignmentID}`, payload);
    }, 500),
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

  beforeMount() {
    console.log("\n\n\n\n------------------------ BEFORE MOUNT ------------------------");
    console.log(this.overview);
    console.log("\n\n\n\n");
  },
  mounted() {
    // console.log("\n\n----------------------- Before -----------------------");
    // console.log("this.overview");
    // console.log(this.overview);
    // console.log("json parse this.overview");
    // console.log(JSON.parse(this.overview));
    // console.log("\n\nthis.state.content");
    // console.log(this.state.content);

    this.state.content = JSON.parse(this.overview);

    // console.log("\n\n----------------------- After -----------------------");
    // console.log("this.overview");
    // console.log(this.overview);
    // console.log("json parse this.overview");
    // console.log(JSON.parse(this.overview));
    // console.log("\n\nthis.state.content");
    // console.log(this.state.content);
  },
};
</script>

<style></style>
