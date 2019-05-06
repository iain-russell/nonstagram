import axios from "axios";

import { router } from "../../main.js";

const state = {
  token: window.localStorage.getItem("access_token"),
  loggingIn: false
};

const getters = {
  getToken: state => state.token,
  isLoggedIn: state => !!state.token,
  isLoggingIn: state => state.loggingIn
};

const actions = {
  signUp({ commit }, data) {
    commit("setLoggingIn", true);
    axios.post("http://localhost:3001/signup", { ...data }).then(response => {
      const accessToken = response.data.token;
      commit("setToken", accessToken);
      window.localStorage.setItem("access_token", accessToken);
      router.push("/");
      commit("setLoggingIn", false);
    });
  },
  signIn({ commit }, data) {
    axios.post("http://localhost:3001/signin", { ...data }).then(response => {
      const accessToken = response.data.token;
      commit("setToken", accessToken);
      window.localStorage.setItem("access_token", accessToken);
      router.push("/");
    });
  },
  async signOut({ commit }, user) {
    axios.post(`http://localhost:3001/wipeUser`, { user: user });
    commit("setToken", null);
    window.localStorage.removeItem("access_token");
    router.push("/");
  }
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  },
  setLoggingIn: (state, loggingIn) => {
    state.loggingIn = loggingIn;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
