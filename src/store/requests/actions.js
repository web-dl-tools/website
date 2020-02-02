import Vue from "vue";
import router from "../../router";

export const create = ({ commit }, payload) =>
  Vue.$axios
    .post(`requests/`, payload)
    .then(response => {
      commit("CREATE", response.data);
      router.push({ name: "overview" }).catch(() => {});
    })
    .catch(() => Promise.reject());

export const get = ({ commit }, id) =>
  Vue.$axios
    .get(`requests/${id}/`)
    .then(response => commit("GET", response.data));

export const getLogs = ({ commit }, id) =>
  Vue.$axios
    .get(`requests/${id}/logs/`)
    .then(response => commit("GET_LOGS", response.data));

export const getFiles = ({ commit }, id) =>
  Vue.$axios
    .get(`requests/${id}/files/`)
    .then(response => commit("GET_FILES", response.data));

export const getAll = ({ commit }) =>
  Vue.$axios
    .get("requests/")
    .then(response => commit("GET_ALL", response.data));