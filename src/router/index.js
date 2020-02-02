import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  store.commit("application/CHECK");
  const authenticated = store.getters["application/isAuthenticated"];

  if ("title" in to.meta) {
    store.commit("application/SET_TITLE", to.meta.title);
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