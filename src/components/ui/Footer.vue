<template>
  <v-footer absolute light color="transparent">
    <v-col
      class="text-center text-caption"
      :class="{ 'cursor-pointer': link, 'font-weight-bold': bold }"
      cols="12"
      @click="redirect(link)"
    >
      v{{ commitInfo.tag }} &middot; Build
      {{ commitInfo.abbreviated_commit }} &middot;
      {{ formatDate(commitInfo.commiter.date) }}
    </v-col>
  </v-footer>
</template>

<script>
import router from "../../router";
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
    link: Boolean,
    bold: Boolean,
  },
  methods: {
    redirect: (link) => {
      if (!link) return;
      router.push({ name: "application.build" }).catch(() => {});
    },
  },
};
</script>
