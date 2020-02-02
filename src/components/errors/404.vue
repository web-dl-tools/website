<template>
  <v-card outlined class="card-single-card mt-12">
    <v-card-title>
      Something went wrong.
    </v-card-title>
    <v-card-subtitle>
      This page does not exist.
    </v-card-subtitle>
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
