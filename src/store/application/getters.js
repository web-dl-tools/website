/**
 * Set the authenticated state.
 *
 * @param state
 * @returns {boolean}
 */
export const isAuthenticated = (state) => state.authenticated;

/**
 * Set the page title prefix.
 *
 * @param state
 * @returns {string}
 */
export const getTitlePrefix = (state) => state.title_prefix;

/**
 * Set the page title.
 *
 * @param state
 * @returns {string}
 */
export const getTitle = (state) => state.title;

/**
 * Set the menu items.
 *
 * @param state
 * @returns {[{color: string, routerName: string, icon: string, label: string}, {color: string, routerName: string, icon: string, label: string}, {color: string, routerName: string, icon: string, label: string}]}
 */
export const getMenuItems = (state) => state.menu_items;

/**
 * Set the loading state.
 *
 * @param state
 * @returns {boolean}
 */
export const isLoading = (state) => state.loading;

/**
 * Get the websocket state.
 *
 * @param state
 * @returns {null}
 */
export const getWebsocket = (state) => state.websocket;

/**
 * Calculate the build tag and return the website build information.
 *
 * @returns {any}
 */
export const getBuildInfo = () => {
  const regex = /tag: [\w\.\-]+,/g;
  let buildInfo = JSON.parse(process.env.VUE_APP_BUILD_INFO);
  let tags = buildInfo.refs.match(regex);

  buildInfo.tag = tags
    ? tags[0].replace("tag:", "").replace(",", "").trim()
    : "0.0.0";

  return buildInfo;
};

/**
 * Get the search query.
 *
 * @param state
 * @returns {string}
 */
export const getSearch = (state) => state.search;

/**
 * Calculate the build tag and return the API build information.
 *
 * @param state
 * @returns {null}
 */
export const getApiBuildInfo = (state) => {
  let apiBuildInfo = state.api_build_info;

  if (apiBuildInfo === null) {
    return null;
  }

  const regex = /tag: [\w.\-]+,/g;
  let tags = apiBuildInfo.refs.match(regex);

  apiBuildInfo.tag = tags
    ? tags[0].replace("tag:", "").replace(",", "").trim()
    : "0.0.0";

  return apiBuildInfo;
};

/**
 * Messages to show to the user.
 *
 * @param state
 * @returns {string}
 */
export const getMessages = (state) => state.messages;
