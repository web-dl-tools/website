<template>
  <v-main class="background-wallpaper">
    <v-container>
      <app-title />
      <v-row class="mt-n5">
        <v-col cols="12" class="pb-0 mb-n2">
          <v-subheader class="subtitle-2 pl-0 pr-0 mr-n2"
            >Active and pending requests
            <v-spacer />
            <v-btn
              class="text-no-transform"
              x-small
              text
              @click="$router.push({ name: 'requests.active' }).catch(() => {})"
            >
              {{
                activeRequests.length > 5
                  ? `View all (${activeRequests.length})`
                  : `All details`
              }}
            </v-btn>
          </v-subheader>
        </v-col>
      </v-row>
      <active-overview />

      <v-row>
        <v-col cols="12" class="pb-0 mb-n2">
          <v-subheader class="subtitle-2 pl-0 pr-0 mr-n2">
            Completed requests
            <v-spacer />
            <v-btn
              class="text-no-transform"
              x-small
              text
              @click="
                $router.push({ name: 'requests.completed' }).catch(() => {})
              "
            >
              {{
                completedRequests.length > 5
                  ? `View all (${completedRequests.length})`
                  : `All details`
              }}
            </v-btn>
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
          <v-subheader class="subtitle-2 pl-0 pr-0 mr-n2">
            Failed requests
            <v-spacer />
            <v-btn
              class="text-no-transform"
              x-small
              text
              @click="$router.push({ name: 'requests.failed' }).catch(() => {})"
            >
              {{
                failedRequests.length > 5
                  ? `View all (${failedRequests.length})`
                  : `All details`
              }}
            </v-btn>
          </v-subheader>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <failed-table :extended="false" items_per_page="5" />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import AppTitle from "../components/ui/AppTitle";
import ActiveOverview from "../components/requests/active/Overview";
import CompletedTable from "../components/requests/completed/Table";
import FailedTable from "../components/requests/failed/Table";

export default {
  name: "views-overview",
  components: {
    AppTitle,
    ActiveOverview,
    CompletedTable,
    FailedTable,
  },
  computed: {
    ...mapGetters({
      title: "application/getTitle",
      completedRequests: "requests/getAllCompleted",
      activeRequests: "requests/getAllActive",
      failedRequests: "requests/getAllFailed",
    }),
  },
};
</script>
