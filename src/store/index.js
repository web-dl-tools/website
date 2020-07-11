import Vue from "vue";
import Vuex from "vuex";

import application from "./application";
import users from "./users";
import handlers from "./handlers";
import requests from "./requests";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    application,
    users,
    handlers,
    requests,
  },
});
