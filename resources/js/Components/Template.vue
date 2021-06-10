<template>
  <div class="create-assignment" style="padding: 0 !important">
    <div v-if="!showEditor" class="lang-select">
      <div class="row">
        <div class="col-9">
          <select v-model="lang" id="lang" class="form-select">
            <option value="" selected disabled hidden>Select a language...</option>
            <option value="Java">Java</option>
            <option value="Python">Python</option>
          </select>
        </div>
        <div class="col-3 ml-1">
          <button
            type="launch"
            name="launch"
            class="launch-workspace btn btn-success"
            :disabled="!lang.length"
            @click="launchEditor()"
          >
            Launch in {{ lang }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="showEditor" class="template-workspace">
      <div class="save-template">
        <div class="row">
          <button class="btn btn-primary btn-md col-4" @click="saveTemplate()">
            CHANGE LANGUAGE
          </button>
          <small class="col-8 saveStatus">{{ saveStatus }}</small>
        </div>
      </div>

      <IDE :lang="lang" :showSubmit="false" v-model:saved_j="template_j" v-model:saved_p="template_p" @update="updateContent" />
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import * as API from "../services/API";

export default {
  props: ["problemID"],
  data() {
    return {
      saveStatus: "All changes have been saved",
      lang: "",
      showEditor: false,
      content: "",
      template_j: "",
      template_p: "",
    };
  },
  watch: {
    content: function(val) {
      this.timeout(this.problemID);
    }
  },
  methods: {
    launchEditor() {
      this.showEditor = true;
      // this.$forceUpdate();
    },
    saveTemplate() {
      console.log("Inside saveTemplate()");
    },
    updateContent(e) {
      this.content = e;
    },
    timeout: _.debounce(async function(assignmentID) {
      var payload = {};
      if(this.lang =="Java") {
        payload = {
          "java_starter": this.content,
        }
      }
      else {
        payload = {
          "python_starter": this.content,
        }
      };
      console.log(payload);
      const res = await API.apiClient.put(`/problems/${assignmentID}`, payload);
    }, 500),
    async getStarter() {
      const res = await API.apiClient.get(`/problems/full/${this.problemID}`);
      var templates = res.data.data;
      this.template_j = templates.java_starter;
      this.template_p = templates.python_starter;
    },
  },
  beforeMount() {
    this.getStarter();
  }
};
</script>

<style></style>
