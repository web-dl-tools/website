<template>
  <v-card outlined raised>
    <v-card-title>
      API
      <v-spacer />
      <v-icon>mdi-link-variant</v-icon>
    </v-card-title>
    <v-card-subtitle class="subtitle-2 col-8 pl-4">
      Information about the current API build of Web DL.
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
        <v-col class="text-center">
          <span class="font-weight-bold"> v{{ apiBuildInfo.version }} </span>
          <v-divider class="mt-3" />
          <latest-release-check repo="api" />
        </v-col>
      </v-row>
      <v-divider class="mb-3" />
      <div v-if="technical">
        <v-row>
          <v-col cols="4" class="py-0 font-weight-regular">Build</v-col>
          <v-col cols="8" class="py-0">
            {{ apiBuildInfo.commit }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0 font-weight-regular"> Build date </v-col>
          <v-col cols="8" class="py-0">
            {{
              formatDate(apiBuildInfo.commiter.date, "dddd, LL [at] HH:mm:ss")
            }}
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
          <v-col cols="4" class="py-0 font-weight-regular">
            Latest change
          </v-col>
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
          <v-col cols="4" class="py-0 font-weight-regular"> Source </v-col>
          <v-col cols="8" class="py-0">
            <a
              href="https://github.com/web-dl-tools/api"
              class="accent--text"
              target="_blank"
            >
              https://github.com/web-dl-tools/api
            </a>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row>
          <v-col cols="4" class="py-0 font-weight-regular"> Created </v-col>
          <v-col cols="8" class="py-0">
            {{ formatDate(apiBuildInfo.commiter.date, "dddd LL") }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0"></v-col>
          <v-col cols="8" class="py-0">
            {{ formatDateFromNow(apiBuildInfo.commiter.date) }}
          </v-col>
        </v-row>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";
import LatestReleaseCheck from "./LatestReleaseCheck";

export default {
  name: "components.application.card-api-build",
  mixin: [formatters],
  components: {
    LatestReleaseCheck,
  },
  computed: {
    ...mapGetters({
      apiBuildInfo: "application/getApiBuildInfo",
      technical: "users/isTechnical",
    }),
  },
};
</script>
