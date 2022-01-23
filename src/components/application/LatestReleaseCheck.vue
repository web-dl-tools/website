<template>
  <v-row>
    <v-col v-if="!this.buildInfo || !this.latestReleaseInfo" class="pb-0">
      <v-btn block loading text x-small>
        <template v-slot:loader>
          <v-progress-circular indeterminate size="10" width="1" />
          <span class="pl-2">Checking for updates...</span>
        </template>
      </v-btn>
    </v-col>
    <v-col v-else-if="versionDifference" class="pb-0">
      <v-row class="mx-0">
        <v-col cols="12" class="pa-0 mb-2">
          <v-btn
            block
            x-small
            :color="getVersionDifferenceColor(versionDifference)"
            :href="`https://github.com/web-dl-tools/${repo}/releases`"
            :text="versionDifference !== 'major'"
            target="_blank"
          >
            <v-icon class="mr-2" small> mdi-refresh </v-icon>
            New {{ versionDifference }} version available
          </v-btn>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-btn
            block
            text
            x-small
            color="white"
            :href="'https://web-dl-tools.github.io/docs/#/upgrade?id=updating'"
            target="_blank"
          >
            Update guide
          </v-btn>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-btn block disabled text x-small>
            v{{ latestReleaseInfo.tag_name }} &middot; Created
            {{ formatDateFromNow(this.latestReleaseInfo.created_at) }}
          </v-btn>
        </v-col>
        <v-col cols="4" class="pa-0">
          <v-btn
            block
            text
            x-small
            color="white"
            :href="`https://github.com/web-dl-tools/${repo}/compare/${buildInfo.version}...${latestReleaseInfo.tag_name}`"
            target="_blank"
          >
            Changelog
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-else class="pb-0">
      <v-btn
        block
        text
        x-small
        color="success"
        :href="`https://github.com/web-dl-tools/${repo}/releases`"
        target="_blank"
      >
        <v-icon class="mr-2" small> mdi-check </v-icon>
        You're on the latest version
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import formatters from "../../mixins/formatters";
import helpers from "../../mixins/helpers";

export default {
  name: "components.application.latest-release-check",
  mixin: [formatters, helpers],
  props: {
    repo: {
      type: String,
    },
  },
  computed: {
    buildInfo() {
      return this.$store.getters[
        `application/get${this.capitalize(this.repo)}BuildInfo`
      ];
    },
    latestReleaseInfo() {
      return this.$store.getters[
        `application/getLatest${this.capitalize(this.repo)}Release`
      ];
    },
    versionDifference() {
      if (this.buildInfo && this.latestReleaseInfo) {
        return this.formatVersioningDifference(
          this.buildInfo.version,
          this.latestReleaseInfo.tag_name
        );
      }
      return null;
    },
  },
  methods: {
    /**
     * Generate a color from the version difference level.
     *
     * @param difference
     * @returns {string}
     */
    getVersionDifferenceColor(difference) {
      switch (difference) {
        case "major":
          return "error";
        case "minor":
          return "warning";
        case "patch":
        default:
          return "info";
      }
    },
  },
  /**
   * Get the latest repo release.
   */
  created() {
    setTimeout(
      () => this.$store.dispatch("application/getLatestRepoRelease", this.repo),
      1500
    );
  },
};
</script>
