import Vue from "vue";

/**
 * Add the created request into the requests list.
 *
 * @param state
 * @param payload
 * @constructor
 */
export const CREATE = (state, payload) => {
  const index = state.items.findIndex((i) => i.id === payload.id);

  if (index > -1) {
    Vue.set(state.items, index, payload);
  } else {
    state.items.push(payload);
  }
};

/**
 * Set the loaded request in the requests list.
 *
 * @param state
 * @param payload
 * @constructor
 */
export const GET = (state, payload) => {
  state.item = payload;
  const index = state.items.findIndex((i) => i.id === payload.id);
  if (index > -1) {
    Vue.set(state.items, index, payload);
  } else {
    state.items.push(payload);
  }
};

/**
 * Set the request logs.
 *
 * @param state
 * @param payload
 * @constructor
 */
export const GET_LOGS = (state, payload) => {
  state.item_logs = payload;
};

/**
 * Set the request files.
 *
 * @param state
 * @param payload
 * @constructor
 */
export const GET_FILES = (state, payload) => {
  if (typeof payload === "string") {
    payload = JSON.parse(payload);
  }
  state.item_files = payload;
};

/**
 * Set the entire request list.
 *
 * @param state
 * @param payload
 * @constructor
 */
export const GET_ALL = (state, payload) => {
  state.items = payload;
};

/**
 * Set or update the request in the requests list.
 *
 * @param state
 * @param payload
 * @constructor
 */
export const UPDATE = (state, payload) => {
  const index = state.items.findIndex((i) => i.id === payload.id);

  if (index > -1) {
    Vue.set(state.items, index, payload);
  } else {
    state.items.push(payload);
  }

  if (state.item && state.item.id === payload.id) {
    state.item = payload;
  }
};

/**
 * Remove the request from the requests list.
 *
 * @param state
 * @param id
 * @constructor
 */
export const REMOVE = (state, id) => {
  const index = state.items.findIndex((i) => i.id === id);
  if (index > -1) {
    state.items.splice(index, 1);
  }
};
