<template>
  <v-app-bar color="grey darken-4" app dark short flat class="fixed-top">
    <v-toolbar-title class="ml-n4 mr-1 ml-md-n1">
      <v-btn
        class=""
        :icon="$vuetify.breakpoint.smAndDown"
        :text="!$vuetify.breakpoint.smAndDown"
        @click="$router.push({ name: 'overview' }).catch(() => {})"
      >
        <v-icon class="px-2"> mdi-cloud-download-outline </v-icon>
        <span
          class="title font-weight-light font-italic text-no-transform hidden-sm-and-down"
        >
          Web DL
        </span>
      </v-btn>
    </v-toolbar-title>
    <v-spacer />
    {{ this.$router.path }}
    <v-text-field
      v-show="this.$route.name !== 'requests.create'"
      v-if="this.active === undefined"
      v-model="url"
      prepend-inner-icon="mdi-plus"
      color="info"
      :placeholder="url_label"
      :label="url_label"
      clearable
      dense
      flat
      hide-details
      solo
      v-on:keyup.enter.native="createRequest"
    />
    <v-text-field
      v-show="this.$route.name !== 'requests.create'"
      v-else
      prepend-inner-icon="mdi-magnify"
      color="accent"
      :value="search"
      :placeholder="search_label"
      :label="search_label"
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
        v-show="this.$route.name !== 'requests.create'"
        @click="$router.push({ name: 'requests.create' }).catch(() => {})"
      >
        <v-icon> mdi-plus-circle-outline </v-icon>
      </v-btn>
      <v-divider
        v-show="this.$route.name !== 'requests.create'"
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
              <v-list-item-title>Your profile</v-list-item-title>
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
  data: () => ({
    url: "",
    url_label: "Create a new request",
    search_label: "Search",
  }),
  computed: {
    ...mapGetters({
      menuItems: "application/getMenuItems",
      search: "application/getSearch",
    }),
  },
  methods: {
    /**
     * Start creating a new request.
     */
    createRequest() {
      this.$router
        .push({ name: "requests.create", query: { url: this.url } })
        .catch(() => {})
        .finally(() => (this.url = ""));
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
};
</script>
