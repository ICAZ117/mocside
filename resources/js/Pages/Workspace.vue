<template>
  <!-- Main Page-->
  <div class="row">
    <div class="instructions col-4 p-4">
      <h4>{{ workspace.title }}</h4>
      <hr class="instructions-hr" />
      <p>
        {{ workspace.description }}
      </p>
    </div>

    <IDE class="col-8" :lang="lang" :showSubmit="true" v-model:saved_j="workspace.code_j" v-model:saved_p="workspace.code_p" @update="updateContent"/>

  </div>
</template>

<script>
export default {
  props: ["problemID", "lang"],
  emits: ["unmounting"],
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
  beforeUnmount() {
    this.$emit("unmounting");
  },
};
</script>
