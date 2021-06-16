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
import * as API from "../services/API";
export default {
  props: ["problemID", "lang"],
  emits: ["unmounting"],
  data() {
    return {
      assignment: {},
      workspace: {
        title: "",
        description: "",
        code_j: "",
        code_p: "",
        theme: "",
        input: "",
      },
    };
  },
  methods: {
    async getAssignment() {
      //this route needs to be worked on and adjusted
      const rawAssignment = await API.apiClient.get(`/problems/full/${this.problemID}`);
      this.assignment = rawAssignment.data.data;
      this.workspace.title = this.assignment.name;
      this.workspace.description = this.assignment.description;
      const res = await API.apiClient.get(`/problems/full/${this.problemID}`);
      this.workspace.code_j = this.getJava(res.data.data);
      this.workspace.code_p = this.getPython(res.data.data);
    },
    getJava(templates) {
      //if first time opening grab template, else grab student code
      return templates.java_starter;
      // return "";
    },
    getPython(templates) {
      //if first time opening grab template, else grab student code
      return templates.python_starter;
      // return "";
    },
    updateContent(e) {
      console.log(e);
    },
  },
  beforeUnmount() {
    this.$emit("unmounting");
  },
  async mounted() {
    await this.getAssignment();
  },
};
</script>
