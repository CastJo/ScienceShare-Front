
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false;
Vue.use(ElementUI);
var axios = require('axios');
//axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.baseURL = 'http://111.230.166.179:8888/usercenter';
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)

}).$mount('#app');



