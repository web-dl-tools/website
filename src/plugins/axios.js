"use strict";

import Vue from "vue";
import axios from "axios";
import store from "../store";

let config = {
  baseURL: process.env.VUE_APP_API_URL || "http://localhost",
  withCredentials: false,
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

_axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch("application/logout");
    }
    return Promise.reject(error);
  }
);

Plugin.install = function (_Vue) {
  _Vue.$axios = _axios;
  window.axios = _axios;
  Object.defineProperties(_Vue.prototype, {
    axios: {
      get() {
        return _axios;
      },
    },
    $axios: {
      get() {
        return _axios;
      },
    },
  });
};

Vue.use(Plugin);

export default Plugin;
