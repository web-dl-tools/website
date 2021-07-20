import state from "./state";
import * as getters from "./getters";
import * as mutations from "./mutations";
import * as base_actions from "./actions";
import * as websocket_actions from "./actions.websocket";

const actions = { ...base_actions, ...websocket_actions };

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
