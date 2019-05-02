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
          v-for="gallery in getGalleries.slice().reverse()"
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

import { mapState, mapActions, mapGetters } from "vuex";

export default {
  Name: "GalleryList",
  data() {
    return {
    };
  },
  created: function() {
    this.fetchGalleries();
  },
  computed: {
    realGalleries() {
      return this.$store.getters.getGalleries;
    },
    reverseGalleries() {
      return this.getGalleries.splice().reverse();
    },
    ...mapGetters(["isLoggedIn", "getGalleries"]),
  },
  watch: {
    realGalleries(value) {
      this.fetchGalleries();
    }
  },
  methods: {
    ...mapActions(["fetchGallery", "fetchGalleries"])
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
