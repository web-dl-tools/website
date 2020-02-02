<template>
  <v-card outlined :loading="request.status === 'downloading'">
    <v-card-subtitle>
      <v-chip
        class="white--text mr-2"
        label
        small
        :color="formatRequestStatusColor(request.status)"
      >
        {{ request.status_display }}
      </v-chip>
    </v-card-subtitle>
    <v-card-title class="py-0">
      {{ request.url }}
    </v-card-title>
    <v-card-text>
      {{ this.formatRequest(request.request_type) }}
    </v-card-text>
    <v-card-actions>
      <v-btn
        outlined
        class="ml-2 mb-2"
        color="primary"
        @click="
          $router
            .push({
              name: 'requests.detail',
              params: { requestId: request.id }
            })
            .catch(() => {})
        "
      >
        View details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import formatters from "../../mixins/formatters";

export default {
  name: "components.requests.card-mini",
  mixin: [formatters],
  props: {
    request: Object
  }
};
</script>
