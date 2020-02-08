<template>
  <v-data-table
    :loading="loading"
    :headers="headers"
    :items="items"
    :items-per-page="parseInt(items_per_page)"
    :no-data-text="no_data_text"
    loading-text="Loading requests..."
    sort-by="created_at"
    :sort-desc="true"
    @click:row="viewDetail"
  >
    <template
      v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData"
      ><slot :name="name" v-bind="slotData"
    /></template>
  </v-data-table>
</template>

<script>
export default {
  name: "components.requests.table",
  data: () => ({
    loading: true
  }),
  props: {
    extended: Boolean,
    headers: Array,
    items: Array,
    items_per_page: String,
    no_data_text: String
  },
  methods: {
    viewDetail(item) {
      this.$router
        .push({
          name: "requests.detail",
          params: { requestId: item.id }
        })
        .catch(() => {});
    }
  },
  created() {
    if (this.extended) {
      this.$store
        .dispatch("requests/getAll")
        .finally(() => (this.loading = false));
    }
  }
};
</script>
