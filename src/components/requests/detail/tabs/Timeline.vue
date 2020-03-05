<template>
  <v-tab-item>
    <v-timeline>
      <v-timeline-item v-if="item.status === 'completed'" color="success" small>
        <v-card raised>
          <v-card-title class="headline font-weight-light success--text">
            Request has completed.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold success--text">
            {{ formatDate(item.completed_at) }}
          </v-card-subtitle>
          <v-card-text>
            The request has finished downloading and processing.
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item
        v-if="item.status !== 'pending' && item.status !== 'failed'"
        color="accent"
        small
      >
        <v-card raised>
          <v-card-title class="headline font-weight-light accent--text">
            Request has started processing.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold accent--text">
            {{ formatDate(item.start_processing_at) }}
          </v-card-subtitle>
          <v-card-text>
            The request has started processing with the
            {{ formatRequest(item.request_type) }} handler.
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item small color="info">
        <v-card raised>
          <v-card-title class="headline font-weight-light info--text">
            Request has been created.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold info--text">
            {{ formatDate(item.created_at) }}
          </v-card-subtitle>
          <v-card-text>
            A request to download <a :href="item.url">{{ item.url }}</a> <br />
            using the {{ formatRequest(item.request_type) }} handler has been
            submitted.
          </v-card-text>
        </v-card>
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
