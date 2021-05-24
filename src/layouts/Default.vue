<template>
  <div>
    <app-bar :active="active" />

    <v-main
      class="toolbar-padding-offset pt-0"
      :class="{
        'mobile-bottom-navigation-padding-offset':
          $vuetify.breakpoint.smAndDown,
      }"
    >
      <router-view class="pb-16" />
      <ui-footer :full="true" />
    </v-main>

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
      background-color="grey darken-4"
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
import AppBar from "../components/ui/AppBar";
import UiFooter from "./../components/ui/Footer";

export default {
  name: "layouts.default",
  components: {
    AppBar,
    UiFooter,
  },
  data: () => ({
    active: undefined,
    drawer: true,
  }),
  computed: {
    ...mapGetters({
      menuItems: "application/getMenuItems",
    }),
  },
  methods: {
    /**
     * Set the active route for the mobile bottom navigation component.
     *
     * @param routerName
     */
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
          this.setSearch("");
          this.active = undefined;
          break;
      }
    },
    /**
     * Set the search query.
     *
     * @param search
     */
    setSearch(search) {
      this.$store.dispatch("application/setSearch", search);
    },
  },
  /**
   * Update the current active route on route changes.
   */
  watch: {
    $route(to) {
      this.setActive(to.name);
    },
  },
  /**
   * Prepare the web application for creation.
   */
  created() {
    this.setActive(this.$router.currentRoute.name);
    this.$store.dispatch("requests/getAll");
    this.$store.dispatch("application/connectWebsocket");
  },
  /**
   * Prepare the web application for destruction.
   */
  destroyed() {
    this.$store.dispatch("application/disconnectWebsocket");
  },
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
