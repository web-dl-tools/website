<template>
  <v-main class="background-wallpaper-image">
    <v-container>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="8" lg="6" xl="4">
          <div class="text-center mt-10">
            <v-icon class="justify-end" x-large color="black">
              mdi-cloud-download-outline
            </v-icon>
            <h1
              class="mt-4 black--text display-2 font-weight-light font-italic"
            >
              Web DL
            </h1>
          </div>
          <router-view />
        </v-col>
      </v-row>
    </v-container>
    <v-footer absolute color="transparent">
      <v-col class="text-black-outline text-center">
        ⚒️ with ❤️ by
        <a
          class="text-black-outline text-color-inherit"
          href="https://github.com/RineshRamadhin"
        >
          Rinesh Ramadhin
        </a>
      </v-col>
    </v-footer>
  </v-main>
</template>

<script>
export default {
  name: "layouts.single-component",
};
</script>
