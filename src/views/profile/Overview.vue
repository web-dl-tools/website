<template>
  <v-main class="background-wallpaper">
    <v-container>
      <v-row>
        <v-col class="pa-0" cols="12" md="8">
          <p class="mx-3 my-12 font-weight-thin display-3 text-shadow">
            {{ title }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card raised v-if="!user">
            <v-skeleton-loader type="article" />
            <v-skeleton-loader type="actions" />
          </v-card>
          <v-card raised v-else>
            <v-card-title class="subtitle-1">
              Hello {{ user.full_name }},
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
              <v-btn
                v-show="edit"
                class="float-right mr-2"
                :color="error ? 'error' : 'success'"
                :disabled="!this.username"
                :outlined="error"
                icon
                small
                @click="update"
              >
                <v-icon> mdi-account-check </v-icon>
              </v-btn>
              <v-btn
                v-show="edit"
                class="float-right"
                color="error"
                icon
                small
                @click="edit = false"
              >
                <v-icon> mdi-account-cancel </v-icon>
              </v-btn>
            </v-card-title>
            <v-card-subtitle class="subtitle-2">
              Below you can find your information currently stored in Web DL.
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="pb-0 font-weight-regular">
                  Username
                </v-col>
                <v-col cols="8" class="pb-0" v-if="!edit">
                  {{ user.username }}
                </v-col>
                <v-col cols="8" class="pb-0" v-else>
                  <v-text-field
                    v-model="username"
                    id="username"
                    color="secondary"
                    name="username"
                    type="text"
                    dense
                    flat
                    hide-details
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" class="pb-0 font-weight-regular">
                  First name
                </v-col>
                <v-col cols="8" class="pb-0" v-if="!edit">
                  {{ user.first_name }}
                </v-col>
                <v-col cols="8" class="pb-0" v-else>
                  <v-text-field
                    v-model="first_name"
                    id="first_name"
                    color="secondary"
                    name="first_name"
                    type="text"
                    dense
                    flat
                    hide-details
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="py-0 font-weight-regular">
                  Last name
                </v-col>
                <v-col cols="8" class="py-0" v-if="!edit">
                  {{ user.last_name }}
                </v-col>
                <v-col cols="8" class="pb-0" v-else>
                  <v-text-field
                    v-model="last_name"
                    id="last_name"
                    color="secondary"
                    name="last_name"
                    type="text"
                    dense
                    flat
                    hide-details
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" class="pb-0 font-weight-regular">
                  Joined on
                </v-col>
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
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "views.profile.overview",
  mixin: [formatters],
  data: () => ({
    edit: false,
    error: false,
    username: "",
    first_name: "",
    last_name: "",
  }),
  computed: {
    ...mapGetters({
      title: "application/getTitle",
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
        this.$store
          .dispatch("users/update", {
            id: this.user.id,
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
          })
          .then(() => (this.edit = false))
          .catch(() => (this.error = true));
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
  /**
   * Load in the user data.
   */
  created() {
    this.$store.dispatch("users/getMe");
  },
};
</script>
