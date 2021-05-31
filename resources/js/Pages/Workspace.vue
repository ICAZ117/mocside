<template>
  <!-- Main Page-->
  <div class="row">
    <div class="instructions col-4">
      <h4>Problem X: Title</h4>
      <hr class="instructions-hr" />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio cupiditate
        praesentium similique vel quasi tempore. Facilis, voluptatum accusamus possimus
        eaque, expedita voluptate modi aspernatur at distinctio dignissimos sapiente?
        Eligendi, ratione incidunt odio consequatur voluptatem modi natus, qui, quidem
        nesciunt iusto provident fugit rerum fugiat ipsum!
        <br /><br />
        <b>Input:</b><br />
        <br /><br />
        <b>Output:</b><br />
        World!
      </p>
    </div>
    <div class="work-area col-8">
      <div
        class="editor row"
        style="padding: 0 !important; background-color: rgb(58, 58, 58)"
      >
        <!-- 
                <p>
                    class Main {<br /><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;public static void main(String[] args) {<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Put your code here<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;}<br /><br />
                    }</p>-->
        <!-- <textarea id="editor" cols="30" rows="10"></textarea> -->

        <form class="editorform" method="POST">
          <!-- <textarea
            name="editor"
            id="editor"
            cols="150"
            rows="1"
            placeholder="class Main {&NewLine;&Tab;public static void main(String[] args) {&NewLine;&Tab;&Tab;// Put your code here&NewLine;&Tab;}&NewLine;}"
          ></textarea> -->
          <v-ace-editor
            class="editor"
            v-model:value="content"
            @init="editorInit"
            lang="html"
            theme="chrome"
          />
          <!-- style="height: 300px" -->
          <input type="submit" name="submit" class="btn btn-success" />
        </form>
      </div>
      <div class="console row"></div>
    </div>
  </div>
</template>

<script>
import { VAceEditor } from "vue3-ace-editor";
import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-chrome";

export default {
  props: ["problemID"],
  emits: ["assignment-unmounting"],
  data() {
    return {
      assignment: {},
    };
  },
  methods: {
    async getAssignment() {
      //this route needs to be worked on and adjusted
      const rawAssignment = await API.apiClient.get(`/problems/${this.labID}`);
      this.assignment = rawAssignment.data;
    },
  },
  components: {
    VAceEditor,
  },
  mounted() {
    // this.getAssignment();
    console.log("getAssignment");
  },
  beforeUnmount() {
    this.$emit("assignment-unmounting");
  },
};
</script>
