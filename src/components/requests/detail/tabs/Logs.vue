<template>
  <v-tab-item>
    <div v-if="logs_loading">
      <v-skeleton-loader v-for="n in 10" :key="n" type="list-item" />
    </div>
    <v-row v-else-if="protect">
      <v-col class="text-center">
        <p class="mb-0 title">There are too many logs to safely display.</p>
        <p class="body-2">
          Forcing all logs to display may stop the browser from responding.
        </p>
        <v-btn color="error" outlined @click="protect = false">
          Show anyway
        </v-btn>
      </v-col>
    </v-row>
    <v-timeline
      v-else-if="logs.length"
      class="timeline"
      align-top
      dense
      reverse
    >
      <v-timeline-item
        v-for="log in logs"
        :key="log.id"
        :color="formatLogLevelColor(log.level)"
        small
      >
        <v-row justify="space-between">
          <v-col cols="7">
            <v-col cols="12" md="4" lg="2" class="pa-0 d-inline-flex">
              <v-chip
                class="mr-2"
                :color="formatLogLevelColor(log.level)"
                :class="formatTextColor(formatLogLevelColor(log.level))"
                label
                small
              >
                {{ log.level_display }}
              </v-chip>
            </v-col>
            <v-col cols="9" class="pa-0 d-inline-flex overflow-x">
              {{ log.message }}
            </v-col>
          </v-col>
          <v-col class="text-right" cols="5">
            {{ formatDate(log.created_at, "YYYY-MM-DD H:mm:ss.SSS") }}
          </v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
    <v-col v-else cols="12">
      <p class="mb-0">No logs are available.</p>
    </v-col>
  </v-tab-item>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../../../mixins/formatters";
import helpers from "../../../../mixins/helpers";

export default {
  name: "components.requests.detail.tabs.logs",
  mixin: [formatters, helpers],
  data: () => ({
    protect: false,
    logs_loading: false,
    logs_loaded: false,
    error: false,
  }),
  props: {
    active: Boolean,
    request_id: String,
  },
  computed: {
    ...mapGetters({
      _logs: "requests/getLogs",
    }),
    logs() {
      const logs = this._logs;
      return logs.sort((a, b) => this.sortDates(a.created_at, b.created_at));
    },
  },
  methods: {
    /**
     * Request all log entries for this request from the API.
     *
     * @param force
     */
    retrieveLogs(force = false) {
      if (!this.logs_loaded || force) {
        this.logs_loading = true;
        this.error = false;
        this.$store
          .dispatch("requests/getLogs", this.request_id)
          .then(() => (this.logs_loaded = true))
          .catch(() => (this.error = true))
          .finally(() => (this.logs_loading = false));
      }
    },
    /**
     * Reload all the logs when the request finished downloading.
     */
    onFullyLoaded(r) {
      this.retrieveLogs(true);
    },
    /**
     * Clean out retrieved logs.
     */
    onBeforeDestroy() {
      this.$store.commit("requests/GET_LOGS", []);
    },
  },
  watch: {
    /**
     * Check if the current tab has been opened and retrieve the logs if this is true.
     *
     * @param n
     */
    active(n) {
      if (n) {
        this.retrieveLogs();
      }
    },
    /**
     * Emit a count-change() event upstream to notify the tabs component.
     *
     * @param n
     */
    logs(n) {
      if (n.length > 50) {
        this.protect = true;
      }
      this.$emit("count-change", n.length);
    },
  },
  /**
   * Delay loading logs in the background.
   */
  created() {
    if (this.active) {
      this.retrieveLogs();
    } else {
      setTimeout(() => {
        if (!this.logs_loading && !this.logs_loaded) this.retrieveLogs();
      }, 2500);
    }
  },
};
</script>
