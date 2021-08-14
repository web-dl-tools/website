<template>
  <div>
    <v-card outlined raised v-if="!user">
      <v-skeleton-loader type="article" />
    </v-card>
    <v-card outlined raised class="pb-1" v-else>
      <v-card-title>
        Settings
        <v-spacer />
        <v-btn
          v-show="!edit"
          class="float-right"
          color="warning"
          icon
          small
          @click="edit = true"
        >
          <v-icon> mdi-account-cog-outline </v-icon>
        </v-btn>
      </v-card-title>
      <v-card-subtitle class="subtitle-2 col-8 pl-4">
        {{ edit ? "Set your" : "Your" }} user preferences in Web DL.
      </v-card-subtitle>
      <v-card-text
        :class="{
          'pb-2': edit,
        }"
      >
        <v-row>
          <v-col cols="7" class="pb-0 font-weight-regular">
            Show technical details
          </v-col>
          <v-col cols="5" class="pb-0" v-if="!edit">
            {{ user.technical ? "Yes" : "No" }}
          </v-col>
          <v-col cols="4" class="pt-2 pb-0" v-else>
            <v-switch
              v-model="technical"
              class="mt-0"
              color="success"
              dense
              flat
              hide-details
            />
          </v-col>
        </v-row>
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
              :color="error ? 'error' : 'success'"
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

export default {
  name: "components.profile.card-settings",
  mixin: [formatters],
  data: () => ({
    edit: false,
    loading: false,
    error: false,
    technical: "",
    technical_label: "Technical",
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
        .dispatch("users/update", {
          id: this.user.id,
          technical: this.technical,
        })
        .then(() => (this.edit = false))
        .catch(() => {
          this.$store.dispatch("application/addMessage", {
            text: `An error occurred when updating.<br />
              <span class="grey--text">Please check your preferences and/or try again later.</span>`,
            type: "error",
            action: null,
            timeout: 3000,
          });
          this.error = true;
        })
        .finally(() => (this.loading = false));
    },
    /**
     * Clone the user properties to local properties.
     *
     * @param user
     */
    process_user(user) {
      this.technical = user.technical;
    },
  },
  watch: {
    /**
     * process local data whenever new changes come in.
     */
    user(n) {
      this.process_user(n);
    },
    /**
     * Removes the error message if the technical switch is changed.
     */
    technical() {
      this.error = false;
    },
  },
  /**
   * Load in the user data.
   */
  created() {
    if (this.user) this.process_user(this.user);
  },
};
</script>
