<template>
  <div class="edit-course">
    <h3 class="edit-course-title">Course Editor</h3>
    <div class="course-create-form">
      <form @submit.prevent="handleSubmit" class="course-form">
        <div class="form-group">
          <label for="Course Name">Course Name</label>
          <input
            type="text"
            v-model="courseForm.name"
            id="courseName"
            name="courseName"
            class="form-control"
          />
          <!-- :class="{
              'is-invalid': isSubmitted && v$.userForm.userEmail.$error,
            }" -->
          <!-- <div v-if="isSubmitted && !v$.userForm.name.required" class="invalid-feedback"> -->
          <!-- <div
            v-if="isSubmitted && v$.userForm.userEmail.$error"
            class="invalid-feedback"
          >
            Please enter the Course Name
          </div> -->
        </div>
        <br />

        <div class="form-group">
          <label for="Course Description">Course Description</label>
          <input
            type="text"
            v-model="courseForm.description"
            id="courseDescription"
            name="courseDescription"
            class="form-control"
          />
          <!-- :class="{
              'is-invalid': isSubmitted && v$.userForm.userEmail.$error,
            }" -->
          <!-- <div v-if="isSubmitted && !v$.userForm.name.required" class="invalid-feedback"> -->
          <!-- <div
            v-if="isSubmitted && v$.userForm.userEmail.$error"
            class="invalid-feedback"
          >
            Please enter the Course Name
          </div> -->
        </div>
        <br />

        <div class="form-group">
          <!-- <label for="Course Image">Course Image</label>
          <input
            type="text"
            v-model="courseForm.img"
            id="courseImage"
            name="courseImage"
            class="form-control"
          /> -->
          <!-- :class="{
              'is-invalid': isSubmitted && v$.userForm.userEmail.$error,
            }" -->
          <!-- <div v-if="isSubmitted && !v$.userForm.name.required" class="invalid-feedback"> -->
          <!-- <div
            v-if="isSubmitted && v$.userForm.userEmail.$error"
            class="invalid-feedback"
          >
            Please enter the Course Name
          </div> -->

          <FileUpload label="Upload Course Image" :fileTypes="['image/*']" endpoint="/images/store" @fileUploaded="updateImage" class="p-5 bg-white border rounded shadow"/>
        </div>
        <br />

        <div class="form-group">
          <label for="Course Dates">Course Dates</label>
          <div class="row">
            <input
              type="Date"
              v-model="courseForm.dateStart"
              id="courseDateStart"
              name="courseDateStart"
              class="form-control col-4"
            />
            <input
              type="Date"
              v-model="courseForm.dateEnd"
              id="courseDateEnd"
              name="courseDateEnd"
              class="form-control col-7"
            />
            <!-- :class="{
              'is-invalid': isSubmitted && v$.userForm.userEmail.$error,
            }" -->
            <!-- <div v-if="isSubmitted && !v$.userForm.name.required" class="invalid-feedback"> -->
            <!-- <div
            v-if="isSubmitted && v$.userForm.userEmail.$error"
            class="invalid-feedback"
          >
            Please enter the Course Name
          </div> -->
          </div>
        </div>
        <br />

        <div class="form-group">
          <label for="Course Roster">Course Roster</label>
          <input
            type="text"
            v-model="courseForm.roster"
            id="courseRoster"
            name="courseRoster"
            class="form-control"
          />
          <!-- :class="{
              'is-invalid': isSubmitted && v$.userForm.userEmail.$error,
            }" -->
          <!-- <div v-if="isSubmitted && !v$.userForm.name.required" class="invalid-feedback"> -->
          <!-- <div
            v-if="isSubmitted && v$.userForm.userEmail.$error"
            class="invalid-feedback"
          >
            Please enter the Course Name
          </div> -->
        </div>
        <br />

        <div class="form-group">
          <button class="btn btn-danger btn-block">Submit Changes</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as API from "../services/API";
import FlashMessage from "../Components/FlashMessage";
import FileUpload from "../Components/FileUpload";
export default {
  props: ["courseID"],
  emits: ["edit-unmounting"],
  components: {
    FlashMessage,
    FileUpload,
  },
  data() {
    return {
      error: null,
      message: null,
      courseForm: {
        name: "",
        description: "",
        img: "",
        dateStart: "",
        dateEnd: "",
        roster: "",
      },
      isSubmitted: false,
    };
  },
  methods: {
    async handleSubmit() {
      this.isSubmitted = true;
      var payload = {
        "name": this.courseForm.name,
        "description": this.courseForm.description,
        "img": "",
        "date_start": this.courseForm.dateStart,
        "date_end": this.courseForm.dateEnd,
      }
      const res = await API.apiClient.put(`/courses/${this.courseID}`, payload);
      console.log(res);
    },
    updateImage() {
      console.log("updated the image");
    }
  },
  async mounted() {
    const course = await API.apiClient.get(`/courses/${this.courseID}`);
    this.courseForm.name = course.data.name;
    this.courseForm.description = course.data.description;
    this.courseForm.img = "";
    this.courseForm.dateStart = course.data.start_date;
    this.courseForm.dateEnd = course.data.end_date;
    this.courseForm.roster = JSON.parse(course.data.roster).roster;
  },
  beforeUnmount() {
    this.$emit("edit-unmounting");
  },
};
</script>

<style>
</style>