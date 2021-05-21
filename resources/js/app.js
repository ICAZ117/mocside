require('./bootstrap');

import { createApp } from 'vue';

import router from "./Router/index";
// import store from "./Store/index";
import App from "../js/App.vue";



// Font Awesome
import "./all.min";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


const app = createApp(App);

app.use(router);
// app.use(store);
app.mount('#app');