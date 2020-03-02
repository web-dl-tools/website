import Vue from "vue";

export const getHandlerStatuses = (x, url) =>
  Vue.$axios
    .get(`handlers/statuses/?url=${btoa(url)}`)
    .then(response => response.data)
    .catch(() => Promise.reject());
