import { createRouter, createWebHistory } from 'vue-router';
import store from "../Store/index";
import routes from "./routes";

const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'activeNav',
})

router.beforeEach((to, from, next) => {
    const authUser = store.getters["auth/authUser"];
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
    const loginQuery = { path: "/login", query: { redirect: to.fullPath}, };

    if(from.name == "CourseEnroll") {
      to.params = {goBack: true};
    }
    if (reqAuth && !authUser) {
      store.dispatch("auth/getAuthUser").then(() => {
        if (!store.getters["auth/authUser"]) next(loginQuery);
        else next();
      });
    } else {
      next(); // make sure to always call next()!
    }
  });

export default router;