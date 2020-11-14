<template>
  <v-card class="card-single-card mt-12" outlined raised>
    <v-card-title> Something went wrong. </v-card-title>
    <v-card-subtitle class="pb-0"> This page does not exist. </v-card-subtitle>
    <v-card-actions>
      <v-spacer />
      <v-btn
        color="primary"
        outlined
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
