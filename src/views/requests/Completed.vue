<template>
  <v-content class="background-wallpaper-subtle-image">
    <v-container>
      <v-row>
        <v-col class="px-0 py-0" cols="12" md="8">
          <p class="mx-3 my-12 black--text font-weight-thin display-3">
            {{ title }}
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <completed-table :extended="true" items_per_page="15" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from "vuex";
import CompletedTable from "../../components/requests/completed/Table";

export default {
  name: "views.requests.completed",
  components: { CompletedTable },
  computed: {
    ...mapGetters({
      title: "application/getTitle"
    })
  }
};
</script>
