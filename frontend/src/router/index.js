import { createRouter, createWebHistory } from "vue-router";
import md5 from "crypto-js/md5";
import axios from "axios";

const routes = [
  {
    path: "/",
    name: "Home",
    alias: "/",
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
        date.getDay().toString().padStart(2, "0") +
        date.getHours().toString().padStart(2, "0");
      const hash = md5(dateFormatted).toString();
      if (hash === verify) {
        next();
      } else {
        next({ name: "NoPermission" });
      }
    },
  },
  {
    path: "/detail/:id",
    name: "Detail",
    component: () => import("../views/UsageDetail.vue"),
    beforeEnter: async (to, from, next) => {
      await axios.get(`/oracle/status/${to.params.id}`).then((response) => {
        if (response.data.status === "completed") {
          next();
        } else {
          next({ name: "NotFound", params: { pathMatch: to.fullPath } });
        }
      });
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
