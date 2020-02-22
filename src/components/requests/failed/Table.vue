<template>
  <request-table
    :extended="extended"
    :headers="headers"
    :items="_items"
    :items_per_page="items_per_page"
    no_data_text="There are no failed requests."
  />
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../../mixins/formatters";
import RequestTable from "../Table";

export default {
  name: "components.requests.failed.table",
  mixin: [formatters],
  components: {
    RequestTable
  },
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
        value: "request_type_label"
      },
      {
        text: "Requested on",
        align: "right",
        sortable: true,
        filterable: false,
        value: "created_at"
      }
    ]
  }),
  props: {
    extended: Boolean,
    items_per_page: String
  },
  computed: {
    ...mapGetters({
      items: "requests/getAllFailed"
    }),
    _items() {
      const items = this.items;
      items.forEach(this.formatItem);
      return items;
    }
  },
  methods: {
    formatItem(item) {
      item.created_at = this.formatDate(item.created_at, "LLL");
      item.request_type_label = this.formatRequest(item.request_type);
      return item;
    }
  }
};
</script>