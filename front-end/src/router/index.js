import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue"
import Article from "../views/pages/Article.vue"
import NotFound from "../views/pages/NotFound.vue"
import Dashboard from "../views/pages/Dashboard.vue"
//import BootstrapVue from "bootstrap-vue"
//Vue.use(BootstrapVue)

const ifAuthenticated = (to, from, next) => {
    const loggedIn = localStorage.getItem('session_token');
    if (loggedIn) {
        next()
        return
    }
    next('/login')
}


const routes = [
    { path: "/", component: Home },
    { path: "/Login", component: Login },
    { path: "/article/:id", component: Article },
    {path: "/dashboard", component: Dashboard,beforeEnter: ifAuthenticated},


   
    { path: "/:pathMatch(.*)*", component: NotFound}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router;