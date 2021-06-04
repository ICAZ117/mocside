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
            <li v-for="(student, key) in students" :key="student.id">{{ student.name }}
              <a @click="removeStudent(student, key)">X</a>
            </li>
          </ul>
        </div>
        <br />

        <div class="form-group">
          <label for="AddStudent">Add Student by ID</label>
          <div class="row">
            <input
              type="number"
              v-model="studentID"
              id="AddStudent"
              name="AddStudent"
              class="form-control col-7"
            />
          </div>
          <button @click="addStudent" class="btn btn-danger btn-block">Add Student</button>
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
  emits: ["unmounting", "courseEdited"],
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
      studentID: "",
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
      alert("Processed finished with status code: " + res.statusCode);
      this.$emit("courseEdited");
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
    async removeStudent(student, index) {
      //remove student ID from course's roster list
      for(let i = 0; i<this.courseForm.roster.length; i++) {
        if(this.courseForm.roster[i] == student.fsc_user.fsc_id) {
          this.courseForm.roster.splice(i, 1);
          break;
        }
      }
      const res = await this.updateRoster();

      //remove course ID from student's courses list
      var courses = JSON.parse(student.fsc_user.courses).courses;
      for (let i = 0; i < courses.length; i++) {
        if(courses[i] == this.courseID) {
          courses.splice(i, 1);
          break;
        }
      }
      const res2 = await this.updateStudentCourses(courses);

      //remove student object from list
      this.students = this.students.filter((user, i) => i  != index);
    },
    async getStudents() {
      for (let i = 0; i < this.courseForm.roster.length; i++) {
        const res = await API.apiClient.get(`/students/${this.courseForm.roster[i]}`);
        this.students.push(res.data.data);
      }
    },
    async addStudent() {
      try {
        const stud = await this.getStudent();

        this.courseForm.roster.push(this.studentID);
        const res = await this.updateRoster();

        var courses = JSON.parse(stud.data.data.fsc_user.courses).courses;
        courses.push(this.courseID);
        const res2 = await this.updateStudentCourses(courses);

        //at end add to the students list
        this.students.push(stud.data.data);
      }
      catch (error) {
        console.log(error);
      }
    },
    async getStudent() {
      return await API.apiClient.get(`/students/${this.studentID}`);
    },
    async updateRoster() {
      var payload = {
        "roster": JSON.stringify({"roster": this.courseForm.roster}),
      }
      return await API.apiClient.put(`/courses/${this.courseID}`, payload);
    },
    async updateStudentCourses(courses) {
      payload = {
        "courses": JSON.stringify({"courses": courses}),
      }
      return await API.apiClient.put(`/students/${stud.data.data.fsc_user.fsc_id}`, payload);
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
    this.$emit("unmounting");
  },
};
</script>

<style>
</style>