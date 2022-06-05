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
      <div class="save-model">
        <div class="row">
          <button class="btn btn-primary btn-md col-4" @click="changeLanguage()">
            CHANGE LANGUAGE
          </button>
          <!-- <small class="col-8 saveStatus">{{ saveStatus }}</small> -->
          <small class="col-8 saveStatus">{{ this.saveStatus }}</small>
        </div>
      </div>

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
</template>

<script>
import * as API from "../../services/API";
export default {
  props: ["problemID", "tab"],
  data() {
    return {
      saveStatus: "",
      showEditor: false,
      content: "",
      template_j: "",
      template_p: "",
      lang: "",
    }
  },
  methods: {
    //get templates
    async fetchModelTemplates() {
      const res = await API.apiClient.get(`/problems/full/${this.problemID}`);
      var templates = res.data.data;
      this.template_j = templates.java_model == "" ? templates.java_starter : templates.java_model;
      this.template_p = templates.python_model == "" ? templates.python_starter : templates.python_model;
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
      this.lang == "Java" ? payload = { java_model: this.content, } : payload = { python_model: this.content, };

      const res = await API.apiClient.put(`/problems/${assignmentID}`, payload);
      this.saveStatus = "All changes have been saved";
    }, 500),
  },
  watch: {
    tab: function(newVal, oldVal) {
      if(newVal != "Model Solution") {
        this.showEditor = false;
      }
    },
    content: function(val) {
      this.saveStatus = "Saving...";
      this.timeout(this.problemID);
    }
  },
  mounted() {
    this.fetchModelTemplates();
  },
}
</script>

<style>

</style>