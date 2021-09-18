import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuesax from "vuesax";
import "./styles/main.css";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import store from "./store";
import "element-ui/lib/theme-chalk/index.css";
import {
  Slider,
  Tabs,
  TabPane,
  Input,
  FormItem,
  Form,
  Upload,
} from "element-ui";
Vue.use(Slider);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(FormItem);
Vue.use(Form);
Vue.use(Upload);
Vue.use(Input);

Vue.config.productionTip = false;
Vue.use(Vuesax, {
  // options here
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCVsUMI0fJs2sOzW4e_TzM3dM0jEmi0vHc",
  authDomain: "handmedown-19559.firebaseapp.com",
  projectId: "handmedown-19559",
  storageBucket: "handmedown-19559.appspot.com",
  messagingSenderId: "205701256794",
  appId: "1:205701256794:web:bae6b0fdbf1b18eb526a63",
  measurementId: "G-Q5M1SBPG53",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getFirestore } from "@firebase/firestore/lite";
Vue.prototype.$analytics = getAnalytics(app);
Vue.prototype.$storage = getStorage(app);
Vue.prototype.$firestore = getFirestore(app);
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    store.dispatch("setUser", user);

    // ...
  }
});
