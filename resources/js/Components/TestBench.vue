<template>
  <div class="create-assignment">
    <div class="row test-cases">
      <div v-for="i in 12" :key="i" class="tc-card col-1">
        <div class="tc-card-title">
          <p>tc{{ i }}</p>
        </div>

        <div class="tc-card-body">
          <p>
            Input/Output Comparison
            <br /><br />
            100 Points
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <h4>Test Case ({{ currentTC }}/{{ totalTC }})</h4>
      <hr />
      <label for="tcTitle">Title: </label>
      <input type="text" id="tcTitle" />
      <br />

      <label for="tcPoints">Points: </label>
      <input type="number" id="tcPoints" />
      <br /><br />

      <h6><b>Feedback on test failure</b></h6>
      <QuillEditor theme="snow" toolbar="full" class="assignment-description" />
      <br /><br />

      <label for="compareMethod">Compare Method: </label>
      <select name="compareMethod" id="compareMethod">
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
      <v-ace-editor class="editor" id="tcInput" />
      <br /><br />

      <label for="tcOutput">Output (Will be matched against the output of the student's program)</label>
      <v-ace-editor class="editor" id="tcOutput" />
      <br /><br />
    </div>
  </div>
</template>

<script>
import { VAceEditor } from "vue3-ace-editor";

import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";

export default {
  data() {
    return {};
  },
  components: {
    VAceEditor
  }
};
</script>

<style></style>
