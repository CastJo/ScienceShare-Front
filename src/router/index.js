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
    path: "/feed",
    name: "feed",
    component: loadView("Feed")
  },
  {
    path: '/index/:username',
    name: 'Index',
    component: loadView("Index"),
  },
  {
    path: '/litInfo/:litID',
    name: 'litInfo',
    component: loadView("LITInfo"),
  },
    {
        path: "/manage",
        name: "Manage",
        component: loadView("Manage")
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
  },
  {
    path:'/searchresult/:keyword',
    name:'searchresult',
    component: loadView("SearchResult"),
    children:[
      {
        path:"expertresult/:keyword",
        name:"expertresult",
        component:loadComponent("ExpertResult")
      },
      {
        path:"mainresults/:keyword",
        name:"mainresults",
        component:loadComponent("MainResults")
      },
      {
        path:"userresult/:keyword",
        name:"userresult",
        component:loadComponent("UserResult")
      }

    ]
  },
  {
    path:'/litdetails',
    name:'litdetails',
    component: loadComponent("LITDetails"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
