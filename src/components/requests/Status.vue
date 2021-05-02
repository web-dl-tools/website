<template>
  <span v-if="linear">
    <v-progress-linear
      v-if="request.status === 'downloading'"
      height="5"
      :buffer-value="request.progress - 100"
      :color="formatRequestStatusColor(request.status)"
      :value="request.progress"
      stream
    />
    <v-progress-linear
      v-else
      height="5"
      :color="formatRequestStatusColor(request.status)"
      indeterminate
    />
  </span>
  <span v-else>
    <span>
      <v-chip
        :class="[
          'px-2',
          formatTextColor(formatRequestStatusColor(request.status)),
          {
            'no-radius-right': processing,
          },
        ]"
        label
        small
        :color="formatRequestStatusColor(request.status)"
      >
        {{ formatRequestStatus(request.status) }}
      </v-chip>
      <v-chip
        v-if="processing"
        class="white--text px-2 no-border-left no-radius-left"
        label
        outlined
        small
      >
        <span v-if="request.status === 'downloading'" class="mr-2">
          {{ request.progress }}%
        </span>
        <div class="inner-spinner">
          <v-progress-circular
            v-if="request.status === 'downloading'"
            :color="formatRequestStatusColor(request.status)"
            :rotate="270"
            :size="15"
            :value="request.progress"
            :width="2"
          />
          <v-progress-circular
            v-else
            indeterminate
            :color="formatRequestStatusColor(request.status)"
            :size="15"
            :width="2"
          />
        </div>
      </v-chip>
    </span>
  </span>
</template>

<script>
import formatters from "../../mixins/formatters";

export default {
  name: "components.requests.status",
  mixin: [formatters],
  props: {
    request: Object,
    with_progress: {
      type: Boolean,
      default: false,
    },
    linear: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    /**
     * Check if the request is currently processing.
     *
     * @returns {*|boolean}
     */
    processing() {
      return this.request
        ? this.request.status &&
            ["pre_processing", "downloading", "post_processing"].includes(
              this.request.status
            ) &&
            this.with_progress
        : false;
    },
  },
};
</script>

<style scoped>
.inner-spinner {
  padding-bottom: 4.5px;
}
</style>
