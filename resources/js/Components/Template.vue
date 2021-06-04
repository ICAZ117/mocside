<template>
  <div class="create-assignment">
    <div class="template-workspace">
      <div class="save-template">
        <div class="row">
          <button class="btn btn-primary btn-md col-4" @click="saveTemplate()">
            SAVE CHANGES
          </button>
          <small class="col-8">{{ saveStatus }}</small>
        </div>
      </div>

      <IDE :lang="lang" :showSubmit="false"/>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      saveStatus: "All changes have been saved",
      lang: "Java",
    };
  },
  methods: {
    saveTemplate() {
      console.log("Inside saveTemplate()");
    },
  },
};
</script>

<style></style>
