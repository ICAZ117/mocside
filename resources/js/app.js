require('./bootstrap');

import { createApp } from 'vue';

import router from "./Router/index";
import store from "./Store/index";
import App from "../js/App.vue";

// Vuelidate
import VuelidatePlugin from '@vuelidate/core'

// Font Awesome
import "./all.min";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Vue3 Tabs
import Tabs from 'vue3-tabs';

// VueQuill
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App);
app.component('QuillEditor', QuillEditor)
app.use(Tabs);
app.use(VuelidatePlugin);
app.use(router);
app.use(store);
app.mount('#app');