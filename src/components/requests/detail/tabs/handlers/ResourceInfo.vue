<template>
  <v-row>
    <v-col cols="12" md="7">
      <p class="mb-0 body-1">
        Found {{ item.data.filtered_paths.length }} unique paths (possibly)
        matching the given extensions.
      </p>
      <p class="body-2 font-weight-light">
        From
        <span class="font-weight-bold">
          {{ item.data.paths.length }} paths</span
        >
        found on the entire page.
      </p>
      <p class="body-2 font-weight-light">
        Note that some of these may have been filtered out due to not reaching
        the minimum size limit.
      </p>
      <v-row>
        <v-col class="py-0 font-weight-light" cols="3"> Delay </v-col>
        <v-col class="py-0 pl-1 body-2 font-weight-thin" cols="9">
          {{ item.delay }} ms
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 font-weight-light" cols="3">
          Minimum size limit
        </v-col>
        <v-col class="py-0 pl-1 body-2 font-weight-thin" cols="9">
          {{ formatBytes(item.min_bytes, 1) }}
        </v-col>
      </v-row>
      <v-row>
        <v-col class="py-0 font-weight-light" cols="3"> Extensions </v-col>
        <v-col class="pa-0" cols="9">
          <v-chip
            v-for="extension in item.extensions"
            :key="extension"
            class="ma-1"
            label
            x-small
          >
            {{ extension }}
          </v-chip>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12" md="5">
      <v-parallax
        @click="openFile(path)"
        :src="path"
        height="300"
        class="border-radius cursor-pointer"
      />
    </v-col>
  </v-row>
</template>

<script>
import formatters from "../../../../../mixins/formatters";
import Vue from "vue";

export default {
  name: "components.requests.detail.tabs.handlers.resource-info",
  mixin: [formatters],
  data: () => ({}),
  props: {
    item: Object,
  },
  computed: {
    /**
     * Generate and calculate the screenshot path.
     */
    path() {
      return `/${this.item.path}/${this.item.id}.png`;
    },
  },
  methods: {
    /**
     * Open the file download/access link in a new tab.
     *
     * @param path
     */
    openFile(path) {
      window.open(path, "_blank");
    },
  },
};
</script>
