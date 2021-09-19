import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
    },
  },
  modules: {},
  getters: {
    isSignedIn(state) {
      return !!state.user;
    },
    uid(state) {
      if (state.user) {
        return state.user.uid;
      } else {
        return "NOT_LOGGED_IN";
      }
    },
    profileURL(state) {
      if (state.user) {
        return state.user.photoURL;
      } else {
        return null;
      }
    },
    authToken(state) {
      if (state.user) {
        return state.user.accessToken;
      } else {
        return "";
      }
    },
    name(state) {
      if (state.user) {
        return state.user.displayName;
      } else {
        return "";
      }
    },
  },
});
