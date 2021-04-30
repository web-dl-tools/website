<template>
  <v-app>
    <router-view :key="$route.fullPath" />
    <v-snackbar v-model="snackbar" color="error" timeout="-1">
      Something went wrong with the Web DL API. Please refresh or try again
      later.
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapGetters({
      snackbar: "application/hasApiError",
    }),
  },
};
</script>
