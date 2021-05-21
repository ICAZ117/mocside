<template>
  <div>
    <!-- Login Form -->
    <div class="login">
      <h3 class="login-title">Login</h3>
      <form @submit.prevent="validate" class="needs-validation">
        <div class="form-group">
          <label for="uname">Username:</label>
          <input
            type="text"
            class="form-control"
            id="uname"
            placeholder="Enter username"
            name="uname"
            required
          />
          <div class="valid-feedback"></div>
          <div class="invalid-feedback">Please enter your username</div>
        </div>
        <div class="form-group">
          <label for="pwd">Password:</label>
          <input
            type="password"
            class="form-control"
            id="pwd"
            placeholder="Enter password"
            name="pswd"
            required
          />
          <div class="valid-feedback"></div>
          <div class="invalid-feedback">Please enter your password</div>
        </div>
        <div class="form-group form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" name="remember" />Remember Me
            <div class="valid-feedback">Valid.</div>
            <div class="invalid-feedback">Check this checkbox to continue.</div>
          </label>
        </div>
        <button type="submit" class="btn btn-danger">Log In</button>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";
import { getError } from "../utils/helpers";
export default {
  data() {
    return {
      email: null,
      password: null,
      error: null,
    };
  },
  methods: {
    validate() {
      console.log("Inside validate");
      ("use strict");
      window.addEventListener(
        "load",
        function () {
          // Get the forms we want to add validation styles to
          var forms = document.getElementsByClassName("needs-validation");
          // Loop over them and prevent submission
          var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener(
              "submit",
              function (event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                form.classList.add("was-validated");
              },
              false
            );
          });
        },
        false
      );
    },
    async login() {
      const payload = {
        email: this.email,
        password: this.password,
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
