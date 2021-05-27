<template>
  <v-main class="background-wallpaper">
    <v-container>
      <app-title />
      <v-row>
        <v-col cols="12">
          <completed-table :extended="true" items_per_page="15" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import AppTitle from "../../components/ui/AppTitle";
import CompletedTable from "../../components/requests/completed/Table";

export default {
  name: "views.requests.completed",
  components: {
    AppTitle,
    CompletedTable,
  },
  computed: {
    ...mapGetters({
      title: "application/getTitle",
    }),
  },
};
</script>
