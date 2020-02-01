<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col cols="12"> </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "views.requests.overview",
  mixin: [formatters],
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters({
      pendingItems: "requests/getAllPending",
      processingItems: "requests/getAllProcessing",
      completedItems: "requests/getAllCompleted",
      failedItems: "requests/getAllFailed"
    })
  },
  created() {
    this.$store
      .dispatch("requests/getAll")
      .catch(() => this.$router.push({ name: "overview" }).catch(() => {}))
      .finally(() => (this.loading = false));
  }
};
</script>
