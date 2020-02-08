<template>
  <v-card outlined :loading="request.status === 'downloading'">
    <v-card-title class="subtitle-1">
      {{ request.url }}
      <v-spacer />
      <v-chip
        class="white--text mr-2"
        label
        small
        :color="formatRequestStatusColor(request.status)"
      >
        {{ request.status_display }}
      </v-chip>
    </v-card-title>
    <v-card-subtitle class="subtitle-2">
      {{ this.formatRequest(request.request_type) }} Request
    </v-card-subtitle>
  </v-card>
</template>

<script>
import formatters from "../../../mixins/formatters";

export default {
  name: "components.requests.active.card-mini",
  mixin: [formatters],
  props: {
    request: Object
  }
};
</script>
