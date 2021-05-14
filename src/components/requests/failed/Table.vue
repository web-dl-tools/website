<template>
  <request-table
    :extended="extended"
    :headers="headers"
    :items="_items"
    :items_per_page="items_per_page"
    no_data_text="Yay! There are no failed requests."
  >
    <template v-slot:[`item.url`]="{ item }">
      {{ truncate(item.url, $vuetify.breakpoint.smAndDown ? 40 : 45) }}
    </template>
  </request-table>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../../mixins/formatters";
import helpers from "../../../mixins/helpers";
import RequestTable from "../Table";

export default {
  name: "components.requests.failed.table",
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
          text: "URL",
          value: "url",
        },
        {
          align: "left",
          sortable: this.extended,
          text: "Request type",
          value: "request_type_label",
        },
        {
          align: "right",
          filterable: false,
          sort: (a, b) => this.sortDates(a, b, "LL [at] HH:mm"),
          sortable: this.extended,
          text: this.extended ? "Requested on" : "Requested",
          value: "created_at_formatted",
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
      items: "requests/getAllFailed",
    }),
    /**
     * Pre-format each request data for the data table.
     *
     * @returns {string}
     * @private
     */
    _items() {
      const items = this.items;
      items
        .sort((a, b) => this.sortDates(a.created_at, b.created_at))
        .reverse()
        .forEach(this.formatItem);
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
      item.created_at_formatted = this.extended
        ? this.formatDate(item.created_at, "LL [at] HH:mm")
        : this.formatDateFromNow(item.created_at);
      item.request_type_label = this.formatRequest(item.request_type);
      return item;
    },
  },
};
</script>
