require('./bootstrap');

import { createApp } from 'vue';
// import VueRouter from 'vue-router';

import router from "./Router/index";
console.log("this far")
import App from "./App.vue";
console.log('but not here')
import store from "./Store/index";

// Font Awesome
import "./all.min";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Vue.use(VueRouter);

// const app = new Vue({
//     el: '#app',
//     router,
//     components: { App }
// })

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');