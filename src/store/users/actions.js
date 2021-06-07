import Vue from "vue";
import router from "../../router";

/**
 * Get the logged in user information.
 *
 * @param commit
 * @param id
 * @returns {*}
 */
export const getMe = ({ commit }, id) =>
  Vue.$axios.get("users/me").then((response) => commit("ME", response.data));

/**
 * Register a new user.
 *
 * @param commit
 * @param payload
 * @returns {*}
 */
export const register = ({ commit }, payload) =>
  Vue.$axios
    .post("users", payload)
    .then(() => {
      router.push({ name: "login" }).catch(() => {});
    })
    .catch(() => Promise.reject());

/**
 * Update an existing user.
 *
 * @param commit
 * @param payload
 * @returns {*}
 */
export const update = ({ commit }, payload) =>
  Vue.$axios
    .patch(`users/${payload.id}`, payload)
    .then((response) => commit("ME", response.data))
    .catch(() => Promise.reject());

/**
 * Get the logged in user logs.
 *
 * @param commit
 * @param id
 * @returns {*}
 */
export const getLogs = ({ commit }, id) =>
  Vue.$axios
    .get("users/logs")
    .then((response) => commit("GET_LOGS", response.data));
