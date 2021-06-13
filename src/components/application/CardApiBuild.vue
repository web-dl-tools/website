<template>
  <v-card outlined raised>
    <v-card-title>
      API
      <v-spacer />
      <v-icon>mdi-link-variant</v-icon>
    </v-card-title>
    <v-card-subtitle class="subtitle-2 col-8 pl-4">
      Below you can find information about the current API build of Web DL.
    </v-card-subtitle>
    <v-card-text class="pb-0" v-if="!apiBuildInfo">
      <v-row>
        <v-col cols="12">
          <v-skeleton-loader type="text" />
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text v-else>
      <v-row>
        <v-col cols="4" class="font-weight-regular"> Version </v-col>
        <v-col cols="8">
          {{ apiBuildInfo.tag }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="py-0 font-weight-regular">Build</v-col>
        <v-col cols="8" class="py-0">
          {{ apiBuildInfo.commit }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="py-0 font-weight-regular"> Build date </v-col>
        <v-col cols="8" class="py-0">
          {{ formatDate(apiBuildInfo.commiter.date, "dddd LL [at] HH:mm:ss") }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="py-0"></v-col>
        <v-col cols="8" class="py-0">
          Build {{ formatDateFromNow(apiBuildInfo.commiter.date) }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="pt-0 font-weight-regular">
          Git references
        </v-col>
        <v-col cols="8" class="pt-0">
          <v-chip
            v-for="ref in apiBuildInfo.refs.split(',')"
            :key="ref"
            class="ma-1 ml-0"
            label
            x-small
          >
            {{ ref }}
          </v-chip>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="py-0 font-weight-regular"> Latest change </v-col>
        <v-col cols="8" class="py-0">
          {{ apiBuildInfo.subject }}
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4" class="pt-0 font-weight-regular">Author</v-col>
        <v-col cols="8" class="pt-0">
          {{ apiBuildInfo.author.name }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="pt-0 font-weight-regular">
          Websocket connection
        </v-col>
        <v-col
          cols="8"
          class="pt-0"
          :class="{
            'success--text': websocket.readyState === 1,
            'warning--text': [0, 2].includes(websocket.readyState),
            'error--text': ![0, 1, 2].includes(websocket.readyState),
          }"
        >
          {{ getWebsocketFormattedState(websocket.readyState) }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4" class="py-0 font-weight-regular"> Source </v-col>
        <v-col cols="8" class="py-0">
          <a
            href="https://gitlab.com/web-dl/api"
            class="accent--text"
            target="_blank"
          >
            https://gitlab.com/web-dl/api
          </a>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "components.application.card-api-build",
  mixin: [formatters],
  computed: {
    ...mapGetters({
      apiBuildInfo: "application/getApiBuildInfo",
      websocket: "application/getWebsocket",
    }),
  },
  methods: {
    /**
     * Get the websocket state as a formatted string.
     *
     * @param state
     * @returns {string}
     */
    getWebsocketFormattedState(state) {
      let formatted;

      switch (state) {
        case 0:
          formatted = "Connecting";
          break;
        case 1:
          formatted = "Open";
          break;
        case 2:
          formatted = "Closing";
          break;
        case 3:
          formatted = "Closed";
          break;
        default:
          formatted = "Unknown";
          break;
      }

      return formatted;
    },
  },
};
</script>
