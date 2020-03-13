<template>
  <v-card
    outlined
    raised
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
        :buffer-value="request.progress - 100"
        :color="formatRequestStatusColor(request.status)"
        :value="request.progress"
        stream
      />
      <v-progress-linear
        v-else
        :color="formatRequestStatusColor(request.status)"
        indeterminate
      />
    </template>
    <v-card-title class="subtitle-1">
      {{ this.truncate(request.url, 45) }}
      <v-spacer />
      <v-chip
        :color="formatRequestStatusColor(request.status)"
        class="white--text mr-2"
        label
        small
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
    /**
     * Check if the request is currently processing.
     *
     * @returns {number|""|boolean}
     */
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
