<template>
  <div v-if="childIsOpen" class="workspace-page">
    <!-- WorkSpace Page-->
    <!-- <button v-if="childIsOpen" @click="unmountingWork()" class="btn btn-danger btn-block">
      Return to Problems
    </button> -->
    <div v-if="childIsOpen">
      <Vue3DraggableResizable
        :initW="instructionsWidth"
        :initH="instructionsHeight"
        v-model:x="x1"
        v-model:y="y1"
        v-model:w="w1"
        v-model:h="h1"
        v-model:active="active"
        :draggable="false"
        :resizable="true"
        :disabledH="true"
        :handles="['mr']"
        :key="reloadSliders"
        class="instructions"
        id="resizeableInstructions"
        v-if="childIsOpen"
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
          :savedText="savedText"
          :editable="false"
          :showMenuBar="false"
          :isDark="true"
          v-if="childIsOpen"
        />
      </Vue3DraggableResizable>
      <Vue3DraggableResizable
        :initW="IDEWidth"
        :initH="IDEHeight"
        v-model:x="x2"
        v-model:y="y2"
        v-model:w="w2"
        v-model:h="h2"
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
          v-if="childIsOpen"
          :width="debouncedWidth"
        />
      </Vue3DraggableResizable>
    </div>
  </div>
</template>

<script>
import * as API from "../../services/API";
import { defineComponent } from "vue";
import Vue3DraggableResizable from "vue3-draggable-resizable";
//default styles
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";

export default defineComponent({
  props: ["problemID", "lang", "labID"],
  emits: ["problemEdited", "deleteMe"],
  components: { Vue3DraggableResizable },

  data() {
    return {
      instructionsHeight: window.innerHeight - 60,
      instructionsWidth: window.innerWidth * 0.33,
      IDEHeight: window.innerHeight - 60,
      IDEWidth: window.innerWidth * 0.67,
      assignment: {},
      title: "",
      description: "",
      code_j: "",
      code_p: "",
      theme: "",
      input: "",
      jID: "",
      pID: "",
      codeID: "",
      forceReload: 0,
      reloadSliders: 0,
      childIsOpen: false,
      saveStatus: "",
      test: {},
      x1: 0,
      y1: 60,
      h1: 0,
      w1: 0,
      x2: window.innerWidth * 0.33,
      y2: 60,
      h2: 0,
      w2: window.innerWidth * 0.67,
      active: true,
      debouncedWidth: window.innerWidth * 0.67,
      savedText: null,
    };
  },
  watch: {
    w2: function () {
      this.w1 = window.innerWidth - this.w2;
    },
    active: function () {
      this.active = true;
    },
  },
  methods: {
    resizeEnd() {
      this.debouncedWidth = this.w2;
    },
    async unmountingWork() {
      //go back in router by 1
      this.$router.go(-1);
    },
	returnToProblems() {
		this.$router.go(-1);
	},
    async getAssignment() {
      //this route needs to be worked on and adjusted
      const rawAssignment = await API.apiClient.get(`/problems/full/${this.problemID}`);
      this.assignment = rawAssignment.data.data;
      this.title = this.assignment.name;
      this.description = this.assignment.description;
      //check if empty....post if empty
      var payload = {
        lang: this.lang,
      };
      const empty = await API.apiClient.post(`/code/check/${this.problemID}`, payload);
      this.test = empty;
      if (
        this.assignment.python_starter == "" ||
        this.assignment.python_starter == null
      ) {
        this.assignment.python_starter = "def main():\n\nmain()";
      }
      if (this.assignment.java_starter == "" || this.assignment.java_starter == null) {
        this.assignment.java_starter =
          "public class Main {\n\tpublic static void main(String[] args) {\n\t\t}}";
      }
      if (empty.data.message == "No progress. Please create.") {
        //create progress
        if (this.lang == "Java") {
          payload = {
            lang: this.lang.toLowerCase(0),
            problem_id: this.problemID,
            code: this.assignment.java_starter,
          };
        } else {
          payload = {
            lang: this.lang.toLowerCase(0),
            problem_id: this.problemID,
            code: this.assignment.python_starter,
          };
        }
        const initial = await API.apiClient.post(`/code`, payload);
        if (this.lang == "Java") {
          this.code_j = this.assignment.java_starter;
          this.codeID = initial.data.id;
        } else {
          this.code_p = this.assignment.python_starter;
          this.codeID = initial.data.id;
        }
      } else {
        //otherwise not empty
        if (this.lang == "Java") {
          this.code_j = empty.data.dump[0].code;
          this.codeID = empty.data.dump[0].id;
        } else {
          this.code_p = empty.data.dump[0].code;
          this.codeID = empty.data.dump[0].id;
        }
      }
      this.forceReload = 1;

      this.savedText = await JSON.parse(this.description)

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
    async getJava(progress) {
      //if first time opening grab template, else grab student code
      var payload = {
        lang: "java",
        problem_id: this.problemID,
        code: this.assignment.java_starter,
      };
      if (progress.length == 0) {
        const res = await API.apiClient.post(`/code`, payload);
        this.jID = res.data.id;
        return this.assignment.java_starter;
      } else {
        for (let i = 0; i < progress.length; i++) {
          if (progress[i].lang == "java") {
            this.jID = progress[i].id;
            return progress[i].code;
          }
        }
        const res = await API.apiClient.post(`/code`, payload);
        this.jID = res.data.id;
        return this.assignment.java_starter;
      }
    },
    async getPython(progress) {
      //if first time opening grab template, else grab student code
      var payload = {
        lang: "python",
        problem_id: this.problemID,
        code: this.assignment.python_starter,
      };
      if (progress.length == 0) {
        const res = await API.apiClient.post(`/code`, payload);
        this.pID = res.data.id;
        return this.assignment.python_starter;
      } else {
        for (let i = 0; i < progress.length; i++) {
          if (progress[i].lang == "python") {
            this.pID = progress[i].id;
            return progress[i].code;
          }
        }
        const res = await API.apiClient.post(`/code`, payload);
        this.pID = res.data.id;
        return this.assignment.python_starter;
      }
    },
    updateContent(e) {
      this.saveStatus = "Saving...";
      if (this.lang == "Java") {
        this.code_j = e.code;
      } else {
        this.code_p = e.code;
      }
      this.timeout();
    },
    timeout: _.debounce(async function () {
      var payload = {};
      if (this.lang == "Java") {
        payload = {
          code: this.code_j,
        };
        const res = await API.apiClient.put(`/code/${this.codeID}`, payload);
      } else {
        payload = {
          code: this.code_p,
        };
        const res = await API.apiClient.put(`/code/${this.codeID}`, payload);
        this.saveStatus = "All changes have been saved";
      }
    }, 1000),
  },
  beforeUnmount() {
    // workspace
    this.childIsOpen = false;
    document.getElementById("thisIsTheDumbestThingIHaveEverHadToDo").style = "";
  },
  async created() {
    this.childIsOpen = true;
    await this.getAssignment();
  },
  mounted() {
    this.reloadSliders++;
    document.getElementById("resizeableInstructions").remove();
    document.getElementById("thisIsTheDumbestThingIHaveEverHadToDo").style =
      "overflow: hidden!important";
  },
});
</script>
