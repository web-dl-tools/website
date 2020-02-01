import Vue from "vue";

export const CHECK = state => {
  state.authenticated = !!localStorage.getItem("auth_token");
  if (state.authenticated) {
    Vue.$axios.defaults.headers.common.Authorization = `Token ${localStorage.getItem(
      "auth_token"
    )}`;
  }
};

export const SET_TITLE = (state, title) => {
  state.title = title;
  document.title = `Web DL - ${title}`;
};

export const LOGIN = (state, token) => {
  localStorage.setItem("auth_token", token);
  Vue.$axios.defaults.headers.common.Authorization = `Token ${token}`;
  state.authenticated = true;
};

export const LOGOUT = state => {
  localStorage.removeItem("auth_token");
  Vue.$axios.defaults.headers.common.Authorization = "";
  state.authenticated = false;
};
