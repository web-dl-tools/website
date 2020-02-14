<template>
  <v-card
    raised
    outlined
    :loading="processing"
    @click="
      $router
        .push({
          name: 'requests.detail',
          params: { requestId: request.id }
        })
        .catch(() => {})
    "
  >
    <template v-slot:progress>
      <v-progress-linear
        v-if="request.status === 'downloading'"
        :value="request.progress"
        :buffer-value="request.progress - 100"
        stream
        :color="formatRequestStatusColor(request.status)"
      />
      <v-progress-linear
        v-else
        indeterminate
        :color="formatRequestStatusColor(request.status)"
      />
    </template>
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
  },
  computed: {
    processing() {
      return (
        this.request.status &&
        ["pre_processing", "downloading", "post_processing"].includes(
          this.request.status
        )
      );
    }
  }
};
</script>
