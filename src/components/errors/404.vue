<template>
  <v-card outlined raised class="pb-1">
    <v-card-title> Something went wrong </v-card-title>
    <v-card-subtitle> This page does not exist. </v-card-subtitle>
    <v-card-actions>
      <v-spacer />
      <v-btn
        class="mr-2"
        color="white"
        text
        @click="$router.push({ name: 'overview' }).catch(() => {})"
      >
        Go back
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "components.errors.404",
};
</script>
