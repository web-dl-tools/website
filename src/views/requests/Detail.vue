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
            </v-card-subtitle>
            <v-card-title class="pt-0">
              {{ item.url }}
            </v-card-title>
            <v-card-subtitle>
              Requested on {{ formatDate(item.created_at, "LLLL") }} ({{
                formatDateFromNow(item.created_at)
              }}) using {{ formatRequest(item.request_type) }} handler.
            </v-card-subtitle>
            <v-card-text>
              <v-tabs centered grow v-model="tab">
                <v-tab>Files</v-tab>
                <v-tab>Logs</v-tab>
              </v-tabs>
              <v-tabs-items v-model="tab">
                <v-tab-item>
                  <v-skeleton-loader
                    class="pt-4"
                    type="paragraph"
                    v-if="files_loading"
                  />
                  <v-treeview
                    class="pt-4"
                    v-model="files_tree"
                    :items="files"
                    :open="files_open"
                    item-key="name"
                    hoverable
                    open-on-click
                    open-all
                    rounded
                    dense
                    v-else
                  >
                    <template v-slot:prepend="{ item, open }">
                      <v-icon class="mr-2" v-if="'dir' in item">
                        {{ open ? "mdi-folder-open" : "mdi-folder" }}
                      </v-icon>
                      <v-icon class="mr-2" v-else>
                        {{
                          item.extension.replace(".", "") in files_icons
                            ? files_icons[item.extension.replace(".", "")]
                            : files_icons["file"]
                        }}
                      </v-icon>
                    </template>
                    <template v-slot:label="{ item, leaf }">
                      <span v-if="!leaf" class="font-weight-black">{{
                        item.name
                      }}</span>
                      <div @click="openFile(item.path)" v-else>
                        <p class="mb-0 body-2">
                          {{ item.name }}
                        </p>
                        <p class="mb-0 overline">
                          {{ item.extension }} &middot;
                          {{ formatBytes(item.size, 2) }}
                        </p>
                      </div>
                    </template>
                  </v-treeview>
                </v-tab-item>
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
import Vue from "vue";
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "views.requests.detail",
  mixin: [formatters],
  data: () => ({
    tab: null,
    item_loading: true,
    logs_loading: false,
    logs_loaded: false,
    files_loading: false,
    files_loaded: false,
    files_tree: [],
    files_open: [],
    files_icons: {
      file: "mdi-file",
      m4a: "mdi-music",
      mp4: "mdi-video",
      jpg: "mdi-file-image",
      description: "mdi-file-document-outline",
      xml: "mdi-xml"
    }
  }),
  computed: {
    ...mapGetters({
      item: "requests/get",
      logs: "requests/getLogs",
      files: "requests/getFiles"
    })
  },
  created() {
    this.$store
      .dispatch("requests/get", this.$route.params.requestId)
      .then(() => this.retrieveFiles())
      .catch(() =>
        this.$router.push({ name: "requests.index" }).catch(() => {})
      )
      .finally(() => (this.item_loading = false));
  },
  methods: {
    retrieveFiles() {
      this.files_loading = true;
      this.$store
        .dispatch("requests/getFiles", this.$route.params.requestId)
        .then(() => (this.files_loaded = true))
        .finally(() => (this.files_loading = false));
    },
    retrieveLogs() {
      this.logs_loading = true;
      this.$store
        .dispatch("requests/getLogs", this.$route.params.requestId)
        .then(() => (this.logs_loaded = true))
        .finally(() => (this.logs_loading = false));
    },
    openExternalTab() {
      window.open(this.item.url, "_blank");
    },
    openFile(path) {
      const url = `${
        Vue.$axios.defaults.baseURL
      }download/file/?auth_token=${Vue.$axios.defaults.headers.common.Authorization.replace(
        "Token ",
        ""
      )}&path=${path}`;
      window.open(url, "_blank");
    }
  },
  watch: {
    tab(n) {
      if (n === 1 && !this.logs_loaded) {
        this.retrieveLogs();
      }
    }
  }
};
</script>
