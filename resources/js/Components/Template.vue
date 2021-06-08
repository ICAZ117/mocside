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
            SAVE CHANGES
          </button>
          <small class="col-8 saveStatus">{{ saveStatus }}</small>
        </div>
      </div>

      <IDE :lang="lang" :showSubmit="false" @input="updateContent"/>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      saveStatus: "All changes have been saved",
      lang: "",
      showEditor: false,
      content: "",
    };
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
      console.log("Before update:");
      console.log(this.content);
      this.content = e;
      console.log("After update:");
      console.log(this.content);
      console.log("\n\n---------- Update Completed ----------");


      var test = _.debounce(function () {
        console.log("Code has been debounced");
      }, 1000);

    },
  },
};
</script>

<style></style>
