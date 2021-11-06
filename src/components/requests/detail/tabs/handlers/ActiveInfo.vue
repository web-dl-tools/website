<template>
  <v-row>
    <v-col cols="12" class="text-center">
      <img
        alt="Still loading"
        height="200"
        :src="require('./../../../../../assets/images/downloading.gif')"
      />
      <p class="mt-4 mb-0">
        <span class="font-weight-bold">
          Request has not finished downloading/processing...
        </span>
        <br />
        Information will appear after the request has completed.
      </p>
    </v-col>
  </v-row>
</template>

<script>
import formatters from "../../../../../mixins/formatters";

export default {
  name: "components-requests-detail-tabs-handlers-active-info",
  mixin: [formatters],
  props: {
    item: Object,
  },
};
</script>
