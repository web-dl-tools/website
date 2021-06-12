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

/**
 * Format a bytes value to a human readable format.
 *
 * @url https://stackoverflow.com/a/18650828
 * @param bytes
 * @param decimals
 * @returns {string}
 */
export const formatBytes = (bytes, decimals) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
