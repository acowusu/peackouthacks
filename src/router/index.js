import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/donors",
    name: "Donors",
    // route level coDe-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaDed when the route is visited.
    component: () =>
      import(/* webpackChunkName: "loggedin" */ "../views/Donors.vue"),
  },
  {
    path: "/connections",
    name: "Connections",
    // route level coDe-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaDed when the route is visited.
    component: () =>
      import(/* webpackChunkName: "loggedin" */ "../views/Connections.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
