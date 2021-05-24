/**
 * Truncate a string to a given length.
 *
 * @param str
 * @param len
 * @returns {string|*} The truncated string.
 */
export const truncate = (str, len) => {
  return str.length > len ? `${str.slice(0, len)}...` : str;
};

/**
 * Format a request type to a request string for use in labels.
 *
 * @param request
 * @returns {*}
 */
export const formatRequest = (request) => {
  return request
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace("Request", "");
};
