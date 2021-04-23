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
 * Set the page title including suffix.
 *
 * @param state
 * @param title
 * @constructor
 */
export const SET_TITLE = (state, title) => {
  state.title = title;
  document.title = `${title} - Web DL`;
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
 * Set the api error.
 *
 * @param state
 * @param api_error
 * @constructor
 */
export const SET_API_ERROR = (state, api_error) =>
  (state.api_error = api_error);
