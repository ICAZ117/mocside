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

// IDE
import IDE from "./Components/IDE.vue";

// Tiptap
import Tiptap from "./Components/Tiptap.vue";

// Modal
import VueFinalModal from "vue-final-modal";

// Popup notification
import Notifications from '@kyvg/vue3-notification'

const app = createApp(App);
app.component("IDE", IDE);
app.component("Tiptap", Tiptap);
app.use(Notifications);
app.use(VueFinalModal());
app.use(Tabs);
app.use(VuelidatePlugin);
app.use(router);
app.use(store);
app.mount("#app");
