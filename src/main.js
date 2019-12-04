import Vue from 'vue'
<<<<<<< Updated upstream
import App from './App'
import router from './router'
=======
import App from './App.vue'
import router from './router'
import store from './store'
>>>>>>> Stashed changes

Vue.config.productionTip = false

new Vue({
  router,
<<<<<<< Updated upstream
  components: { App },
  template: '<App/>'
})
=======
  store,
  render: h => h(App)
}).$mount('#app')
>>>>>>> Stashed changes
