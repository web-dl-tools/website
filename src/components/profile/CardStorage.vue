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
        <v-row class="mb-6 justify-center">
          <vue-apex-charts type="donut" :options="options" :series="series" />
        </v-row>
        <v-row v-for="request in storage" :key="request.id">
          <v-col
            cols="8"
            class="py-0 cursor-pointer text-truncate"
            @click="
              $router
                .push({
                  name: 'requests.detail',
                  params: { requestId: request.id },
                })
                .catch(() => {})
            "
          >
            {{ request.title ? request.title : request.id }}
          </v-col>
          <v-col cols="4" class="py-0 text-end">
            {{ formatBytes(request.size, 2) }}
          </v-col>
        </v-row>
        <v-row class="mb-n1">
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
import VueApexCharts from "vue-apexcharts";
import formatters from "../../mixins/formatters";
import helpers from "../../mixins/helpers";
import { truncate, formatBytes } from "../../mixins/public";

export default {
  name: "components.profile.card-storage",
  mixin: [formatters, helpers],
  components: {
    VueApexCharts,
  },
  data: () => ({
    options: {},
    series: [],
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
  watch: {
    storage(n) {
      let labels = [];
      let data = [];

      n.forEach((r) => {
        labels.push(truncate(r.title, 40));
        data.push(r.size);
      });

      this.series = data;
      this.options = {
        chart: {
          type: "donut",
        },
        labels: labels,
        legend: {
          show: false,
        },
        stroke: {
          show: false,
        },
        theme: {
          monochrome: {
            enabled: true,
            color: "#5E6D7A",
          },
        },
        tooltip: {
          y: {
            formatter: function (value) {
              return formatBytes(value);
            },
          },
        },
      };
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