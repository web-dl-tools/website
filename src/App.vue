<template>
  <v-app>
    <router-view />
    <messages />
  </v-app>
</template>

<script>
import Messages from "./components/ui/Messages";

export default {
  name: "App",
  components: {
    Messages,
  },
};
</script>
