import Vue from "vue";

import VueRouter from "vue-router";
Vue.use(VueRouter);
function loadView(view) {
  return () => import(`@/views/${view}.vue`);
}
function loadComponent(component) {
  return () => import(`@/components/${component}.vue`);
}

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: "/",
    redirect: "/signIn"
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/index/:username",
    name: "Index",
    component: loadView("Index")
  },
  {
    path: "/home",
    name: "home",
    component: loadView("Home"),
    // meta: {
    //   requireAuth: true
    // },
    children: [
      {
        path: "/",
        name: "SelfCard",
        component: loadComponent("SelfCard")
      },
      {
        path: "password",
        name: "Password",
        component: loadComponent("Password")
      },
      {
        path: "changeName",
        name: "ChangeName",
        component: loadComponent("changeName")
      },
      {
        path: "changeMail",
        name: "ChangeMail",
        component: loadComponent("changeMail")
      }
    ]
  },
  {
    path: "/signIn",
    name: "SignIn",
    component: loadView("SignIn")
  },
  {
    path: "/signUp",
    name: "SignUp",
    component: loadView("SignUp")
  },

  {
    path: "/main",
    name: "ExpertHome",
    component: loadView("ExpertHome"),
    children: [
      {
        path: "/",
        name: "ExpertMain",
        component: loadComponent("ExpertMain")
      },
      {
        path: "overview",
        name: "Overview",
        component: loadComponent("Overview")
      },
      {
        path: "research",
        name: "Research",
        component: loadComponent("Research")
      },
      {
        path: "information",
        name: "Information",
        component: loadComponent("Information")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
