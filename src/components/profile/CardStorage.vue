<template>
  <div>
    <v-card flat color="transparent" v-if="!storage">
      <v-skeleton-loader type="image" />
    </v-card>
    <v-card flat color="transparent" class="pb-1" v-else>
      <v-row>
        <v-col cols="12" class="pa-0">
          <div id="storage-chart">
            <div class="donut-inner text-center">
              <h2 class="font-weight-thin grey--text mb-n2">
                {{ formatBytes(total, 2) }}
              </h2>
              <p class="font-weight-black grey--text overline mb-0">Storage</p>
            </div>
            <doughnut-chart :chart-data="chartData" :options="options" />
          </div>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";
import { truncate, formatBytes } from "../../mixins/public";
import DoughnutChart from "../charts/DoughnutChart";

export default {
  name: "components.profile.card-storage",
  mixin: [formatters],
  components: {
    DoughnutChart,
  },
  data() {
    return {
      total: 0,
      chartData: {},
      options: {
        cutout: "10%",
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          caretPadding: 0,
          displayColors: false,
          callbacks: {
            title: () => "Request",
            label: (tooltipItem, data) => data.labels[tooltipItem.index],
            afterLabel: (tooltipItem, data) =>
              formatBytes(data.datasets[0]["data"][tooltipItem.index], 2),
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      storage: "users/getStorage",
    }),
  },
  watch: {
    storage(n) {
      let labels = [];
      let data = [];

      n.forEach((r) => {
        this.total += r.size;
        labels.push(truncate(r.title, 40));
        data.push(r.size);
      });

      this.chartData = {
        labels: labels,
        datasets: [
          {
            backgroundColor: "#00000061",
            data: data,
          },
        ],
      };
    },
  },
  /**
   * Load in the user storage data.
   */
  created() {
    this.$store.dispatch("users/getStorage");
  },
};
</script>

<style>
canvas#doughnut-chart {
  height: 260px !important;
}

.donut-inner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -35%);
}
</style>
