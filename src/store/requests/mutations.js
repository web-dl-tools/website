import Vue from "vue";

export const CREATE = (state, payload) => {
  state.item = payload;
  state.items.push(payload);
};

export const GET = (state, payload) => {
  state.item = payload;
};

export const GET_LOGS = (state, payload) => {
  state.item_logs = payload;
};

export const GET_FILES = (state, payload) => {
  state.item_files = payload;
};

export const GET_ALL = (state, payload) => {
  state.items = payload;
};

export const UPDATE = (state, payload) => {
  Vue.set(
    state.items,
    state.items.findIndex(item => item.id === payload.id),
    payload
  );
};
