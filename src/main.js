import Vue from "vue";

import "./plugins/axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "./theme/overwrite.scss";
import "./theme/general.scss";

import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

if (process.env.VUE_APP_SENTRY_DSN !== "") {
  Sentry.init({
    dsn: process.env.VUE_APP_SENTRY_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
    tracingOptions: {
      trackComponents: true,
    },
    logErrors: true,
  });
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
