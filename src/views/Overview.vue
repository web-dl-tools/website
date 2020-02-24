<template>
  <v-content class="background-wallpaper-subtle-image">
    <v-container>
      <v-row class="mt-n5">
        <v-col cols="12" class="pb-0 mb-n2">
          <v-subheader
            class="subtitle-2 pl-0 pr-0 mr-n2 grey--text text--darken-4"
            >Active and pending requests
            <v-spacer />
            <v-btn
              x-small
              text
              @click="$router.push({ name: 'requests.active' }).catch(() => {})"
              >View all</v-btn
            >
          </v-subheader>
        </v-col>
      </v-row>
      <active-overview />

      <v-row>
        <v-col cols="12" class="pb-0 mb-n2">
          <v-subheader
            class="subtitle-2 pl-0 pr-0 mr-n2 grey--text text--darken-4"
            >Completed requests
            <v-spacer />
            <v-btn
              x-small
              text
              @click="
                $router.push({ name: 'requests.completed' }).catch(() => {})
              "
              >View all</v-btn
            >
          </v-subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <completed-table :extended="false" items_per_page="5" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" class="pb-0 mb-n2">
          <v-subheader
            class="subtitle-2 pl-0 pr-0 mr-n2 grey--text text--darken-4"
            >Failed requests
            <v-spacer />
            <v-btn
              x-small
              text
              @click="$router.push({ name: 'requests.failed' }).catch(() => {})"
              >View all</v-btn
            >
          </v-subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <failed-table :extended="false" items_per_page="5" />
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import ActiveOverview from "../components/requests/active/Overview";
import CompletedTable from "../components/requests/completed/Table";
import FailedTable from "../components/requests/failed/Table";

export default {
  name: "views.overview",
  components: {
    ActiveOverview,
    CompletedTable,
    FailedTable
  }
};
</script>
