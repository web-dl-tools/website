export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../components/HelloWorld"),
    meta: {
      authenticated: false
    }
  },
  {
    path: "/",
    component: () => import("../layouts/AutoSwitcher"),
    children: [
      {
        path: "",
        name: "overview",
        component: () => import("../components/HelloWorld")
      }
    ],
    meta: {
      authenticated: true
    }
  }
  // {
  //   // Always leave this as last one
  //   path: "*",
  //   component: () => import("../layouts/single-card"),
  //   children: [
  //     {
  //       path: "*",
  //       name: "error.404",
  //       component: () => import("../views/error/404")
  //     }
  //   ],
  //   meta: {
  //     authenticated: false
  //   }
  // }
];
