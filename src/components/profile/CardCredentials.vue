<template>
  <div>
    <v-card outlined raised v-if="!user">
      <v-skeleton-loader type="article" />
    </v-card>
    <v-card outlined raised class="pb-1" v-else>
      <v-card-title>
        Credentials
        <v-spacer />
        <v-btn
          v-show="!edit"
          class="float-right"
          color="warning"
          icon
          small
          @click="edit = true"
        >
          <v-icon> mdi-account-lock-outline </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle class="subtitle-2 col-8 pl-4">
        {{ edit ? "Edit your" : "Your" }} account credentials in Web DL.
      </v-card-subtitle>
      <v-card-text class="pb-3" v-if="!edit">
        <v-row>
          <v-col cols="4" class="pb-0 font-weight-regular"> Password </v-col>
          <v-col cols="8" class="pb-0"> *********** </v-col>
        </v-row>
      </v-card-text>
      <v-card-text v-else>
        <v-form>
          <v-row class="px-3">
            <v-col cols="12" class="pa-0">
              <v-text-field
                v-model="current_password"
                :label="current_password_label"
                autocomplete="off"
                class="mb-4 pt-4"
                color="accent"
                name="current_password"
                prepend-inner-icon="mdi-lock"
                type="password"
                autofocus
                flat
                hide-details
                outlined
              />
            </v-col>
            <v-col cols="12" class="pa-0">
              <v-text-field
                v-model="new_password"
                :label="new_password_label"
                autocomplete="off"
                class=""
                color="accent"
                name="new_password"
                prepend-inner-icon="mdi-lock-plus"
                type="password"
                autofocus
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
              <v-icon left> mdi-cancel </v-icon>
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="7" md="5" offset-md="4" class="pa-0">
            <v-btn
              class="grey--text text--darken-4"
              :color="error ? 'error' : 'success'"
              :disabled="!this.current_password || !this.new_password"
              :loading="loading"
              block
              large
              @click="update"
            >
              <v-icon left> mdi-content-save-outline </v-icon>
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
import store from "../../store";

export default {
  name: "components.profile.card-profile",
  mixin: [formatters],
  data: () => ({
    edit: false,
    loading: false,
    error: false,
    current_password: "",
    current_password_label: "Current password",
    new_password: "",
    new_password_label: "New password",
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
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("users/credentials", {
          id: this.user.id,
          current_password: this.current_password,
          new_password: this.new_password,
        })
        .then(() => {
          this.edit = false;
          this.$store.dispatch("application/addMessage", {
            text: `Credentials updated.<br />
            <span class="grey--text">Please login again with your new credentials.</span>`,
            type: "success",
            action: null,
            timeout: 6000,
          });
          this.$store.dispatch("application/logout");
        })
        .catch(() => {
          this.$store.dispatch("application/addMessage", {
            text: `An error occurred when updating.<br />
            <span class="grey--text">Please check your credentials and/or try again later.</span>`,
            type: "error",
            action: null,
            timeout: 3000,
          });
          this.error = true;
        })
        .finally(() => (this.loading = false));
    },
  },
  watch: {
    /**
     * Removes the error message if the current password is changed.
     */
    current_password() {
      this.error = false;
    },
    /**
     * Removes the error message if the new password is changed.
     */
    new_password() {
      this.error = false;
    },
  },
};
</script>
