<template>
  <a
    :href="`https://github.com/web-dl-tools/${repo}/releases`"
    class="text-decoration-none"
  >
    <v-chip
      v-if="!this.buildInfo || !this.latestReleaseInfo"
      class="font-weight-regular cursor-pointer"
      color="grey"
      outlined
      label
      x-small
    >
      Checking for updates...
    </v-chip>
    <v-chip
      v-else-if="versionDifference"
      class="font-weight-regular cursor-pointer"
      :color="versionDifference === 'major' ? 'warning' : 'grey'"
      outlined
      label
      x-small
    >
      A
      {{ versionDifference }}
      version update is available
    </v-chip>
    <v-chip
      v-else
      class="font-weight-regular cursor-pointer"
      color="success"
      outlined
      label
      x-small
    >
      You're on the latest version
    </v-chip>
  </a>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "components.application.latest-release-check",
  mixin: [formatters],
  computed: {
    ...mapGetters({
      websiteBuildInfo: "application/getBuildInfo",
      apiBuildInfo: "application/getApiBuildInfo",
      websiteLatestReleaseInfo: "application/getLatestWebsiteRelease",
      apiLatestReleaseInfo: "application/getLatestApiRelease",
    }),
    buildInfo() {
      return this[`${this.repo}BuildInfo`];
    },
    latestReleaseInfo() {
      return this[`${this.repo}LatestReleaseInfo`];
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
};
</script>
