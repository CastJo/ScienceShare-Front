import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);
var axios = require("axios");
// axios.defaults.baseURL = "http://localhost:8005";
// axios.defaults.baseURL = "http://111.230.166.179:8888";
axios.defaults.baseURL = "http://193.112.150.103:8005";
Vue.prototype.$axios = axios;
// router.beforeEach((to, from, next) => {
//     if (to.meta.requireAuth) {
//         if (this.$store.state.isLogin) {
//             next()
//         } else {
//             next({
//                 path: '/'
//             })
//         }
//     } else {
//         next()
//     }
// });
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
