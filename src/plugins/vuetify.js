import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#0b85db",
        secondary: "#1D5471",
        accent: "#4a6b30",
        info: "#388B9F",
        error: "#FF5252",
        success: "#4CAF50",
        warning: "#FB8C00",
      },
    },
  },
});
