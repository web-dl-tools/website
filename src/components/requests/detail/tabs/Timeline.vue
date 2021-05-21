<template>
  <v-tab-item>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item v-if="item.compressed_at !== null" color="success" small>
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18">
            Request archive created.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold success--text">
            {{ formatDate(item.compressed_at) }}
          </v-card-subtitle>
          <v-card-text>
            The request archive has been created in
            {{
              formatDateDuration(
                item.start_compressing_at,
                item.compressed_at,
                "seconds",
                ["{formatted} seconds", "unknown seconds."]
              )
            }}.
          </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item
        v-if="item.start_compressing_at !== null"
        color="info"
        small
      >
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18">
            Request archive started compressing.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold info--text">
            {{ formatDate(item.start_compressing_at) }}
          </v-card-subtitle>
          <v-card-text>
            The request archive has started compressing.
          </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item v-if="item.status === 'failed'" color="error" small>
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18">
            Request failed.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold error--text">
            {{ formatDate(item.modified_at) }}
          </v-card-subtitle>
          <v-card-text> The request failed to download. </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item v-if="item.status === 'completed'" color="success" small>
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18">
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
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18">
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

      <v-timeline-item color="info" small>
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18">
            Request has been created.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold info--text">
            {{ formatDate(item.created_at) }}
          </v-card-subtitle>
          <v-card-text class="white--text">
            A request to download
            <a :href="item.url" class="info--text">{{ item.url }}</a>
            <br />
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
    item: Object,
  },
};
</script>
