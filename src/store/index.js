import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: '',
  },
  mutations: {
    SignIn(state) {
      state.isLogin = true
    },
    SignOut(state) {
      state.isLogin = false
    },
  },
  actions: {
    SignIn(context) {
      context.commit('SignIn')
    },
    SignOut(context) {
      context.commit('SignOut')
    },
  },
  modules: {
  }
})
