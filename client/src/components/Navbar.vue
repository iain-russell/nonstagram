<template>
  <nav class="navbar " role="navigation" aria-label="main navigation">
    <!-- .brand -->
    <div class="navbar-brand">
      <div class="navbar-item">
        <router-link to="/">
          <p class="subtitle" @click="resetGallery">
            <i class="fas fa-camera"></i>
            Nonstagram
          </p>
        </router-link>
      </div>
      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        @click="showNav = !showNav"
        :class="{ 'is-active': showNav }"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <!-- /.brand -->

    <div class="navbar-menu" :class="{ 'is-active': showNav }">
      <div class="navbar-end">
        <!-- .sign-up -->
        <div class="navbar-item">
          <button v-if="!isLoggedIn" @click="openSignUp()" class="button">
            Sign Up
          </button>
        </div>
        <!-- /.sign-up -->

        <!-- .log-in -->
        <div class="navbar-item">
          <button v-if="!isLoggedIn" @click="openSignIn()" class="button">
            Log In
          </button>
        </div>
        <!-- /.log-in -->

        <!-- .upload-images -->
        <div class="navbar-item" v-if="isLoggedIn">
          <!-- <router-link to="/upload"> -->
          <a
            class="far fa-plus-square fa-2x "
            v-if="isLoggedIn"
            @click="openUploadModal()"
          >
          </a>
          <!-- </router-link> -->
        </div>
        <!-- /.upload-images -->

        <!-- .logout -->
        <div class="navbar-item" v-if="isLoggedIn">
          <router-link to="/">
            <button v-if="isLoggedIn" class="button" @click="submitSignOut()">
              Logout
            </button>
          </router-link>
        </div>
        <!-- /.logout -->
      </div>
    </div>
  </nav>
</template>

<script>
import axios from "axios";
import { router } from "../main.js";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import UploadImageModal from "./UploadImageModal";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
  components: { SignInForm },
  data() {
    return {
      showNav: false
    };
  },
  computed: mapGetters(["isLoggedIn", "isGallerySelected"]),
  methods: {
    ...mapActions([
      "signOut",
      "resetGallery",
      "resetGalleries",
      "fetchGalleries",
      "toggleUploader"
    ]),
    submitSignOut() {
      this.resetGallery();
      this.resetGalleries();
      this.signOut();
      router.push("/");
    },
    openSignUp() {
      this.$modal.open({
        parent: this,
        component: SignUpForm,
        hasModalCard: false,
        props: {}
      });
    },
    openSignIn() {
      this.$modal.open({
        parent: this,
        component: SignInForm,
        hasModalCard: false,
        props: {}
      });
    },
    openCreateGallery() {
      this.$modal.open({
        parent: this,
        component: CreateGallery,
        hasModalCard: false,
        props: {}
      });
    },
    openUploadModal() {
      this.$modal.open({
        parent: this,
        component: UploadImageModal,
        hasModalCard: false,
        props: {}
      });
    }
  }
};
</script>

<style scoped>
a {
  color: #363636;
}
.fa-camera {
  padding-left: 10px;
  padding-right: 10px;
}
@media (min-width: 1024px) {
  .navbar {
    padding-left: 19.5%;
    padding-right: 20%;
  }
}
</style>
