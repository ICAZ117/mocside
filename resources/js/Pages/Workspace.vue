<template>
  <!-- Main Page-->
  <div class="row">
    <div class="instructions col-4 p-4">
      <h4>Problem X: Title</h4>
      <hr class="instructions-hr" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio cupiditate
        praesentium similique vel quasi tempore. Facilis, voluptatum accusamus possimus
        eaque, expedita voluptate modi aspernatur at distinctio dignissimos sapiente?
        Eligendi, ratione incidunt odio consequatur voluptatem modi natus, qui, quidem
        nesciunt iusto provident fugit rerum fugiat ipsum!
        <br /><br />
        <b>Input:</b><br />
        <br /><br />
        <b>Output:</b><br />
        World!
      </p>
    </div>

    <IDE class="col-8" :lang="lang" :showSubmit="true"/>

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
        code_j: {},
        code_p: {},
        theme: "",
        input: "",
      },
    };
  },
  methods: {
    async getAssignment() {
      //this route needs to be worked on and adjusted
      const rawAssignment = await API.apiClient.get(`/problems/${this.labID}`);
      this.assignment = rawAssignment.data;
      this.workspace.title = this.assignment.name;
      this.workspace.description = this.assignment.description;
      const res = await API.apiClient.get(`/problems/full/${this.problemID}`);
      this.workspace.code_j = await getJava(res.data.data);
      this.workspace.code_p = await getPython(res.data.data);
    },
    async getJava(templates) {
      //if first time opening grab template, else grab student code
      return templates.java_starter;
    },
    async getPython(templates) {
      //if first time opening grab template, else grab student code
      return templates.python_starter;
    },
  },
  beforeUnmount() {
    this.$emit("unmounting");
  },
  mount() {
    this.getAssignment();
  },
};
</script>
