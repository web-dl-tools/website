<template>
  <v-footer absolute light color="transparent">
    <v-col v-if="full" class="text-center text-caption" cols="12">
      <span
        class="cursor-pointer"
        @click="$router.push({ name: 'application.build' }).catch(() => {})"
      >
        v{{ commitInfo.tag }} &middot; Build
        {{ commitInfo.abbreviated_commit }} &middot;
        {{ formatDate(commitInfo.commiter.date, "LL") }}
      </span>
    </v-col>
    <v-col v-else class="text-caption font-weight-bold" cols="12">
      v{{ commitInfo.tag }} &middot; Build {{ commitInfo.abbreviated_commit }}
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
      commitInfo: "application/getCommitInfo",
    }),
  },
  props: {
    full: Boolean,
  },
};
</script>
