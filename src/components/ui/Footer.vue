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
            :class="$vuetify.breakpoint.mdAndUp ? 'pb-0' : 'pa-0'"
            cols="12"
          >
            <span class="font-weight-bold">Web DL Website</span>
            v{{ buildInfo.tag }} &middot; build
            {{ buildInfo.abbreviated_commit }} &middot;
            {{ formatDate(buildInfo.commiter.date, "LL") }}
          </v-col>
          <v-col
            v-else
            :class="$vuetify.breakpoint.mdAndUp ? 'pb-0' : 'pa-0'"
            cols="12"
          >
            <span class="font-weight-bold">Web DL Website</span>
            v{{ buildInfo.tag }}
          </v-col>

          <v-col
            v-if="technical"
            :class="$vuetify.breakpoint.mdAndUp ? 'pt-0' : 'pa-0'"
            cols="12"
          >
            <span class="font-weight-bold">Web DL API</span>
            v{{ apiBuildInfo.tag }} &middot; build
            {{ apiBuildInfo.abbreviated_commit }} &middot;
            {{ formatDate(apiBuildInfo.commiter.date, "LL") }}
          </v-col>
          <v-col
            v-else
            :class="$vuetify.breakpoint.mdAndUp ? 'pt-0' : 'pa-0'"
            cols="12"
          >
            <span class="font-weight-bold">Web DL API</span>
            v{{ apiBuildInfo.tag }}
          </v-col>
        </div>
      </v-row>
    </v-col>
    <v-col v-else class="text-caption" cols="12">
      <v-row>
        <v-col class="pb-0" cols="12">
          <span class="font-weight-bold">Web DL Website</span>
          v{{ buildInfo.tag }}
        </v-col>

        <v-col class="pt-0" cols="12">
          <span class="font-weight-bold">Web DL API</span>
          v{{ apiBuildInfo.tag }}
        </v-col>
      </v-row>
    </v-col>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "components.ui.footer",
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
