<template>
  <!-- Main Page-->
  <div class="row">
    <div class="instructions col-4 p-4">
      <h4>{{ title }}</h4>
      <hr class="instructions-hr" />
      <p>
        <!-- <Tiptap :savedText="JSON.parse(description)" :editable="false"/> -->
      </p>
    </div>

    <IDE class="col-8" :lang="lang" :showSubmit="true" :saved_j="code_j" :saved_p="code_p" @update="updateContent"/>

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
      title: "",
      description: "",
      code_j: "",
      code_p: "",
      theme: "",
      input: "",
      jID: "",
      pID: "",
    };
  },
  methods: {
    async getAssignment() {
      //this route needs to be worked on and adjusted
      const rawAssignment = await API.apiClient.get(`/problems/full/${this.problemID}`);
      this.assignment = rawAssignment.data.data;
      this.title = this.assignment.name;
      this.description = this.assignment.description;
      const res = await API.apiClient.get(`/code/search/${this.problemID}`);
      var progress = res.data.data;
      this.code_j = await this.getJava(progress);
      this.code_p = await this.getPython(progress);
    },
    async getJava(progress) {
      //if first time opening grab template, else grab student code
      var payload = {
        lang: "java",
        problem_id: this.problemID,
        code: this.assignment.java_starter,
      }
      if (progress.length == 0) {
        const res = await API.apiClient.post(`/code/`, payload);
        this.jID = res.data.id;
        console.log("Got Java");
        return this.assignment.java_starter;
      }
      else {
        for(let i=0; i < progress.length; i++) {
          if(progress[i].lang == "java") {
            console.log("Got Java");
            return progress[i].code;
          }
        }
        const res = await API.apiClient.post(`/code/`, payload);
        this.jID = res.data.id;
        console.log("Got Java");
        return this.assignment.java_starter;
      }
    },
    async getPython(progress) {
      //if first time opening grab template, else grab student code
      var payload = {
        lang: "python",
        problem_id: this.problemID,
        code: this.assignment.python_starter,
      }
      if (progress.length == 0) {
        const res = await API.apiClient.post(`/code/`, payload);
        this.pID = res.data.id;
        return this.assignment.python_starter;
      }
      else {
        for(let i =0; i < progress.length; i++) {
          if(progress[i].lang == "python") {
            return progress[i].code;
          }
        }
        const res = await API.apiClient.post(`/code/`, payload);
        this.pID = res.data.id;
        return this.assignment.python_starter;
      }
    },
    updateContent(e) {
      console.log(e);
      //this.timeout();
    },
     timeout: _.debounce(async function(assignmentID) {
      var payload = {};
      if(this.lang =="Java") {
        payload = {
          "code": this.code_j,
        }
        const res = await API.apiClient.put(`/code/${this.jID}`, payload);
      }
      else {
        payload = {
          "code": this.code_p,
        }
        const res = await API.apiClient.put(`/code/${this.pID}`, payload);
      };
    }, 500),
  },
  beforeUnmount() {
    this.$emit("unmounting");
  },
  async mounted() {
    await this.getAssignment();
  },
};
</script>
