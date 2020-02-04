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
        path: "create",
        name: "requests.create",
        component: () => import("../views/requests/Create"),
        meta: {
          title: "Create a new request"
        }
      },
      {
        path: "active",
        name: "requests.active",
        component: () => import("../views/requests/Active"),
        meta: {
          title: "Active and pending requests"
        }
      },
      {
        path: "completed",
        name: "requests.completed",
        component: () => import("../views/requests/Completed"),
        meta: {
          title: "Completed requests"
        }
      },
      {
        path: "failed",
        name: "requests.failed",
        component: () => import("../views/requests/Failed"),
        meta: {
          title: "Failed requests"
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
        component: () => import("../views/Overview"),
        meta: {
          title: "My requests"
        }
      }
    ],
    meta: {
      authenticated: true
    }
  },
  {
    // Always leave this as last one
    path: "*",
    component: () => import("../layouts/SingleComponent"),
    children: [
      {
        path: "*",
        name: "error.404",
        component: () => import("../components/errors/404")
      }
    ],
    meta: {
      authenticated: false
    }
  }
];
