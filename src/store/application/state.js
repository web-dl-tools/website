export default {
  authenticated: false,
  loading: false,
  websocket: null,
  title: "",
  title_suffix: "",
  menu_items: [
    {
      label: "Completed",
      routerName: "requests.completed",
      icon: "mdi-checkbox-marked-circle-outline",
      color: "success",
    },
    {
      label: "Active",
      routerName: "requests.active",
      icon: "mdi-progress-download",
      color: "warning",
    },
    {
      label: "Failed",
      routerName: "requests.failed",
      icon: "mdi-alert-circle-outline",
      color: "error",
    },
  ],
  search: "",
  api_build_info: null,
};
