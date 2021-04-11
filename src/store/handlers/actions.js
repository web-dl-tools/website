import Vue from "vue";

/**
 * Get the handler statuses for a given url.
 *
 * @param x
 * @param url
 * @returns {*}
 */
export const getHandlerStatuses = (x, url) =>
  Vue.$axios
    .get(`handlers/statuses?url=${btoa(url)}`)
    .then((response) => response.data)
    .catch(() => Promise.reject());
