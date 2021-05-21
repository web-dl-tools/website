import Vue from "vue";

/**
 * Create a new request.
 *
 * @param commit
 * @param payload
 * @returns {*}
 */
export const create = ({ commit }, payload) =>
  Vue.$axios
    .post(`requests`, payload)
    .then((response) => commit("CREATE", response.data))
    .catch(() => Promise.reject());

/**
 * Get a request by ID.
 *
 * @param commit
 * @param id
 * @returns {*}
 */
export const get = ({ commit }, id) =>
  Vue.$axios
    .get(`requests/${id}`)
    .then((response) => commit("GET", response.data));

/**
 * Get logs for a given request ID.
 *
 * @param commit
 * @param id
 * @returns {*}
 */
export const getLogs = ({ commit }, id) =>
  Vue.$axios
    .get(`requests/${id}/logs`)
    .then((response) => commit("GET_LOGS", response.data));

/**
 * Get files for a given request ID.
 *
 * @param commit
 * @param id
 * @returns {*}
 */
export const getFiles = ({ commit }, id) =>
  Vue.$axios
    .get(`requests/${id}/files`)
    .then((response) => commit("GET_FILES", response.data));

/**
 * Get all the requests.
 *
 * @param commit
 */
export const getAll = ({ commit }) => {
  commit("application/SET_LOADING", true, { root: true });
  Vue.$axios
    .get("requests")
    .then((response) => commit("GET_ALL", response.data))
    .finally(() => commit("application/SET_LOADING", false, { root: true }));
};

/**
 * Retry a request.
 *
 * @param commit
 * @param id
 * @returns {*}
 */
export const retry = ({ commit }, id) =>
  Vue.$axios
    .put(`requests/${id}/retry`)
    .then((response) => commit("UPDATE", response.data));

/**
 * Compress a request.
 *
 * @param commit
 * @param id
 * @returns {*}
 */
export const compress = ({ commit }, id) =>
  Vue.$axios
    .put(`requests/${id}/compress`)
    .then((response) => commit("UPDATE", response.data));

/**
 * Remove a request by ID.
 *
 * @param commit
 * @param id
 * @returns {*}
 */
export const remove = ({ commit }, id) =>
  Vue.$axios.delete(`requests/${id}`).then(() => commit("REMOVE", id));
