<template>
  <div>
    <v-toolbar color="primary" dark short flat class="fixed-top">
      <v-toolbar-title>
        <v-btn icon>
          <v-icon @click="$router.push({ name: 'overview' }).catch(() => {})">
            mdi-cloud-download-outline
          </v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <span class="subheading">{{ title }}</span>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          @click="$router.push({ name: menuItem.routerName }).catch(() => {})"
          v-for="menuItem in menuItems"
          :key="menuItem.label"
        >
          {{ menuItem.label }}
        </v-btn>
      </v-toolbar-items>
      <v-btn icon>
        <v-icon @click="$store.dispatch('application/logout')">
          mdi-exit-to-app
        </v-icon>
      </v-btn>
    </v-toolbar>

    <v-content
      class="toolbar-padding-offset"
      :class="{
        'mobile-bottom-navigation-padding-offset': $vuetify.breakpoint.smAndDown
      }"
    >
      <router-view />
    </v-content>

    <v-fab-transition>
      <v-btn
        v-show="$router.currentRoute.name !== 'requests.create'"
        fab
        bottom
        right
        fixed
        color="accent"
        :class="{
          'mobile-bottom-navigation-margin-offset':
            $vuetify.breakpoint.smAndDown
        }"
        @click="$router.push({ name: 'requests.create' }).catch(() => {})"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>

    <v-bottom-navigation
      v-model="active"
      class="hidden-md-and-up"
      dark
      shift
      fixed
    >
      <v-btn
        @click="$router.push({ name: menuItem.routerName }).catch(() => {})"
        v-for="menuItem in menuItems"
        :key="menuItem.label"
      >
        <span> {{ menuItem.label }} </span>
        <v-icon> {{ menuItem.icon }} </v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "layouts.default",
  data: () => ({
    active: 0
  }),
  computed: {
    ...mapGetters({
      title: "application/getTitle",
      menuItems: "application/getMenuItems"
    })
  },
  created() {
    console.log(this.$router);
  }
};
</script>

<style>
.fixed-top {
  position: fixed;
  width: 100%;
  z-index: 3;
}

.toolbar-padding-offset {
  padding-top: 56px !important;
}

.mobile-bottom-navigation-padding-offset {
  padding-bottom: 56px !important;
}

.mobile-bottom-navigation-margin-offset {
  margin-bottom: 56px !important;
}
</style>
