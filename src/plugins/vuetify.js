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
        primary: "#202034",
        secondary: "#5E6D7A",
        accent: "#E45A33",
        info: "#CBD6C5",
        error: "#9B050E",
        success: "#6CE6A0",
        warning: "#F08E29",
      },
    },
  },
});
