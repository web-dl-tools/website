<template>
  <div>
    <v-app-bar color="grey darken-4" app dark short flat class="fixed-top">
      <v-toolbar-title class="ml-n4 ml-md-2 mr-2">
        <!--        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>-->
        <v-btn
          class="transparent"
          elevation="0"
          @click="$router.push({ name: 'overview' }).catch(() => {})"
        >
          <v-icon class="pr-2"> mdi-cloud-download-outline </v-icon>
          <span
            class="title font-weight-light font-italic text-no-transform hidden-sm-and-down"
          >
            Web DL
          </span>
        </v-btn>
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        v-show="this.active !== undefined"
        :value="search"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        clearable
        dense
        flat
        hide-details
        solo-inverted
        @input="setSearch"
      />
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
          v-for="(menuItem, i) in menuItems"
          :key="menuItem.label"
          :color="i === active ? menuItem.color : ''"
          text
          @click="$router.push({ name: menuItem.routerName }).catch(() => {})"
        >
          <v-icon>{{ menuItem.icon }}</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="mr-n4 mr-md-2">
        <v-divider class="mx-2 hidden-sm-and-down" inset vertical />
        <v-menu :rounded="'0 b'" offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" icon>
              <v-icon> mdi-account-circle-outline </v-icon>
            </v-btn>
          </template>
          <v-list class="py-0">
            <v-list-item
              @click="
                $router.push({ name: 'profile.overview' }).catch(() => {})
              "
            >
              <v-list-item-icon>
                <v-icon>mdi-account-circle-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>My profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item @click="$store.dispatch('application/logout')">
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Sign out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-app-bar>

    <!--    <v-navigation-drawer v-model="drawer" class="mt-14" app>-->
    <!--      <v-list dense nav flat>-->
    <!--        <v-subheader class="text-uppercase">Requests</v-subheader>-->
    <!--        <v-list-item-group v-model="active">-->
    <!--          <v-list-item-->
    <!--            v-for="(menuItem, i) in menuItems"-->
    <!--            :key="menuItem.label"-->
    <!--            :color="i === active ? menuItem.color : ''"-->
    <!--            @click="$router.push({ name: menuItem.routerName }).catch(() => {})"-->
    <!--          >-->
    <!--            <v-list-item-icon>-->
    <!--              <v-icon>{{ menuItem.icon }}</v-icon>-->
    <!--            </v-list-item-icon>-->
    <!--            <v-list-item-content>-->
    <!--              <v-list-item-title v-text="menuItem.label"></v-list-item-title>-->
    <!--            </v-list-item-content>-->
    <!--          </v-list-item>-->
    <!--        </v-list-item-group>-->
    <!--      </v-list>-->
    <!--    </v-navigation-drawer>-->

    <v-main
      class="toolbar-padding-offset pt-0"
      :class="{
        'mobile-bottom-navigation-padding-offset':
          $vuetify.breakpoint.smAndDown,
      }"
    >
      <router-view class="pb-12" />
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

    <v-snackbar v-model="apiError" class="mt-12 pt-2" color="error" top>
      An error occurred when connection with the API. <br />
      Please try again later.
    </v-snackbar>

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
import UiFooter from "./../components/ui/Footer";

export default {
  name: "layouts.default",
  components: {
    UiFooter,
  },
  data: () => ({
    active: undefined,
    drawer: true,
  }),
  computed: {
    ...mapGetters({
      title: "application/getTitle",
      menuItems: "application/getMenuItems",
      apiError: "application/apiHasError",
      search: "application/getSearch",
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
