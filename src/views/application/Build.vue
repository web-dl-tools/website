<template>
  <v-main class="background-wallpaper">
    <v-container>
      <app-title />
      <v-row>
        <v-col cols="12" md="6">
          <card-website-build />
        </v-col>

        <v-col cols="12" md="6">
          <card-api-build />
        </v-col>

        <v-col cols="12" v-if="technical">
          <card-logs />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";
import AppTitle from "../../components/ui/AppTitle";
import CardWebsiteBuild from "../../components/application/CardWebsiteBuild";
import CardApiBuild from "../../components/application/CardApiBuild";
import CardLogs from "../../components/application/CardLogs";

export default {
  name: "views-application-build",
  mixin: [formatters],
  components: {
    AppTitle,
    CardWebsiteBuild,
    CardApiBuild,
    CardLogs,
  },
  computed: {
    ...mapGetters({
      title: "application/getTitle",
      technical: "users/isTechnical",
    }),
  },
};
</script>
