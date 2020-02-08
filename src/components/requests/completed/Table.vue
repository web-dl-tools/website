<template>
  <request-table
    ref="table"
    :extended="extended"
    :headers="headers"
    :items="_items"
    :items_per_page="items_per_page"
    no_data_text="There are no completed requests."
  />
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../../mixins/formatters";
import RequestTable from "../Table";

export default {
  name: "components.requests.completed.table",
  mixin: [formatters],
  components: {
    RequestTable
  },
  data: () => ({
    headers: [
      {
        text: "Title",
        align: "left",
        sortable: false,
        value: "title"
      },
      {
        text: "Domain",
        align: "left",
        sortable: true,
        value: "domain"
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
      items: "requests/getAllCompleted"
    }),
    _items() {
      const items = this.items;
      items.forEach(this.formatItem);
      return items;
    }
  },
  methods: {
    formatItem(item) {
      item.title = this.capitalize(item.title);
      item.domain = this.formatDomain(item.url);
      item.created_at = this.formatDate(item.created_at, "LLL");
      item.request_type_label = this.formatRequest(item.request_type);
      return item;
    }
  }
};
</script>
