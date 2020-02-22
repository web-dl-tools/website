<template>
  <v-card raised>
    <v-card-title class="pt-0" v-if="extended">
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :loading="loading"
      :search="search"
      :headers="headers"
      :items="items"
      :items-per-page="parseInt(items_per_page)"
      :no-data-text="no_data_text"
      loading-text="Loading requests..."
      no-results-text="No matching requests found."
      sort-by="created_at"
      :sort-desc="sort_desc"
      @click:row="viewDetail"
    >
      <template
        v-for="(_, name) in $scopedSlots"
        :slot="name"
        slot-scope="slotData"
        ><slot :name="name" v-bind="slotData"
      /></template>
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
