import Vue from 'vue'

import VueRouter from 'vue-router'

Vue.use(VueRouter);
function loadView(view) {
  return () => import(`@/views/${view}.vue`);
}
function loadComponent(component) {
  return () => import(`@/components/${component}.vue`);
}

const routes = [
  {
    path: '/',
    redirect:'/searchresult/huo',
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
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
