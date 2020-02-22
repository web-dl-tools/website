<template>
  <v-content class="background-wallpaper-subtle-image">
    <v-container>
      <v-row>
        <v-col cols="12">
          <failed-table :extended="true" items_per_page="15" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import FailedTable from "../../components/requests/failed/Table";

export default {
  name: "views.requests.failed",
  components: {
    FailedTable
  }
};
</script>
