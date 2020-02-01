<template>
  <v-card outlined class="card-single-card mt-12">
    <v-card-title>
      Login
    </v-card-title>
    <v-card-subtitle>
      Authenticate with Web DL.
    </v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-text-field
          label="Login"
          name="login"
          prepend-icon="mdi-account"
          type="text"
          v-model="username"
          clearable
        />

        <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model="password"
          clearable
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn text color="secondary">Register</v-btn>
      <v-btn
        :color="error ? 'error' : 'primary'"
        :loading="loading"
        :disabled="loading || !valid"
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
    error: false
  }),
  computed: {
    valid() {
      return !!(this.username && this.password);
    }
  },
  methods: {
    login() {
      if (this.valid) {
        this.error = false;
        this.loading = true;
        this.$store
          .dispatch("application/login", {
            username: this.username,
            password: this.password
          })
          .catch(() => (this.error = true))
          .finally(() => (this.loading = false));
      }
    }
  },
  watch: {
    username() {
      this.error = false;
    },
    password() {
      this.error = false;
    }
  }
};
</script>
