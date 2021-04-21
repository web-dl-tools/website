<template>
  <v-main class="background-wallpaper">
    <v-container>
      <v-row>
        <v-col class="px-0 py-0" cols="12">
          <p
            class="mx-3 my-12 black--text font-weight-thin display-3 text-shadow"
          >
            {{ title }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <failed-table :extended="true" items_per_page="15" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import FailedTable from "../../components/requests/failed/Table";

export default {
  name: "views.requests.failed",
  components: {
    FailedTable,
  },
  computed: {
    ...mapGetters({
      title: "application/getTitle",
    }),
  },
};
</script>
