import VueRouter from "vue-router";
import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import 'buefy/dist/buefy.css'

import store from "./store/index";

import GalleryList from "./components/GalleryList";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Buefy);

require("./assets/css/style.css");
require("./assets/main.scss");

export const router = new VueRouter({
  mode: "history",
  routes: [
    { path: '/', component: GalleryList},
    ]
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
