<template>
  <div class="container center">
    <section v-if="!isLoggedIn" class="hero" id="hero-section">
      <div class="hero-body center">
        <h1 v-if="!isLoggingIn" class="has-text-dark title">
          Log in to get started!
        </h1>
        <h1 v-if="isLoggingIn" class="has-text-dark title">
          Generating and uploading images for nonstagram!
        </h1>
      </div>
    </section>
    <b-loading
      :is-full-page="true"
      :active.sync="isLoggingIn"
      :can-cancel="true"
    >
      <b-icon pack="fas" icon="sync-alt" size="is-large" custom-class="fa-spin">
      </b-icon>
    </b-loading>
    <section class="section center" v-if="isLoggedIn">
      <div class="columns is-mobile is-multiline" id="main-column">
        <div
          class="column is-4"
          id="image-box"
          v-for="(gallery, index) in reverseGalleries"
          v-bind:key="index"
          v-if="gallery.visible"
          @mouseover="gallery.deleteVisible = true"
          @mouseleave="gallery.deleteVisible = false"
        >
          <div id="gallery-delete-div" v-if="gallery.deleteVisible">
            <button
              class="delete"
              id="delete-button"
              @click="deleteGallery(gallery)"
            ></button>
          </div>
          <figure class="image is-square" @click="openCloseUp(gallery, index)">
            <img
              id="gallery-list-name"
              :src="
                'https://s3.eu-west-2.amazonaws.com/django-static-practice1939/' +
                  gallery.images[0].key
              "
            />
          </figure>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import CloseUp from "./CloseUp";

import { mapActions, mapGetters } from "vuex";

export default {
  Name: "GalleryList",
  data() {
    return {};
  },
  created: function() {
    this.fetchGalleries();
    this.getUserData();
  },
  computed: {
    reverseGalleries() {
      return this.$store.getters.getGalleries.slice().reverse();
    },
    firstLogin() {
      if (this.isLoggedIn) {
        this.getUserData();
      }
    },
    ...mapGetters([
      "isLoggedIn",
      "getGalleries",
      "getToken",
      "getCounter",
      "getUser",
      "isLoggingIn"
    ])
  },
  watch: {
    getCounter() {
      setTimeout(() => {
        this.fetchGalleries();
      }, 1000);
    },
    getUser() {
      this.fetchGalleries();
    }
  },
  methods: {
    ...mapActions([
      "fetchGallery",
      "fetchGalleries",
      "getUserData",
      "incrementCounter"
    ]),
    openCloseUp(gallery, index) {
      this.$modal.open({
        parent: this,
        component: CloseUp,
        scroll: "keep",
        hasModalCard: false,
        props: { gallery: gallery }
      });
    },
    async deleteGallery(gallery) {
      gallery.visible = false;
      axios.delete(`http://localhost:3001/${gallery._id}`);
    }
  }
};
</script>

<style scoped>
.title {
  font-family: "Karla", sans-serif;
}
#image-box {
  cursor: pointer;
  padding: 15px;
}
#main-column {
  min-width: 60vw;
}
img {
  height: 300px;
  object-fit: cover;
}
#gallery-list-name {
  font-family: "Nunito", sans-serif;
}
#hero-section {
  height: 80vh;
}
#gallery-delete-div {
  position: absolute;
  z-index: 10;
}
#delete-button {
  margin: 5px;
}
@media (max-width: 768px) {
  #main-column {
    min-width: 96vw;
    padding-left: 4px;
  }
  #image-box {
    padding: 2px;
  }
}
@media (min-width: 768px) {
  #main-column {
    min-width: 96vw;
    padding-left: 10px;
    padding-left: 10px;
  }
  #image-box {
    padding: 15px;
  }
}
@media (min-width: 1024px) {
  #main-column {
    min-width: 60vw;
  }
}
</style>
