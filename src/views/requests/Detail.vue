<template>
  <v-content>
    <v-container class="pt-8">
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader type="article" v-if="item_loading" />
          <v-card outlined v-else>
            <v-card-subtitle>
              <v-chip
                class="white--text mr-2"
                label
                small
                :color="formatRequestStatusColor(item.status)"
              >
                {{ item.status_display }}
              </v-chip>
            </v-card-subtitle>
            <v-card-title class="pt-0">
              {{ item.url }}
            </v-card-title>
            <v-card-subtitle>
              Requested on {{ formatDate(item.created_at, "LLLL") }} ({{
                formatDateFromNow(item.created_at)
              }})
            </v-card-subtitle>
            <v-card-text>
              <v-tabs centered grow v-model="tab">
                <v-tab>Files</v-tab>
                <v-tab>Logs</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item></v-tab-item>
                <v-tab-item>
                  <div v-if="logs_loading">
                    <v-skeleton-loader
                      type="list-item"
                      v-for="n in 10"
                      :key="n"
                    />
                  </div>
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
              </v-tabs-items>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "views.requests.detail",
  mixin: [formatters],
  data: () => ({
    tab: null,
    item_loading: true,
    logs_loading: false
  }),
  computed: {
    ...mapGetters({
      item: "requests/get",
      logs: "requests/getLogs"
    })
  },
  created() {
    this.$store
      .dispatch("requests/get", this.$route.params.requestId)
      .then(() => this.retrieveLogs())
      .catch(() =>
        this.$router.push({ name: "requests.index" }).catch(() => {})
      )
      .finally(() => (this.item_loading = false));
  },
  methods: {
    retrieveLogs() {
      this.logs_loading = true;
      this.$store
        .dispatch("requests/getLogs", this.$route.params.requestId)
        .finally(() => (this.logs_loading = false));
    }
  }
};
</script>
