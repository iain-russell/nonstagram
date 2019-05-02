import axios from "axios";
import { router } from "../../main.js";

const state = {
  token: window.localStorage.getItem("access_token")
};

const getters = {
  getToken: state => state.token,
  isLoggedIn: state => !!state.token
};

const actions = {
  signUp({ commit }, data) {
    axios
      .post("http://localhost:3001/signup", { ...data })
      .then(response => {
        const accessToken = response.data.token;
        commit("setToken", accessToken);
        window.localStorage.setItem("access_token", accessToken);
        router.push("/");
      });
  },
  signIn({ commit }, data) {
    axios
      .post("http://localhost:3001/signin", { ...data })
      .then(response => {
        const accessToken = response.data.token;
        commit("setToken", accessToken);
        window.localStorage.setItem("access_token", accessToken);
        router.push("/");
      });
  },
  signOut: ({ commit }) => {
    commit("setToken", null);
    window.localStorage.removeItem("access_token");
    router.push("/");
  }
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
