require("./bootstrap");

import { createApp } from "vue";

import router from "./Router/index";
import store from "./Store/index";
import App from "../js/App.vue";

// Vuelidate
import VuelidatePlugin from "@vuelidate/core";

// Font Awesome
import "./all.min";

// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// Vue3 Tabs
import Tabs from "vue3-tabs";

// VueQuill
import VueQuillEditor from "vue-quill-editor";

import "quill/dist/quill.core.css"; // import styles
import "quill/dist/quill.snow.css"; // for snow theme
import "quill/dist/quill.bubble.css"; // for bubble theme

// IDE
import IDE from "./Components/IDE.vue";

const app = createApp(App);
app.component("IDE", IDE);
app.use(VueQuillEditor);
app.use(Tabs);
app.use(VuelidatePlugin);
app.use(router);
app.use(store);
app.mount("#app");
