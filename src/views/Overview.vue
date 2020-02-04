<template>
  <v-content>
    <v-container>
      <active-overview :loading="loading" />

      <v-row>
        <v-col cols="12" class="pb-0">
          <v-subheader class="pl-0">Completed requests</v-subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <table-basic
            :loading="loading"
            :items="completedItems"
            items_per_page="5"
            no_data_text="There are no failed requests."
          />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="pb-0">
          <v-subheader class="pl-0">Failed requests</v-subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <table-basic
            :loading="loading"
            :items="failedItems"
            items_per_page="5"
            no_data_text="There are no failed requests."
          />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../mixins/formatters";
import ActiveOverview from "../components/requests/ActiveOverview";
import TableBasic from "../components/requests/TableBasic";

export default {
  name: "views.overview",
  mixin: [formatters],
  components: {
    ActiveOverview,
    TableBasic
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters({
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
