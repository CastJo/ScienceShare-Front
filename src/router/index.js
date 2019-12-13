import Vue from "vue";


import VueRouter from 'vue-router'
Vue.use(VueRouter);
function loadView(view) {
  return () => import(`@/views/${view}.vue`)
}
const routes = [
  {
    path: '/',
    redirect:'/SignIn',



  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: loadView('Home')
  },
  {
    path: '/SignIn',
    name: 'SignIn',
    component: loadView('SignIn')
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: loadView('SignUp')
  },
  {
    path: '/Index',
    name: 'Index',
    component: loadView('Index')
  },
  {
    path: "/main",
    name: "WorkingPanel",
    component: () => import("@/views/WorkingPanel.vue")
  }

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
