export default {
  authenticated: false,
  websocket: null,
  title: "",
  menu_items: [
    {
      label: "Active",
      routerName: "requests.active",
      icon: "mdi-progress-download"
    },
    {
      label: "Completed",
      routerName: "requests.completed",
      icon: "mdi-check-all"
    },
    {
      label: "Failed",
      routerName: "requests.failed",
      icon: "mdi-alert-circle-outline"
    }
  ]
};
