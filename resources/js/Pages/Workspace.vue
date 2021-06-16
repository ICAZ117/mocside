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
      const res = await API.apiClient.get(`/code/search/${this.problemID}`);
      var progress = res.data.data;
      console.log(progress);
      this.workspace.code_j = this.getJava(progress);
      this.workspace.code_p = this.getPython(progress);
    },
    getJava(progress) {
      //if first time opening grab template, else grab student code
      if (progress.length == 0) {
        return this.assignment.java_starter;
      }
      else {
        for(let i=0; i < progress.length; i++) {
          if(progress[i].lang == "java") {
            return progress[i].code;
          }
        }
        return this.assignment.java_starter;
      }
    },
    getPython(progress) {
      //if first time opening grab template, else grab student code
      if (progress.length == 0) {
        return this.assignment.python_starter;
      }
      else {
        for(let i =0; i < progress.length; i++) {
          console.log(progress[i]);
          if(progress[i].lang == "python") {
            return progress[i].code;
          }
        }
        return this.assignment.python_starter;
      }
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
