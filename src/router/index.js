import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  store.commit("application/CHECK");
  const authenticated = store.getters["application/isAuthenticated"];

  if ("title" in to.meta) {
    store.dispatch("application/setTitle", to.meta.title);
  }

  if (to.matched.some(m => m.path === "/login") && authenticated) {
    next({ name: "overview" });
  } else if (to.matched.some(m => m.meta.authenticated) && !authenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
