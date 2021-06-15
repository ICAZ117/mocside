<template>
  <div class="create-assignment">
    <div class="container">
      <h4>Description:</h4>
      <Tiptap :savedText="JSON.parse(overview)" @input="save" />
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
    overview: {
      type: String,
      required: true,
    },
    problemID: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      savedText: JSON.parse(this.overview),
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
  beforeMount() {
    console.log("before");
    console.log(this.savedText);
  },
  mounted() {
    console.log("After");
    console.log(this.savedText);
  },
};
</script>

<style></style>
