<template>
  <v-tab-item>
    <div v-if="logs_loading">
      <v-skeleton-loader type="list-item" v-for="n in 10" :key="n" />
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
    <v-timeline dense reverse v-else>
      <v-timeline-item small v-for="log in logs" :key="log.id">
        <v-row justify="space-between">
          <v-col cols="7">
            <v-chip
              class="white--text mr-2"
              :color="formatLogLevelColor(log.level)"
              label
              small
            >
              {{ log.level_display }}
            </v-chip>
            {{ log.message }}
          </v-col>
          <v-col class="text-right" cols="5">{{
            formatDate(log.created_at, "YYYY-MM-DD H:mm:ss:SSS")
          }}</v-col>
        </v-row>
      </v-timeline-item>
    </v-timeline>
  </v-tab-item>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../../../mixins/formatters";

export default {
  name: "components.requests.detail.tabs.logs",
  mixin: [formatters],
  data: () => ({
    protect: false,
    logs_loading: true,
    logs_loaded: false
  }),
  props: {
    active: Boolean,
    request_id: String
  },
  computed: {
    ...mapGetters({
      logs: "requests/getLogs"
    })
  },
  methods: {
    retrieveLogs() {
      if (!this.logs_loaded) {
        this.logs_loading = true;
        this.$store
          .dispatch("requests/getLogs", this.request_id)
          .then(() => (this.logs_loaded = true))
          .finally(() => (this.logs_loading = false));
      }
    }
  },
  watch: {
    active(n) {
      if (n) {
        this.retrieveLogs();
      }
    },
    logs(n) {
      if (n.length > 100) {
        this.protect = true;
      }
      this.$emit("countChange", n.length);
    }
  }
};
</script>
