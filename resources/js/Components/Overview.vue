<template>
  <div class="create-assignment">
    <div class="container">
      <h4>Description:</h4>
      <Tiptap :savedText="savedText" @input="save" />
      <hr />
      <h5>Proceed with caution!</h5>
      <button class="btn btn-danger btn-lg">DELETE ASSIGNMENT</button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import * as API from "../services/API";

export default {
  props: {
    overview: String,
    problemID: Number,
  },
  data() {
    return {
      savedText: this.overview,
      assignmentID: this.problemID,
      newText: {},
    };
  },
  methods: {
    timeout: _.debounce(async function (assignmentID) {
      var payload = {
        description: this.newText,
      };
      const res = await API.apiClient.put(`/problems/${assignmentID}`, payload);
    }, 3000),
    save(e) {
      this.newText = e;
      this.timeout(this.assignmentID);
    },
  },
};
</script>

<style></style>
