<template>
  <!-- Main Page-->
  <button
    v-if="childIsOpen"
    @click="this.$emit('unmounting')"
    class="btn btn-danger btn-block"
  >
    Return to Problems
  </button>
  <Vue3DraggableResizable
    :initW="110"
    v-model:x="x"
    v-model:y="y"
    v-model:w="w"
    v-model:h="h"
    v-model:active="active"
    :draggable="false"
    :resizable="true"
    :disabledH="true"
    :handles="['mr']"
    @activated="print('activated')"
    @deactivated="print('deactivated')"
    @drag-start="print('drag-start')"
    @resize-start="print('resize-start')"
    @dragging="print('dragging')"
    @resizing="print('resizing')"
    @drag-end="print('drag-end')"
    @resize-end="print('resize-end')"
    @click="active = true"
    class="instructions"
  >
    <h4>{{ title }}</h4>
    <hr class="instructions-hr" />
    <Tiptap
      :savedText="JSON.parse(description)"
      :editable="false"
      :showMenuBar="false"
      :isDark="true"
      v-if="childIsOpen"
    />
  </Vue3DraggableResizable>

  <div v-if="childIsOpen" class="row">
    <!-- <div class="instructions col-4 p-4">
      
    </div> -->
    <div class="col-8"></div>
    <!-- <IDE
      class="col-8"
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
    /> -->
  </div>
</template>

<script>
import * as API from "../services/API";
import { defineComponent } from "vue";
import Vue3DraggableResizable from "vue3-draggable-resizable";
//default styles
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";

export default defineComponent({
  props: ["problemID", "lang", "labID"],
  emits: ["unmounting", "problemEdited"],
  components: { Vue3DraggableResizable },

  data() {
    return {
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
      childIsOpen: false,
      saveStatus: "",
      test: {},
      x: 0,
      y: 98,
      h: 100,
      w: 100,
      active: true,
    };
  },
  methods: {
    print(val) {
      console.log(val);
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
        const initial = await API.apiClient.post(`/code/`, payload);
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
        const res = await API.apiClient.post(`/code/`, payload);
        this.jID = res.data.id;
        // console.log("Got Java");
        return this.assignment.java_starter;
      } else {
        for (let i = 0; i < progress.length; i++) {
          if (progress[i].lang == "java") {
            console.log("Got Java");
            this.jID = progress[i].id;
            return progress[i].code;
          }
        }
        const res = await API.apiClient.post(`/code/`, payload);
        this.jID = res.data.id;
        // console.log("Got Java");
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
        const res = await API.apiClient.post(`/code/`, payload);
        this.pID = res.data.id;
        return this.assignment.python_starter;
      } else {
        for (let i = 0; i < progress.length; i++) {
          if (progress[i].lang == "python") {
            this.pID = progress[i].id;
            return progress[i].code;
          }
        }
        const res = await API.apiClient.post(`/code/`, payload);
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
    this.$emit("unmounting");
    this.childIsOpen = false;
  },
  async created() {
    this.childIsOpen = true;
    await this.getAssignment();
  },
});
</script>
<style scoped>
.resizable-content {
  height: 100%;
  width: 100%;
}

.vdr-container.active {
  background-color: lightcoral;
}

.vdr-handle {
  height: 100% !important;
  top: 0 !important;
  bottom: 0 !important;
  margin: 0 !important;
  display: block !important;
}
</style>
