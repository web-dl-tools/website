<template>
  <v-main class="background-wallpaper">
    <v-container>
      <app-title />
      <v-row>
        <v-col cols="12" md="6">
          <v-card raised v-if="!user">
            <v-skeleton-loader type="article" />
            <v-skeleton-loader type="actions" />
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
              Hi {{ user.full_name }}, below you can
              {{ edit ? "edit" : "find" }} your account details stored in Web
              DL.
            </v-card-subtitle>
            <v-card-text v-if="!edit">
              <v-row>
                <v-col cols="4" class="pb-0 font-weight-regular">
                  Username
                </v-col>
                <v-col cols="8" class="pb-0">
                  {{ user.username }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" class="pb-0 font-weight-regular">
                  First name
                </v-col>
                <v-col cols="8" class="pb-0">
                  {{ user.first_name }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="py-0 font-weight-regular">
                  Last name
                </v-col>
                <v-col cols="8" class="py-0">
                  {{ user.last_name }}
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
        </v-col>

        <v-col cols="12" md="6">
          <v-card flat>
            <v-timeline class="pt-4" align-top dense reverse>
              <v-timeline-item class="pb-1" hide-dot>
                <v-card-title class="pt-0"> Logs </v-card-title>
                <v-card-subtitle class="subtitle-2 col-8 pl-4">
                  below you can find the latest requests you've made to Web DL.
                </v-card-subtitle>
              </v-timeline-item>

              <div v-if="!logs.length">
                <v-skeleton-loader v-for="n in 8" :key="n" type="list-item" />
              </div>

              <div v-else class="max-height-400 overflow-y-auto">
                <v-timeline-item
                  v-for="log in logs"
                  :key="log.id"
                  class="pb-0"
                  color="accent"
                  small
                >
                  <v-row class="ml-0">
                    <v-col cols="7" class="body-2">
                      <v-chip
                        class="mr-2"
                        :color="formatLogLevelColor(log.method)"
                        :class="
                          formatTextColor(formatLogLevelColor(log.method))
                        "
                        label
                        x-small
                      >
                        {{ log.method }}
                      </v-chip>
                      {{ log.url }}
                      <div v-if="log.data" class="mt-2 grey--text log">
                        {{ log.data }}
                      </div>
                    </v-col>
                    <v-col class="body-2 text-right grey--text" cols="5">
                      {{ formatDate(log.created_at, "YYYY-MM-DD H:mm:ss.SSS") }}
                    </v-col>
                  </v-row>
                </v-timeline-item>
              </div>
            </v-timeline>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";
import AppTitle from "../../components/ui/AppTitle";

export default {
  name: "views.profile.overview",
  mixin: [formatters],
  components: {
    AppTitle,
  },
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
      title: "application/getTitle",
      user: "users/getMe",
      logs: "users/getLogs",
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
          .then(() => {
            this.edit = false;
            this.$store.dispatch("users/getLogs");
          })
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
  /**
   * Load in the user data.
   */
  created() {
    this.$store.dispatch("users/getMe");
    this.$store.dispatch("users/getLogs");
  },
};
</script>
