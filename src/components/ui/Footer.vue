<template>
  <v-footer absolute light class="py-0" color="transparent">
    <v-col class="py-6" v-if="!apiBuildInfo" cols="12" md="6">
      <v-skeleton-loader type="sentences" />
    </v-col>
    <v-col v-else-if="full" class="text-caption" cols="12">
      <v-row>
        <div
          class="cursor-pointer"
          @click="$router.push({ name: 'application.build' }).catch(() => {})"
        >
          <v-col
            v-if="technical"
            :class="$vuetify.breakpoint.smAndDown ? 'pa-0' : 'pb-0'"
            cols="12"
          >
            <span class="font-weight-bold">Web DL Website</span>
            v{{ buildInfo.version }} &middot;
            {{ formatDate(buildInfo.commiter.date, "Y.M.D") }}
          </v-col>
          <v-col
            v-else
            :class="$vuetify.breakpoint.smAndDown ? 'pa-0' : 'pb-0'"
            cols="12"
          >
            <span class="font-weight-bold">Web DL Website</span>
            v{{ buildInfo.version }}
          </v-col>

          <v-col
            v-if="technical"
            :class="$vuetify.breakpoint.smAndDown ? 'pa-0' : 'pt-0'"
            cols="12"
          >
            <span class="font-weight-bold">Web DL API</span>
            v{{ apiBuildInfo.version }} &middot;
            {{ formatDate(apiBuildInfo.commiter.date, "Y.M.D") }}
          </v-col>
          <v-col
            v-else
            :class="$vuetify.breakpoint.smAndDown ? 'pa-0' : 'pt-0'"
            cols="12"
          >
            <span class="font-weight-bold">Web DL API</span>
            v{{ apiBuildInfo.version }}
          </v-col>
        </div>
      </v-row>
    </v-col>
    <v-col v-else class="text-caption" cols="12">
      <v-row>
        <v-col class="pb-0" cols="12">
          <span class="font-weight-bold">Web DL Website</span>
          v{{ buildInfo.version }}
        </v-col>

        <v-col class="pt-0" cols="12">
          <span class="font-weight-bold">Web DL API</span>
          v{{ apiBuildInfo.version }}
        </v-col>
      </v-row>
    </v-col>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "components-ui-footer",
  mixins: [formatters],
  computed: {
    ...mapGetters({
      buildInfo: "application/getWebsiteBuildInfo",
      apiBuildInfo: "application/getApiBuildInfo",
      technical: "users/isTechnical",
    }),
  },
  props: {
    full: Boolean,
  },
  /**
   * Retrieve external API build info for footer.
   */
  created() {
    setTimeout(() => this.$store.dispatch("application/getApiBuildInfo"), 1500);
  },
};
</script>
