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
            v-model="state.fname"
            id="fname"
            name="fname"
            class="form-control"
            :class="{ 'is-invalid': isSubmitted && v$.state.fname.$error }"
          />
          <!-- <div v-if="isSubmitted && !v$.name.required" class="invalid-feedback"> -->
          <div
            v-if="isSubmitted && v$.state.fname.$error"
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
            v-model="state.lname"
            id="lname"
            name="lname"
            class="form-control"
            :class="{ 'is-invalid': isSubmitted && v$.state.lname.$error }"
          />
          <!-- <div v-if="isSubmitted && !v$.name.required" class="invalid-feedback"> -->
          <div
            v-if="isSubmitted && v$.state.lname.$error"
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
            v-model="state.username"
            id="username"
            name="username"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && v$.state.username.$error,
            }"
          />
          <!-- <div v-if="isSubmitted && !v$.name.required" class="invalid-feedback"> -->
          <div
            v-if="isSubmitted && v$.state.username.$error"
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
            v-model="state.email"
            id="email"
            name="email"
            class="form-control"
            :class="{ 'is-invalid': isSubmitted && v$.state.email.$error }"
          />
          <div
            v-if="isSubmitted && v$.state.email.$error"
            class="invalid-feedback"
          >
            <span v-if="v$.state.email.required.$invalid"
              >Please enter your email</span
            >
            <span v-if="v$.state.email.$invalid"
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
            v-model="state.password.password"
            id="password"
            name="password"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && v$.state.password.password.$error,
            }"
            autocomplete="new-password"
          />
          <div
            v-if="isSubmitted && v$.state.password.password.$error"
            class="invalid-feedback"
          >
            <span v-if="v$.state.password.password.required.$invalid"
              >Please enter a password</span
            >
            <span v-if="v$.state.password.password.minLength.$invalid"
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
            v-model="state.password.confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && v$.state.password.confirmPassword.$error,
            }"
            autocomplete="new-password"
          />
          <div
            v-if="isSubmitted && v$.state.password.confirmPassword.$error"
            class="invalid-feedback"
          >
            <span v-if="v$.state.password.confirmPassword.required.$invalid"
              >Please re-enter your password</span
            >
            <span
              v-else-if="v$.state.password.confirmPassword.sameAsPassword.$invalid"
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
import { reactive, computed } from 'vue';
import useVuelidate from "@vuelidate/core";
import { required, email, minLength, sameAs } from "@vuelidate/validators";
export default {
  setup() {
    const state = reactive({
      fname: "",
      lname: "",
      email: "",
      username: "",
      password: {
        password: "",
        confirmPassword: "",
      },
    })
    const rules = computed(() => {
      return {
        fname: { required },
        lname: { required },
        username: { required },
        email: { required, email },
        password: {
          password: { required, minLength: minLength(8) },
          confirmPassword: { required, sameAs: sameAs(state.password.password) },
        },
      }
    })
    const v$ = useVuelidate(rules, state)
    return { state, v$ }
  },
  data() {
    return {
      error: null,
      message: null,
      v$: useVuelidate(),
      isSubmitted: false,
    };
  },
  methods: {
    handleSubmit() {
      this.isSubmitted = true;
      this.v$.$touch();
      if(!this.v$.$error) {
        alert('Form Successfully Submitted.');
      }
      else {
        alert(this.v$.error);
      }
      if (this.v$.$invalid) {
        return;
      }
      alert("SUCCESS!");
    },
    registerUser() {
      this.error = null;
      this.message = null;
      const payload = {
        name: state.fname + " " + state.lname,
        email: state.email,
        password: state.password.password,
        password_confirmation: state.password.confirmPassword,
      };
      AuthService.registerUser(payload)
        .then(() => this.$router.push("/login")) // user is logged in via sanctum from register, but not in store
        .catch((error) => (this.error = getError(error)));
    },
  },
};
</script>