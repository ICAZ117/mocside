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
            type="text"
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

        <!--------------------- FSCID --------------------->
        <div class="form-group">
          <label for="email">FSC ID</label>
          <input
            type="number"
            v-model="userForm.fscid"
            id="fscid"
            name="fscid"
            class="form-control"
            :class="{ 'is-invalid': isSubmitted && v$.userForm.fscid.$error }"
          />
          <div
            v-if="isSubmitted && v$.userForm.fscid.$error"
            class="invalid-feedback"
          >
            <span v-if="v$.userForm.fscid.required.$invalid"
              >Please enter your FSC ID</span
            >
            <span v-if="v$.userForm.fscid.integer.$invalid"
              >Bruh. That needs to be a number smh</span
            >
            <span v-if="v$.userForm.fscid.between.$invalid"
              >ID's are between 0-10000000 big brain</span
            >
            <span v-if="v$.userForm.fscid.minLength.$invalid"
              >All ID's are 7 digits long</span
            >
            <span v-if="v$.userForm.fscid.maxLength.$invalid"
              >All ID's are 7 digits long</span
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
              >Please enter a password <br></span
            >
            <span v-if="v$.userForm.password.minLength.$invalid"
              >Passwords must be at <i>LEAST</i>&nbsp;&nbsp;10 characters long <br></span
            >
            <span v-if="v$.userForm.password.mustContainLower.$invalid">Passwords must contain a lowercase character <br></span>
            <span v-if="v$.userForm.password.mustContainUpper.$invalid">Passwords must contain an uppercase character <br></span>
            <span v-if="v$.userForm.password.mustContainNumber.$invalid">Passwords must contain a numeric character <br></span>
            <span v-if="v$.userForm.password.mustContainSymbol.$invalid">Passwords must contain a symbol <br></span>
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
            :class="{
              'is-invalid': isSubmitted && hasError,
            }"
            autocomplete="new-password"
          />
          <div
            v-if="hasError"
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
import { getError } from "../utils/helpers";
import { required, email, minLength, maxLength, between, integer } from "@vuelidate/validators";
import AuthService from "../services/AuthService";
import * as API from "../services/API";
const mustContainLower = (value) => /[a-z]/.test(value);
const mustContainUpper = (value) => /[A-Z]/.test(value);
const mustContainNumber = (value) => /\d/.test(value);
const mustContainSymbol = (value) => (/\W/).test(value);
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
        fscid: "",
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
      fscid: {
        required,
        between: between(0, 10000000),
        minLength: minLength(7),
        maxLength: maxLength(7),
        integer,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(10),
        mustContainLower,
        mustContainUpper,
        mustContainNumber,
        mustContainSymbol
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
      this.registerUser();
    },
    async registerUser() {
      this.error = null;
      this.message = null;
      const payload = {
        name: this.userForm.fname + " " + this.userForm.lname,
        username: this.userForm.username,
        email: this.userForm.email,
        fsc_id: this.userForm.fscid,
        password: this.userForm.password,
        password_confirmation: this.userForm.confirmPassword,
      };

      // AuthService.registerUser(payload)
      //   .then(() => this.$router.push("/login")) // user is logged in via sanctum from register, but not in store
      //   .catch((error) => (this.error = getError(error)));

      const self = this;
      var flag = true;
      const res = await AuthService.registerUser(payload).catch(function (error) {
        if(error.response.data.errors.hasOwnProperty("email")) {
          self.$notify({ type: "error", text: "An account with your email already exists!" });
          flag = false;
        }
        if(error.response.data.errors.hasOwnProperty("username")) {
          self.$notify({ type: "error", text: "An account with your username already exists!" });
          flag = false;
        }
        if(error.response.data.errors.hasOwnProperty("fsc_id")) {
          self.$notify({ type: "error", text: "An account with your FSC ID already exists!" });
          flag = false;
        }
      });

      if(flag) {
        // then, create student. Any user signed up from the front end STARTS as a student.
        // is there a chance this doesn't work? (CSRF mismatch, likely)
        const res2 = await API.apiClient.post('/students', { fsc_id: payload.fsc_id });

        // if we've made it this far, they have a student (probably), and we can push to login
        // but not before we init gradebook!
        const res3 = await API.apiClient.post(`/gradebook/init/${res2.data.data.id}`, { scope: "student" });
        const res4 = await API.apiClient.post('/progress');

        //update user record in store to get new pfp path?
        var au = await this.$store.dispatch("auth/getAuthUser");
        if(this.authUser != null) {
          this.pfp = au.pfp_path;
          if(this.pfp == undefined || this.pfp == null) {
            this.pfp = "images/DefaultPFP.png?dca25dcd82b7a37cf8c8334dbf19eb69=";
          }
          document.getElementById("d_navpfp").src = this.pfp;
          document.getElementById("l_navpfp").src = this.pfp;
        }

        // now, push to login
        this.$router.push('/courses'); // this will get them properly authorized,
        // and in the future possibly aid email verification.
      }
      
    },
  },
  computed: {
    isDiff: function() {
      return this.userForm.password != this.userForm.confirmPassword;
    },
    isEmpty: function() {
      return this.userForm.confirmPassword == "";
    },
    hasError: function() {
      return this.isEmpty || this.isDiff;
    }
  },
};
</script>