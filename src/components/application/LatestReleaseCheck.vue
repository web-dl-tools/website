<template>
  <v-row>
    <v-col v-if="!this.buildInfo || !this.latestReleaseInfo" class="pb-0">
      <v-btn block loading outlined x-small>
        <template v-slot:loader>
          <v-progress-circular indeterminate size="10" width="1" />
          <span class="pl-2">Checking for updates...</span>
        </template>
      </v-btn>
    </v-col>
    <v-col v-else-if="versionDifference" class="pb-0">
      <v-row class="mx-0">
        <v-col class="pa-0 mb-1">
          <v-btn
            block
            x-small
            :color="versionDifference === 'major' ? 'warning' : 'grey'"
            :href="`https://github.com/web-dl-tools/${repo}/releases`"
          >
            A
            {{ versionDifference }}
            version update is available
          </v-btn>
        </v-col>
        <v-col cols="6" class="pa-0">
          <v-btn
            block
            text
            x-small
            color="white"
            :href="`https://github.com/web-dl-tools/${repo}#update-guide`"
          >
            Update guide
          </v-btn>
        </v-col>
        <v-col cols="6" class="pa-0">
          <v-btn
            block
            text
            x-small
            color="white"
            :href="`https://github.com/web-dl-tools/${repo}/compare/${buildInfo.tag}...${latestReleaseInfo.tag_name}`"
          >
            View changelog
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <v-col v-else class="pb-0">
      <v-btn
        block
        outlined
        x-small
        color="success"
        :href="`https://github.com/web-dl-tools/${repo}/releases`"
      >
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
          this.buildInfo.tag,
          this.latestReleaseInfo.tag_name
        );
      }
      return null;
    },
  },
  props: {
    repo: {
      type: String,
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
