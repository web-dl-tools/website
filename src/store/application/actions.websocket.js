import Vue from "vue";
import router from "../../router";
import { truncate, formatRequest } from "../../mixins/public";

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

  websocket.onclose = () => {
    if (router.currentRoute.name !== "login")
      dispatch("addMessage", {
        text: `The <b>Web DL websocket</b> connection has closed.<br />
        <span class="grey--text">Please refresh the page to reconnect.</span>`,
        type: "error",
        action: null,
        timeout: -1,
      });
  };

  websocket.onerror = () =>
    dispatch("addMessage", {
      text: `An error occurred with the <b>Web DL websocket</b> connection.<br />
      <span class="grey--text">Please refresh the page to reconnect.</span>`,
      type: "error",
      action: null,
      timeout: -1,
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
      dispatch("handleWebsocketGroupJoinedEvent");
      break;
    case "requests.update":
      dispatch("handleWebsocketRequestUpdateEvent", data);
      break;
    case "requests.status.update":
      dispatch("handleWebsocketRequestStatusUpdateEvent", data);
      break;
    case "requests.task.finished":
      dispatch("handleWebsocketRequestTaskFinishedEvent", data);
      break;
    default:
      // eslint-disable-next-line no-console
      console.error("Unsupported websocket event received");
      break;
  }
};

/**
 * Handle the group joined websocket event.
 *
 * @param dispatch
 * @param data
 */
export const handleWebsocketGroupJoinedEvent = ({ dispatch }) => {
  dispatch("addMessage", {
    text: "<b>Web DL</b> connection established successfully.",
    type: "info",
    action: () =>
      router
        .push({
          name: "application.build",
        })
        .catch(() => {}),
    timeout: 3000,
  });
};

/**
 * Handle the request update websocket event.
 *
 * @param commit
 * @param dispatch
 * @param rootGetters
 * @param data
 */
export const handleWebsocketRequestUpdateEvent = (
  { commit, dispatch, rootGetters },
  data
) => {
  commit("requests/UPDATE", data.content, { root: true });
};

/**
 * Handle the request status update websocket event.
 *
 * @param commit
 * @param dispatch
 * @param rootGetters
 * @param data
 */
export const handleWebsocketRequestStatusUpdateEvent = (
  { commit, dispatch, rootGetters },
  data
) => {
  const request = rootGetters["requests/getById"](data.content.id);
  if (request) {
    switch (data.content.status) {
      case "pre_processing":
        dispatch("addMessage", {
          text: `Started processing ${formatRequest(
            request.request_type
          )} request
          <br />
          <span class="info--text">${truncate(request.url, 45)}</span>`,
          type: "info",
          action: null,
        });
        break;
      case "completed":
        dispatch("addMessage", {
          text: `Finished ${formatRequest(request.request_type)} request
          <br />
          <span class="info--text">${request.title}</span>`,
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
          )} request
          <br />
          <span class="info--text">${truncate(request.url, 45)}</span>`,
          type: "error",
          action: () =>
            router
              .push({
                name: "requests.detail",
                params: { requestId: request.id },
              })
              .catch(() => {}),
        });
        break;
    }
  }
};

/**
 * Handle the request task finished websocket event.
 *
 * @param commit
 * @param dispatch
 * @param rootGetters
 * @param data
 */
export const handleWebsocketRequestTaskFinishedEvent = (
  { commit, dispatch, rootGetters },
  data
) => {
  const request = rootGetters["requests/getById"](data.content.id);
  if (request) {
    switch (data.content.task) {
      case "compress_request":
        const request = rootGetters["requests/getById"](data.content.id);
        dispatch("addMessage", {
          text: `Finished compressing ${formatRequest(
            request.request_type
          )} request
          <br />
          <span class="info--text">${request.title}</span>`,
          type: "info",
          action: () =>
            router
              .push({
                name: "requests.detail",
                params: { requestId: request.id },
              })
              .catch(() => {}),
        });
        break;
    }
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
