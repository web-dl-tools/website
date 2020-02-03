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
          <v-data-table
            no-data-text="There are no completed requests."
            :loading="loading"
            :headers="headers"
            :items="completedItems"
            :items-per-page="5"
            sort-by="created_at"
            :sort-desc="true"
            @click:row="viewDetail"
          ></v-data-table>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="pb-0">
          <v-subheader class="pl-0">Failed requests</v-subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table
            no-data-text="There are no failed requests."
            :loading="loading"
            :headers="headers"
            :items="failedItems"
            :items-per-page="5"
            sort-by="created_at"
            :sort-desc="true"
            @click:row="viewDetail"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../mixins/formatters";
import ActiveOverview from "../components/requests/ActiveOverview";

export default {
  name: "views.requests.overview",
  mixin: [formatters],
  components: {
    ActiveOverview
  },
  data: () => ({
    loading: true,
    headers: [
      {
        text: "URL",
        align: "left",
        sortable: false,
        value: "url"
      },
      {
        text: "Request type",
        align: "left",
        sortable: true,
        value: "request_type"
      },
      {
        text: "Requested on",
        align: "right",
        sortable: true,
        value: "created_at"
      }
    ]
  }),
  computed: {
    ...mapGetters({
      _completedItems: "requests/getAllCompleted",
      _failedItems: "requests/getAllFailed"
    }),
    completedItems() {
      const completedItems = this._completedItems;
      completedItems.forEach(this.formatItem);
      return completedItems;
    },
    failedItems() {
      const failedItems = this._failedItems;
      failedItems.forEach(this.formatItem);
      return failedItems;
    }
  },
  created() {
    this.$store
      .dispatch("requests/getAll")
      .catch(() => this.$router.push({ name: "overview" }).catch(() => {}))
      .finally(() => (this.loading = false));
  },
  methods: {
    formatItem(item) {
      item.created_at = this.formatDate(item.created_at, "LLL");
      item.request_type = this.formatRequest(item.request_type);
      return item;
    },
    viewDetail(item) {
      this.$router
        .push({
          name: "requests.detail",
          params: { requestId: item.id }
        })
        .catch(() => {});
    }
  }
};
</script>
