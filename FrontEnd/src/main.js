import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import axios from "axios";
axios.defaults.withCredentials = true;
import routes from "./routes";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  routes
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormDatepickerPlugin  ,
  CalendarPlugin ,
  FormPlugin,
  FormTimepickerPlugin ,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  TablePlugin,
  InputGroupPlugin
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormDatepickerPlugin  ,
  CalendarPlugin ,
  FormPlugin,
  FormInputPlugin,
  FormTimepickerPlugin ,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  TablePlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin, 
  InputGroupPlugin
].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

var shared_data = {
    username: localStorage.username,
    lastSearch: localStorage.lastSearch,
  
    // username: undefined,
    login(username) {
      localStorage.setItem("username", username);
      this.username = username;
      console.log("login", this.username);
    },
    logout() {
      console.log("logout");
      localStorage.removeItem("username");
      this.username = undefined;
      this.lastSearch = undefined;
    },
    setLastSearch(lastSearch) {
      localStorage.setItem("lastSearch", JSON.stringify(lastSearch));
      this.lastSearch = JSON.stringify(lastSearch);
    },
  };


new Vue({
  router,
  data() {
    return {
      store: shared_data
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000
      });
    }
  },
  render: (h) => h(App)
}).$mount("#app");
