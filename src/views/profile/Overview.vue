<template>
  <v-main class="background-wallpaper">
    <v-container>
      <app-title />
      <v-row>
        <v-col cols="12" md="6" class="pa-0">
          <v-col cols="12">
            <card-profile />
          </v-col>

          <v-col cols="12">
            <card-credentials />
          </v-col>

          <v-col cols="12">
            <card-settings />
          </v-col>
        </v-col>

        <v-col cols="12" md="6">
          <card-storage />
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";
import AppTitle from "../../components/ui/AppTitle";
import CardProfile from "../../components/profile/CardProfile";
import CardCredentials from "../../components/profile/CardCredentials";
import CardSettings from "../../components/profile/CardSettings";
import CardStorage from "../../components/profile/CardStorage";

export default {
  name: "views-profile-overview",
  mixin: [formatters],
  components: {
    AppTitle,
    CardProfile,
    CardCredentials,
    CardSettings,
    CardStorage,
  },
  computed: {
    ...mapGetters({
      title: "application/getTitle",
    }),
  },
};
</script>
