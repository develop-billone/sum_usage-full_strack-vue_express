import { createRouter, createWebHistory } from "vue-router";
import md5 from "crypto-js/md5";

const routes = [
  {
    path: "/",
    name: "Home",
    query: {
      verify: { type: String, required: true },
    },
    component: () => import("../views/Home.vue"),
    beforeEnter: (to, from, next) => {
      const { verify } = to.query;
      const date = new Date();
      const dateFormatted =
        date.getFullYear().toString() +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        date.getDate().toString().padStart(2, "0") +
        date.getHours().toString().padStart(2, "0");
      const hash = md5(dateFormatted).toString();
      if (verify === "02aab4a7e1bbdf537fd3bd917d3bbec") {
        next();
      } else {
        next({ name: "NoPermission" });
      };
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/NoPermission",
    name: "NoPermission",
    component: () => import("../views/NoPermission.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
