<template>
  <v-row>
    <v-col class="pa-0" cols="12" md="8">
      <p class="mx-3 my-12 font-weight-thin display-3 text-shadow">
        {{ title }}
      </p>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "components.ui.title",
  computed: {
    ...mapGetters({
      title: "application/getTitle",
    }),
  },
};
</script>
