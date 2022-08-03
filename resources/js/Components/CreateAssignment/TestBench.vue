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
        @click="setCurrentTC(idx)"
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
      <div @click="addTestCase()" class="tc-card col-1">
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
        <div style="height:35%;">
          <Tiptap :savedText="feedbackContent" @input="changeFeedback" :showMenuBar="true" :isDark="false" />
        </div>
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
      <button @click="deleteTestCase()" class="btn btn-md btn-danger">Delete</button>
      <br />
    </div>
  </div>
</template>

<script>
import { VAceEditor} from "vue3-ace-editor";

import * as API from "../../services/API";
import _ from "lodash";
export default {
  props: ["problemID"],
  components: {
    VAceEditor,
  },
  data() {
    return {
      cases: [],
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
      feedbackContent: null,
    }
  },
  methods: {
    //GETTERS
    async fetchCases() {
      const res = await API.apiClient.get(`/test-cases/${this.problemID}`);
      this.cases = res.data.data;

      if(this.cases.length != 0) {
        this.setCurrentTC(0);
      }
    },

    //add test case
    async addTestCase() {
      var payload = {
        assignment_id: parseInt(this.problemID),
        feedback: JSON.stringify({}),
        input: "New Input",
        output: "New Output",
      };
      const res = await API.apiClient.post(`/test-cases`, payload);

      //add to list of test cases
      this.cases.push(res.data);
      //set current to new test case
      this.setCurrentTC(this.cases.length - 1);
    },

    //delete test case
    async deleteTestCase() {
      //remove from the list of test cases
      this.cases = this.cases.filter((tc) => tc.id != this.tc.id);

      var temp = this.tc.id;
      
      //set current tc to no test case
      this.currentTC = 0;
      this.tc = {
        id: "",
        Title: "",
        Points: 0,
        Feedback: {},
        CompareMethod: "",
        Input: "",
        Output: "",
      };

      // I do this after to ensure that it doesn't try to repost to the test case after it has been deleted
      const res = await API.apiClient.delete(`/test-cases/${temp}`);
    },


    //edit parts of the test case
    updateTestCase(testCase) {
      for(let i = 0; i< this.cases.length; i++) {
        if(this.cases[i].id == testCase.id) {
          this.cases[i] = testCase;
        }
      }
    },
    async changeTitle() {
      var payload = {
        title: this.tc.Title,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);
      
      //update the test case in the list of cases
      this.updateTestCase(res.data);
    },
    async changePoints() {
      var payload = {
        points: this.tc.Points,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);

      //update the test case in the list of cases
      this.updateTestCase(res.data);
    },
    async changeFeedback(e) {
      this.tc.Feedback = e;
      var payload = {
        feedback: this.tc.Feedback,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);

      //update the test case in the list of cases
      this.updateTestCase(res.data);
    },
    async changeCompare() {
      var payload = {
        compare_method: this.tc.CompareMethod,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);

      //update the test case in the list of cases
      this.updateTestCase(res.data);
    },
    async changeInput() {
      var payload = {
        input: this.tc.Input,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);

      //update the test case in the list of cases
      this.updateTestCase(res.data);
    },
    async changeOutput() {
      var payload = {
        output: this.tc.Output,
      };
      const res = await API.apiClient.put(`/test-cases/${this.tc.id}`, payload);

      //update the test case in the list of cases
      this.updateTestCase(res.data);
    },

    //TEST case selector
    async setCurrentTC(idx) {
      this.currentTC = idx + 1;
      this.tc = {
        id: this.cases[idx].id,
        Title: this.cases[idx].title,
        Points: this.cases[idx].points,
        Feedback: this.cases[idx].feedback,
        CompareMethod: this.cases[idx].compare_method,
        Input: this.cases[idx].input,
        Output: this.cases[idx].output,
      };
      this.feedbackContent = await JSON.parse(this.tc.Feedback);
    },

    // go back and model the saves after using this, to avoid flooding the server
    // _.debounce(async function (assignmentID) {
    //   const payload = {
    //     description: this.newText,
    //   };
    //   const res = await API.apiClient.put(`/problems/${assignmentID}`, payload);
    // }, 3000)

  },
  mounted() {
    this.fetchCases();
  },
}
</script>

<style>

</style>