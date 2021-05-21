<template>
  <div class="container" style="max-width: 500px; text-align: left">
    <!----------------------- HEADER ----------------------->
    <div class="alert alert-success" role="alert">
      <h2 class="alert-heading">Vue Form Validation Example</h2>
    </div>

    <!--------------------- START FORM --------------------->
    <form @submit.prevent="handleSubmit">
      <!----------------------- NAME ----------------------->
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          v-model="userForm.name"
          id="name"
          name="name"
          class="form-control"
          :class="{ 'is-invalid': isSubmitted && $v.userForm.name.$error }"
        />
        <div v-if="isSubmitted && !$v.userForm.name.required" class="invalid-feedback">
          Name field is required
        </div>
      </div>

      <!--------------------- EMAIL --------------------->
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="userForm.email"
          id="email"
          name="email"
          class="form-control"
          :class="{ 'is-invalid': isSubmitted && $v.userForm.email.$error }"
        />
        <div v-if="isSubmitted && $v.userForm.email.$error" class="invalid-feedback">
          <span v-if="!$v.userForm.email.required">Email field is required</span>
          <span v-if="!$v.userForm.email.email">Please provide valid email</span>
        </div>
      </div>

      <!----------------- PHONE NUMBER ----------------->
      <div class="form-group">
        <label for="mobile">Mobile</label>
        <input
          type="text"
          v-model="userForm.mobile"
          id="mobile"
          name="mobile"
          class="form-control"
          :class="{ 'is-invalid': isSubmitted && $v.userForm.mobile.$error }"
        />
        <div v-if="isSubmitted && $v.userForm.mobile.$error" class="invalid-feedback">
          <span v-if="!$v.userForm.mobile.required">Mobile field is required</span>
        </div>
      </div>

      <!-------------------- GENDER -------------------->
      <div class="form-group">
        <label for="gender">Gender</label>
        <div
          class="form-group"
          :class="{ 'is-invalid': isSubmitted && $v.userForm.gender.$error }"
        >
          <div
            class="form-check form-check-inline"
            :class="{ 'is-invalid': isSubmitted && $v.userForm.gender.$error }"
          >
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              v-model="userForm.gender"
              id="gender1"
              value="male"
            />
            <label class="form-check-label" for="gender1">Male</label>
          </div>
          <div
            class="form-check form-check-inline"
            :class="{ 'is-invalid': isSubmitted && $v.userForm.gender.$error }"
          >
            <input
              class="form-check-input"
              type="radio"
              name="gender"
              v-model="userForm.gender"
              id="gender2"
              value="female"
            />
            <label class="form-check-label" for="gender2">Female</label>
          </div>

          <div v-if="isSubmitted && $v.userForm.gender.$error" class="invalid-feedback">
            <span v-if="!$v.userForm.gender.required">This field is required</span>
          </div>
        </div>
      </div>

      <!------------------- PASSWORD ------------------->
      <div class="form-group">
        <label for="password">Password</label>
        <input
          type="password"
          v-model="userForm.password"
          id="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': isSubmitted && $v.userForm.password.$error }"
        />
        <div v-if="isSubmitted && $v.userForm.password.$error" class="invalid-feedback">
          <span v-if="!$v.userForm.password.required">Password field is required</span>
          <span v-if="!$v.userForm.password.minLength"
            >Password should be at least 5 characters long</span
          >
        </div>
      </div>

      <!---------------- REPEAT PASSWORD ---------------->
      <div class="form-group">
        <label for="confirmPassword">Confirm Password</label>
        <input
          type="password"
          v-model="userForm.confirmPassword"
          id="confirmPassword"
          name="confirmPassword"
          class="form-control"
          :class="{ 'is-invalid': isSubmitted && $v.userForm.confirmPassword.$error }"
        />
        <div
          v-if="isSubmitted && $v.userForm.confirmPassword.$error"
          class="invalid-feedback"
        >
          <span v-if="!$v.userForm.confirmPassword.required"
            >Confirm Password field is required</span
          >
          <span v-else-if="!$v.userForm.confirmPassword.sameAsPassword"
            >Passwords should be matched</span
          >
        </div>
      </div>

      <!------------------ ACCEPT TERMS ------------------>
      <div class="form-group form-check">
        <input
          type="checkbox"
          v-model="userForm.accept"
          @change="$v.userForm.accept.$touch()"
          id="accept"
          class="form-check-input"
        />
        <label
          class="form-check-label"
          :class="{ 'is-invalid': isSubmitted && $v.userForm.accept.$error }"
          for="accept"
          >Accept terms &nbsp; conditions</label
        >

        <div v-if="isSubmitted && $v.userForm.accept.$error" class="invalid-feedback">
          <span v-if="!$v.userForm.accept.required">Accept terms and conditions</span>
        </div>
      </div>

      <!-------------------- SUBMIT -------------------->
      <div class="form-group">
        <button class="btn btn-danger btn-block">Register</button>
      </div>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      userForm: {
        name: "",
        email: "",
        mobile: "",
        gender: "",
        password: "",
        confirmPassword: "",
        accept: "",
      },
      isSubmitted: false,
    };
  },
  validations: {
    userForm: {
      name: {
        required,
      },
      email: {
        required,
        email,
      },
      mobile: {
        required,
      },
      gender: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs("password"),
      },
      accept: {
        required(val) {
          return val;
        },
      },
    },
  },
  methods: {
    handleSubmit() {
      this.isSubmitted = true;

      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      alert("SUCCESS!" + JSON.stringify(this.userForm));
    },
  },
};
</script>

<style></style>
