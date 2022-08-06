<template>
  <div class="workspace-page">
    <!-- Workspace page -->
    <div>
      <Vue3DraggableResizable
        :initW="instructionsWidth"
        :initH="instructionsHeight"
        v-model:x="instructx"
        v-model:y="instructy"
        v-model:w="instructw"
        v-model:h="instructh"
        v-model:active="active"
        :draggable="false"
        :resizable="true"
        :disabledH="true"
        :handles="['mr']"
        :key="reloadSliders"
        class="instructions"
        id="resizeableInstructions"
        style="overflow-y: hidden !important; overflow-x: auto !important"
      >
        <button
          class="btn btn-secondary btn-sm"
          style="
            margin-left: calc((100% - (100% - 16px)) / 2) !important;
            width: calc(100% - 20px) !important;
            margin-top: 5px;
          "
          @click="returnToProblems()"
          >↩ Return to Problems</button
        >
        <br />
        <br />
        <h4>{{ title }}</h4>
        <hr class="instructions-hr" />
        <Tiptap
          :savedText="description"
          :editable="false"
          :showMenuBar="false"
          :isDark="true"
        />
      </Vue3DraggableResizable>

      <Vue3DraggableResizable
        :initW="IDEWidth"
        :initH="IDEHeight"
        v-model:x="IDEx"
        v-model:y="IDEy"
        v-model:w="IDEw"
        v-model:h="IDEh"
        v-model:active="active"
        :draggable="false"
        :resizable="true"
        :disabledH="true"
        :handles="['ml']"
        @resize-end="resizeEnd"
        :key="reloadSliders"
        id="resizeableIDE"
      >
        <IDE
          :offsetTop="0"
          :lang="lang"
          :showSubmit="true"
          :saved_j="code_j"
          :saved_p="code_p"
          :problemID="problemID"
          :codeID="codeID"
          :labID="labID"
          @update="updateContent"
          :key="forceReload"
          :width="debouncedWidth"
        />
      </Vue3DraggableResizable>
    </div>
  </div>
</template>

<script>
import * as API from "../../services/API";
import Vue3DraggableResizable from "vue3-draggable-resizable";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
export default {
  props: ["problemID", "lang", "labID"],
  components: { Vue3DraggableResizable },
  data () {
    return {
      assignment: null,
      title: null,
      description: null,
      codeID: "",
      code_p: "",
      code_j: "",
      forceReload: 0,
      reloadSliders: 0,

      // vue resizeable
      instructionsHeight: window.innerHeight - 60,
      instructionsWidth: window.innerWidth * 0.33,
      IDEHeight: window.innerHeight - 60,
      IDEWidth: window.innerWidth * 0.67,
      instructx: 0,
      instructy: 60,
      instructw: 0,
      instructh: 0,
      IDEx: window.innerWidth * 0.33,
      IDEy: 60,
      IDEw: window.innerWidth * 0.67,
      IDEh: 0,
      active: true,
      debouncedWidth: window.innerWidth * 0.67,
    }
  },
  methods: {
    //fetching problem and work
    async fetchAssignment() {
      const res = await API.apiClient.get(`/problems/full/${this.problemID}`);
      this.assignment = res.data.data;
      this.title = this.assignment.name;
      this.description = await JSON.parse(this.assignment.description);

      //check if no code from student or template
      const codeCheck = await this.checkForCode();
      if(codeCheck.data.message == "No progress. Please create.") {
        //need to create the code
        await this.initEmptyCode();
      } else {
        if (this.lang == "Java") {
          this.code_j = codeCheck.data.dump[0].code;
          this.codeID = codeCheck.data.dump[0].id;
        } else {
          this.code_p = codeCheck.data.dump[0].code;
          this.codeID = codeCheck.data.dump[0].id;
        }
      }
      this.forceReload += 1;
      // const res = await API.apiClient.get(`/code/search/${this.problemID}`);
      // var progress = res.data.data;
      // this.code_j = await this.getJava(progress);
      // this.code_p = await this.getPython(progress);
      // if(this.lang == "Java") {
      //   this.codeID = this.jID;
      // }
      // else {
      //   this.codeID = this.pID;
      // }
      // this.forceReload = 1;
    },
    async checkForCode() {
      var payload = {
        lang: this.lang,
      }
      return await API.apiClient.post(`/code/check/${this.problemID}`, payload);
    },
    async initEmptyCode() {
      if(this.assignment.python_starter == "" || this.assignment.python_starter == null) {
        this.assignment.python_starter = "def main():\n\nmain()";
      }
      if(this.assignment.java_starter == "" || this.assignment.java_starter == null) {
        this.assignment.java_starter = "public class Main {\n\tpublic static void main(String[] args) {\n\t\t}}";
      }

      var payload = {
        lang: this.lang.toLowerCase(0),
        problem_id: this.problemID, 
        code: this.lang == "Java" ? this.assignment.java_starter : this.assignment.python_starter,
      };
      const res = await API.apiClient.post(`/code`, payload);

      this.codeID = res.data.id; 
      this.code_j = this.assignment.java_starter;
      this.code_p = this.assignment.python_starter;
    },

    //updating content
    updateContent(e) {
      if(this.lang == "Java")
        this.code_j = e.code;
      else 
        this.code_p = e.code;

      this.timeout();
    },
    timeout: _.debounce(async function  () {
      var payload = {
        code: this.lang == "Java" ? this.code_j : this.code_p,
      }
      const res = await API.apiClient.put(`/code/${this.codeID}`, payload);
    }, 1000),

    //routing functions
    returnToProblems() {
      this.$router.go(-1);
    },

    //resizeable stuff
    resizeEnd() {
      this.debouncedWidth = this.IDEw;
    },
  },
  watch: {
    IDEw: function () {
      this.instructw = window.innerWidth - this.IDEw;
    },
    active: function () {
      this.active = true;
    }
  },
  // beforeUnmount() {
  //   // workspace
  //   document.getElementById("thisIsTheDumbestThingIHaveEverHadToDo").style = "";
  // },
  async mounted() {
    if(!this.lang) this.returnToProblems();
    else await this.fetchAssignment();
    // this.reloadSliders++;
    // document.getElementById("resizeableInstructions").remove();
    // document.getElementById("thisIsTheDumbestThingIHaveEverHadToDo").style =
    //   "overflow: hidden!important";
  }
}
</script>

<style>

</style>