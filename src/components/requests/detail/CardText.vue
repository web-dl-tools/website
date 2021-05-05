<template>
  <div>
    <div>
      <div v-if="item.status !== 'completed'">
        <v-card-title class="pt-0 title">
          {{ truncate(item.url, 160) }}
        </v-card-title>
      </div>
      <div v-else>
        <v-card-title class="pt-0 title">
          {{ item.title }}
        </v-card-title>
        <v-card-subtitle class="pt-0 subtitle-2">
          {{ truncate(item.url, 160) }}
        </v-card-subtitle>
      </div>
      <v-card-text class="py-0">
        <v-row>
          <v-col cols="12" md="6">
            <p class="mb-2">
              <v-icon> mdi-shape-outline </v-icon>
              <span class="ml-1">
                {{ formatRequest(item.request_type) }} Request
              </span>
            </p>
            <p class="mb-2">
              <v-icon> mdi-plus </v-icon>
              <span class="ml-1">
                {{
                  formatDate(
                    item.created_at,
                    "[Requested on] dddd, LL [at] HH:mm:ss"
                  )
                }}
                <br v-if="$vuetify.breakpoint.smAndDown" />
                ({{ formatDateFromNow(item.created_at) }})
              </span>
            </p>
          </v-col>
          <v-col cols="12" md="3">
            <p
              v-if="item.status !== 'pending' && item.status !== 'failed'"
              class="mb-2"
            >
              <v-icon> mdi-download-outline </v-icon>
              <span class="ml-1">
                Started
                {{
                  sameDate(item.created_at, item.start_processing_at)
                    ? formatDate(item.start_processing_at, "[at] HH:mm:ss")
                    : formatDate(
                        item.start_processing_at,
                        "[on] LL [at] HH:mm:ss"
                      )
                }}
              </span>
            </p>
            <p v-if="item.status === 'completed'" class="mb-2">
              <v-icon> mdi-checkbox-marked-circle-outline </v-icon>
              <span class="ml-1">
                Completed
                {{
                  sameDate(item.created_at, item.completed_at)
                    ? formatDate(item.completed_at, "[at] HH:mm:ss")
                    : formatDate(item.completed_at, "[on] LL [at] HH:mm:ss")
                }}
              </span>
            </p>
          </v-col>
          <v-col cols="12" md="3">
            <p
              v-if="item.status !== 'pending' && item.status !== 'failed'"
              class="mb-2"
            >
              <v-icon> mdi-timer-sand </v-icon>
              <span class="ml-1">
                In queue for
                {{
                  formatDateDuration(
                    item.created_at,
                    item.start_processing_at,
                    "humanize"
                  )
                }}
              </span>
            </p>
            <p v-if="item.status === 'completed'" class="mb-2">
              <v-icon> mdi-progress-download </v-icon>
              <span class="ml-1">
                Processed in
                {{
                  formatDateDuration(
                    item.start_processing_at,
                    item.completed_at,
                    "humanize"
                  )
                }}
              </span>
            </p>
          </v-col>
        </v-row>
      </v-card-text>
    </div>
  </div>
</template>

<script>
import formatters from "../../../mixins/formatters";
import helpers from "../../../mixins/helpers";

export default {
  name: "components.requests.detail.card-text",
  mixin: [formatters, helpers],
  props: {
    item: Object,
  },
};
</script>
