<template>
  <div id="app">
    <Navbar />
    <transition appear name="fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
    <Footer />
  </div>
</template>

<style lang="scss">
@import "./assets/scss/main.scss";
</style>

<script>
import Navbar from "./components/parts/Navbar";
import Footer from "./components/parts/Footer";
export default {
  components: {
    Navbar,
    Footer
  },
  watch: {
    $route(to) {
      if (to === "/") {
        this.$router.push("/feed/1");
      }
    }
  },
  data() {
    return {
      info: ""
    };
  }
};
</script>
