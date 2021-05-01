<template>
  <v-card outlined raised class="pb-1">
    <v-card-title> Login </v-card-title>
    <v-card-subtitle> Authenticate with Web DL. </v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-text-field
          class="pr-3"
          v-model="username"
          color="accent"
          label="Username"
          name="username"
          prepend-icon="mdi-account"
          type="text"
          autofocus
        />
        <v-text-field
          class="pr-3"
          v-model="password"
          color="accent"
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          hide-details
          v-on:keyup.enter.native="login"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn
        class="mr-2"
        :color="error ? 'error' : 'white'"
        :disabled="loading || !valid"
        :loading="loading"
        text
        @click="login"
      >
        Login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "components.auth.card-login",
  data: () => ({
    username: "",
    password: "",
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
          .catch(() => (this.error = true))
          .finally(() => (this.loading = false));
      }
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
