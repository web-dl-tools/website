<template>
  <v-content class="background-wallpaper-subtle-image">
    <v-container>
      <v-row>
        <v-col cols="12" class="mt-5">
          <active-table :extended="true" items_per_page="20" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import ActiveTable from "../../components/requests/active/Table";

export default {
  name: "views.requests.active",
  components: { ActiveTable }
};
</script>
