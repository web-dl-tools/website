<template>
  <v-tab-item>
    <v-row>
      <v-col class="pr-md-0 pb-0 pb-md-3" cols="12" md="8">
        <v-skeleton-loader v-if="files_loading" class="pt-4" type="paragraph" />
        <v-treeview
          v-else-if="files.length"
          v-model="files_tree"
          :items="files"
          :open="files_open"
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
              <p class="pt-2 mb-0 font-weight-500">
                {{ item.name }}
              </p>
              <p class="mb-2 caption font-weight-light grey--text">
                {{ item.extension.replace(".", "").toUpperCase() }} &middot;
                {{ formatBytes(item.size, technical ? 2 : 0) }} &middot;
                {{
                  formatDate(
                    item.created_at,
                    technical && $vuetify.breakpoint.mdAndUp
                      ? "L [&middot;] HH:mm:ss"
                      : "LL"
                  )
                }}
                {{ item.last_retrieved_at ? "&middot;" : "" }}
                <v-tooltip v-if="item.last_retrieved_at" bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <span
                      v-if="$vuetify.breakpoint.mdAndUp"
                      v-bind="attrs"
                      v-on="on"
                    >
                      {{ formatDateFromNow(item.last_retrieved_at) }}
                    </span>
                    <v-icon x-small color="success" v-bind="attrs" v-on="on">
                      mdi-download
                    </v-icon>
                  </template>
                  <span>
                    Last retrieved on
                    {{
                      formatDate(
                        item.last_retrieved_at,
                        "dddd, LL [at] HH:mm:ss"
                      )
                    }}
                  </span>
                </v-tooltip>
              </p>
            </div>
          </template>
        </v-treeview>
        <v-col v-else cols="12">
          <p class="mb-0">No files are available.</p>
        </v-col>
      </v-col>
      <v-col cols="12" md="4">
        <v-card outlined>
          <v-skeleton-loader type="image" v-if="files_loading" />
          <v-row class="px-4 mx-0" v-else>
            <v-col class="pb-0 pl-0" cols="12" md="12">
              <v-icon class="mr-1"> mdi-database </v-icon>
              {{ formatBytes(size, technical ? 2 : 0) }}
            </v-col>
            <v-col class="pb-0 pl-0" cols="12" md="12">
              <v-icon class="mr-1"> mdi-folder-outline </v-icon>
              {{ folders_count }}
              {{ folders_count === 1 ? "folder" : "folders" }}
            </v-col>
            <v-col class="pb-0 pl-0" cols="12" md="12">
              <v-icon class="mr-1"> mdi-file-document-multiple-outline </v-icon>
              {{ files_count }} {{ files_count === 1 ? "file" : "files" }},
              {{ retrieved_files_count }} retrieved
              <v-col class="py-0 pl-8 pr-0">
                <v-progress-linear
                  color="success"
                  :value="(retrieved_files_count / files_count) * 100"
                  rounded
                />
              </v-col>
            </v-col>
            <v-col class="pl-0" cols="12" md="12">
              <v-icon class="mr-1"> mdi-shape-plus </v-icon>
              <v-chip
                v-for="file_extension in file_extensions"
                :key="file_extension"
                class="ma-1"
                color="darkgrey"
                label
                outlined
                x-small
              >
                {{ file_extension }}
              </v-chip>
            </v-col>
          </v-row>
        </v-card>
        <v-row>
          <v-col
            class="pb-0"
            v-show="!files_loading && request.status === 'completed'"
          >
            <v-btn
              v-if="!request.start_compressing_at || !request.compressed_at"
              :loading="request.start_compressing_at != null"
              class="text--darken-2"
              color="grey"
              block
              small
              text
              @click="compress"
            >
              <template v-slot:loader>
                <v-progress-circular indeterminate size="18" width="2" />
                <span class="pl-2">Creating archive...</span>
              </template>
              <v-icon left> mdi-folder-zip-outline </v-icon>
              Create archive (zip)
            </v-btn>
            <v-btn
              v-else
              color="grey"
              block
              light
              outlined
              small
              @click="openFile(`${request.path}.zip`)"
            >
              <v-icon left> mdi-folder-zip </v-icon>
              Download archive (zip)
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-tab-item>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import helpers from "../../../../mixins/helpers";
import formatters from "../../../../mixins/formatters";

export default {
  name: "components-requests-detail-tabs-files",
  mixin: [formatters, helpers],
  data: () => ({
    files_loading: false,
    files_loaded: false,
    error: false,
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
    folders_count: 0,
    files_count: 0,
    retrieved_files_count: 0,
    size: 0,
    file_extensions: [],
  }),
  props: {
    active: Boolean,
    request_id: String,
  },
  computed: {
    ...mapGetters({
      request: "requests/get",
      files: "requests/getFiles",
      technical: "users/isTechnical",
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
     *
     * @param force silently retrieve files again
     */
    retrieveFiles(force = false) {
      if (!this.files_loaded || force) {
        this.files_loading = true;
        this.error = false;
        this.$store
          .dispatch("requests/getFiles", this.request_id)
          .then(() => (this.files_loaded = true))
          .catch(() => (this.error = true))
          .finally(() => (this.files_loading = false));
      }
    },
    /**
     * Generate and open the file download/access link in a new tab.
     * Additionally retrieve the files again to get the latest data.
     *
     * @param path
     */
    openFile(path) {
      let url = `/${path}`;
      window.open(url, "_blank");
    },
    /**
     * Recursively count all files in the request directory.
     *
     * @param obj
     * @returns {number[]}
     */
    parseFiles(obj) {
      let folders_count = 0;
      let files_count = 0;
      let retrieved_files_count = 0;
      let size = 0;
      let file_extensions = [];

      obj.forEach((f) => {
        if ("dir" in f) {
          const props = this.parseFiles(f.children);
          folders_count++;
          folders_count += props[0];
          files_count += props[1];
          retrieved_files_count += props[2];
          size += props[3];
          file_extensions = file_extensions.concat(props[4]);
        } else {
          files_count++;
          size += f.size;
          if (f.extension) file_extensions.push(f.extension.replace(".", ""));
          if (f.last_retrieved_at) retrieved_files_count++;
        }
      });

      this.folders_count = folders_count;
      this.files_count = files_count;
      this.retrieved_files_count = retrieved_files_count;
      this.size = size;
      this.file_extensions = this.unique(file_extensions);

      return [
        folders_count,
        files_count,
        retrieved_files_count,
        size,
        file_extensions,
      ];
    },
    /**
     * Compress the request files.
     */
    compress() {
      this.$store.dispatch("requests/compress", this.$route.params.requestId);
    },
    /**
     * Reload all the files when the request finished downloading.
     */
    onFullyLoaded(r) {
      this.retrieveFiles(true);
    },
    /**
     * Clean out retrieved files.
     */
    onBeforeDestroy() {
      this.$store.commit("requests/GET_FILES", {});
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
      this.parseFiles(n);
      this.$emit("count-change", this.files_count);
    },
  },
  /**
   * Delay loading files in the background.
   */
  created() {
    if (this.active) {
      this.retrieveFiles();
    } else {
      setTimeout(() => {
        if (!this.files_loading && !this.files_loaded) this.retrieveFiles();
      }, 1500);
    }
  },
};
</script>
