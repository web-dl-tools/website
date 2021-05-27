<template>
  <v-card outlined raised class="pb-1">
    <v-card-title> Register </v-card-title>
    <v-card-subtitle> Register with Web DL. </v-card-subtitle>
    <v-card-text>
      <v-form>
        <v-row class="px-3">
          <v-col cols="12" md="6" class="pa-0 pr-md-2">
            <v-text-field
              v-model="first_name"
              :label="first_name_label"
              :placeholder="first_name_label"
              autocomplete="off"
              class="mb-4"
              color="accent"
              name="firstname"
              type="text"
              autofocus
              flat
              hide-details
              solo-inverted
            />
          </v-col>
          <v-col cols="12" md="6" class="pa-0 pl-md-2">
            <v-text-field
              v-model="last_name"
              :label="last_name_label"
              :placeholder="last_name_label"
              autocomplete="off"
              class="mb-4"
              color="accent"
              id="lastname"
              name="lastname"
              type="text"
              flat
              hide-details
              solo-inverted
            />
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-text-field
              v-model="username"
              :label="username_label"
              :placeholder="username_label"
              autocomplete="off"
              class="mb-4"
              color="accent"
              name="username"
              prepend-inner-icon="mdi-account"
              type="text"
              autofocus
              flat
              hide-details
              solo-inverted
            />
          </v-col>
          <v-col cols="12" class="pa-0">
            <v-text-field
              v-model="password"
              :label="password_label"
              :placeholder="password_label"
              color="accent"
              id="password"
              name="password"
              prepend-inner-icon="mdi-lock"
              type="password"
              flat
              hide-details
              solo-inverted
              v-on:keyup.enter.native="register"
            />
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
    <v-card-actions class="px-4 mb-1">
      <v-row class="px-3">
        <v-col cols="5" md="3" class="py-0 pl-0">
          <v-btn color="grey" tabindex="-1" block large outlined @click="login">
            Login
          </v-btn>
        </v-col>
        <v-col cols="7" md="5" offset-md="4" class="pa-0">
          <v-btn
            :color="error ? 'error' : 'success'"
            :disabled="loading || !valid"
            :loading="loading"
            block
            large
            @click="register"
          >
            Register
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "components.auth.card-login",
  data: () => ({
    first_name: "",
    first_name_label: "First name",
    last_name: "",
    last_name_label: "Last name",
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
     * (Attempt) to register the user details with the API.
     */
    register() {
      if (this.valid) {
        this.error = false;
        this.loading = true;
        this.$store
          .dispatch("users/register", {
            first_name: this.first_name,
            last_name: this.last_name,
            username: this.username,
            password: this.password,
          })
          .catch(() => {
            this.$store.dispatch("application/addMessage", {
              text: `An error occurred when registering.<br />
              <span class="grey--text">Please check your credentials and/or try again later.</span>`,
              type: "error",
              action: null,
              timeout: 3000,
            });
            this.error = true;
          })
          .finally(() => (this.loading = false));
      }
    },
    /**
     * Switch to the login page.
     */
    login() {
      this.$router.push({ name: "login" }).catch(() => {});
    },
  },
  watch: {
    /**
     * Removes the error message if the first name is changed.
     */
    first_name() {
      this.error = false;
    },
    /**
     * Removes the error message if the last name is changed.
     */
    last_name() {
      this.error = false;
    },
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
