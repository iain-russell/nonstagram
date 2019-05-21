<template>
  <section class="section ">
    <div class="columns center">
      <div class="column is-8 is-mobile">
        <form @submit.prevent="submitSignUp">
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
              <button class="button is-primary" type="submit">Sign Up</button>
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
import SignInForm from "./SignInForm";

import { mapActions } from "vuex";

export default {
  Name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      token: ""
    };
  },
  methods: {
    ...mapActions(["signUp"]),
    submitSignUp() {
        this.signUp({
          email: this.email,
          password: this.password
        });
        this.$parent.close();
        this.$snackbar.open(`Successfully signed up with ${this.email}`);
    },
  }
};
</script>

<style lang="css" scoped></style>
