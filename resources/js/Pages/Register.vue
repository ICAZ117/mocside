<template>
  <div class="container">
    <div class="register">
      <h3 class="register-title">Sign Up</h3>
      <!--------------------- START FORM --------------------->
      <form @submit.prevent="handleSubmit">
        <!-------------------- FIRST NAME -------------------->
        <div class="form-group">
          <label for="fname">First Name</label>
          <input
            type="text"
            v-model="userForm.fname"
            id="fname"
            name="fname"
            class="form-control"
            :class="{ 'is-invalid': isSubmitted && v$.userForm.fname.$error }"
          />
          <!-- <div v-if="isSubmitted && !v$.userForm.name.required" class="invalid-feedback"> -->
          <div
            v-if="isSubmitted && v$.userForm.fname.$error"
            class="invalid-feedback"
          >
            Please enter your first name
          </div>
        </div>
        <br />

        <!-------------------- LAST NAME -------------------->
        <div class="form-group">
          <label for="lname">Last Name</label>
          <input
            type="text"
            v-model="userForm.lname"
            id="lname"
            name="lname"
            class="form-control"
            :class="{ 'is-invalid': isSubmitted && v$.userForm.lname.$error }"
          />
          <!-- <div v-if="isSubmitted && !v$.userForm.name.required" class="invalid-feedback"> -->
          <div
            v-if="isSubmitted && v$.userForm.lname.$error"
            class="invalid-feedback"
          >
            Please enter your last name
          </div>
        </div>
        <br />

        <!-------------------- USERNAME -------------------->
        <div class="form-group">
          <label for="username">Username</label>
          <input
            type="text"
            v-model="userForm.username"
            id="username"
            name="username"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && v$.userForm.username.$error,
            }"
          />
          <!-- <div v-if="isSubmitted && !v$.userForm.name.required" class="invalid-feedback"> -->
          <div
            v-if="isSubmitted && v$.userForm.username.$error"
            class="invalid-feedback"
          >
            Please enter a username
          </div>
        </div>
        <br />

        <!--------------------- EMAIL --------------------->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            v-model="userForm.email"
            id="email"
            name="email"
            class="form-control"
            :class="{ 'is-invalid': isSubmitted && v$.userForm.email.$error }"
          />
          <div
            v-if="isSubmitted && v$.userForm.email.$error"
            class="invalid-feedback"
          >
            <span v-if="v$.userForm.email.required.$invalid"
              >Please enter your email</span
            >
            <span v-if="v$.userForm.email.email.$invalid"
              >Please provide a valid email address
              (rickastley@NeverGonnaGiveYouUp.com)</span
            >
          </div>
        </div>
        <br />
        <!------------------- PASSWORD ------------------->
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            v-model="userForm.password"
            id="password"
            name="password"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && v$.userForm.password.$error,
            }"
            autocomplete="new-password"
          />
          <div
            v-if="isSubmitted && v$.userForm.password.$error"
            class="invalid-feedback"
          >
            <span v-if="v$.userForm.password.required.$invalid"
              >Please enter a password</span
            >
            <span v-if="v$.userForm.password.minLength.$invalid"
              >Passwords must be at <i>LEAST</i> 8 characters long</span
            >
          </div>
        </div>
        <br />
        <!---------------- REPEAT PASSWORD ---------------->
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            type="password"
            v-model="userForm.confirmPassword"
            class="form-control"
            autocomplete="new-password"
          />
          <div
            v-if="isSubmitted && hasError"
            class="invalid-feedback"
          >
            <span v-if="isEmpty"
              >Please re-enter your password</span
            >
            <span
              v-else-if="isDiff"
              >Your passwords don't match!
            </span>
          </div>
        </div>
        <br />

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
import { required, email, minLength } from "@vuelidate/validators";
export default {
  setup() {
    return {
      v$: useVuelidate(),
    };    
  },
  data() {
    return {
      error: null,
      message: null,
      userForm: {
        fname: "",
        lname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
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
      username: {
        required,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
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
    registerUser() {
      this.error = null;
      this.message = null;
      const payload = {
        name: this.userForm.fname + " " + this.userForm.lname,
        email: this.userForm.email,
        password: this.userForm.password,
        password_confirmation: this.userForm.passwordConfirm,
      };
      AuthService.registerUser(payload)
        .then(() => this.$router.push("/login")) // user is logged in via sanctum from register, but not in store
        .catch((error) => (this.error = getError(error)));
    },
  },
  computed: {
    isDiff: function() {
      return this.password != this.confirmPassword;
    },
    isEmpty: function() {
      console.log("This:");
      console.log(this.userForm.confirmPassword);
      console.log("\nNot using this");
      console.log(userForm.confirmPassword);
      return confirmPassword == "";
    },
    hasError: function() {
      return true;
    }
  }
};
</script>