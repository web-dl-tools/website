<template>
  <v-row>
    <v-col class="mb-n1" cols="12">
      <p class="mb-0 body-1">
        Found {{ item.data.filtered_paths.length }} unique paths matching the
        given extensions.
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
        <v-col class="py-0 font-weight-light" cols="3">
          Minimum size limit
        </v-col>
        <v-col class="py-0 body-2 font-weight-thin" cols="9">
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
  </v-row>
</template>

<script>
import formatters from "../../../../../mixins/formatters";

export default {
  name: "components.requests.detail.tabs.handlers.resource-info",
  mixin: [formatters],
  data: () => ({}),
  props: {
    item: Object,
  },
};
</script>
