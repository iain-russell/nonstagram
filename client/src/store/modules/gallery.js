import axios from "axios";
import auth from "./auth";
import { router } from "../../main.js";

const state = {
  gallery: "",
  galleries: [],
  counter: 0,
  user: ""
};

const getters = {
  getGallery: state => state.gallery,
  isGallerySelected: state => !!state.gallery,
  getGalleries: state => state.galleries,
  getCounter: state => state.counter,
  getUser: state => state.user
};

const actions = {
  async fetchGallery({ commit }, gallery) {
    await axios
      .get(`http://localhost:3001/${gallery._id}`, {
        headers: { Authorization: `${auth.state.token}` }
      })
      .then(response => {
        commit("setGallery", response.data);
        router.push("/gallery");
        return response.data;
      });
  },
  async getUserData({ commit }) {
    await axios
      .get(`http://localhost:3001/userInfo`, {
        headers: {
          Authorization: `${auth.state.token}`
        }
      })
      .then(response => {
        // await console.log(response);
        commit("setUser", response.data);
        return response.data
      });
  },
  fetchGalleries({ commit }) {
    axios
      .get("http://localhost:3001/", {
        headers: {
          Authorization: `${auth.state.token}`
        }
      })
      .then(async response => {
        commit("setGalleries", response.data);
        return response.data;
      });
  },
  resetGalleries({ commit }) {
    commit("setGalleries", []);
  },
  resetGallery({ commit }) {
    commit("setGallery", "");
  },
  incrementCounter({ commit }) {
    commit("plusCounter");
  }
};

const mutations = {
  setGallery: (state, gallery) => {
    state.gallery = gallery;
  },
  setGalleries: (state, galleries) => {
    state.galleries = galleries;
  },
  pushGallery: (state, gallery) => {
    state.galleries.push(gallery);
  },
  plusCounter: state => {
    state.counter += 1;
  },
  setUser: (state, user) => {
    state.user = user;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
