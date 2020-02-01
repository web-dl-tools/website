import Vue from "vue";
import router from "../../router";

export const login = ({ commit }, payload) =>
  Vue.$axios
    .post("user/authenticate/", payload)
    .then(response => {
      commit("LOGIN", response.data.token);
      router.push({ name: "overview" }).catch(() => {});
    })
    .catch(() => Promise.reject());

export const logout = ({ commit }) => {
  commit("LOGOUT");
  router.push({ name: "auth.login" });
};
