<template>
  <v-main class="background-wallpaper blur single-component">
    <v-container class="un-blur">
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="8" lg="6" xl="4">
          <div class="text-center mt-10">
            <v-icon class="justify-end" x-large color="black">
              mdi-cloud-download-outline
            </v-icon>
            <h1
              class="
                mt-4
                black--text
                text-shadow
                display-2
                font-weight-light font-italic
              "
            >
              Web DL
            </h1>
          </div>
          <router-view class="mt-12" />
        </v-col>
      </v-row>
    </v-container>
    <ui-footer v-show="$vuetify.breakpoint.mdAndUp" :full="false" />
  </v-main>
</template>

<script>
import UiFooter from "./../components/ui/Footer";

export default {
  name: "layouts.single-component",
  components: {
    UiFooter,
  },
};
</script>
