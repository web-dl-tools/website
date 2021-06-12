/**
 * Set the logged in user information.
 *
 * @param state
 * @param payload
 * @constructor
 */
export const ME = (state, payload) => {
  state.item = payload;
};

/**
 * Set the logged in user's logs.
 *
 * @param state
 * @param logs
 * @constructor
 */
export const GET_LOGS = (state, logs) => {
  state.logs = logs;
};

/**
 * Set the logged in user's stogage.
 *
 * @param state
 * @param storage
 * @constructor
 */
export const GET_STORAGE = (state, storage) => {
  state.storage = storage;
};
