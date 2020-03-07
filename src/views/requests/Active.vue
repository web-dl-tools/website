<template>
  <v-content class="background-wallpaper-subtle-image">
    <v-container>
      <v-row>
        <p class="mx-3 my-12 black--text font-weight-thin display-3">
          {{ title }}
        </p>
      </v-row>
      <v-row>
        <v-col cols="12">
          <active-table :extended="true" items_per_page="15" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import ActiveTable from "../../components/requests/active/Table";

export default {
  name: "views.requests.active",
  components: { ActiveTable },
  computed: {
    ...mapGetters({
      title: "application/getTitle"
    })
  }
};
</script>
