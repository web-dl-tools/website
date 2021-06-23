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
          class="
            title
            font-weight-light font-italic
            text-no-transform
            hidden-sm-and-down
          "
        >
          Web DL
        </span>
      </v-btn>
    </v-toolbar-title>
    <v-spacer
      v-show="
        this.$route.name === 'requests.create' || this.active !== undefined
      "
    />
    <v-text-field
      v-show="
        this.$route.name !== 'requests.create' && this.active === undefined
      "
      v-model="url"
      autocomplete="off"
      background-color="transparent"
      color="info"
      :placeholder="url_placeholder"
      :label="url_label"
      dense
      flat
      hide-details
      solo
      v-on:keyup.enter.native="createRequest"
    >
      <template v-if="this.url" v-slot:append>
        <v-icon class="pr-2" @click="createRequest"> mdi-plus-circle </v-icon>
      </template>
    </v-text-field>
    <v-text-field
      v-show="
        this.$route.name !== 'requests.create' && this.active !== undefined
      "
      append-icon="mdi-magnify"
      autocomplete="off"
      color="accent"
      :placeholder="search_label"
      :label="search_label"
      :value="search"
      clearable
      dense
      flat
      hide-details
      solo-inverted
      @input="setSearch"
    />
    <v-spacer
      v-show="
        this.$route.name === 'requests.create' || this.active !== undefined
      "
    />
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn
        text
        class="transparent"
        v-show="this.$route.name !== 'requests.create' && !this.url"
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
          <v-btn v-on="on" v-bind="attrs" text>
            <v-skeleton-loader v-if="!user" class="mr-3" type="table-cell" />
            <span v-else class="hidden-sm-and-down mr-3">
              {{ user.username }}
            </span>
            <v-icon> mdi-account-circle-outline </v-icon>
          </v-btn>
        </template>
        <v-list class="py-0">
          <v-list-item
            @click="$router.push({ name: 'profile.overview' }).catch(() => {})"
          >
            <v-list-item-icon class="mr-3">
              <v-icon>mdi-account-circle-outline</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Your profile</v-list-item-title>
              <v-list-item-subtitle>
                {{ user ? user.full_name : "" }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider />
          <v-list-item @click="$store.dispatch('application/logout')">
            <v-list-item-icon class="mr-3">
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
    url_placeholder: "URL or Magnet URI",
    url_label: "Create a new request...",
  }),
  computed: {
    ...mapGetters({
      menuItems: "application/getMenuItems",
      search: "application/getSearch",
      user: "users/getMe",
    }),
    search_label() {
      return `Search ${this.$route.meta.title.toLowerCase()}`;
    },
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
  watch: {
    /**
     * Clear the url input if switching to a non-url field page.
     *
     * @param n
     */
    active(n) {
      if (this.url && this.active !== undefined) {
        this.url = "";
      }
    },
  },
};
</script>
