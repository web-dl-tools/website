<template>
  <div>
    <v-toolbar color="grey darken-4" dark short flat class="fixed-top">
      <v-toolbar-title>
        <v-btn icon @click="$router.push({ name: 'overview' }).catch(() => {})">
          <v-icon>
            mdi-cloud-download-outline
          </v-icon>
        </v-btn>
      </v-toolbar-title>
      <v-divider class="mx-4" inset vertical />
      <span class="subtitle-1">{{ title }}</span>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          text
          @click="$router.push({ name: menuItem.routerName }).catch(() => {})"
          v-for="(menuItem, i) in menuItems"
          :key="menuItem.label"
          :color="i === active ? 'warning' : ''"
        >
          {{ menuItem.label }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-divider class="mx-4 hidden-sm-and-down" inset vertical />
        <v-btn icon @click="$store.dispatch('application/logout')">
          <v-icon>
            mdi-exit-to-app
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
import Vue from "vue";
import { mapGetters } from "vuex";

export default {
  name: "layouts.default",
  data: () => ({
    active: undefined,
    socket: null
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
        case "requests.active":
          this.active = 0;
          break;
        case "requests.completed":
          this.active = 1;
          break;
        case "requests.failed":
          this.active = 2;
          break;
        default:
          this.active = undefined;
          break;
      }
    },
    handleWebSocketMessage(event) {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "requests.group.joined":
          console.log(
            "Web DL API WebSocket connection established successfully."
          );
          break;
        case "requests.update":
          this.$store.commit("requests/UPDATE", data.content);
          break;
      }
    },
    closeWebSocketConnection() {
      this.socket.close();
    }
  },
  watch: {
    $route(to) {
      this.setActive(to.name);
    }
  },
  created() {
    this.setActive(this.$router.currentRoute.name);

    document.addEventListener("beforeunload", this.closeWebSocketConnection);

    let webSocketUrl = Vue.$axios.defaults.baseURL;
    webSocketUrl = webSocketUrl.replace("https://", "wss://");
    webSocketUrl = webSocketUrl.replace("http://", "ws://");
    webSocketUrl = webSocketUrl.replace("/api/", "/ws/");

    this.socket = new WebSocket(`${webSocketUrl}requests/`);
    this.socket.addEventListener("message", this.handleWebSocketMessage);
    this.socket.onopen = () =>
      this.socket.send(
        JSON.stringify({
          type: "requests.group.join",
          content: Vue.$axios.defaults.headers.common.Authorization.replace(
            "Token ",
            ""
          )
        })
      );
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
