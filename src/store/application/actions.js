import Vue from "vue";
import router from "../../router";

/**
 * Make the authentication (login) request and trigger the login mutation.
 *
 * @param commit
 * @param payload
 * @returns {*}
 */
export const login = ({ commit }, payload) =>
  Vue.$axios
    .post("users/authenticate", payload)
    .then((response) => {
      commit("LOGIN", response.data.token);
      router.push({ name: "overview" }).catch(() => {});
    })
    .catch(() => Promise.reject());

/**
 * Trigger the logout mutation.
 *
 * @param commit
 */
export const logout = ({ commit }) => {
  commit("LOGOUT");
  router.push({ name: "login" });
};

/**
 * Set the page title prefix.
 *
 * @param commit
 * @param dispatch
 * @param prefix
 * @param title
 */
export const setTitlePrefix = ({ commit, dispatch }, prefix) => {
  commit("SET_TITLE_PREFIX", prefix);
  dispatch("setDocumentTitle");
};

/**
 * Set the page title.
 *
 * @param commit
 * @param dispatch
 * @param title
 */
export const setTitle = ({ commit, dispatch }, title) => {
  commit("SET_TITLE", title);
  dispatch("setDocumentTitle");
};

/**
 * Set the page title including suffix.
 *
 * @param state
 * @constructor
 */
export const setDocumentTitle = ({ state }) => {
  let title =
    state.title_prefix !== ""
      ? `${state.title_prefix} - ${state.title}`
      : `${state.title}`;
  document.title = `${title} - Web DL`;
};

/**
 * Set the search query.
 *
 * @param commit
 * @param search
 */
export const setSearch = ({ commit }, search) => {
  commit("SET_SEARCH", search);
};

/**
 * Get the API build information.
 *
 * @param commit
 * @returns {*}
 */
export const getApiBuildInfo = ({ commit }) =>
  Vue.$axios
    .get("application/build")
    .then((response) => {
      commit("GET_API_BUILD_INFO", response.data);
    })
    .catch(() => Promise.reject());

/**
 * Get the latest repo version.
 *
 * @param _
 * @param repo
 * @returns {*}
 */
export const getLatestRepoRelease = ({ commit }, repo) =>
  Vue.$axios
    .get(`https://api.github.com/repos/web-dl-tools/${repo}/releases/latest`, {
      transformRequest: (data, headers) => {
        delete headers.common["Authorization"];
        return data;
      },
    })
    .then((response) =>
      commit("GET_LATEST_REPO_RELEASE", { ...response.data, ...{ repo } })
    )
    .catch(() => Promise.reject());

/**
 * Add a new message.
 *
 * @param commit
 * @param dispatch
 * @param state
 * @param message
 * @returns {*}
 */
export const addMessage = ({ commit, dispatch, state }, message) => {
  if (state.messages.find((m) => m.text === message.text)) return;

  commit("ADD_MESSAGE", message);
  setTimeout(() => {
    commit(
      "SHOW_MESSAGE",
      state.messages.findIndex((m) => m.text === message.text)
    );
  }, 1);

  if (!("timeout" in message && message.timeout === -1)) {
    setTimeout(
      () => {
        dispatch("removeMessage", message.text);
      },
      "timeout" in message ? message.timeout : 6000
    );
  }
};

/**
 * Remove an existing message.
 *
 * @param commit
 * @param state
 * @param text
 * @returns {*}
 */
export const removeMessage = ({ commit, state }, text) => {
  commit(
    "CLEAR_MESSAGE",
    state.messages.findIndex((m) => m.text === text)
  );
  setTimeout(() => {
    commit(
      "REMOVE_MESSAGE",
      state.messages.findIndex((m) => m.text === text)
    );
  }, 2000);
};
