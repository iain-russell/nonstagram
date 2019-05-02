<template>
  <section class="section ">
    <div class="columns center">
      <div class="column is-8 is-mobile">
        <form @submit.prevent="submitSignIn">
          <div class="modal-card" style="width: auto">
            <header class="modal-card-head">
              <p class="modal-card-title">Login</p>
            </header>
            <section class="modal-card-body">
              <b-field label="Email">
                <b-input
                  type="email"
                  :value="email"
                  v-model="email"
                  placeholder="Your email"
                  required
                >
                </b-input>
              </b-field>

              <b-field label="Password">
                <b-input
                  type="password"
                  :value="password"
                  v-model="password"
                  password-reveal
                  placeholder="Your password"
                  required
                >
                </b-input>
              </b-field>
            </section>
            <footer class="modal-card-foot">
              <button class="button" type="button" @click="$parent.close()">
                Close
              </button>
              <button class="button" type="button" @click="switchSignUp">
                Sign Up
              </button>
              <button class="button is-primary" type="submit">Login</button>
            </footer>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { router } from "../main.js";
import SignUpForm from "./SignUpForm";

import { mapState, mapGetters, mapActions } from "vuex";

export default {
  Name: "SignInForm",
  components: { SignUpForm },
  data() {
    return {
      email: "",
      password: "",
      token: ""
    };
  },
  computed: mapGetters(["isLoggedIn"]),
  methods: {
    ...mapActions(["signIn", "signOut"]),
    submitSignIn() {
      this.signIn({
        email: this.email,
        password: this.password
      });
      this.$parent.close();
      this.$snackbar.open(`Successfully signed in as ${this.email}`);
    },
    switchSignUp() {
      this.$parent.close();
      this.$modal.open({
        parent: this,
        component: SignUpForm,
        hasModalCArd: true,
        props: {}
      });
    }
  }
};
</script>

<style lang="css" scoped></style>
