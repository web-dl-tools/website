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
    // eslint-disable-next-line no-console
    console.log("Web DL API WebSocket connection established successfully.");
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
  commit("CONNECT_WEBSOCKET", websocket);
};

/**
 * Handle received websocket messages.
 *
 * @param commit
 * @param event
 */
export const handleWebsocketEvent = ({ commit }, event) => {
  const data = JSON.parse(event.data);
  switch (data.type) {
    case "requests.group.joined":
      // eslint-disable-next-line no-console
      console.log(`Joined authenticated channel group (${data.content}).`);
      break;
    case "requests.update":
      commit("requests/UPDATE", data.content, { root: true });
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
 * Set the page title.
 *
 * @param commit
 * @param title
 */
export const setTitle = ({ commit }, title) => {
  commit("SET_TITLE", title);
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
