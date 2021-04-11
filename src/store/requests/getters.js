/**
 * Set the request.
 *
 * @param state
 * @returns {{}}
 */
export const get = (state) => state.item;

/**
 * Set the request logs.
 *
 * @param state
 * @returns {[]}
 */
export const getLogs = (state) => state.item_logs;

/**
 * Set the request files.
 *
 * @param state
 * @returns {{}}
 */
export const getFiles = (state) => state.item_files;

/**
 * Get the request by ID.
 *
 * @param state
 * @returns {function(*): *}
 */
export const getById = (state) => (id) =>
  state.items.find((item) => item.id === id);

/**
 * Set all the request.
 *
 * @param state
 * @returns {[]}
 */
export const getAll = (state) => state.items;

/**
 * Get all the active requests.
 *
 * @param state
 * @returns {*[]}
 */
export const getAllActive = (state) =>
  state.items
    .filter((i) =>
      ["pre_processing", "downloading", "post_processing"].includes(i.status)
    )
    .concat(state.items.filter((i) => i.status === "pending"));

/**
 * Get all the pending requests.
 *
 * @param state
 * @returns {*[]}
 */
export const getAllPending = (state) =>
  state.items.filter((i) => i.status === "pending");

/**
 * Get all the processing requests.
 *
 * @param state
 * @returns {*[]}
 */
export const getAllProcessing = (state) =>
  state.items.filter((i) =>
    ["pre_processing", "downloading", "post_processing"].includes(i.status)
  );

/**
 * Get all the completed requests.
 *
 * @param state
 * @returns {*[]}
 */
export const getAllCompleted = (state) =>
  state.items.filter((i) => i.status === "completed");

/**
 * Get all the failed requests.
 *
 * @param state
 * @returns {*[]}
 */
export const getAllFailed = (state) =>
  state.items.filter((i) => i.status === "failed");
