export const isAuthenticated = (state) => state.authenticated;

export const getTitle = (state) => state.title;

export const getMenuItems = (state) => state.menu_items;

export const apiHasError = () => false;

export const isLoading = (state) => state.loading;

export const getCommitInfo = () => {
  const regex = /tag: [\w\.\-]+,/g;
  let commitInfo = JSON.parse(process.env.VUE_APP_GIT_INFO);
  let tags = commitInfo.refs.match(regex);

  commitInfo.tag = tags
    ? tags[0].replace("tag:", "").replace(",", "").trim()
    : "0.0.0";

  return commitInfo;
};

export const getSearch = (state) => state.search;
