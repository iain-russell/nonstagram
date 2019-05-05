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
        <div class="right">
          <div class="navbar-item" v-if="!isLoggedIn">
            <button @click="openSignUp()" class="button">
              Sign Up
            </button>
          </div>
        </div>
        <!-- /.sign-up -->

        <!-- .log-in -->
        <div class="right">
          <div class="navbar-item" v-if="!isLoggedIn">
            <button @click="openSignIn()" class="button">
              Log In
            </button>
          </div>
        </div>
        <!-- /.log-in -->

        <!-- .upload-images -->
        <div class="right">
          <div class="navbar-item" v-if="isLoggedIn">
            <button class="button" @click="openUploadModal()">Upload</button>
          </div>
        </div>
        <!-- /.upload-images -->

        <!-- .about -->
        <div class="right">
          <div class="navbar-item">
            <router-link to="/about">
              <a class="button" @click="toggleNavbar()">About </a>
            </router-link>
          </div>
        </div>
        <!-- /.about -->

        <!-- .logout -->
        <div class="right">
          <div class="navbar-item" v-if="isLoggedIn">
            <router-link to="/">
              <button v-if="isLoggedIn" class="button" @click="submitSignOut()">
                Logout
              </button>
            </router-link>
          </div>
        </div>
        <!-- /.logout -->
      </div>
    </div>
  </nav>
</template>

<script>
import { router } from "../main.js";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import UploadImageModal from "./UploadImageModal";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navbar",
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
      this.toggleNavbar();
      this.resetGallery();
      this.resetGalleries();
      this.signOut();
      router.push("/");
    },
    openSignUp() {
      this.toggleNavbar();
      this.$modal.open({
        parent: this,
        component: SignUpForm,
        scroll: "keep",
        hasModalCard: false,
        props: {}
      });
    },
    openSignIn() {
      this.toggleNavbar();
      this.$modal.open({
        parent: this,
        component: SignInForm,
        scroll: "keep",
        hasModalCard: false,
        props: {}
      });
    },
    openUploadModal() {
      this.toggleNavbar();
      this.$modal.open({
        parent: this,
        component: UploadImageModal,
        scroll: "keep",
        hasModalCard: false,
        props: {}
      });
    },
    toggleNavbar() {
      this.showNav = !this.showNav;
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
.subtitle {
  font-family: 'Karla', sans-serif;
}
@media (min-width: 1024px) {
  .navbar {
    padding-left: 19.5%;
    padding-right: 20%;
  }
}
</style>
