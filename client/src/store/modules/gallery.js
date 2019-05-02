import axios from "axios";
import auth from "./auth";
import { router } from "../../main.js";

const state = {
  gallery: "",
  galleries: []
};

const getters = {
  getGallery: state => state.gallery,
  isGallerySelected: state => !!state.gallery,
  getGalleries: state => state.galleries
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
  fetchGalleries({ commit }) {
    axios
      .get("http://localhost:3001/", {
        headers: {
          Authorization: `${auth.state.token}`
        }
      })
      .then(async response => {
        for (const gallery of response.data) {
          for (let i = 0; i < gallery.images.length; i++) {
            const { data } = await axios.get(
              `http://localhost:3001/images/${gallery.images[i]}`,
              {
                headers: { Authorization: `${auth.state.token}` }
              }
            );
            gallery.images[i] = data;
          }
        }
        commit("setGalleries", response.data);
        return response.data;
      });
  },
  resetGalleries({ commit }) {
    commit("setGalleries", []);
  },
  resetGallery({ commit }) {
    commit("setGallery", "");
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
