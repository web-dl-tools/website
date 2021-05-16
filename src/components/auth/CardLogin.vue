<template>
  <v-card outlined raised class="pb-1">
    <v-card-title> Login </v-card-title>
    <v-card-subtitle> Authenticate with Web DL. </v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="username"
          :label="username_label"
          :placeholder="username_label"
          class="mb-4"
          color="accent"
          name="username"
          prepend-icon="mdi-account"
          type="text"
          autofocus
          flat
          hide-details
          solo-inverted
        />
        <v-text-field
          v-model="password"
          :label="password_label"
          :placeholder="password_label"
          color="accent"
          id="password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          flat
          hide-details
          solo-inverted
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
