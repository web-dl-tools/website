<template>
  <request-table
    :extended="extended"
    :headers="headers"
    :items="_items"
    :items_per_page="items_per_page"
    no_data_text="There are no active or pending requests."
    :sort_desc="false"
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
        value: "url",
        sortable: false
      },
      {
        text: "Status",
        align: "left",
        value: "status_display",
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
      item.created_at = this.formatDate(item.created_at, "LL HH:mm:ss");
      item.request_type_label = this.formatRequest(item.request_type);
      return item;
    }
  }
};
</script>
