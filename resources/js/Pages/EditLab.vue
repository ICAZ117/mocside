<template>
  <div class="edit-course">
    <h3 class="edit-course-title">Edit Lab</h3>
    <div class="course-create-form">
      <form @submit.prevent="handleSubmit" class="course-form">
        <div class="form-group">
          <label for="Lab Name">Lab Name</label>
          <input
            type="text"
            v-model="labForm.name"
            id="labName"
            name="labName"
            class="form-control"
          />
        </div>
        <br />

        <div class="form-group">
          <label for="Lab Description">Lab Description</label>
          <input
            type="text"
            v-model="labForm.description"
            id="labDescription"
            name="labDescription"
            class="form-control"
          />
        </div>
        <br />

        <div class="form-group">
          <label for="Lab Due Date">Lab Due Date</label>
          <div class="row">
            <input
              type="Date"
              v-model="labForm.dateDue"
              id="labDateDue"
              name="labDateDue"
              class="form-control col-4"
            />
            <input type="time" v-model="labForm.timeDue">
          </div>
        </div>
        <br />

		<div class="form-group">
          <label for="Lab Publish Date">Lab Publish Date</label>
          <div class="row">
            <input
              type="Date"
              v-model="labForm.datePublish"
              id="labDatePublish"
              name="labDatePublish"
              class="form-control col-4"
            />
          </div>
        </div>
        <br />

        <div class="form-group">
          <button @click="handleSubmit" class="btn btn-danger btn-block">Submit Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as API from "../services/API";
export default {
  props: ["labID", "courseID"],
  emits: ["unmounting", "labEdited"],
  data() {
    return {
      labForm: {
		    name: "",
		    description: "",
		    dateDue: null,
        timeDue: null,
		    datePublish: null,
	    },
	    isSubmitted: false,
    };
  },
  methods: {
	  async handleSubmit() {
		  this.isSubmitted = true;
		  var payload = {
			  name: this.labForm.name,
			  description: this.labForm.description,
			  due_date: this.labForm.dateDue,
			  publish_date: this.labForm.datePublish,
		  }
		  const res = await API.apiClient.put(`/labs/${this.labID}`, payload);
      this.$router.push({name: "Labs", params: { courseID: courseID }});
	  },
  },
  async mounted() {
	const Lab = await API.apiClient.get(`/labs/full/${this.labID}`);
	this.labForm.name = Lab.data.data.name;
	this.labForm.description = Lab.data.data.description;
	this.labForm.dateDue = Lab.data.data.due_date.split(" ")[0];
	this.labForm.datePublish = Lab.data.data.publish_date;
  },
};
</script>

<style>
</style>