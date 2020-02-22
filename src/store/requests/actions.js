import Vue from "vue";

export const create = ({ commit }, payload) =>
  Vue.$axios
    .post(`requests/`, payload)
    .then(response => commit("CREATE", response.data))
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

export const getAll = ({ commit }) => {
  commit("application/SET_LOADING", true, { root: true });
  Vue.$axios
    .get("requests/")
    .then(response => commit("GET_ALL", response.data))
    .finally(() => commit("application/SET_LOADING", false, { root: true }));
};

export const retry = ({ commit }, id) =>
  Vue.$axios
    .put(`requests/${id}/retry/`)
    .then(response => commit("UPDATE", response.data));

export const remove = ({ commit }, id) =>
  Vue.$axios.delete(`requests/${id}/`).then(() => commit("REMOVE", id));
