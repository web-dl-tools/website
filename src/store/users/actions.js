import Vue from "vue";

/**
 * Get the logged in user information.
 *
 * @param commit
 * @param id
 * @returns {*}
 */
export const getMe = ({ commit }, id) =>
  Vue.$axios.get("users/me").then((response) => commit("ME", response.data));
