<template>
  <v-data-table
    :loading="loading"
    :headers="headers"
    :items="_items"
    :items-per-page="parseInt(items_per_page)"
    :no-data-text="no_data_text"
    sort-by="created_at"
    :sort-desc="true"
    @click:row="viewDetail"
  ></v-data-table>
</template>

<script>
import formatters from "../../mixins/formatters";

export default {
  name: "components.requests.table-basic",
  mixin: [formatters],
  data: () => ({
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
  props: {
    loading: Boolean,
    items: Array,
    items_per_page: String,
    no_data_text: String
  },
  computed: {
    _items() {
      const items = this.items;
      items.forEach(this.formatItem);
      return items;
    }
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
