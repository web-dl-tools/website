export default [
  {
    path: "/login",
    component: () => import("../layouts/SingleComponent"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("../components/auth/CardLogin"),
        meta: {
          title: "Login"
        }
      }
    ],
    meta: {
      authenticated: false
    }
  },
  {
    path: "/requests",
    component: () => import("../layouts/Default"),
    children: [
      {
        path: "",
        name: "requests.overview",
        component: () => import("../views/requests/Overview")
      },
      {
        path: "create",
        name: "requests.create",
        title: "Create a new request",
        component: () => import("../views/requests/Create"),
        meta: {
          title: "Create a new request"
        }
      },
      {
        path: ":requestId",
        name: "requests.detail",
        component: () => import("../views/requests/Detail"),
        meta: {
          title: "Request details"
        }
      }
    ],
    meta: {
      authenticated: true
    }
  },
  {
    path: "/",
    component: () => import("../layouts/Default"),
    children: [
      {
        path: "",
        name: "overview",
        component: () => import("../components/HelloWorld"),
        meta: {
          title: "Overview"
        }
      },
      {
        path: "account",
        name: "account",
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
