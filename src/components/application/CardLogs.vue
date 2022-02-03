<template>
  <v-card outlined raised>
    <v-timeline class="pt-4" align-top dense reverse>
      <v-timeline-item class="pb-1" hide-dot>
        <v-card-title class="pt-0"> Logs </v-card-title>
        <v-card-subtitle class="subtitle-2 col-8 pl-4">
          You've made {{ logs.length }} requests to Web DL today.
        </v-card-subtitle>
      </v-timeline-item>

      <div v-if="loading">
        <v-skeleton-loader v-for="n in 8" :key="n" type="list-item" />
      </div>

      <div v-else class="pb-2 max-height-400 overflow-y-auto">
        <v-timeline-item
          v-for="log in logs"
          :key="log.id"
          class="pb-0"
          color="accent"
          small
        >
          <v-row class="ml-1">
            <v-col cols="7" class="body-2">
              <v-chip
                class="mr-2"
                :color="formatLogLevelColor(log.method)"
                :class="formatTextColor(formatLogLevelColor(log.method))"
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
              <span v-show="$vuetify.breakpoint.mdAndUp">
                {{ formatDateFromNow(log.created_at) }} ·
              </span>
              {{ formatDate(log.created_at, "H:mm:ss.SSS") }}
            </v-col>
          </v-row>
        </v-timeline-item>
      </div>
    </v-timeline>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "components.application.card-logs",
  mixin: [formatters],
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters({
      logs: "users/getLogs",
    }),
  },
  /**
   * Load in the log data.
   */
  created() {
    this.$store.dispatch("users/getLogs").finally(() => (this.loading = false));
  },
};
</script>
