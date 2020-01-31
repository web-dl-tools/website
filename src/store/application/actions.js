import Vue from "vue";
import router from "../../router";

export const login = ({ commit }, payload) =>
  Vue.$axios
    .post("auth/token", payload)
    .then(result => {
      commit("LOGIN", result.data.token);
      router.push({ name: "overview" }).catch(() => {});
    })
    .catch(() => Promise.reject());

export const logout = ({ commit }) => {
  commit("LOGOUT");
  router.push({ name: "auth.login" });
};
