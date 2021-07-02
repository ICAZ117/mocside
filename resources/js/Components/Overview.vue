<template>
  <div class="create-assignment">
    <div class="container">
      <h4>Description:</h4>
      <Tiptap :savedText="JSON.parse(overview)" @input="save" :showMenuBar="true" :isDark="false" />
      <hr />
      <h5>Proceed with caution!</h5>
      <button class="btn btn-danger btn-lg" @click="deleteProblem()">DELETE ASSIGNMENT</button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import * as API from "../services/API";

export default {
  emits: ["delete-problem"],
  props: {
    overview: {
      type: Object,
      required: true,
    },
    problemID: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
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
    async deleteProblem() {
      var flag = confirm("Are you Sure you want to delete this problem");
      if(flag) {
        await this.$emit("delete-problem");
      }
    },
  },
  beforeMount() {
  },
  beforeUnmount() {
    console.log("overview unmount");
  },
  mounted() {
  },
};
</script>

<style></style>
