<template>
  <div>
    <v-card raised>
      <v-data-table
        :class="{
          extended: !extended,
        }"
        :headers="headers"
        :hide-default-footer="!extended"
        :items-per-page="parseInt(items_per_page)"
        :items="items"
        :loading="loading"
        :no-data-text="no_data_text"
        :search="search"
        :sort-desc="sort_desc"
        loading-text="Loading requests..."
        no-results-text="No matching requests found."
        sort-by="created_at_formatted"
        @click:row="viewDetail"
      >
        <template
          v-for="(_, name) in $scopedSlots"
          :slot="name"
          slot-scope="slotData"
        >
          <slot v-bind="slotData" :name="name" />
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "components.requests.table",
  props: {
    extended: Boolean,
    headers: Array,
    items: Array,
    items_per_page: String,
    no_data_text: String,
    sort_desc: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      loading: "application/isLoading",
      search: "application/getSearch",
    }),
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
          params: { requestId: item.id },
        })
        .catch(() => {});
    },
  },
};
</script>
