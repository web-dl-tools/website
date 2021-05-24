<template>
  <v-app>
    <router-view />
    <snackbars />
  </v-app>
</template>

<script>
import Snackbars from "./components/ui/Messages";

export default {
  name: "App",
  components: {
    Snackbars,
  },
};
</script>
