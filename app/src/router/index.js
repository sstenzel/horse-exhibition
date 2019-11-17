import Vue from "vue";
import Router from "vue-router";
import Horses from "@/components/horses/Horses.vue";
import Judges from "@/components/judges/Judges.vue";
import Login from "@/components/login/Login.vue";
import Results from "@/components/results/Results.vue";
import store from "@/store.js"



Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "results",
      component: Results
    },
    {
      path: "/horses",
      name: "horses",
      component: Horses
    },
    {
      path: "/judges",
      name: "judges",
      component: Judges
    },
    {
      path: "/login",
      name: "login",
      component: Login
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuth = store.getters.LOGGED;
  if (to.fullPath === '/horses') {
    if (!isAuth) {
      next('/login');
    }
  };
  if (to.fullPath === '/judges') {
    if (!isAuth) {
      next('/login');
    }
  };
  next();
});

export default router;