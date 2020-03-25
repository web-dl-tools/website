<template>
  <v-card raised>
    <v-data-table
      :headers="headers"
      :items-per-page="parseInt(items_per_page)"
      :items="items"
      :loading="loading"
      :no-data-text="no_data_text"
      :search="search"
      :sort-desc="sort_desc"
      loading-text="Loading requests..."
      no-results-text="No matching requests found."
      sort-by="created_at"
      @click:row="viewDetail"
    >
      <template
        v-for="(_, name) in $scopedSlots"
        :slot="name"
        slot-scope="slotData"
      >
        <slot v-bind="slotData" :name="name" />
      </template>
      <template v-if="extended" v-slot:body.prepend>
        <tr>
          <td class="py-4 pt-0" :colspan="headers.length">
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              type="text"
              hide-details
            />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "components.requests.table",
  data: () => ({
    search: ""
  }),
  props: {
    extended: Boolean,
    headers: Array,
    items: Array,
    items_per_page: String,
    no_data_text: String,
    sort_desc: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      loading: "application/isLoading"
    })
  },
  methods: {
    /**
     * Route to the detail page for a specific request.
     *
     * @param item
     */
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
