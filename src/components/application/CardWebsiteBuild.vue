<template>
  <v-card outlined raised>
    <v-card-title>
      Website
      <v-spacer />
      <v-icon>mdi-laptop-mac</v-icon>
    </v-card-title>
    <v-card-subtitle class="subtitle-2 col-8 pl-4">
      Information about the current website build of Web DL.
    </v-card-subtitle>
    <v-card-text>
      <v-row class="mb-3">
        <v-col class="text-center">
          <span class="font-weight-bold"> v{{ websiteBuildInfo.tag }} </span>
          <latest-release-check repo="website" />
        </v-col>
      </v-row>
      <div v-if="technical">
        <v-row>
          <v-col cols="4" class="py-0 font-weight-regular">Build</v-col>
          <v-col cols="8" class="py-0">
            {{ websiteBuildInfo.commit }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0 font-weight-regular"> Build date </v-col>
          <v-col cols="8" class="py-0">
            {{
              formatDate(
                websiteBuildInfo.commiter.date,
                "dddd LL [at] HH:mm:ss"
              )
            }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0"></v-col>
          <v-col cols="8" class="py-0">
            Build {{ formatDateFromNow(websiteBuildInfo.commiter.date) }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="pt-0 font-weight-regular">
            Git references
          </v-col>
          <v-col cols="8" class="pt-0">
            <v-chip
              v-for="ref in websiteBuildInfo.refs.split(',')"
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
            {{ websiteBuildInfo.subject }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="pt-0 font-weight-regular">Author</v-col>
          <v-col cols="8" class="pt-0">
            {{ websiteBuildInfo.author.name }}
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="4" class="py-0 font-weight-regular"> Source </v-col>
          <v-col cols="8" class="py-0">
            <a
              href="https://github.com/web-dl-tools/website"
              class="accent--text"
              target="_blank"
            >
              https://github.com/web-dl-tools/website
            </a>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row>
          <v-col cols="4" class="py-0 font-weight-regular"> Created </v-col>
          <v-col cols="8" class="py-0">
            {{ formatDate(websiteBuildInfo.commiter.date, "dddd LL") }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="py-0"></v-col>
          <v-col cols="8" class="py-0">
            {{ formatDateFromNow(websiteBuildInfo.commiter.date) }}
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
  name: "components.application.card-website-build",
  mixin: [formatters],
  components: {
    LatestReleaseCheck,
  },
  computed: {
    ...mapGetters({
      websiteBuildInfo: "application/getWebsiteBuildInfo",
      technical: "users/isTechnical",
    }),
  },
};
</script>
