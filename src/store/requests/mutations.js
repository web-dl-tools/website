import Vue from "vue";

export const CREATE = (state, payload) => {
  state.items.push(payload);
};

export const GET = (state, payload) => {
  state.item = payload;
  const index = state.items.findIndex(i => i.id === payload.id);
  if (index > -1) {
    Vue.set(state.items, index, payload);
  } else {
    state.items.push(payload);
  }
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
  const index = state.items.findIndex(i => i.id === payload.id);

  if (index > -1) {
    Vue.set(state.items, index, payload);
  } else {
    state.items.push(payload);
  }

  if (state.item && state.item.id === payload.id) {
    state.item = payload;
  }
};

export const REMOVE = (state, id) => {
  const index = state.items.findIndex(i => i.id === id);
  if (index > -1) {
    state.items.splice(index, 1);
  }
};
