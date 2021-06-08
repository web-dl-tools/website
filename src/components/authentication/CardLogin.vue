<template>
  <v-card outlined raised class="pb-1">
    <v-card-title> Login </v-card-title>
    <v-card-subtitle> Authenticate with Web DL. </v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-row class="px-3">
          <v-col cols="12" class="pa-0">
            <v-text-field
              v-model="username"
              :label="username_label"
              autocomplete="off"
              class="mb-4"
              color="accent"
              name="username"
              prepend-inner-icon="mdi-account"
              type="text"
              autofocus
              flat
              hide-details
              outlined
            />
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-text-field
              v-model="password"
              :label="password_label"
              color="accent"
              id="password"
              name="password"
              prepend-inner-icon="mdi-lock"
              type="password"
              flat
              hide-details
              outlined
              v-on:keyup.enter.native="login"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="px-4 mb-1">
      <v-row class="px-3">
        <v-col cols="5" md="3" class="py-0 pl-0">
          <v-btn
            color="grey"
            tabindex="-1"
            block
            large
            outlined
            @click="register"
          >
            Register
          </v-btn>
        </v-col>
        <v-col cols="7" md="5" offset-md="4" class="pa-0">
          <v-btn
            :color="error ? 'error' : 'success'"
            :disabled="!valid"
            :loading="loading"
            block
            large
            @click="login"
          >
            Login
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "components.authentication.card-login",
  data: () => ({
    username: "",
    username_label: "Username",
    password: "",
    password_label: "Password",
    loading: false,
    error: false,
  }),
  computed: {
    /**
     * Check if required fields have been filled in.
     *
     * @returns {boolean}
     */
    valid() {
      return !!(this.username && this.password);
    },
  },
  methods: {
    /**
     * (Attempt) to authenticate the login credentials with the API.
     */
    login() {
      if (this.valid) {
        this.error = false;
        this.loading = true;
        this.$store
          .dispatch("application/login", {
            username: this.username,
            password: this.password,
          })
          .catch(() => {
            this.error = true;
            this.$store.dispatch("application/addMessage", {
              text: `An error occurred when logging in.<br />
              <span class="grey--text">Please check your credentials and/or try again later.</span>`,
              type: "error",
              action: null,
              timeout: 3000,
            });
          })
          .finally(() => (this.loading = false));
      }
    },
    /**
     * Switch to the register page.
     */
    register() {
      this.$router.push({ name: "register" }).catch(() => {});
    },
  },
  watch: {
    /**
     * Removes the error message if the username is changed.
     */
    username() {
      this.error = false;
    },
    /**
     * Removed the error message if the password is changed.
     */
    password() {
      this.error = false;
    },
  },
};
</script>
