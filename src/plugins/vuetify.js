import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

/**
 * Overwrite the Vuetify theme default colors and mode.
 */
export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#203452",
        secondary: "#9EADAB",
        accent: "#F3702F",
        info: "#EFE4D1",
        error: "#F23E16",
        success: "#BDF2C9",
        warning: "#FB8C00",
      },
    },
  },
});
