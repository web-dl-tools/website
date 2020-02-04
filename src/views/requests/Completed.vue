<template>
  <v-content>
    <v-container>
      <v-row>
        <v-col cols="12" class="mt-1">
          <table-basic
            :loading="loading"
            :items="completedItems"
            items_per_page="20"
            no_data_text="There are no completed requests."
          />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";
import TableBasic from "../../components/requests/TableBasic";

export default {
  name: "views.requests.completed",
  mixin: [formatters],
  components: {
    TableBasic
  },
  data: () => ({
    loading: true
  }),
  computed: {
    ...mapGetters({
      completedItems: "requests/getAllCompleted"
    })
  },
  created() {
    this.$store
      .dispatch("requests/getAll")
      .catch(() => this.$router.push({ name: "overview" }).catch(() => {}))
      .finally(() => (this.loading = false));
  }
};
</script>
