<template>
  <v-content class="background-wallpaper-subtle-image">
    <v-container class="pt-3">
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader type="article" v-if="request_loading" />
          <v-card outlined raised :loading="processing" v-else>
            <template v-slot:progress>
              <v-progress-linear
                v-if="request.status === 'downloading'"
                :value="request.progress"
                :buffer-value="request.progress - 100"
                stream
                :color="formatRequestStatusColor(request.status)"
              />
              <v-progress-linear
                v-else
                indeterminate
                :color="formatRequestStatusColor(request.status)"
              />
            </template>
            <v-card-subtitle>
              <v-chip
                class="white--text"
                label
                small
                :color="formatRequestStatusColor(request.status)"
              >
                {{ request.status_display }}
              </v-chip>
              <v-btn
                icon
                class="float-right mt-n2 mr-n2"
                @click="openExternalTab"
              >
                <v-icon>
                  mdi-open-in-new
                </v-icon>
              </v-btn>
              <v-btn
                class="float-right mt-n2 mr-2"
                v-if="
                  request.status === 'completed' || request.status === 'failed'
                "
                color="error"
                text
                @click="dialog = true"
              >
                Delete
              </v-btn>
              <v-btn
                class="float-right mt-n2 mr-0"
                v-if="request.status === 'failed'"
                color="warning"
                text
                @click="retry"
              >
                Retry
              </v-btn>
            </v-card-subtitle>
            <card-text :item="request" />
            <v-card-text>
              <v-tabs centered grow v-model="tab">
                <v-tab>Information</v-tab>
                <v-tab>
                  <v-badge v-if="files_count" :content="files_count">
                    Files
                  </v-badge>
                  <span v-else>Files</span>
                </v-tab>
                <v-tab>Timeline</v-tab>
                <v-tab>
                  <v-badge v-if="logs_count" :content="logs_count">
                    Logs
                  </v-badge>
                  <span v-else>Logs</span>
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <info :active="tab === 0" :item="request" />
                <files
                  :active="tab === 1"
                  :request_id="this.$route.params.requestId"
                  @countChange="n => (files_count = n)"
                />
                <timeline :active="tab === 2" :item="request" />
                <logs
                  :active="tab === 3"
                  :request_id="this.$route.params.requestId"
                  @countChange="n => (logs_count = n)"
                />
              </v-tabs-items>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this request?
        </v-card-text>
        <v-card-text class="error--text font-weight-light mt-n4">
          {{ request.status === "completed" ? request.title : request.url }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning darken-1" text @click="dialog = false">
            Cancel
          </v-btn>
          <v-btn color="error darken-1" text @click="remove">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";
import CardText from "../../components/requests/detail/CardText";
import Info from "../../components/requests/detail/tabs/Info";
import Timeline from "../../components/requests/detail/tabs/Timeline";
import Files from "../../components/requests/detail/tabs/Files";
import Logs from "../../components/requests/detail/tabs/Logs";

export default {
  name: "views.requests.detail",
  mixin: [formatters],
  components: {
    CardText,
    Info,
    Timeline,
    Files,
    Logs
  },
  data: () => ({
    dialog: false,
    tab: 0,
    request_loading: true,
    files_count: null,
    logs_count: null
  }),
  computed: {
    ...mapGetters({
      request: "requests/get"
    }),
    processing() {
      return (
        this.request.status &&
        ["pre_processing", "downloading", "post_processing"].includes(
          this.request.status
        )
      );
    }
  },
  methods: {
    openExternalTab() {
      window.open(this.request.url, "_blank");
    },
    remove() {
      this.$store
        .dispatch("requests/remove", this.$route.params.requestId)
        .then(() => this.$router.back());
    },
    retry() {
      this.$store.dispatch("requests/retry", this.$route.params.requestId);
    }
  },
  created() {
    this.$store
      .dispatch("requests/get", this.$route.params.requestId)
      .catch(() => this.$router.push({ name: "overview" }).catch(() => {}))
      .finally(() => {
        this.request_loading = false;
        if (this.request.title) {
          this.$store.dispatch(
            "application/setTitle",
            `${this.$store.getters["application/getTitle"]}: ${this.request.title}`
          );
        }
      });
  }
};
</script>
