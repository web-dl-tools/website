<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <img
        alt="Failed"
        height="200"
        :src="require('./../../../../../assets/images/error.gif')"
      />
      <p class="mt-4 mb-0">
        <span class="font-weight-bold">
          Request has failed downloading/processing.
        </span>
        <br />
        Please retry the request again (later).
      </p>
    </v-col>
  </v-row>
</template>

<script>
import formatters from "../../../../../mixins/formatters";

export default {
  name: "components.requests.detail.tabs.handlers.failed-info",
  mixin: [formatters],
  props: {
    item: Object,
  },
};
</script>
