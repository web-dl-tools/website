<template>
  <div>
    <v-row v-if="loading">
      <v-col cols="12" md="6">
        <v-skeleton-loader type="article" />
      </v-col>
      <v-col cols="12" md="6">
        <v-skeleton-loader type="article" />
      </v-col>
    </v-row>
    <v-row v-else-if="activeItems.length">
      <v-col
        v-for="item in activeItems.slice(0, 5)"
        :key="item.id"
        cols="12"
        md="6"
      >
        <card-mini :request="item" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="6">
        <v-card raised>
          <v-card-title class="subtitle-1">
            There are no active or pending requests.
          </v-card-title>
          <v-card-subtitle class="subtitle-2 font-weight-light">
            Click on <v-icon small> mdi-plus-circle-outline </v-icon>
            or enter a url on top to create a new request.
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CardMini from "./CardMini";

export default {
  name: "components.requests.active.overview",
  components: {
    CardMini,
  },
  computed: {
    ...mapGetters({
      loading: "application/isLoading",
      activeItems: "requests/getAllActive",
    }),
  },
};
</script>
