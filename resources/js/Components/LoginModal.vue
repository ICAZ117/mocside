<template>
  <Modal v-if="isShowLogin" @close="toggleLogin">
    <template v-slot:title> Login </template>
    <template v-slot:body>
      <!-- Login Form -->
      <div class="login">
        <form @submit.prevent="login">
          <!-- change from email to username later -->
          <FormInput
            type="email"
            label="Email"
            name="email"
            v-model="email"
            autocomplete="email"
            placeholder="Luke@jedi.com"
            class="mb-2"
          />
          <FormInput
            type="password"
            label="Password"
            name="password"
            v-model="password"
            class="mb-4"
          />
          <div class="flex justify-between">
            <BaseBtn type="submit" text="Login" />
            <!-- <router-link to="/forgot-password" class="text-sm base-link">
              Forgot your password?
            </router-link> -->
          </div>
        </form>
      </div>

      <!-- <div class="login">
        <form action="" class="needs-validation" novalidate>
            <div class="form-group">
                <label for="uname">Username:</label>
                <input type="text" class="form-control" id="uname" placeholder="Enter username" name="uname" required>
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">Please enter your username</div>
            </div>
            <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pswd" required>
                <div class="valid-feedback"></div>
                <div class="invalid-feedback">Please enter your password</div>
            </div>
            <div class="form-group form-check">
                <label class="form-check-label">
                    <input class="form-check-input" type="checkbox" name="remember">Remember Me
                    <div class="valid-feedback">Valid.</div>
                    <div class="invalid-feedback">Check this checkbox to continue.</div>
                </label>
            </div>
            <button type="submit" class="btn btn-danger">Log In</button>
        </form>
        </div> -->
    </template>
  </Modal>
</template>

<script>
import Modal from "../Components/Modal";
import FormInput from "../Components/FormInput";
import BaseBtn from "../Components/BaseBtn";
export default {
  components: { Modal, FormInput, BaseBtn },
  data() {
    return {
      isShowLogin: true,
      email: null,
      password: null,
      error: null,
    };
  },
  methods: {
    async login() {
      // code properly connects to this point

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
          this.$router.push("/dashboard");
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
    toggleLogin() {
      this.isShowLogin = !this.isShowLogin;
    },
  },
};
</script>
