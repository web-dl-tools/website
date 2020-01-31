<template>
  <div>
    <v-toolbar color="primary" dark short>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <span class="subheading">My Home</span>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text>
          News
        </v-btn>
        <v-divider inset vertical></v-divider>
        <v-btn text>
          Blog
        </v-btn>
        <v-divider inset vertical></v-divider>
        <v-btn text>
          Music
        </v-btn>
        <v-divider inset vertical></v-divider>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </div>
</template>

<script>
export default {
  name: "layouts.desktop"
};
</script>
