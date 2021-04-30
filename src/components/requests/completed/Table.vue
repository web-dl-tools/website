<template>
  <request-table
    :extended="extended"
    :headers="headers"
    :items="_items"
    :items_per_page="items_per_page"
    no_data_text="There are no completed requests."
  >
    <template v-slot:[`item.title`]="{ item }">
      {{ truncate(item.title, $vuetify.breakpoint.smAndDown ? 40 : 120) }}
    </template>
  </request-table>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../../mixins/formatters";
import helpers from "../../../mixins/helpers";
import RequestTable from "../Table";

export default {
  name: "components.requests.completed.table",
  mixin: [formatters, helpers],
  components: {
    RequestTable,
  },
  data() {
    return {
      headers: [
        {
          align: "left",
          sortable: false,
          text: "Title",
          value: "title",
        },
        {
          align: "left",
          sortable: true,
          text: "Domain",
          value: "domain",
        },
        {
          align: "left",
          sortable: true,
          text: "Request type",
          value: "request_type_label",
        },
        {
          align: "right",
          filterable: false,
          sort: this.sortDates,
          sortable: true,
          text: "Requested on",
          value: "created_at",
        },
      ],
    };
  },
  props: {
    extended: Boolean,
    items_per_page: String,
  },
  computed: {
    ...mapGetters({
      items: "requests/getAllCompleted",
    }),
    /**
     * Pre-format each request data for the data table.
     *
     * @returns {string}
     * @private
     */
    _items() {
      const items = this.items;
      items.forEach(this.formatItem);
      return items;
    },
  },
  methods: {
    /**
     * Format a request payload for the data table.
     *
     * @param item
     * @returns {*}
     */
    formatItem(item) {
      item.title = this.capitalize(item.title);
      item.domain = this.formatDomain(item.url);
      item.created_at = this.formatDate(item.created_at, "LL [@] HH:mm");
      item.request_type_label = this.formatRequest(item.request_type);
      return item;
    },
  },
};
</script>
