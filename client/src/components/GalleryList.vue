<template>
  <div class="container center">
    <section v-if="!isLoggedIn" class="hero">
      <div class="hero-body">
        <h1 class="has-text-dark title">Log in to get started!</h1>
      </div>
    </section>
    <section class="section center" v-if="isLoggedIn">
      <div class="columns is-mobile is-multiline" id="main-column">
        <div
          class="column is-4"
          id="image-box"
          @click="openCloseUp(gallery)"
          v-for="gallery in reverseGalleries"
        >
          <figure class="image is-square">
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

import { mapState, mapActions, mapGetters } from "vuex";

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
    watchCounter() {
      return this.$store.getters.getCounter;
    },
    reverseGalleries() {
      return this.$store.getters.getGalleries.slice().reverse();
    },
    ...mapGetters(["isLoggedIn", "getGalleries", "getCounter", "getUser"])
  },
  watch: {
    watchCounter() {
      setTimeout(() => {
        this.fetchGalleries();
      }, 1000);
    }
  },
  methods: {
    ...mapActions(["fetchGallery", "fetchGalleries", "getUserData","incrementCounter"]),
    openCloseUp(gallery) {
      this.$modal.open({
        parent: this,
        component: CloseUp,
        hasModalCard: false,
        props: { gallery: gallery }
      });
    }
  }
};
</script>

<style scoped>
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
