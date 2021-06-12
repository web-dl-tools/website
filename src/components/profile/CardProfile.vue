<template>
  <div>
    <v-card raised v-if="!user">
      <v-skeleton-loader type="article" />
    </v-card>
    <v-card raised class="pb-1" v-else>
      <v-card-title>
        Information
        <v-spacer />
        <v-btn
          v-show="!edit"
          class="float-right"
          color="warning"
          icon
          small
          @click="edit = true"
        >
          <v-icon> mdi-account-edit-outline </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle class="subtitle-2 col-8 pl-4">
        Hi {{ user.full_name }}, below you can {{ edit ? "edit" : "find" }} your
        account details stored in Web DL.
      </v-card-subtitle>
      <v-card-text v-if="!edit">
        <v-row>
          <v-col cols="4" class="pb-0 font-weight-regular"> Username </v-col>
          <v-col cols="8" class="pb-0">
            {{ user.username }}
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" class="pb-0 font-weight-regular"> First name </v-col>
          <v-col cols="8" class="pb-0">
            {{ user.first_name }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0 font-weight-regular"> Last name </v-col>
          <v-col cols="8" class="py-0">
            {{ user.last_name }}
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" class="pb-0 font-weight-regular"> Joined on </v-col>
          <v-col cols="8" class="pb-0">
            {{ formatDate(user.date_joined, "dddd LL [at] HH:mm:ss") }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0"></v-col>
          <v-col cols="8" class="py-0 text-capitalize-sentence">
            {{ formatDateFromNow(user.date_joined) }}
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else>
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
            <v-col cols="12" md="6" class="pa-0 pr-md-2">
              <v-text-field
                v-model="first_name"
                :label="first_name_label"
                autocomplete="off"
                class="mb-4 mb-md-0"
                color="accent"
                name="firstname"
                type="text"
                flat
                hide-details
                outlined
              />
            </v-col>
            <v-col cols="12" md="6" class="pa-0 pl-md-2">
              <v-text-field
                v-model="last_name"
                :label="last_name_label"
                autocomplete="off"
                class="mb-0"
                color="accent"
                id="lastname"
                name="lastname"
                type="text"
                flat
                hide-details
                outlined
              />
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions v-show="edit" class="px-4 pb-3">
        <v-row class="px-3">
          <v-col cols="5" md="3" class="py-0 pl-0">
            <v-btn
              color="grey"
              tabindex="-1"
              block
              large
              outlined
              @click="edit = false"
            >
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="7" md="5" offset-md="4" class="pa-0">
            <v-btn
              :color="error ? 'error' : 'success'"
              :disabled="!this.username"
              :loading="loading"
              block
              large
              @click="update"
            >
              Update
            </v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "components.profile.card-profile",
  mixin: [formatters],
  data: () => ({
    edit: false,
    loading: false,
    error: false,
    username: "",
    username_label: "Username",
    first_name: "",
    first_name_label: "First name",
    last_name: "",
    last_name_label: "Last name",
  }),
  computed: {
    ...mapGetters({
      user: "users/getMe",
    }),
  },
  methods: {
    /**
     * (Attempt) to update the user details with the API.
     */
    update() {
      if (this.username) {
        this.error = false;
        this.loading = true;
        this.$store
          .dispatch("users/update", {
            id: this.user.id,
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
          })
          .then(() => (this.edit = false))
          .catch(() => {
            this.$store.dispatch("application/addMessage", {
              text: `An error occurred when updating.<br />
              <span class="grey--text">Please check your details and/or try again later.</span>`,
              type: "error",
              action: null,
              timeout: 3000,
            });
            this.error = true;
          })
          .finally(() => (this.loading = false));
      }
    },
  },
  watch: {
    /**
     * Clone the user properties to local properties whenever new changes come in.
     */
    user(n) {
      this.username = n.username;
      this.first_name = n.first_name;
      this.last_name = n.last_name;
    },
    /**
     * Removes the error message if the username is changed.
     */
    first_name() {
      this.error = false;
    },
    /**
     * Removes the error message if the username is changed.
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
  },
};
</script>
