<template>
  <request-table
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
        value: "title",
        sortable: false
      },
      {
        text: "Domain",
        align: "left",
        value: "domain",
        sortable: true
      },
      {
        text: "Request type",
        align: "left",
        value: "request_type_label",
        sortable: true
      },
      {
        text: "Requested on",
        align: "right",
        value: "created_at",
        sortable: true,
        filterable: false
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
      item.created_at = this.formatDate(item.created_at, "LL HH:mm:ss");
      item.request_type_label = this.formatRequest(item.request_type);
      return item;
    }
  }
};
</script>
