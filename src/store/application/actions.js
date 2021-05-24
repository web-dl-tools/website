import Vue from "vue";
import router from "../../router";
import { truncate, formatRequest } from "../../mixins/public";

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
 * Create a websocket connection, join an authentication channel,
 * handle received messages and register the websocket object.
 *
 * @param commit
 * @param dispatch
 */
export const connectWebsocket = ({ commit, dispatch }) => {
  let webSocketUrl = Vue.$axios.defaults.baseURL;
  webSocketUrl = webSocketUrl.replace("https://", "wss://");
  webSocketUrl = webSocketUrl.replace("http://", "ws://");
  webSocketUrl = webSocketUrl.replace("/api/", "/ws/");

  document.addEventListener("beforeunload", () =>
    dispatch("disconnectWebsocket")
  );
  const websocket = new WebSocket(`${webSocketUrl}requests`);
  websocket.addEventListener("message", (e) =>
    dispatch("handleWebsocketEvent", e)
  );

  websocket.onopen = () => {
    websocket.send(
      JSON.stringify({
        type: "requests.group.join",
        content: Vue.$axios.defaults.headers.common.Authorization.replace(
          "Token ",
          ""
        ),
      })
    );
  };

  websocket.onerror = () =>
    dispatch("addMessage", {
      text: "An error occurred with the Web DL WebSocket connection.",
      type: "error",
      action: null,
      timeout: 10000,
    });

  commit("CONNECT_WEBSOCKET", websocket);
};

/**
 * Handle received websocket messages.
 *
 * @param commit
 * @param dispatch
 * @param rootGetters
 * @param event
 */
export const handleWebsocketEvent = (
  { commit, dispatch, rootGetters },
  event
) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case "requests.group.joined":
      break;
    case "requests.update":
      commit("requests/UPDATE", data.content, { root: true });
      break;
    case "requests.status.update":
      const request = rootGetters["requests/getById"](data.content.id);
      if (request) {
        switch (data.content.status) {
          case "pre_processing":
            dispatch("addMessage", {
              text: `Started processing ${formatRequest(
                request.request_type
              )} Request
              <br />
              <span class="info--text">${truncate(request.url, 45)}</span>.`,
              type: "info",
              action: null,
              timeout: 2500,
            });
            break;
          case "completed":
            dispatch("addMessage", {
              text: `Finished ${formatRequest(request.request_type)} Request
              <br />
              <span class="info--text">${request.title}</span>.`,
              type: "success",
              action: () =>
                router
                  .push({
                    name: "requests.detail",
                    params: { requestId: request.id },
                  })
                  .catch(() => {}),
            });
            break;
          case "failed":
            dispatch("addMessage", {
              text: `Failed to download ${formatRequest(
                request.request_type
              )} Request
              <br />
              <span class="info--text">${truncate(request.url, 45)}</span>.`,
              type: "error",
              action: () =>
                router
                  .push({
                    name: "requests.detail",
                    params: { requestId: request.id },
                  })
                  .catch(() => {}),
              timeout: 10000,
            });
            break;
        }
      }
      break;
    default:
      // eslint-disable-next-line no-console
      console.error("Unsupported websocket event received");
      break;
  }
};

/**
 * Close the websocket connection and unregister.
 * @param state
 * @param commit
 */
export const disconnectWebsocket = ({ state, commit }) => {
  state.websocket.close();
  commit("DISCONNECT_WEBSOCKET");
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
 * Add a new message.
 *
 * @param commit
 * @param state
 * @param message
 * @returns {*}
 */
export const addMessage = ({ commit, state }, message) => {
  if (state.messages.find((i) => i.text === message.text)) return;

  commit("ADD_MESSAGE", message);

  setTimeout(
    () => {
      const i = state.messages.indexOf(message);
      if (i > -1) {
        commit("REMOVE_MESSAGE", i);
      }
    },
    "timeout" in message ? message.timeout : 5000
  );
};
