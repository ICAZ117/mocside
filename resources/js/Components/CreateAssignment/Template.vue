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
          <button class="btn btn-primary btn-md col-4" @click="changeLanguage()">
            CHANGE LANGUAGE
          </button>
          <!-- <small class="col-8 saveStatus">{{ saveStatus }}</small> -->
          <small class="col-8 saveStatus">{{ this.saveStatus }}</small>
        </div>
      </div>

      <div class="template-IDE"> 
        <IDE
          :offsetTop="197.8"
          :width="window.innerWidth"
          :lang="lang"
          :problemID="problemID"
          :showSubmit="false"
          v-model:saved_j="template_j"
          v-model:saved_p="template_p"
          @update="updateContent"
        />
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import * as API from "../../services/API";

export default {
  props: ["problemID", "tab"],
  data() {
    return {
      showEditor: false,
      saveStatus: "",
      template_j: "",
      template_p: "",
      lang: "",
      content: "",
    }
  },
  methods: {
    //get templates
    async fetchTemplates() {
      const res = await API.apiClient.get(`/problems/full/${this.problemID}`);
      var templates = res.data.data;
      this.template_j = templates.java_starter;
      this.template_p = templates.python_starter;
    },

    //Editor
    launchEditor() {
      this.showEditor = true;
    },
    changeLanguage() {
      this.showEditor = false;
    },

    //update Content
    updateContent(e) {
      this.content = e.code;
    },

    //save content
    timeout: _.debounce(async function(assignmentID) {
      var payload = {};
      this.lang == "Java" ? payload = { java_starter: this.content, } : payload = { python_starter: this.content, };

      const res = await API.apiClient.put(`/problems/${assignmentID}`, payload);
      this.saveStatus = "All changes have been";
    }, 500),

  },
  watch: {
    tab: function (newVal, oldVal) {
      if(newVal != "Template") {
        this.showEditor = false;
      }
    },
    content: function(val) {
      this.saveStatus = "Saving...";
      this.timeout(this.problemID);
    },
  },
  mounted() {
    this.fetchTemplates();
  },
}
</script>

<style>

</style>