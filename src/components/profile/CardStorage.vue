<template>
  <div>
    <v-card outlined raised v-if="loading">
      <v-skeleton-loader type="article" />
    </v-card>
    <v-card outlined raised class="pb-1" v-else>
      <v-card-title>
        Storage
        <v-spacer />
        <v-icon> mdi-database </v-icon>
      </v-card-title>
      <v-card-subtitle class="subtitle-2 col-8 pl-4">
        Below you can explore your current storage usage in Web DL.
      </v-card-subtitle>
      <v-card-text class="pt-3">
        <v-row v-for="request in storage" :key="request.id">
          <v-col
            cols="8"
            class="py-0 cursor-pointer"
            @click="
              $router
                .push({
                  name: 'requests.detail',
                  params: { requestId: request.id },
                })
                .catch(() => {})
            "
          >
            {{
              truncate(request.title, $vuetify.breakpoint.mdAndDown ? 30 : 50)
            }}
          </v-col>
          <v-col cols="4" class="py-0 text-end">
            {{ formatBytes(request.size, 2) }}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" class="pb-0 font-weight-regular"> Total usage </v-col>
          <v-col cols="4" class="pb-0 font-weight-regular text-end">
            <v-chip outlined label small color="success">
              {{
                formatBytes(
                  storage.reduce((acc, cur) => acc + cur.size, 0),
                  2
                )
              }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";
import helpers from "../../mixins/helpers";

export default {
  name: "components.profile.card-storage",
  mixin: [formatters, helpers],
  data: () => ({
    loading: true,
  }),
  computed: {
    ...mapGetters({
      _storage: "users/getStorage",
    }),
    storage() {
      const storage = this._storage;
      if (storage)
        return storage.sort((a, b) => {
          if (a.size < b.size) return 1;
          if (a.size > b.size) return -1;
          return 0;
        });
      return null;
    },
  },
  /**
   * Load in the user storage data.
   */
  created() {
    this.$store
      .dispatch("users/getStorage")
      .finally(() => (this.loading = false));
  },
};
</script>
