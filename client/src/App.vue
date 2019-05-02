<template>
  <div id="app">
    <Navbar />
    <router-view> </router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "app",
  components: {
    Navbar,
  }
};
</script>

<style>
html, body {
    width: 100%;
    height: 100%;
}

body > div {
    height: 100%;
    -webkit-overflow-scrolling: touch;
}
</style>
