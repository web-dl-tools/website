<template>
  <request-table
    ref="table"
    :extended="extended"
    :headers="headers"
    :items="_items"
    :items_per_page="items_per_page"
    no_data_text="There are no active or pending requests."
  >
    <template v-slot:item.status_display="{ item }">
      <v-chip
        class="white--text mr-2"
        label
        small
        :color="formatRequestStatusColor(item.status)"
      >
        {{ item.status_display }}
      </v-chip>
    </template>
  </request-table>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../../mixins/formatters";
import RequestTable from "../Table";

export default {
  name: "components.requests.active.table",
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
        text: "Status",
        align: "left",
        sortable: true,
        value: "status_display"
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
      items: "requests/getAllActive"
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
