<template>
  <div class="container">
    <div class="login">
      <h3 class="login-title">Sign Up</h3>
      <!--------------------- START FORM --------------------->
      <form @submit.prevent="handleSubmit">
        <!-------------------- FIRST NAME -------------------->
        <div class="form-group">
          <label for="fname">First Name</label>
          <input
            type="text"
            v-model="this.userForm.fname"
            id="fname"
            name="fname"
            class="form-control"
            :class="{ 'is-invalid': isSubmitted && v$.userForm.fname.$error }"
          />
          <!-- <div v-if="isSubmitted && !v$.userForm.name.required" class="invalid-feedback"> -->
          <div v-if="isSubmitted && v$.userForm.fname.$error" class="invalid-feedback">
            Please enter your first name
          </div>
        </div>

        <!-------------------- LAST NAME -------------------->
        <div class="form-group">
          <label for="lname">Last Name</label>
          <input
            type="text"
            v-model="this.userForm.lname"
            id="lname"
            name="lname"
            class="form-control"
            :class="{ 'is-invalid': isSubmitted && v$.userForm.lname.$error }"
          />
          <!-- <div v-if="isSubmitted && !v$.userForm.name.required" class="invalid-feedback"> -->
          <div v-if="isSubmitted && v$.userForm.lname.$error" class="invalid-feedback">
            Please enter your last name
          </div>
        </div>

        <!-- REMOVED CODE GOES HERE -->

        <!-------------------- SUBMIT -------------------->
        <div class="form-group">
          <button class="btn btn-danger btn-block">Register</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
// import { required, email, minLength, sameAs } from "@vuelidate/validators";
import { required } from "@vuelidate/validators";

export default {
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  data() {
    return {
      userForm: {
        fname: "",
        lname: "",
        // email: "",
        // password: "",
        // confirmPassword: "",
        // accept: "",
      },
      isSubmitted: false,
    };
  },
  validations: {
    userForm: {
      fname: {
        required,
      },
      lname: {
        required,
      },
      // email: {
      //   required,
      //   email,
      // },
      // password: {
      //   required,
      //   minLength: minLength(8),
      // },
      // confirmPassword: {
      //   required,
      //   sameAsPassword: sameAs("password"),
      // },
      // accept: {
      //   required(val) {
      //     return val;
      //   },
      // },
    },
  },
  methods: {
    handleSubmit() {
      this.isSubmitted = true;

      this.v$.$touch();
      if (this.v$.$invalid) {
        return;
      }

      alert("SUCCESS!" + JSON.stringify(this.userForm));
    },
  },
};
</script>

<style></style>
