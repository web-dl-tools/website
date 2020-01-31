<template>
  <div>
    <v-toolbar color="primary" dark short>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <span class="subheading">My mobile Home</span>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-bottom-navigation v-model="active" dark shift fixed>
      <v-btn>
        <span>Video</span>
        <v-icon>mdi-television-play</v-icon>
      </v-btn>

      <v-btn>
        <span>Music</span>
        <v-icon>mdi-music</v-icon>
      </v-btn>

      <v-btn>
        <span>Book</span>
        <v-icon>mdi-book</v-icon>
      </v-btn>

      <v-btn>
        <span>Image</span>
        <v-icon>mdi-image</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
export default {
  name: "layouts.mobile",
  data: () => ({
    active: 0
  })
};
</script>
