<template>
  <div class="create-assignment">
    <div class="row test-cases">
      <div v-for="(tc, idx) in cases" :key="tc.id" :tc="tc" class="tc-card col-1" @click="setCurrent(idx)">
        <div class="tc-card-title">
          <!-- <p>tc{{ i }}</p> -->
          <p>{{ tc.title }}</p>
        </div>

        <div class="tc-card-body">
          <p>
            {{ tc.compareType }}
            <br /><br />
            {{ tc.points }} Points
          </p>
        </div>
      </div>
      <div @click="addTest()" class="tc-card col-1">
        <div class="tc-card-title">
          <p>Add Test Case</p>
          <p>+</p>
        </div>
      </div>
    </div>

    <div class="container">
      <h4>Test Case ({{ currentTC }}/{{ cases.length }})</h4>
      <hr />
      <label for="tcTitle">Title: </label>
      <input type="text" id="tcTitle" v-model="tc.Title"/>
      <br />

      <label for="tcPoints">Points: </label>
      <input type="number" id="tcPoints" v-model="tc.Points"/>
      <br /><br />

      <h6><b>Feedback on test failure</b></h6>
      <QuillEditor theme="snow" toolbar="full" class="assignment-description" v-model:content="state.content"/>
      <br /><br />

      <label for="compareMethod">Compare Method: </label>
      <select class="form-select" name="compareMethod" id="compareMethod" v-model="tc.CompareMethod">
        <option value="" selected disabled hidden>Select One...</option>
        <option value="flexible">Flexible equality (ignores: case, whitespace, and special characters)</option>
        <option value="exact">Equals exactly</option>
        <option value="contains">Contains an exact value (at least once)</option>
        <option value="regex">Regex (Write a regular expression to match outputs)</option>
      </select>
      <br /><br />

      <label for="tcInput">Input (Will be passed into the student's program's stdin)</label>
      <VAceEditor class="editor" id="tcInput" v-model:value="tc.Input"/>
      <br /><br />

      <label for="tcOutput">Output (Will be matched against the output of the student's program)</label>
      <VAceEditor class="editor" id="tcOutput" v-model:value="tc.Output"/>
      <br /><br />
      <hr />
      <button @click="deleteTest()" class="btn btn-md btn-danger">Delete</button>
      <br />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

import { VAceEditor } from "vue3-ace-editor";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

import * as API from "../services/API";
import _ from "lodash";

export default {
  props: {
    problemID: Number,
  },
  setup() {
    const state = reactive({ content: "" });

    return { state };
  },
  data() {
    return {
      currentTC: 0,
      tc: {
        id: "",
        Title: "",
        Points: 0,
        Feedback: "",
        CompareMethod: "",
        Input: "",
        Output: "",
      },
      cases: [],
    };
  },
  components: {
    VAceEditor
  },
  watch: {
    tc: {
      deep: true,
      handler() {
        this.timeout(this.problemID);
      },
    },
    state: function(val) {
      this.tc.Feedback = this.state.content;
    }
  },
  methods: {
    async getCases() {
      const res = await API.apiClient.get(`/test-cases/${this.problemID}`);
      var rawCases = res.data;
      this.cases = rawCases;
    },
    async addTest() {
      console.log("addTest");
      var payload = {
        "assignment_id": this.problemID,
        "title": "New Test Case",
        "points": 10,
        "feedback": "",
        "compare_method": "",
        "input": "New Input",
        "output": "New Output",
      }
      const res = await API.apiClient.post(`/test-cases/`, payload);
      this.cases.push(res.data);

    },
    async deleteTest() {
      var key;
      for(let i = 0; i < this.cases.length; i++) {
        if(this.tc.id == this.cases[i].id) {
          key = i;
        }
      }
      this.cases = this.cases.filter((c, i) => i  != key);
      //set current to null
      this.currentTC =  "";
      this.tc.id = "";
      this.tc.Title = "";
      this.tc.Points = "";
      this.state.content = "";
      this.tc.Feedback = "";
      this.tc.CompareMethod = "";
      this.tc.Input = "";
      this.tc.Output = "";

      // I do this after to ensure that it doesn't try to repost to the test case after it has been deleted
      const res = await API.apiClient.delete(`/test-cases/${this.tc.id}`);
    },
    setCurrent(idx) {
      this.currentTC =  idx + 1;
      this.tc.id = this.cases[idx].id;
      this.tc.Title = this.cases[idx].title;
      this.tc.Points = this.cases[idx].points;
      this.state.content = this.cases[idx].feedback;
      this.tc.Feedback = this.cases[idx].feedback;
      this.tc.CompareMethod = this.cases[idx].compare_method;
      this.tc.Input = this.cases[idx].input;
      this.tc.Output = this.cases[idx].output;
      console.log(this.cases[idx]);
    },
    timeout: _.debounce(async function(problemID) {
      var payload = {
        "title": this.tc.Title,
        "points": this.tc.Points,
        "feedback": this.tc.Feedback,
        "compare_method": this.tc.CompareMethod,
        "input": this.tc.Input,
        "output": this.tc.Output,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);
      for(let i = 0; i < this.cases.length; i++) {
        if (this.cases[i].id == res.data.id ) {
          this.cases[i] = res.data;
        }
      }
    }, 500),
  },
  mounted() {
    this.getCases();
  },
  computed: {
    quill() {
      this.tc.Feedback = this.state.content;
      return this.state.content;
    },
  },
};
</script>

<style></style>
