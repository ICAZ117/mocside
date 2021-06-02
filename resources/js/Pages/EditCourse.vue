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
          <div class="mb-4">
            <label for="file" class="sr-only">
              Upload Course Image
            </label>
            <input type="file" :accept="['image/*']" @change="fileChange" id="file"/>
          </div>
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
          <!-- <input
            type="text"
            v-model="courseForm.roster"
            id="courseRoster"
            name="courseRoster"
            class="form-control"
          /> -->
          <ul>
            <li v-for="student in students" :key="student.id">{{ student.name }}</li>
          </ul>
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
import { getError } from "../utils/helpers";
import FileService from "../services/FileService";
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
        roster: [],
      },
      isSubmitted: false,
      file: null,
      endpoint: "/images/store",
      students: [],
    };
  },
  methods: {
    async handleSubmit() {
      this.isSubmitted = true;
      await this.uploadImage();
      var payload = {
        name: this.courseForm.name,
        description: this.courseForm.description,
        img_loc: this.courseForm.img,
        start_date: this.courseForm.dateStart,
        end_date: this.courseForm.dateEnd,
      };
      const res = await API.apiClient.put(`/courses/${this.courseID}`, payload);
      console.log(res);
    },
    updateImage() {
      console.log("updated the image");
    },
    clearMessage() {
      this.error = null;
      this.message = null;
    },
    fileChange(event) {
      this.clearMessage();
      this.file = event.target.files[0];
    },
    async uploadImage() {
      if(this.file != null) {
        const payload = {};
        const formData = new FormData();
        formData.append("file", this.file);
        payload.file = formData;
        payload.endpoint = this.endpoint;
        this.clearMessage();
        try {
          const response = await FileService.uploadFile(payload);
          this.message = "File uploaded.";
          console.log(response.data.asset_link);
          this.courseForm.img = response.data.asset_link;
        }
        catch(error) {
        this.error = getError(error);
        }
      }
    },
    async removeStudent() {
      //remove student ID from course's roster list

      //remove course ID from student's courses list
    },
    async getStudents() {
      for (let i = 0; i < this.courseForm.roster.length; i++) {
        const res = await API.apiClient.get(`/students/${this.courseForm.roster[i]}`);
        this.students.push(res.data.data);
      }
    },
  },
  async mounted() {
    const course = await API.apiClient.get(`/courses/${this.courseID}`);
    this.courseForm.name = course.data.name;
    this.courseForm.description = course.data.description;
    this.courseForm.img = course.data.img_loc;
    this.courseForm.dateStart = course.data.start_date;
    this.courseForm.dateEnd = course.data.end_date;
    this.courseForm.roster = JSON.parse(course.data.roster).roster;
    this.getStudents();
  },
  beforeUnmount() {
    this.$emit("edit-unmounting");
  },
};
</script>

<style>
</style>