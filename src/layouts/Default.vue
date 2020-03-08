<template>
  <div>
    <v-toolbar color="grey darken-4" dark short flat class="fixed-top">
      <v-toolbar-title>
        <v-btn
          class="transparent"
          @click="$router.push({ name: 'overview' }).catch(() => {})"
        >
          <v-icon class="pr-4">
            mdi-cloud-download-outline
          </v-icon>
          <span class="ml-md-2 title font-weight-light font-italic">
            Web DL
          </span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          class="transparent"
          v-show="$router.currentRoute.name !== 'requests.create'"
          @click="$router.push({ name: 'requests.create' }).catch(() => {})"
        >
          <span class="subtitle-2">Create</span>
        </v-btn>
        <v-divider
          v-show="$router.currentRoute.name !== 'requests.create'"
          class="mx-2"
          inset
          vertical
        />
        <v-btn
          text
          @click="$router.push({ name: menuItem.routerName }).catch(() => {})"
          v-for="(menuItem, i) in menuItems"
          :key="menuItem.label"
          :color="i === active ? menuItem.color : ''"
        >
          <v-icon>{{ menuItem.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-divider class="mx-2 hidden-sm-and-down" inset vertical />
        <v-btn icon @click="$store.dispatch('application/logout')">
          <v-icon>
            mdi-exit-run
          </v-icon>
        </v-btn>
      </v-toolbar-items>
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
        v-show="
          $router.currentRoute.name !== 'requests.create' &&
            $vuetify.breakpoint.smAndDown
        "
        fab
        bottom
        right
        fixed
        color="accent"
        class="mobile-bottom-navigation-margin-offset"
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
      grow
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
    active: undefined
  }),
  computed: {
    ...mapGetters({
      title: "application/getTitle",
      menuItems: "application/getMenuItems"
    })
  },
  methods: {
    setActive(routerName) {
      switch (routerName) {
        case "requests.completed":
          this.active = 0;
          break;
        case "requests.active":
          this.active = 1;
          break;
        case "requests.failed":
          this.active = 2;
          break;
        default:
          this.active = undefined;
          break;
      }
    }
  },
  watch: {
    $route(to) {
      this.setActive(to.name);
    }
  },
  created() {
    this.setActive(this.$router.currentRoute.name);
    this.$store.dispatch("requests/getAll");
    this.$store.dispatch("application/connectWebsocket");
  },
  destroyed() {
    this.$store.dispatch("application/disconnectWebsocket");
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
