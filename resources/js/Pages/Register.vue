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
            v-model="this.userForm.fname.data"
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
            v-model="this.userForm.lname.data"
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
            v-model="this.userForm.username.data"
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
            v-model="this.userForm.email.data"
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
            v-model="this.userForm.password.data"
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
            v-model="this.userForm.confirmPassword.data"
            id="confirmPassword"
            name="confirmPassword"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && v$.userForm.confirmPassword.$error,
            }"
            autocomplete="new-password"
          />
          <div
            v-if="isSubmitted && v$.userForm.confirmPassword.$error"
            class="invalid-feedback"
          >
            <span v-if="v$.userForm.confirmPassword.required.$invalid"
              >Please re-enter your password</span
            >
            <span
              v-else-if="v$.userForm.confirmPassword.sameAsPassword.$invalid"
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
import { required, email, minLength, sameAs } from "@vuelidate/validators";

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
        fname: {
          data: "",
        },
        lname: {
          data: "",
        },
        username: {
          data: "",
        },
        email: {
          data: "",
          type: "email",
        },
        password: {
          data: "",
          type: "password",
        },
        confirmPassword: {
          data: "",
          type: "password",
        },
      },
      isSubmitted: false,
    };
  },
  validations: {
    userForm: {
      fname: {
        data: { required },
      },
      lname: {
        data: { required },
      },
      username: {
        data: { required },
      },
      email: {
        data: {
          required,
          email,
        },
      },
      password: {
        data: {
          required,
          minLength: minLength(8),
        },
      },
      confirmPassword: {
        data: {
          required,
          sameAsPassword: sameAs(function() {
            return this.userForm.password;
          }),
        },
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
};
</script>
