<template>
  <div>
    <v-col
      v-if="extended"
      v-bind:class="[
        $vuetify.breakpoint.mdAndUp ? 'search-field mb-12' : 'mt-n4'
      ]"
      class="px-0"
      cols="12"
      md="6"
      offset-md="6"
    >
      <v-text-field
        v-model="search"
        color="warning"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        clearable
        hide-details
      />
    </v-col>

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
      </v-data-table>
    </v-card>
  </div>
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

<style scoped>
.search-field {
  margin-top: -130px;
}
</style>
