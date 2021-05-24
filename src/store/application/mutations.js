import Vue from "vue";

/**
 * Check the current auth state, store the auth token and
 * add a default axios authorization header.
 * @param state
 * @constructor
 */
export const CHECK = (state) => {
  state.authenticated = !!localStorage.getItem("auth_token");
  if (state.authenticated) {
    Vue.$axios.defaults.headers.common.Authorization = `Token ${localStorage.getItem(
      "auth_token"
    )}`;
  }
};

/**
 * Set the page title prefix.
 *
 * @param state
 * @param prefix
 * @constructor
 */
export const SET_TITLE_PREFIX = (state, prefix) => {
  state.title_prefix = prefix;
};

/**
 * Set the page title including suffix.
 *
 * @param state
 * @param title
 * @constructor
 */
export const SET_TITLE = (state, title) => {
  state.title = title;
};

/**
 * Set the auth state and axios default authorization header.
 *
 * @param state
 * @param token
 * @constructor
 */
export const LOGIN = (state, token) => {
  localStorage.setItem("auth_token", token);
  Vue.$axios.defaults.headers.common.Authorization = `Token ${token}`;
  state.authenticated = true;
};

/**
 * Remove the auth state and axios default authorization header.
 *
 * @param state
 * @constructor
 */
export const LOGOUT = (state) => {
  localStorage.removeItem("auth_token");
  Vue.$axios.defaults.headers.common.Authorization = "";
  state.authenticated = false;
};

/**
 * Set the loading state.
 *
 * @param state
 * @param loading
 * @constructor
 */
export const SET_LOADING = (state, loading) => (state.loading = loading);

/**
 * Set the websocket reference.
 *
 * @param state
 * @param websocket
 * @constructor
 */
export const CONNECT_WEBSOCKET = (state, websocket) =>
  (state.websocket = websocket);

/**
 * Remove the websocket reference.
 *
 * @param state
 * @returns {null}
 * @constructor
 */
export const DISCONNECT_WEBSOCKET = (state) => (state.websocket = null);

/**
 * Set the search query.
 *
 * @param state
 * @param search
 * @constructor
 */
export const SET_SEARCH = (state, search) => (state.search = search);

/**
 * Get the API build information.
 *
 * @param state
 * @param apiBuildInfo
 * @constructor
 */
export const GET_API_BUILD_INFO = (state, apiBuildInfo) =>
  (state.api_build_info = apiBuildInfo);

/**
 * Add a new message.
 *
 * @param state
 * @param message
 * @constructor
 */
export const ADD_MESSAGE = (state, message) => state.messages.push(message);

/**
 * Show an existing message.
 *
 * @param state
 * @param i
 * @constructor
 */
export const SHOW_MESSAGE = (state, i) =>
  Vue.set(state.messages, i, { ...state.messages[i], ...{ show: true } });

/**
 * Clear an existing message.
 *
 * @param state
 * @param i
 * @constructor
 */
export const CLEAR_MESSAGE = (state, i) =>
  Vue.set(state.messages, i, { ...state.messages[i], ...{ show: false } });

/**
 * Remove an existing message.
 *
 * @param state
 * @param i
 * @constructor
 */
export const REMOVE_MESSAGE = (state, i) => state.messages.splice(i, 1);
