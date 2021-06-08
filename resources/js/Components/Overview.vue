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
    const state = reactive({ content: "" });

    return { state };
  },
  data() {
    return {
      description: "",
      assignmentID: this.problemID,
      timeout: console.log("empty"),
    };
  },
  methods: {
    async save() {
      var timeout = _.debounce(async function(assignmentID) {
        //save overview to problem in database
        var payload = {
          "description": this.text,
        }
        console.log(assignmentID);
        const res = await API.apiClient.put(`/problems/${assignmentID}`, payload);
      }, 3000);
      timeout(this.assignmentID);
    },
  },
  computed: {
    text: function() {

      //choice 1
      this.timeout();
      // this.save();


      //choice 2
      //send data to parent and let parent send upon clicking save button
      // this.$emit("update", this.state.content);

      return this.state.content;
    }
  },
  mounted() {
    timeout = _.debounce(this.save(), 3000);
    this.state.content = this.overview;
  }
};
</script>

<style></style>
