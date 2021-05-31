require('./bootstrap');

import { createApp } from 'vue';

import router from "./Router/index";
import store from "./Store/index";
import App from "../js/App.vue";

// Vuelidate
import VuelidatePlugin from '@vuelidate/core'


// Font Awesome
import "./all.min";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

//////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\
//////////////////// CODEMIRROR \\\\\\\\\\\\\\\\\\\\
//////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\
// require lib
import VueCodemirror from 'vue3-code-mirror';
 
// require styles
import 'codemirror/lib/codemirror.css';
 
// require more codemirror resource...
 
// you can set default global options and events when use
// Vue.use(VueCodemirror, /* { 
//   options: { theme: 'base16-dark', ... },
//   events: ['scroll', ...]
// } */)

const app = createApp(App);
app.use(VueCodemirror/*, {
    
}*/);
app.use(VuelidatePlugin);
app.use(router);
app.use(store);
app.mount('#app');