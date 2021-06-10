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
      <h4>Test Case ({{ currentTC }}/{{ totalTC }})</h4>
      <hr />
      <label for="tcTitle">Title: </label>
      <input type="text" id="tcTitle" v-model="testCase.tcTitle"/>
      <br />

      <label for="tcPoints">Points: </label>
      <input type="number" id="tcPoints" v-model="testCase.tcPoints"/>
      <br /><br />

      <h6><b>Feedback on test failure</b></h6>
      <QuillEditor theme="snow" toolbar="full" class="assignment-description" v-model:content="state.content"/>
      <br /><br />

      <label for="compareMethod">Compare Method: </label>
      <select class="form-select" name="compareMethod" id="compareMethod" v-model="testCase.tcCompareMethod">
        <option value="" selected disabled hidden>Select One...</option>
        <option value="flexible">
          Flexible equality (ignores: case, whitespace, and special characters)
        </option>
        <option value="exact">Equals exactly</option>
        <option value="contains">Contains an exact value (at least once)</option>
        <option value="regex">Regex (Write a regular expression to match outputs)</option>
      </select>
      <br /><br />

      <label for="tcInput">Input (Will be passed into the student's program's stdin)</label>
      <VAceEditor class="editor" id="tcInput" v-model:value="testCase.tcInput"/>
      <br /><br />

      <label for="tcOutput">Output (Will be matched against the output of the student's program)</label>
      <VAceEditor class="editor" id="tcOutput" v-model:value="testCase.tcOutput"/>
      <br /><br />
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

import { VAceEditor } from "vue3-ace-editor";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

import * as API from "../services/API";

export default {
  setup() {
    const state = reactive({ content: "" });

    return { state };
  },
  props: ['problemID'],
  data() {
    return {
      currentTC: 0,
      totalTC: 0,
      testCase: {
        tcTitle: "",
        tcPoints: 0,
        tcDescription: "",
        tcCompareMethod: "",
        tcInput: "",
        tcOutput: "",
      },
      cases: [],
    };
  },
  components: {
    VAceEditor
  },
  methods: {
    async getCases() {
      const res = await API.apiClient.get(`/test-cases/${this.problemID}`);
      var rawCases = res.data;
      this.cases = rawCases;
    },
    addTest() {
      console.log("addTest");
      this.cases.push({"id": this.cases.length, "title": this.cases.length, "compareType": "exact", "points": 450});
      this.totalTC = this.totalTC + 1;
    },
    deleteTest() {
      console.log("delete test");
      this.totalTC = this.totalTC - 1;
    },
    setCurrent(idx) {
      console.log("setCurrent");
      this.currentTC =  idx + 1;
      this.testCase.tcTitle = this.cases[idx].title;
      this.testCase.tcPoints = this.cases[idx].points;
      this.testCase.tcDescription = "input description into object here";
      this.testCase.tcCompareMethod = this.cases[idx].compareTpye;
      this.testCase.tcInput = "input here";
      this.testCase.tcOutput = "output here";
    },
  },
  mounted() {
    this.getCases();
    this.totalTC = this.cases.length;
  }
};
</script>

<style></style>
