import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuesax from "vuesax";

import "vuesax/dist/vuesax.css"; //Vuesax styles
import store from "./store";
Vue.config.productionTip = false;
Vue.use(Vuesax, {
  // options here
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
