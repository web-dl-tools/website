<template>
  <v-tab-item>
    <v-timeline>
      <v-timeline-item small color="success" v-if="item.status === 'completed'">
        <template v-slot:opposite>
          <span class="mb-0 font-weight-bold success--text">
            {{ formatDate(item.start_processing_at, "LLLL") }}
          </span>
          <p>({{ formatDateFromNow(item.start_processing_at) }})</p>
        </template>
        <div>
          <h2 class="headline font-weight-light success--text`">
            Request has completed.
          </h2>
          <div>
            The request has finished downloading and processing.
          </div>
        </div>
      </v-timeline-item>
      <v-timeline-item
        small
        color="accent"
        class="text-end"
        v-if="item.status !== 'pending' && item.status !== 'failed'"
      >
        <template v-slot:opposite>
          <span class="mb-0 font-weight-bold accent--text">
            {{ formatDate(item.start_processing_at, "LLLL") }}
          </span>
          <p>({{ formatDateFromNow(item.start_processing_at) }})</p>
        </template>
        <div>
          <h2 class="headline font-weight-light accent--text`">
            Request has started processing.
          </h2>
          <div>
            The request has started processing with the
            {{ formatRequest(item.request_type) }} handler.
          </div>
        </div>
      </v-timeline-item>
      <v-timeline-item small color="info">
        <template v-slot:opposite>
          <span class="mb-0 font-weight-bold info--text">
            {{ formatDate(item.created_at, "LLLL") }}
          </span>
          <p>({{ formatDateFromNow(item.created_at) }})</p>
        </template>
        <div>
          <h2 class="headline font-weight-light info--text`">
            Request has been created.
          </h2>
          <div>
            A request to download <a :href="item.url">{{ item.url }}</a> using
            the {{ formatRequest(item.request_type) }} handler has been
            submitted.
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-tab-item>
</template>

<script>
import formatters from "../../../../mixins/formatters";

export default {
  name: "components.requests.detail.tabs.timeline",
  mixin: [formatters],
  data: () => ({}),
  props: {
    active: Boolean,
    item: Object
  }
};
</script>
