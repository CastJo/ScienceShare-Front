import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    username: "",
    user: {
      username: window.sessionStorage.getItem("username"),
      permission: window.sessionStorage.getItem("permission"),
      unreadNotification: window.sessionStorage.getItem("unreadNotification"),
      emailAddress: window.sessionStorage.getItem("emailAddress"),
      prestige: window.sessionStorage.getItem("prestige"),
      createdDate: window.sessionStorage.getItem("createdDate"),
      avatarUrl: window.sessionStorage.getItem("avatarUrl")
    },
    expert: {
      name: "Huobin Tan2",
      follows: "3",
      fans: "201",
      url: "@/assets/pic1.png",
      info: {
        introduce: "",
        tags: [
          {
            label: "c++"
          },
          {
            label: "java"
          },
          {
            label: "helloworld"
          }
        ]
      }
    }
  },
  mutations: {
    SignIn(state) {
      state.isLogin = true;
    },
    SignOut(state) {
      state.isLogin = false;
      window.sessionStorage.removeItem("username");
      window.sessionStorage.removeItem("permission");
      window.sessionStorage.removeItem("unreadNotification");
      window.sessionStorage.removeItem("emailAddress");
      window.sessionStorage.removeItem("prestige");
      window.sessionStorage.removeItem("createdDate");
      window.sessionStorage.removeItem("avatarUrl");
    },
    setUser(state, user) {
      state.user.username = user.username;
      state.user.permission = user.permission;
      state.user.unreadNotification = user.unreadNotification;
      state.user.emailAddress = user.emailAddress;
      state.user.prestige = user.prestige;
      state.user.createdDate = user.createdDate;
      state.user.avatarUrl = user.avatarUrl;
      window.sessionStorage.setItem("username", state.user.username);
      window.sessionStorage.setItem("permission", state.user.permission);
      window.sessionStorage.setItem(
        "unreadNotification",
        state.user.unreadNotification
      );
      window.sessionStorage.setItem("emailAddress", state.user.emailAddress);
      window.sessionStorage.setItem("prestige", state.user.prestige);
      window.sessionStorage.setItem("createdDate", state.user.createdDate);
      window.sessionStorage.setItem("avatarUrl", state.user.avatarUrl);
    }
  },
  actions: {
    SignIn(context) {
      context.commit("SignIn");
    },
    SignOut(context) {
      context.commit("SignOut");
    },
    setUser(context, user) {
      context.commit("setUser", user);
    }
  },
  modules: {}
});
