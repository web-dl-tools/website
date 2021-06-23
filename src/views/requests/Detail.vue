<template>
  <v-main class="background-wallpaper">
    <v-container class="pt-3">
      <app-title />
      <v-row>
        <v-col cols="12">
          <v-card outlined raised>
            <v-skeleton-loader v-if="request_loading" type="table-heading" />
            <v-card-subtitle v-else>
              <status :request="request" :with_progress="true" />
              <v-chip
                v-if="'storage_size' in request"
                class="ml-2 px-2 grey--text"
                label
                outlined
                small
              >
                {{ formatBytes(request.storage_size) }}
              </v-chip>
              <v-btn
                icon
                class="float-right mt-n2 mr-n2"
                @click="openExternalTab"
              >
                <v-icon> mdi-open-in-new </v-icon>
              </v-btn>
              <v-btn
                class="float-right mt-n2 mr-2"
                v-if="
                  request.status === 'completed' || request.status === 'failed'
                "
                color="error"
                icon
                @click="dialog = true"
              >
                <v-icon> mdi-delete-outline </v-icon>
              </v-btn>
              <v-btn
                class="float-right mt-n2 mr-0"
                v-if="request.status === 'failed'"
                color="warning"
                icon
                @click="retry"
              >
                <v-icon> mdi-sync </v-icon>
              </v-btn>
            </v-card-subtitle>
            <v-skeleton-loader
              v-if="request_loading"
              type="sentences"
              class="pa-4"
            />
            <card-text v-else :item="request" />
            <v-skeleton-loader
              v-if="request_loading"
              type="table-thead"
              class="px-8"
            />
            <v-card-text v-else class="pb-0">
              <v-tabs color="info" grow show-arrows v-model="tab">
                <v-tab>Information</v-tab>
                <v-tab>
                  <v-badge
                    v-if="files_count"
                    color="secondary"
                    :content="files_count"
                  >
                    Files
                  </v-badge>
                  <span v-else>Files</span>
                </v-tab>
                <v-tab v-show="false">Timeline</v-tab>
                <v-tab v-show="false">Raw</v-tab>
                <v-tab v-show="false">
                  <v-badge
                    v-if="logs_count"
                    color="secondary"
                    :content="logs_count"
                  >
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
                  @count-change="(n) => (files_count = n)"
                  ref="files"
                />
                <timeline :active="tab === 2" :item="request" />
                <raw :active="tab === 3" :item="request" />
                <logs
                  :active="tab === 4"
                  :request_id="this.$route.params.requestId"
                  @count-change="(n) => (logs_count = n)"
                  ref="logs"
                />
              </v-tabs-items>
            </v-card-text>
            <v-skeleton-loader
              v-if="request_loading"
              type="list-item-three-line"
            />
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="dialog" max-width="500">
      <v-card outlined raised class="pb-1">
        <v-card-title class="subtitle-1"> Delete request </v-card-title>
        <v-card-subtitle class="subtitle-2">
          Are you sure you want to delete the following request?
        </v-card-subtitle>
        <v-card-text class="pb-3 info--text">
          {{ request.status === "completed" ? request.title : request.url }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="warning" text @click="dialog = false"> Cancel </v-btn>
          <v-btn color="error" text @click="remove"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import AppTitle from "../../components/ui/AppTitle";
import Status from "../../components/requests/Status";
import CardText from "../../components/requests/detail/CardText";
import Info from "../../components/requests/detail/tabs/Info";
import Timeline from "../../components/requests/detail/tabs/Timeline";
import Raw from "../../components/requests/detail/tabs/Raw";
import Files from "../../components/requests/detail/tabs/Files";
import Logs from "../../components/requests/detail/tabs/Logs";
import formatters from "../../mixins/formatters";

export default {
  name: "views.requests.detail",
  mixins: [formatters],
  components: {
    AppTitle,
    Status,
    CardText,
    Info,
    Timeline,
    Raw,
    Files,
    Logs,
  },
  data: () => ({
    dialog: false,
    tab: 0,
    request_loading: true,
    request_loaded: false,
    request_still_processing: false,
    files_count: null,
    logs_count: null,
  }),
  computed: {
    ...mapGetters({
      request: "requests/get",
      title: "application/getTitle",
    }),
  },
  watch: {
    request(r) {
      if (!this.request_loaded) {
        this.request_loaded = true;
        if (r.status === "completed")
          this.$store.dispatch("application/setTitlePrefix", r.title);
      }

      if (r.status !== "completed" && r.status !== "failed")
        this.request_still_processing = true;

      if (
        this.request_still_processing &&
        (r.status === "completed" || r.status === "failed")
      ) {
        this.request_still_processing = false;
        this.$refs.files.onFullyLoaded();
        this.$refs.logs.onFullyLoaded();
        this.$store.dispatch("application/setTitlePrefix", r.title);
      }
    },
  },
  methods: {
    /**
     * Open the request url in an external tab.
     */
    openExternalTab() {
      window.open(this.request.url, "_blank");
    },
    /**
     * Remove the request.
     */
    remove() {
      this.$store
        .dispatch("requests/remove", this.$route.params.requestId)
        .then(() => this.$router.back());
    },
    /**
     * Retry the request.
     */
    retry() {
      this.$store.dispatch("requests/retry", this.$route.params.requestId);
    },
  },
  /**
   * Retrieve the request information.
   */
  created() {
    this.$store
      .dispatch("requests/get", this.$route.params.requestId)
      .catch(() => this.$router.push({ name: "overview" }).catch(() => {}))
      .finally(() => {
        this.request_loading = false;
      });
  },
  /**
   * Clean out retrieved data and call children to clean out.
   */
  beforeDestroy() {
    this.$store.dispatch("application/setTitlePrefix", "");
    this.$store.commit("requests/GET", {});
    if (this.$refs.files) this.$refs.files.onBeforeDestroy();
    if (this.$refs.logs) this.$refs.logs.onBeforeDestroy();
  },
};
</script>
