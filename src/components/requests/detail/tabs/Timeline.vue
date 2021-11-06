<template>
  <v-tab-item>
    <v-timeline :dense="$vuetify.breakpoint.smAndDown">
      <v-timeline-item color="grey" small>
        <template v-slot:opposite>
          {{ formatDateFromNow(item.modified_at) }}
        </template>
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18 mt-n1">
            Request state updated.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold grey--text">
            {{ formatDate(item.modified_at, "L H:mm:ss") }}
          </v-card-subtitle>
          <v-card-text>
            The request received it's latest state update.
            {{
              formatDateDuration(
                item.created_at,
                item.modified_at,
                "humanize",
                ["It has been {formatted}", "No time has passed (yet)"]
              )
            }}
            since the request initially was created.
          </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item v-if="item.compressed_at !== null" color="success" small>
        <template v-slot:opposite>
          {{ formatDateFromNow(item.compressed_at) }}
        </template>
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18 mt-n1">
            Request archive created.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold success--text">
            {{ formatDate(item.compressed_at, "L H:mm:ss") }}
          </v-card-subtitle>
          <v-card-text>
            The request archive has been created in
            {{
              formatDateDuration(
                item.start_compressing_at,
                item.compressed_at,
                "automatic",
                ["{formatted} {timeframe}.", "an unknown timeframe."]
              )
            }}
          </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item
        v-if="item.start_compressing_at !== null"
        color="info"
        small
      >
        <template v-slot:opposite>
          {{ formatDateFromNow(item.start_compressing_at) }}
        </template>
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18 mt-n1">
            Request archive started compressing.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold info--text">
            {{ formatDate(item.start_compressing_at, "L H:mm:ss") }}
          </v-card-subtitle>
          <v-card-text>
            The request archive has started compressing. Task was triggered
            {{
              formatDateDuration(
                item.completed_at,
                item.start_compressing_at,
                "humanize"
              )
            }}
            after the request was completed.
          </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item v-if="item.status === 'failed'" color="error" small>
        <template v-slot:opposite>
          {{ formatDateFromNow(item.modified_at) }}
        </template>
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18 mt-n1">
            Request failed.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold error--text">
            {{ formatDate(item.modified_at, "L H:mm:ss") }}
          </v-card-subtitle>
          <v-card-text> The request failed to download. </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item v-if="item.status === 'completed'" color="success" small>
        <template v-slot:opposite>
          {{ formatDateFromNow(item.completed_at) }}
        </template>
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18 mt-n1">
            Request has completed.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold success--text">
            {{ formatDate(item.completed_at, "L H:mm:ss") }}
          </v-card-subtitle>
          <v-card-text>
            The request has finished processing. The total processing time took
            {{
              formatDateDuration(
                item.start_processing_at,
                item.completed_at,
                "automatic",
                ["{formatted} {timeframe}.", "an unknown timeframe."]
              )
            }}
          </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item
        v-if="item.status !== 'pending' && item.status !== 'failed'"
        color="accent"
        small
      >
        <template v-slot:opposite>
          {{ formatDateFromNow(item.start_processing_at) }}
        </template>
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18 mt-n1">
            Request has started processing.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold accent--text">
            {{ formatDate(item.start_processing_at, "L H:mm:ss") }}
          </v-card-subtitle>
          <v-card-text>
            The request has started processing with the
            {{ formatRequest(item.request_type).toLowerCase() }} handler. It was
            queued for
            {{
              formatDateDuration(
                item.created_at,
                item.start_processing_at,
                "automatic",
                ["{formatted} {timeframe}.", "an unknown timeframe."]
              )
            }}
          </v-card-text>
        </v-card>
      </v-timeline-item>

      <v-timeline-item color="info" small>
        <template v-slot:opposite>
          {{ formatDateFromNow(item.created_at) }}
        </template>
        <v-card outlined>
          <v-card-title class="font-weight-light font-size-18 mt-n1">
            Request has been created.
          </v-card-title>
          <v-card-subtitle class="font-weight-bold info--text">
            {{ formatDate(item.created_at, "L H:mm:ss") }}
          </v-card-subtitle>
          <v-card-text class="white--text">
            A request to download
            <a :href="item.url" class="info--text">{{ item.url }}</a>
            <br />
            using the
            {{ formatRequest(item.request_type).toLowerCase() }} handler has
            been submitted.
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-tab-item>
</template>

<script>
import formatters from "../../../../mixins/formatters";

export default {
  name: "components-requests-detail-tabs-timeline",
  mixin: [formatters],
  props: {
    active: Boolean,
    item: Object,
  },
};
</script>
