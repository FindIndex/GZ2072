import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Cart from "../views/Cart.vue";
import Me from "../views/Me.vue";
import Login from "../views/Login.vue";
import Detail from "../views/Detail.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/cate",
        name: "Cate",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Cate.vue"),
    },

    {
        path: "/cart",
        name: "cart",
        component: Cart,
    },
    {
        path: "/me",
        name: "me",
        component: Me,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/detail",
        name: "detail",
        component: Detail,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
