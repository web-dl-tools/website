export default {
  authenticated: false,
  title: "",
  menu_items: [
    { label: "Overview", routerName: "overview", icon: "mdi-view-dashboard" },
    {
      label: "Requests",
      routerName: "requests.overview",
      icon: "mdi-file-download"
    },
    {
      label: "Account",
      routerName: "account",
      icon: "mdi-account"
    }
  ]
};
