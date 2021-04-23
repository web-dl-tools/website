"use strict";

import Vue from "vue";
import axios from "axios";
import store from "../store";

/**
 * Axios base configuration.
 *
 * @type {{baseURL: string | string, withCredentials: boolean}}
 */
let config = {
  baseURL: process.env.VUE_APP_API_URL || "http://localhost",
  withCredentials: false,
};

/**
 * Create an Axios object instance.
 *
 * @type {AxiosInstance}
 * @private
 */
const _axios = axios.create(config);

/**
 * Intercept and overwrite the onRejected function to return a Promise reject.
 */
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

/**
 * Intercept and overwrite the OnRejected function to logout on 401 http response statuses. (UNAUTHORIZED)
 */
_axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      store.dispatch("application/logout");
    } else {
      store.commit("application/SET_API_ERROR", true);
    }
    return Promise.reject(error);
  }
);

/**
 * Create a plugin for the Axios instance.
 *
 * @param _Vue
 * @returns {AxiosInstance}
 */
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

/**
 * Include the Axios plugin into the Vue instance.
 */
Vue.use(Plugin);

export default Plugin;
