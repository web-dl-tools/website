import mixin from "../../mixins/helpers";

export const isAuthenticated = (state) => state.authenticated;

export const getTitle = (state) => state.title;

export const getMenuItems = (state) => state.menu_items;

export const apiHasError = () => false;

export const isLoading = (state) => state.loading;

export const getBuildInfo = () => {
  const regex = /tag: [\w\.\-]+,/g;
  let buildInfo = JSON.parse(process.env.VUE_APP_BUILD_INFO);
  let tags = buildInfo.refs.match(regex);

  buildInfo.tag = tags
    ? tags[0].replace("tag:", "").replace(",", "").trim()
    : "0.0.0";

  return buildInfo;
};

export const getSearch = (state) => state.search;

export const getApiBuildInfo = (state) => {
  let apiBuildInfo = state.api_build_info;

  if (apiBuildInfo === null) {
    return null;
  }

  const regex = /tag: [\w\.\-]+,/g;
  let tags = apiBuildInfo.refs.match(regex);

  apiBuildInfo.tag = tags
    ? tags[0].replace("tag:", "").replace(",", "").trim()
    : "0.0.0";

  return apiBuildInfo;
};
