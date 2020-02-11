<template>
  <v-content class="background-wallpaper-subtle-image">
    <v-container class="pt-8">
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader type="article" v-if="item_loading" />
          <v-card outlined :loading="item.status === 'downloading'" v-else>
            <v-card-subtitle>
              <v-chip
                class="white--text"
                label
                small
                :color="formatRequestStatusColor(item.status)"
              >
                {{ item.status_display }}
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
                v-if="item.status === 'completed' || item.status === 'failed'"
                color="error"
                text
                @click="dialog = true"
              >
                Delete
              </v-btn>
              <v-btn
                class="float-right mt-n2 mr-0"
                v-if="item.status === 'failed'"
                color="warning"
                text
                @click="retry"
              >
                Retry
              </v-btn>
            </v-card-subtitle>
            <card-text :item="item" />
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
                <info :active="tab === 0" :item="item" />
                <files
                  :active="tab === 1"
                  :request_id="this.$route.params.requestId"
                  @countChange="n => (files_count = n)"
                />
                <timeline :active="tab === 2" :item="item" />
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
    <v-dialog v-model="dialog" max-width="300">
      <v-card>
        <v-card-title class="headline">Delete</v-card-title>
        <v-card-text>
          Are you sure you want to delete this request?
        </v-card-text>
        <v-card-text class="caption error--text">
          {{ item.status === "completed" ? item.title : item.url }}
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
    item_loading: true,
    files_count: null,
    logs_count: null
  }),
  computed: {
    ...mapGetters({
      item: "requests/get"
    })
  },
  created() {
    this.$store
      .dispatch("requests/get", this.$route.params.requestId)
      .catch(() => this.$router.push({ name: "overview" }).catch(() => {}))
      .finally(() => (this.item_loading = false));
  },
  methods: {
    openExternalTab() {
      window.open(this.item.url, "_blank");
    },
    remove() {
      this.$store
        .dispatch("requests/remove", this.$route.params.requestId)
        .then(() => this.$router.push({ name: "overview" }).catch(() => {}));
    },
    retry() {
      this.$store.dispatch("requests/retry", this.$route.params.requestId);
    }
  }
};
</script>
