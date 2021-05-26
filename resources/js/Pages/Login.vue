<template>
  <div>
    <!-- Login Form -->
    <div class="login">
      <h3 class="login-title">Login</h3>

      <form @submit.prevent="login" class="needs-validation">
        <!-------------------- USERNAME -------------------->
        <div class="form-group">
          <label for="userEmail">Username/Email</label>
          <input
            type="text"
            v-model="userForm.userEmail"
            id="userEmail"
            name="userEmail"
            class="form-control"
            :class="{
              'is-invalid': isSubmitted && v$.userForm.userEmail.$error,
            }"
          />
          <!-- <div v-if="isSubmitted && !v$.userForm.name.required" class="invalid-feedback"> -->
          <div
            v-if="isSubmitted && v$.userForm.userEmail.$error"
            class="invalid-feedback"
          >
            Please enter your username or email address
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
          <div v-if="isSubmitted && v$.userForm.password.$error" class="invalid-feedback">
            Please enter your password
          </div>
        </div>
        <br />

        <div class="form-group form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" name="remember" />Remember Me
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Check this checkbox to continue.</div>
          </label>
        </div>

        <!-------------------- SUBMIT -------------------->
        <div class="form-group">
          <button class="btn btn-danger btn-block">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
import { getError } from "../utils/helpers";
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
        userEmail: "",
        password: "",
      },
      isSubmitted: false,
    };
  },
  validations: {
    userForm: {
      userEmail: {
        required,
      },
      password: {
        required,
        // minLength: minLength(8),
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
      this.login();
    },
    async login() {
      const payload = {
        email: this.userForm.userEmail,
        password: this.userForm.password,
      };
      this.error = null;
      try {
        await AuthService.login(payload);
        const authUser = await this.$store.dispatch("auth/getAuthUser");
        if (authUser) {
          this.$store.dispatch("auth/setGuest", { value: "isNotGuest" });
          this.$router.push("/courses"); // push home?
        } else {
          const error = Error(
            "Unable to fetch user after login, check your API settings."
          );
          error.name = "Fetch User";
          throw error;
        }
      } catch (error) {
        this.error = getError(error);
      }
    },
  },
};
</script>

<style></style>
