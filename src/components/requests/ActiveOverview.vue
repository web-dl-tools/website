<template>
  <div>
    <v-row>
      <v-col cols="12" class="pb-0">
        <v-subheader class="pl-0">Active and pending requests</v-subheader>
      </v-col>
    </v-row>
    <v-row v-if="loading">
      <v-col cols="12" md="4">
        <v-skeleton-loader type="article" />
      </v-col>
      <v-col cols="12" md="4">
        <v-skeleton-loader type="article" />
      </v-col>
      <v-col cols="12" md="4">
        <v-skeleton-loader type="article" />
      </v-col>
    </v-row>
    <v-row v-else-if="activeItems.length">
      <v-col cols="12" md="6" v-for="item in activeItems" :key="item.id">
        <card-mini :request="item" />
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12">
        <v-card outlined>
          <v-card-title>
            There are no active or pending requests.
          </v-card-title>
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
  name: "components.requests.pending-overview",
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
