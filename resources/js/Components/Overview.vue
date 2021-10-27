<template>
  <div class="create-assignment">
    <vue-final-modal
        class="delete-modal"
        v-model="showDeleteModal"
        classes="modal-container"
        content-class="modal-content delete-modal"
        :esc-to-close="true"
      >
        <button class="modal-close" @click="closeDeleting()">x</button>
        <div class="delete Course">
          <p>Are you sure you would like to delete this problem</p>
          <div class="delete-buttons">
            <button class="btn btn-md btn-danger delete-button" @click="closeDeleting()">Cancel</button>
            <button class="btn btn-md btn-danger delete-button" @click="deleteProblem()">Delete</button>
          </div>
        </div>
      </vue-final-modal>
    <div class="container">
      <h4>Description:</h4>
      <Tiptap :savedText="JSON.parse(overview)" @input="save" :showMenuBar="true" :isDark="false" />
      <hr />
      <h5>Proceed with caution!</h5>
      <button class="btn btn-danger btn-lg" @click="deleting()">DELETE ASSIGNMENT</button>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import * as API from "../services/API";

export default {
  emits: ["delete-problem"],
  props: {
    overview: {
      type: Object,
      required: true,
    },
    problemID: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      assignmentID: this.problemID,
      newText: {},
      childIsOpen: false,
      showDeleteModal: false,
      reloadDeleteModal: 0,
    };
  },
  methods: {
    timeout: _.debounce(async function (assignmentID) {
      var payload = {
        description: this.newText,
      };
      const res = await API.apiClient.put(`/problems/${assignmentID}`, payload);
    }, 3000),
    save(e) {
      this.newText = e;
      this.timeout(this.assignmentID);
    },
    async deleteProblem() {
      this.childIsOpen = false;
      document.getElementById("out-click").style.display = "none";
      this.closeDeleting();
      await this.$emit("delete-problem");
    },
    closeDeleting() {
      this.showDeleteModal = false;
    },
    deleting() {
      document.getElementById("out-click").style.display = "none";
      this.showDeleteModal = true;
    },
  },
  beforeMount() {
  },
  beforeUnmount() {
    //overview
    console.log("overview unmount");
  },
  mounted() {
  },
};
</script>

<style></style>
