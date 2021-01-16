import Vue from "vue";

export const getMe = ({ commit }, id) =>
  Vue.$axios.get("users/me").then((response) => commit("ME", response.data));
