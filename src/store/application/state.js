export default {
  authenticated: false,
  title: "",
  menu_items: [
    { label: "Active", routerName: "overview", icon: "mdi-progress-download" },
    { label: "Completed", routerName: "overview", icon: "mdi-check-all" },
    { label: "Failed", routerName: "overview", icon: "mdi-message-alert" }
  ]
};
