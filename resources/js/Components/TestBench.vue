<template>
  <div class="create-test-cases create-assignment">
    <!-- ---------------------------------------- -->
    <!-- --------------- TC CARDS --------------- -->
    <!-- ---------------------------------------- -->
    <div class="row test-cases">
      <div
        v-for="(tc, idx) in cases"
        :key="tc.id"
        :tc="tc"
        class="tc-card col-1"
        @click="setCurrent(idx)"
      >
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
    <!-- ---------------------------------------- -->
    <!-- -------------- TC FIELDS --------------- -->
    <!-- ---------------------------------------- -->
    <div v-if="currentTC != '' && currentTC != 0" class="container">
      <!------------ Header ------------>
      <h4>Test Case ({{ currentTC }}/{{ cases.length }})</h4>
      <hr />

      <!------------ TC Title ------------>
      <label for="tcTitle">Title: </label>
      <input type="text" id="tcTitle" @change="changeTitle" v-model="tc.Title" />
      <br />

      <!------------ TC Points ------------>
      <label for="tcPoints">Points: </label>
      <input type="number" id="tcPoints" @change="changePoints" v-model="tc.Points" />
      <br /><br />

      <!------------ TC Feedback ------------>
      <h6><b>Feedback on test failure</b></h6>
      <Tiptap :savedText="JSON.parse(tc.Feedback)" @input="changeFeedback" :showMenuBar="true" :isDark="false" />
      <br /><br />

      <!------------ TC Compare Method ------------>
      <label for="compareMethod">Compare Method: </label>
      <select
        class="form-select"
        name="compareMethod"
        id="compareMethod"
        @change="changeCompare"
        v-model="tc.CompareMethod"
      >
        <option value="flexible">
          Flexible equality (ignores: case, whitespace, and special characters)
        </option>
        <option value="exact" selected>Equals exactly</option>
        <option value="contains">Contains an exact value (at least once)</option>
        <option value="regex">Regex (Write a regular expression to match outputs)</option>
      </select>
      <br /><br />

      <!------------ TC Input ------------>
      <label for="tcInput"
        >Input (Will be passed into the student's program's stdin)</label
      >
      <VAceEditor
        class="tc-editor"
        id="tcInput"
        @change="changeInput"
        v-model:value="tc.Input"
      />
      <br /><br />

      <!------------ TC Output ------------>
      <label for="tcOutput"
        >Output (Will be matched against the output of the student's program)</label
      >
      <VAceEditor
        class="tc-editor"
        id="tcOutput"
        @change="changeOutput"
        v-model:value="tc.Output"
      />
      <br /><br />

      <hr />

      <!------------ DELETE TC ------------>
      <button @click="deleteTest()" class="btn btn-md btn-danger">Delete</button>
      <br />
    </div>
  </div>
</template>

<script>
import { VAceEditor } from "vue3-ace-editor";

import * as API from "../services/API";
import _ from "lodash";

export default {
  props: {
    problemID: Number,
  },
  data() {
    return {
      currentTC: 0,
      tc: {
        id: "",
        Title: "",
        Points: 0,
        Feedback: {},
        CompareMethod: "",
        Input: "",
        Output: "",
      },
      feedback: {},
      cases: [],
    };
  },
  components: {
    VAceEditor,
  },
  // watch: {
  //   tc: {
  //     deep: true,
  //     handler() {
  //       if (this.tc.id != "") {
  //         // this.timeout(this.problemID);
  //         console.log("something changed");
  //       }
  //     },
  //   },
  // },
  methods: {
    async getCases() {
      const res = await API.apiClient.get(`/test-cases/${this.problemID}`);
      var rawCases = res.data;
      async () => {
        this.cases = rawCases;
      };
      if(this.cases.length != 0) {
        this.setCurrent(0);
      }
    },
    async addTest() {
      console.log("addTest");
      var payload = {
        assignment_id: this.problemID,
        feedback: JSON.stringify({}),
        input: "New Input",
        output: "New Output",
      };
      const res = await API.apiClient.post(`/test-cases`, payload);
      this.cases.push(res.data);
      this.setCurrent(this.cases.length - 1);
    },
    async deleteTest() {
      var key;
      for (let i = 0; i < this.cases.length; i++) {
        if (this.tc.id == this.cases[i].id) {
          key = i;
        }
      }
      this.cases = this.cases.filter((c, i) => i != key);
      var temp = this.tc.id;
      //set current to null
      if(this.currentTC != 1 && this.currentTC.length != 0) {
        this.currentTC--;
      };
      if(this.currentTC.length != 0) {
        var idx = this.currentTC - 1;
        this.tc.id = this.cases[idx].id;
        this.tc.Title = this.cases[idx].title;
        this.tc.Points = this.cases[idx].points;
        this.tc.Feedback = this.cases[idx].feedback;
        this.tc.CompareMethod = this.cases[idx].compare_method;
        this.tc.Input = this.cases[idx].input;
        this.tc.Output = this.cases[idx].output;
      }
      else {
        this.currentTC = 0;
        this.tc.id = "";
        this.tc.Title = "";
        this.tc.Points = "";
        this.tc.Feedback = "";
        this.tc.CompareMethod = "";
        this.tc.Input = "";
        this.tc.Output = "";
      }

      // I do this after to ensure that it doesn't try to repost to the test case after it has been deleted
      const res = await API.apiClient.delete(`/test-cases/${temp}`);
    },
    setCurrent(idx) {
      this.currentTC = idx + 1;
      console.log(this.tc);
      console.log(this.cases[idx]);
      this.tc.id = this.cases[idx].id;
      this.tc.Title = this.cases[idx].title;
      this.tc.Points = this.cases[idx].points;
      this.tc.Feedback = this.cases[idx].feedback;
      this.tc.CompareMethod = this.cases[idx].compare_method;
      this.tc.Input = this.cases[idx].input;
      this.tc.Output = this.cases[idx].output;
    },
    // timeout: _.debounce(async function (problemID) {
    //   var payload = {
    //     // title: this.tc.Title,
    //     // points: this.tc.Points,
    //     feedback: this.tc.Feedback,
    //     // compare_method: this.tc.CompareMethod,
    //     // input: this.tc.Input,
    //     // output: this.tc.Output,
    //   };
    //   const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);
    //   for (let i = 0; i < this.cases.length; i++) {
    //     if (this.cases[i].id == res.data.id) {
    //       this.cases[i] = res.data;
    //     }
    //   }
    // }, 500),
    async changeTitle() {
      var payload = {
        title: this.tc.Title,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);
      for (let i = 0; i < this.cases.length; i++) {
        if (this.cases[i].id == res.data.id) {
          this.cases[i] = res.data;
        }
      }
    },
    async changePoints() {
      var payload = {
        points: this.tc.Points,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);
      for (let i = 0; i < this.cases.length; i++) {
        if (this.cases[i].id == res.data.id) {
          this.cases[i] = res.data;
        }
      }
    },
    async changeFeedback(e) {
      this.tc.Feedback = e;
      var payload = {
        feedback: this.tc.Feedback,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);
      for (let i = 0; i < this.cases.length; i++) {
        if (this.cases[i].id == res.data.id) {
          this.cases[i] = res.data;
        }
      }
    },
    async changeCompare() {
      var payload = {
        compare_method: this.tc.CompareMethod,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);
      for (let i = 0; i < this.cases.length; i++) {
        if (this.cases[i].id == res.data.id) {
          this.cases[i] = res.data;
        }
      }
    },
    async changeInput() {
      var payload = {
        input: this.tc.Input,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);
      for (let i = 0; i < this.cases.length; i++) {
        if (this.cases[i].id == res.data.id) {
          this.cases[i] = res.data;
        }
      }
    },
    async changeOutput() {
      var payload = {
        output: this.tc.Output,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);
      for (let i = 0; i < this.cases.length; i++) {
        if (this.cases[i].id == res.data.id) {
          this.cases[i] = res.data;
        }
      }
    },
  },
  mounted() {
    this.getCases();
  },
};
</script>

<style></style>
