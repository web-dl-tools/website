export default [
  {
    // Always leave this as last one
    path: "*",
    component: () => import("../layouts/single-card"),
    children: [
      {
        path: "*",
        name: "error.404",
        component: () => import("../views/error/404")
      }
    ],
    meta: {
      authenticated: false
    }
  }
];
