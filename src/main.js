import Vue from "vue";

import "./plugins/axios";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import "@babel/polyfill";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import "./theme/overwrite.theme.scss";
import "./theme/overwrite.font.scss";
import "./theme/overwrite.layout.scss";
import "./theme/overwrite.nav.scss";
import "./theme/overwrite.table.scss";
import "./theme/overwrite.tree.scss";
import "./theme/overwrite.chip.scss";

import "./theme/general.pre.scss";
import "./theme/general.background.scss";
import "./theme/general.font.scss";
import "./theme/general.text.scss";
import "./theme/general.border.scss";
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
    attachStacktrace: true,
    sendDefaultPii: true,
  });
}

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
