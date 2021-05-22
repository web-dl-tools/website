<template>
  <v-main class="background-wallpaper">
    <v-container>
      <v-row>
        <v-col class="pa-0" cols="12" md="8">
          <p class="mx-3 my-12 font-weight-thin display-3 text-shadow">
            {{ title }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="7">
          <v-card raised>
            <v-card-title class="subtitle-1"> Website </v-card-title>
            <v-card-subtitle class="subtitle-2">
              Below you can find information about the current website build of
              Web DL.
            </v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols="4" class="font-weight-regular"> Version </v-col>
                <v-col cols="8">
                  {{ buildInfo.tag }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="py-0 font-weight-regular">Build</v-col>
                <v-col cols="8" class="py-0">
                  {{ buildInfo.commit }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="py-0 font-weight-regular">
                  Build date
                </v-col>
                <v-col cols="8" class="py-0">
                  {{
                    formatDate(buildInfo.commiter.date, "dddd LL [at] HH:mm:ss")
                  }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="py-0"></v-col>
                <v-col cols="8" class="py-0">
                  Build {{ formatDateFromNow(buildInfo.commiter.date) }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="pt-0 font-weight-regular">
                  Git references
                </v-col>
                <v-col cols="8" class="pt-0">
                  <v-chip
                    v-for="ref in buildInfo.refs.split(',')"
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
                  {{ buildInfo.subject }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="py-0 font-weight-regular">Author</v-col>
                <v-col cols="8" class="py-0">
                  {{ buildInfo.author.name }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="pt-0"></v-col>
                <v-col cols="8" class="pt-0">
                  {{ buildInfo.author.email }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" class="py-0 font-weight-regular">
                  Source
                </v-col>
                <v-col cols="8" class="py-0">
                  <a
                    href="https://gitlab.com/web-dl/website"
                    class="accent--text"
                    target="_blank"
                  >
                    https://gitlab.com/web-dl/website
                  </a>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="5">
          <v-card raised>
            <v-card-title class="subtitle-1"> API </v-card-title>
            <v-card-subtitle class="subtitle-2">
              Below you can find information about the current API build of Web
              DL.
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
                <v-col cols="4" class="py-0 font-weight-regular">
                  Build date
                </v-col>
                <v-col cols="8" class="py-0">
                  {{
                    formatDate(
                      apiBuildInfo.commiter.date,
                      "dddd LL [at] HH:mm:ss"
                    )
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
                <v-col cols="4" class="py-0 font-weight-regular">Author</v-col>
                <v-col cols="8" class="py-0">
                  {{ apiBuildInfo.author.name }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4" class="pt-0"></v-col>
                <v-col cols="8" class="pt-0">
                  {{ apiBuildInfo.author.email }}
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="4" class="py-0 font-weight-regular">
                  Source
                </v-col>
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
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "views.application.overview",
  mixin: [formatters],
  computed: {
    ...mapGetters({
      title: "application/getTitle",
      buildInfo: "application/getBuildInfo",
      apiBuildInfo: "application/getApiBuildInfo",
    }),
  },
};
</script>
