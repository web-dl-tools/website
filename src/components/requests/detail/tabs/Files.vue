<template>
  <v-tab-item>
    <v-skeleton-loader v-if="files_loading" class="pt-4" type="paragraph" />
    <v-treeview
      v-else-if="files.length"
      v-model="files_tree"
      :items="files"
      :open="files_open"
      class="pt-4 pb-2"
      :class="{
        'single-dir-view': !hasDirs,
      }"
      item-key="name"
      dense
      hoverable
      open-all
      open-on-click
    >
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="'dir' in item" class="mr-2">
          {{ open ? "mdi-folder-open" : "mdi-folder" }}
        </v-icon>
        <v-icon v-else class="mr-2">
          {{
            item.extension.replace(".", "") in files_icons
              ? files_icons[item.extension.replace(".", "")]
              : files_icons["file"]
          }}
        </v-icon>
      </template>
      <template v-slot:label="{ item, leaf }">
        <span v-if="!leaf" class="font-weight-black">{{ item.name }}</span>
        <div v-else @click="openFile(item.path)">
          <p class="pt-2 mb-0 body-2">
            {{ item.name }}
          </p>
          <p class="mt-n2 mb-0 overline font-weight-light">
            {{ item.extension.replace(".", "") }} &middot;
            {{ formatBytes(item.size, 2) }}
          </p>
        </div>
      </template>
    </v-treeview>
    <v-col v-else cols="12">
      <p class="mb-0">No files are available.</p>
    </v-col>
  </v-tab-item>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import helpers from "../../../../mixins/helpers";
import formatters from "../../../../mixins/formatters";

export default {
  name: "components.requests.detail.tabs.files",
  mixin: [formatters, helpers],
  data: () => ({
    files_loading: false,
    files_loaded: false,
    files_tree: [],
    files_open: [],
    files_icons: {
      file: "mdi-file",
      mp3: "mdi-music",
      m4a: "mdi-music",
      mp4: "mdi-video",
      mkv: "mdi-video",
      webm: "mdi-video",
      webp: "mdi-video",
      jpg: "mdi-file-image",
      png: "mdi-file-image",
      description: "mdi-file-document-outline",
      txt: "mdi-file-document-outline",
      xml: "mdi-xml",
    },
  }),
  props: {
    active: Boolean,
    request_id: String,
  },
  computed: {
    ...mapGetters({
      files: "requests/getFiles",
    }),
    /**
     * Calculate if the files contain directories (on root level).
     */
    hasDirs() {
      const files = this.$store.getters["requests/getFiles"];

      if (!files || this.isEmptyArray(files)) return false;
      return !!files.find((f) => "dir" in f);
    },
  },
  methods: {
    /**
     * Request all directories and files for this request from the API.
     */
    retrieveFiles() {
      if (!this.files_loaded) {
        this.files_loading = true;
        this.$store
          .dispatch("requests/getFiles", this.request_id)
          .then(() => (this.files_loaded = true))
          .finally(() => (this.files_loading = false));
      }
    },
    /**
     * Open the file download/access link in a new tab.
     *
     * @param path
     */
    openFile(path) {
      const url = `${
        Vue.$axios.defaults.baseURL
      }download/file?auth_token=${Vue.$axios.defaults.headers.common.Authorization.replace(
        "Token ",
        ""
      )}&path=${encodeURIComponent(path)}`;
      window.open(url, "_blank");
    },
    /**
     * Recursively count all files in the request directory.
     *
     * @param obj
     * @returns {number}
     */
    countFiles(obj) {
      let count = 0;
      obj.forEach((f) => {
        if ("dir" in f) {
          count += this.countFiles(f.children);
        } else {
          count++;
        }
      });
      return count;
    },
  },
  watch: {
    /**
     * Check if the current tab has been opened and retrieve the files if this is true.
     *
     * @param n
     */
    active(n) {
      if (n) {
        this.retrieveFiles();
      }
    },
    /**
     * Emit a count-change() event upstream to notify the tabs component.
     *
     * @param n
     */
    files(n) {
      this.$emit("count-change", this.countFiles(n));
    },
  },
  /**
   * Delay loading files in the background.
   */
  created() {
    setTimeout(() => {
      if (!this.files_loading && !this.files_loaded) this.retrieveFiles();
    }, 1500);
  },
};
</script>
