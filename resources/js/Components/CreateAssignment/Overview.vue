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
      <div style="height: 65%;">
        <Tiptap :savedText="content" @input="save" :showMenuBar="true" :isDark="false" />
        <hr />
        <h5>Proceed with caution!</h5>
        <button class="btn btn-danger btn-lg" @click="deleting()">DELETE ASSIGNMENT</button>
      </div>
      
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import * as API from "../../services/API";

export default {
  emits: ["delete"],
  props: {
    overview: {
      type: String,
      required: true,
    },
    problemID: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showDeleteModal: false,
      reloadDeleteModal: 0,
      newText: {},
      content: null
    }
  },
  methods: {

    //deleting
    deleting() {
      this.showDeleteModal = true;
    },
    closeDeleting() {
      this.showDeleteModal = false;
    },
    async deletProblem() {
      this.closeDeleting();
      await this.$emit("delete");
    },

    //save the overview
    save(e) {
      this.newText = e;
      this.timeout(this.problemID);
    },

    //pass the new overview to the backend
    timeout: _.debounce(async function (assignmentID) {
      const payload = {
        description: this.newText,
      };
      const res = await API.apiClient.put(`/problems/${assignmentID}`, payload);
    }, 3000),

  },
  async mounted() {
    this.content = await JSON.parse(this.overview);
  }

}
</script>

<style>

</style>