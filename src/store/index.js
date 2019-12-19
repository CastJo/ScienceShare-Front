import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "Leon",
    user: {
      isLogin: window.sessionStorage.getItem("isLogin"),
      username: window.sessionStorage.getItem("username"),
      permission: window.sessionStorage.getItem("permission"),
      unreadNotification: window.sessionStorage.getItem("unreadNotification"),
      emailAddress: window.sessionStorage.getItem("emailAddress"),
      prestige: window.sessionStorage.getItem("prestige"),
      createdDate: window.sessionStorage.getItem("createdDate"),
      avatarUrl: window.sessionStorage.getItem("avatarUrl"),
      following: [],
      followers: []
    },
    expertPage: {
      expertName: window.sessionStorage.getItem("expertName"),
      follows: window.sessionStorage.getItem("follows"),
      fans: window.sessionStorage.getItem("fans"),
      introduction: window.sessionStorage.getItem("introduction"),
      pictureUrl: window.sessionStorage.getItem("pictureUrl"),
      skills: window.sessionStorage.getItem("skills"),
      researchList: window.sessionStorage.getItem("researchList"),
      institution: window.sessionStorage.getItem("institution"),
      degree: window.sessionStorage.getItem("degree"),
      webSiteUrl: window.sessionStorage.getItem("webSiteUrl"),
      phone: window.sessionStorage.getItem("phone"),
      email: window.sessionStorage.getItem("email")
    }
  },
  mutations: {
    SignOut(state) {
      state.user.isLogin = false;
      window.sessionStorage.removeItem("isLogin");
      window.sessionStorage.removeItem("username");
      window.sessionStorage.removeItem("permission");
      window.sessionStorage.removeItem("unreadNotification");
      window.sessionStorage.removeItem("emailAddress");
      window.sessionStorage.removeItem("prestige");
      window.sessionStorage.removeItem("createdDate");
      window.sessionStorage.removeItem("avatarUrl");
      window.sessionStorage.removeItem("following");
      window.sessionStorage.removeItem("followers");
    },
    setUser(state, user) {
      state.user.username = user.username;
      state.user.permission = user.permission;
      state.user.unreadNotification = user.unreadNotification;
      state.user.emailAddress = user.emailAddress;
      state.user.prestige = user.prestige;
      state.user.createdDate = user.createdDate;
      state.user.avatarUrl = user.avatarUrl;
      state.user.following = user.following;
      state.user.followers = user.followers;
      state.user.isLogin = true;
      window.sessionStorage.setItem("isLogin", state.user.isLogin);
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
      window.sessionStorage.setItem("following", state.user.following);
      window.sessionStorage.setItem("followers", state.user.followers);
    },
    setExpertPage(state, expertPage) {
      if (expertPage.skills == null) expertPage.skills = [];
      if (expertPage.introduction == null) expertPage.introduction = "";
      state.expertPage = expertPage;
      window.sessionStorage.setItem("expertName", expertPage.expertName);
      window.sessionStorage.setItem("follows", expertPage.follows);
      window.sessionStorage.setItem("fans", expertPage.fans);
      window.sessionStorage.setItem("introduction", expertPage.introduction);
      window.sessionStorage.setItem("pictureUrl", expertPage.pictureUrl);
      window.sessionStorage.setItem("skills", expertPage.skills);
      window.sessionStorage.setItem("researchList", expertPage.researchList);
      window.sessionStorage.setItem("institution", expertPage.institution);
      window.sessionStorage.setItem("degree", expertPage.degree);
      window.sessionStorage.setItem("webSiteUrl", expertPage.webSiteUrl);
      window.sessionStorage.setItem("phone", expertPage.phone);
      window.sessionStorage.setItem("email", expertPage.email);
    },
    setPrework(state, value) {
      state.hasPermission = value.hasPermission;
      state.expertPage.expertName = value.name;
    },
    updateInfo(state, value) {
      state.expertPage.skills = value.skills;
      state.expertPage.introduce = value.introduce;
    }
  },
  actions: {
    SignOut(context) {
      context.commit("SignOut");
    },
    setUser(context, user) {
      context.commit("setUser", user);
    }
  },
  modules: {}
});
