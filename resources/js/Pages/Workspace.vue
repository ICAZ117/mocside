<template>
  WorkSpace
  {{ this.problemID}}
</template>

<script>
import * as API from "../services/API";
export default {
  props: ["problemID"],
  emits: ["assignment-unmounting"],
  data() {
    return {
      assignment: {},
    };
  },
  methods: {
    async getAssignment() {
      //this route needs to be worked on and adjusted
      const rawAssignment = await API.apiClient.get(`/problems/${this.labID}`);
      this.assignment = rawAssignment.data;
    },

  },
  mounted() {
    // this.getAssignment();
    console.log("getAssignment");
  },
  beforeUnmount() {
    this.$emit("assignment-unmounting");
  },
}
</script>