<template>
  <div>
    <!-- Login Form -->
    <div class="login">
      <h3 class="login-title">Reset Password</h3>

      <form @submit.prevent="handleSubmit" class="needs-validation">
        <!-------------------- Email -------------------->
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="text"
            v-model="userForm.email"
            id="email"
            name="email"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && v$.userForm.email.$error,
            }"
            autocomplete="email"
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

        <!-------------------- SUBMIT -------------------->
        <div class="form-group">
          <button class="btn btn-danger btn-block">Send Reset Link</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
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
			email: "",
		},
			isSubmitted: false,
		};
	},
	validations: {
		userForm: {
			email: {
				required,
				email
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
			this.forgotPassword();
		},
		async forgotPassword() {
			const payload = {
				email: this.userForm.email,
			};
			this.error = null;
			try {
				//call the route to send the reset link here
				const res = await API.ApiClient.post(`put route path here`).then((response) => {
					console.log(response);
				}).catch((error) => {
					throw error
				});
			} catch (error) {
				this.error = error.response.data.errors.email[0];
				
				if (this.error == "Invalid email or username.") {
					this.$notify({ type: "error", text: "Your email/username does not exist!" });
				}
				else if (this.error == "Invalid password.") {
					this.$notify({ type: "error", text: "Your password is incorrect!" });
				}
			}
		},
	},
}
</script>

<style>

</style>