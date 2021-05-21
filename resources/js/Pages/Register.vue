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

      
</template>

<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";

export default {
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
        minLength: minLength(5),
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
