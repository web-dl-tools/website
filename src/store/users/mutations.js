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
