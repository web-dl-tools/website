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
        cols="12"
        md="6"
        v-for="item in activeItems.slice(0, 4)"
        :key="item.id"
      >
        <card-mini :request="item" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="6">
        <v-card outlined>
          <v-card-title class="subtitle-1">
            There are no active or pending requests.
          </v-card-title>
          <v-card-subtitle class="subtitle-2 font-weight-light">
            Click below to create a new request.
          </v-card-subtitle>
          <v-card-actions>
            <v-btn
              outlined
              class="ml-2 mb-2"
              color="primary"
              @click="$router.push({ name: 'requests.create' }).catch(() => {})"
            >
              Create
            </v-btn>
          </v-card-actions>
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
    CardMini
  },
  props: {
    loading: Boolean
  },
  computed: {
    ...mapGetters({
      activeItems: "requests/getAllActive"
    })
  }
};
</script>
