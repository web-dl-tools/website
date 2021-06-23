<template>
  <v-card
    outlined
    raised
    :loading="processing"
    @click="
      $router
        .push({
          name: 'requests.detail',
          params: { requestId: request.id },
        })
        .catch(() => {})
    "
  >
    <template v-slot:progress>
      <status :request="request" :linear="true" />
    </template>
    <v-card-title class="subtitle-1">
      {{ this.truncate(request.url, 45) }}
      <v-spacer />
      <status :request="request" />
    </v-card-title>
    <v-card-subtitle class="subtitle-2">
      {{ this.formatRequest(request.request_type) }} request
    </v-card-subtitle>
  </v-card>
</template>

<script>
import helpers from "../../../mixins/formatters";
import formatters from "../../../mixins/formatters";
import status from "../../../components/requests/Status";

export default {
  name: "components.requests.active.card-mini",
  mixin: [helpers, formatters],
  components: {
    status,
  },
  props: {
    request: Object,
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
    },
  },
};
</script>
