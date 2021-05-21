require('./bootstrap');

import { createApp } from 'vue';

import router from "./Router/index";
// import store from "./Store/index";
import App from "../js/App.vue";

// Vuelidate
import Vuelidate from "vuelidate";

// Font Awesome
import "./all.min";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


const app = createApp(App);
app.use(Vuelidate);
app.use(router);
// app.use(store);
app.mount('#app');