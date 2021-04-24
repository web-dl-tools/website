<template>
  <v-app-bar color="grey darken-4" app dark short flat class="fixed-top">
    <v-toolbar-title class="ml-n4 ml-md-2 mr-2">
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
            @click="$router.push({ name: 'profile.overview' }).catch(() => {})"
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
</template>

<script>
import { mapGetters } from "vuex";
import formatters from "../../mixins/formatters";

export default {
  name: "components.ui.app-bar",
  mixins: [formatters],
  props: {
    active: Number,
  },
  computed: {
    ...mapGetters({
      menuItems: "application/getMenuItems",
      search: "application/getSearch",
    }),
  },
  methods: {
    /**
     * Set the search query.
     *
     * @param search
     */
    setSearch(search) {
      this.$store.dispatch("application/setSearch", search);
    },
  },
};
</script>
