<template>
  <v-card outlined raised class="pb-1">
    <v-card-title>
      Something went wrong
      <v-spacer />
      <v-icon>mdi-map-marker-question-outline</v-icon>
    </v-card-title>
    <v-card-subtitle> An error occurred. </v-card-subtitle>
    <v-card-actions class="px-4 mb-1">
      <v-row class="px-3">
        <v-col cols="5" md="3" offset="7" offset-md="9" class="pa-0">
          <v-btn
            color="grey"
            tabindex="-1"
            block
            large
            outlined
            @click="$router.push({ name: 'overview' }).catch(() => {})"
          >
            Go back
          </v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "components.errors.card-generic-error",
};
</script>
