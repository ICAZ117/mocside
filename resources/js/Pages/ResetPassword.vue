<template>
  <div class="container">
    <div class="password-reset">
      <h3 class="password-reset-title">Reset Password</h3>
      <!--------------------- START FORM --------------------->
      <form @submit.prevent="handleSubmit">
		<!--------------------- EMAIL --------------------->
		
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
          <button class="btn btn-danger btn-block">Reset Password</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
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
		token: null,
		error: null,
		message: null,
		userForm: {
			password: "",
			confirmPassword: "",
		},
		isSubmitted: false,
		};
  	},
	validations: {
		userForm: {
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
			this.resetUserPassword();
		},
		async resetUserPassword() {
			this.error = null;
			this.message = null;
			const payload = {
				email: this.userForm.email, // we will need to make the box for this
				password: this.userForm.password,
				password_confirmation: this.userForm.confirmPassword,
				token: this.token,
			};

			// AuthService.registerUser(payload)
			//   .then(() => this.$router.push("/login")) // user is logged in via sanctum from register, but not in store
			//   .catch((error) => (this.error = getError(error)));

			const res = await AuthService.resetPassword(payload)
				// .then(() => this.$router.push("/login"))
				// .catch((error) => (this.error = getError(error)));

			const self = this;
			var flag = true;
			//res to reset the password with new value
			//do a .catch(function(error) {
				//with error handling here and set the flag to false if not completed?
			// })

			if(flag) {
				

				// now, push to courses
				this.$router.push('/courses'); // this will get them properly authorized,
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
  	mounted() {
		this.token = this.$route.query.token;
	}
}
</script>

<style>

</style>