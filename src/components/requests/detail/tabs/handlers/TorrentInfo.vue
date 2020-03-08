<template>
  <v-row>
    <v-col cols="12">
      <p class="mb-0 body-1">{{ item.data.name }}</p>
      <p class="font-weight-light mb-0">Hash: {{ item.data.hash }}</p>
      <p class="font-weight-light">
        Size: {{ formatBytes(item.data.total_size, 2) }}
      </p>
      <p class="font-weight-light mb-0">Tracker: {{ item.data.tracker }}</p>
    </v-col>
  </v-row>
</template>

<script>
import formatters from "../../../../../mixins/formatters";

export default {
  name: "components.requests.detail.tabs.handlers.torrent-info",
  mixin: [formatters],
  props: {
    item: Object
  }
};
</script>
