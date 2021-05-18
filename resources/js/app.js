require('./bootstrap');

import { createApp } from 'vue';
// import VueRouter from 'vue-router';

import router from "./Router/index";
import App from "./App.vue";

// Vue.use(VueRouter);

// const app = new Vue({
//     el: '#app',
//     router,
//     components: { App }
// })

const app = createApp(App);
app.use(router);
app.mount('#app');