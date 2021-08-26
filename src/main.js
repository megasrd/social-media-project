import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../axios-settings";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import SmallLoader from "../src/components/SmallLoader.vue";

Vue.component("sLoader", SmallLoader);

Vue.config.productionTip = false;

Vue.use(VueMaterial);

new Vue({
  router,
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
