export const isAuthenticated = (state) => state.authenticated;

export const getTitle = (state) => state.title;

export const getMenuItems = (state) => state.menu_items;

export const apiHasError = () => false;

export const isLoading = (state) => state.loading;

export const getCommitInfo = () => {
  const regex = /tag: [\w\.\-]+,/g;
  let commitInfo = JSON.parse(process.env.VUE_APP_GIT_INFO);
  commitInfo.tag = commitInfo.refs
    .match(regex)[0]
    .replace("tag:", "")
    .replace(",", "")
    .trim();

  return commitInfo;
};
