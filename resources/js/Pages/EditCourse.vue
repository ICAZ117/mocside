<template>
  <div class="edit-course">
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
          <label for="Course Image">Course Image</label>
          <input
            type="text"
            v-model="courseForm.img"
            id="courseImage"
            name="courseImage"
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
          <label for="Course Date">Course Date</label>
          <input
            type="text"
            v-model="courseForm.date"
            id="courseDate"
            name="courseDate"
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
          <button class="btn btn-danger btn-block">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["edit-unmounting"],
  data() {
    return {
      error: null,
      message: null,
      courseForm: {
        name: "",
        description: "",
        img: "",
        date: "",
        roster: "",
      },
      isSubmitted: false,
    };
  },
  methods: {
    handleSubmit() {
      this.isSubmitted = true;
      //   this.v$.$touch();
      //   if (this.v$.$invalid) {
      //     return;
      //   }
      //   this.login();
      console.log("handles submit");
    },
  },
  beforeUnmount() {
    this.$emit("edit-unmounting");
  },
};
</script>

<style>
</style>