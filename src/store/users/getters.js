/**
 * Get the logged in user information.
 *
 * @param state
 * @returns {null}
 */
export const getMe = (state) => state.item;

/**
 * Get the logged in user's logs.
 *
 * @param state
 * @returns {null}
 */
export const getLogs = (state) => state.logs;

/**
 * Get the logged in user's storage.
 *
 * @param state
 * @returns {null}
 */
export const getStorage = (state) => state.storage;
