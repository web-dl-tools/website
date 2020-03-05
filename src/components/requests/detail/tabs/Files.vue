<template>
  <v-tab-item>
    <v-skeleton-loader class="pt-4" type="paragraph" v-if="files_loading" />
    <v-treeview
      v-else-if="files.length"
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
        <span v-if="!leaf" class="font-weight-black">{{ item.name }}</span>
        <div @click="openFile(item.path)" v-else>
          <p class="mb-0 body-2">
            {{ item.name }}
          </p>
          <p class="mb-0 overline">
            {{ item.extension.replace(".", "") }} &middot;
            {{ formatBytes(item.size, 2) }}
          </p>
        </div>
      </template>
    </v-treeview>
    <v-col v-else cols="12">
      <p class="mb-0">
        No files are available.
      </p>
    </v-col>
  </v-tab-item>
</template>

<script>
import Vue from "vue";
import { mapGetters } from "vuex";
import formatters from "../../../../mixins/formatters";

export default {
  name: "components.requests.detail.tabs.files",
  mixin: [formatters],
  data: () => ({
    files_loading: true,
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
      jpg: "mdi-file-image",
      png: "mdi-file-image",
      description: "mdi-file-document-outline",
      txt: "mdi-file-document-outline",
      xml: "mdi-xml"
    }
  }),
  props: {
    active: Boolean,
    request_id: String
  },
  computed: {
    ...mapGetters({
      files: "requests/getFiles"
    })
  },
  methods: {
    retrieveFiles() {
      if (!this.files_loaded) {
        this.files_loading = true;
        this.$store
          .dispatch("requests/getFiles", this.request_id)
          .then(() => (this.files_loaded = true))
          .finally(() => (this.files_loading = false));
      }
    },
    openFile(path) {
      const url = `${
        Vue.$axios.defaults.baseURL
      }download/file/?auth_token=${Vue.$axios.defaults.headers.common.Authorization.replace(
        "Token ",
        ""
      )}&path=${btoa(path)}`;
      window.open(url, "_blank");
    },
    countFiles(obj) {
      let count = 0;
      obj.forEach(i => {
        if ("dir" in i) {
          count += this.countFiles(i.children);
        } else {
          count++;
        }
      });
      return count;
    }
  },
  watch: {
    active(n) {
      if (n) {
        this.retrieveFiles();
      }
    },
    files(n) {
      this.$emit("countChange", this.countFiles(n));
    }
  }
};
</script>
